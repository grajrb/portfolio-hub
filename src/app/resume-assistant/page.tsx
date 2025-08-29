'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useChat } from 'ai/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Upload, 
  FileText, 
  Brain, 
  Download, 
  ArrowLeft, 
  Send, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Advanced AI analyzes your resume for ATS compatibility and industry standards',
    color: 'text-blue-500',
  },
  {
    icon: Target,
    title: 'ATS Optimization',
    description: 'Get specific recommendations to pass Applicant Tracking Systems',
    color: 'text-green-500',
  },
  {
    icon: TrendingUp,
    title: 'Score & Insights',
    description: 'Receive a detailed score with actionable improvement insights',
    color: 'text-purple-500',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Download your improved resume in multiple professional formats',
    color: 'text-orange-500',
  },
];

const sampleAnalysis = {
  score: 82,
  strengths: [
    'Strong technical skills section',
    'Quantified achievements with metrics',
    'Clear professional summary',
    'Consistent formatting throughout',
  ],
  improvements: [
    'Add more industry-specific keywords',
    'Include soft skills in context',
    'Optimize for ATS parsing',
    'Add recent certifications section',
  ],
};

export default function ResumeAssistantPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to the AI Resume Assistant! 👋

I'm here to help you optimize your resume for ATS systems and modern hiring practices. Here's what I can do:

🎯 **ATS Analysis**: Scan your resume for compatibility with Applicant Tracking Systems
📈 **Score & Feedback**: Get detailed scores and actionable improvement suggestions  
✨ **Content Enhancement**: Help you add new experiences, courses, and skills effectively
📄 **Format Optimization**: Ensure your resume follows industry best practices

To get started, you can:
1. Upload your resume file (PDF, DOC, DOCX)
2. Paste your resume text directly
3. Ask me specific questions about resume optimization

What would you like to do first?`,
      },
    ],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.includes('pdf') && !file.type.includes('document') && !file.type.includes('text')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive",
        });
        return;
      }

      setResumeFile(file);
      setActiveTab('analyze');
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText && !resumeFile) {
      toast({
        title: "No resume content",
        description: "Please upload a file or paste your resume text",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate analysis (in real implementation, this would call the AI API)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAnalysisResults(sampleAnalysis);
      setActiveTab('results');
      
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 py-20">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Brain size={16} className="mr-2" />
            AI-Powered
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Resume
            <span className="text-primary"> Assistant</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimize your resume with AI-powered analysis, ATS compatibility checks, 
            and personalized recommendations from industry experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg bg-secondary ${feature.color}`}>
                          <feature.icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                  <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                  <TabsTrigger value="analyze">Analyze</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Upload className="text-primary" size={20} />
                        <span>Upload Your Resume</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* File Upload */}
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <h3 className="font-semibold mb-2">
                          {resumeFile ? resumeFile.name : 'Drop your resume here'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF, DOC, and DOCX files up to 10MB
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or paste text directly
                          </span>
                        </div>
                      </div>

                      {/* Text Input */}
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Paste your resume text here..."
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                          rows={8}
                          className="resize-none"
                        />
                        <Input
                          placeholder="Target role (e.g., Senior Full Stack Developer)"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                        />
                      </div>

                      <Button
                        onClick={() => setActiveTab('analyze')}
                        className="w-full"
                        disabled={!resumeFile && !resumeText.trim()}
                      >
                        Continue to Analysis
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analyze" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="text-primary" size={20} />
                        <span>AI Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {isAnalyzing ? (
                        <div className="text-center py-8">
                          <div className="mx-auto mb-4 w-16 h-16 relative">
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                          </div>
                          <h3 className="font-semibold mb-2">Analyzing your resume...</h3>
                          <p className="text-sm text-muted-foreground">
                            Our AI is examining your resume for ATS compatibility, 
                            keyword optimization, and industry best practices.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-6">
                            <h3 className="font-semibold mb-4">Ready for Analysis</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>
                                  {resumeFile ? `File: ${resumeFile.name}` : 'Resume text provided'}
                                </span>
                              </div>
                              {targetRole && (
                                <div className="flex items-center space-x-2">
                                  <CheckCircle size={16} className="text-green-500" />
                                  <span>Target role: {targetRole}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                            <h4 className="font-medium mb-2">What we'll analyze:</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              <li>• ATS compatibility and parsing</li>
                              <li>• Keyword optimization for your target role</li>
                              <li>• Format and structure best practices</li>
                              <li>• Content quality and impact statements</li>
                              <li>• Skills alignment with job requirements</li>
                            </ul>
                          </div>

                          <Button
                            onClick={handleAnalyze}
                            className="w-full"
                            size="lg"
                          >
                            <Sparkles size={16} className="mr-2" />
                            Start AI Analysis
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="results" className="mt-6">
                  {analysisResults ? (
                    <div className="space-y-6">
                      {/* Score Card */}
                      <Card className="border-2 border-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Overall Score</h3>
                            <div className="text-3xl font-bold text-primary">
                              {sampleAnalysis.score}/100
                            </div>
                          </div>
                          <Progress value={sampleAnalysis.score} className="h-3 mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Great job! Your resume is well-structured with room for optimization.
                          </p>
                        </CardContent>
                      </Card>

                      {/* Strengths & Improvements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-green-600">
                              <CheckCircle size={20} />
                              <span>Strengths</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {sampleAnalysis.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle size={16} className="text-green-500 mt-0.5" />
                                  <span className="text-sm">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-orange-600">
                              <AlertCircle size={20} />
                              <span>Improvements</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {sampleAnalysis.improvements.map((improvement, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <AlertCircle size={16} className="text-orange-500 mt-0.5" />
                                  <span className="text-sm">{improvement}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-4">
                        <Button size="lg">
                          <Download size={16} className="mr-2" />
                          Download Improved Resume
                        </Button>
                        <Button variant="outline" size="lg">
                          <FileText size={16} className="mr-2" />
                          View Detailed Report
                        </Button>
                        <Button variant="outline" size="lg">
                          <Upload size={16} className="mr-2" />
                          Analyze Another Resume
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <h3 className="font-semibold mb-2">No analysis results yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Upload your resume and run an analysis to see results here.
                        </p>
                        <Button onClick={() => setActiveTab('upload')}>
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* AI Chat Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="h-fit max-h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="text-primary" size={20} />
                    <span>AI Assistant</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 text-sm ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary'
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className="border-t p-4">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask about resume optimization..."
                        disabled={isLoading}
                      />
                      <Button type="submit" size="icon" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
