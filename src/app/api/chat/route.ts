import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// AI Provider Configuration (Priority: Free -> Paid)
function getAIModel() {
  // 1. Google Gemini (FREE with generous limits)
  if (process.env.GOOGLE_API_KEY) {
    return google('gemini-1.5-flash');
  }
  
  // 2. OpenRouter (FREE tier + many models)
  if (process.env.OPENROUTER_API_KEY) {
    const openrouter = createOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });
    return openrouter('meta-llama/llama-3.1-8b-instruct:free');
  }
  
  // 3. Perplexity (PAID but affordable) - Using Sonar Pro
  if (process.env.PERPLEXITY_API_KEY) {
    const perplexity = createOpenAI({
      apiKey: process.env.PERPLEXITY_API_KEY,
      baseURL: 'https://api.perplexity.ai/',
    });
    return perplexity('llama-3.1-sonar-large-128k-online'); // Sonar Pro model
  }
  
  // 4. OpenAI (PAID - fallback)
  if (process.env.OPENAI_API_KEY) {
    return openai('gpt-4o-mini');
  }
  
  // 5. Anthropic (PAID - fallback)
  if (process.env.ANTHROPIC_API_KEY) {
    return anthropic('claude-3-haiku-20240307');
  }
  
  throw new Error('No AI provider configured. Please set up at least one API key.');
}

const messageSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, sessionId } = messageSchema.parse(body);

    // Save chat session to database
    if (sessionId) {
      await prisma.chatSession.upsert({
        where: { sessionId },
        update: {
          messages: messages,
          updatedAt: new Date(),
        },
        create: {
          sessionId,
          messages: messages,
          createdAt: new Date(),
        },
      });
    }

    const model = getAIModel();
    
    const result = await streamText({
      model: model as any,
      messages: convertToCoreMessages(messages as any),
      system: `You are an expert career advisor and resume optimization specialist with extensive knowledge of:
      
1. ATS (Applicant Tracking System) optimization
2. Industry-specific resume best practices
3. Modern hiring trends and requirements
4. Professional writing and formatting
5. Skills assessment and career development

Your capabilities include:
- Analyzing resumes for ATS compatibility
- Providing specific, actionable feedback
- Suggesting improvements for keywords, formatting, and content
- Scoring resumes on various criteria
- Helping users add new experiences (like Udemy courses) effectively
- Creating tailored resume versions for different roles

Always provide:
- Specific, actionable advice
- ATS-friendly suggestions
- Industry-relevant keyword recommendations
- Proper formatting guidelines
- Professional tone and language suggestions

When analyzing resumes, consider:
- Keyword density and relevance
- Section organization and hierarchy
- Quantifiable achievements and metrics
- Technical skills alignment
- Professional summary effectiveness
- Work experience presentation
- Education and certification placement

Be encouraging while being honest about areas for improvement.`,
      tools: {
        analyzeResume: {
          description: 'Analyze a resume for ATS compatibility and provide detailed feedback',
          parameters: z.object({
            resumeText: z.string().describe('The full text content of the resume'),
            targetRole: z.string().describe('The target job role or industry'),
          }),
          execute: async ({ resumeText, targetRole }) => {
            // Store analysis in database
            const analysis = await prisma.resumeAnalysis.create({
              data: {
                fileName: `resume-analysis-${Date.now()}`,
                originalText: resumeText,
                analysis: {
                  targetRole,
                  analyzedAt: new Date().toISOString(),
                  // This would contain detailed ATS analysis
                },
                suggestions: {
                  keywords: [],
                  formatting: [],
                  content: [],
                  sections: [],
                },
                score: 0, // Would be calculated based on analysis
              },
            });

            return {
              id: analysis.id,
              score: 0,
              feedback: 'Resume analysis completed. Detailed feedback will be provided.',
            };
          },
        },
        generateResumeSection: {
          description: 'Generate or improve a specific resume section',
          parameters: z.object({
            sectionType: z.enum(['summary', 'experience', 'skills', 'education', 'certifications']),
            content: z.string().describe('Current content or requirements for the section'),
            targetRole: z.string().describe('Target job role'),
          }),
          execute: async ({ sectionType, content, targetRole }) => {
            return {
              sectionType,
              improved: true,
              suggestions: `Improved ${sectionType} section for ${targetRole} role`,
            };
          },
        },
      },
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
