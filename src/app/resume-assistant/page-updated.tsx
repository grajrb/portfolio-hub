'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useChat } from 'ai/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
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
  MessageCircle,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Mail,
  Phone,
  Github,
  Linkedin
} from 'lucide-react';

// Updated resume data with Gaurav's information
const resumeData = {
    personal: {
    name: "Gaurav Raj",
    email: "gauravupadhayay9801@gmail.com",
    phone: "+91-7992425448",
    linkedin: "gaurav-raj1",
    github: "grajrb",
    portfolio: "https://portfolio-hub-chi.vercel.app/",
    leetcode: "gauravraj_9",
    resumeDrive: "https://drive.google.com/file/d/1jMbCCCSAS9bXaRr6Lxu90biP9hOJFlCR/view?usp=sharingg"
  },
  objective: "Results-driven Full-Stack Developer with 2 years of experience, now with advanced expertise in architecting and deploying scalable, cloud-native applications. Proficient in MERN stack, microservices, and system design principles. Seeking to leverage comprehensive skills in Node.js, React, DevOps, and cloud platforms to build robust, high-performance software solutions.",
  
  experience: [
    {
      company: "Bosch Global Software Technologies",
      role: "Software Engineer", 
      duration: "January 2024 – Present",
      location: "Coimbatore, Tamil Nadu",
      achievements: [
        "Architected and developed full-stack automation tools using a React.js frontend and Node.js microservices, reducing manual effort by 20%",
        "Designed and implemented a responsive Employee portal with React.js, significantly improving user engagement and overall user experience",
        "As Product Owner, led the VS Code migration strategy, achieving a 26% adoption rate and realizing ₹870K in operational savings",
        "Enhanced data-layer performance by optimizing PostgreSQL queries and Redis caching, achieving 25% faster API responses",
        "Implemented and managed CI/CD pipelines using Jenkins and Docker on Azure, reducing application deployment time by 80%"
      ]
    },
    {
      company: "HighRadius Technologies",
      role: "Full Stack Developer (Intern)",
      duration: "January 2022 – April 2022", 
      location: "Bhubaneswar, India",
      achievements: [
        "Engineered scalable, secure RESTful APIs for a B2B fintech platform using Node.js/Express.js, achieving 25% faster response times",
        "Implemented a robust Role-Based Access Control (RBAC) system for 5 distinct user roles using JavaScript/Bootstrap, ensuring stringent access control"
      ]
    }
  ],
  
  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "SQL", "Bash"],
    frontend: ["React.js", "Next.js", "Redux", "React Query", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "NestJS", "RESTful APIs", "GraphQL", "Microservices"],
    database: ["PostgreSQL (TypeORM)", "MongoDB (Mongoose)", "Redis", "MySQL"],
    devops: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "CI/CD", "Git"],
    concepts: ["System Design", "Distributed Systems", "Agile", "Scrum", "TDD"]
  },
  
  projects: [
    {
      name: "EzCommerce",
      description: "Full-Stack E-commerce Platform",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
      github: "grajrb/EzCommerce",
      features: [
        "Developed scalable e-commerce platform with secure payment integration and admin dashboard",
        "Implemented authentication, shopping cart, and real-time inventory tracking system"
      ]
    },
    {
      name: "EventBookingSystem", 
      description: "Modern Event Management Platform",
      tech: ["TypeScript", "React.js", "Node.js", "Real-time Updates"],
      github: "grajrb/EventBookingSystem",
      features: [
        "Developed full-stack event booking platform with real-time updates and administrative features",
        "Implemented secure booking system with user authentication and comprehensive event management capabilities",
        "Built responsive admin dashboard for event organizers with analytics and attendee management"
      ]
    }
  ],
  
  education: {
    degree: "B.Tech, Computer Science and Engineering",
    institution: "SRM Institute of Science and Technology",
    duration: "2019 – 2023",
    location: "Chennai, Tamil Nadu, India",
    cgpa: "8.74/10.0"
  },
  
  achievements: [
    {
      title: "Global Rank 91 – CodeChef Long Challenge (Competitive Programming Achievement)",
      year: "2023",
      description: "Demonstrated exceptional algorithmic problem-solving skills and competitive programming expertise among thousands of global participants"
    },
    {
      title: "VS Code Migration – Product Owner",
      year: "2024", 
      organization: "Bosch Global Software Technologies",
      description: "Led successful product adoption strategy resulting in 26% user adoption rate and ₹870K operational savings"
    }
  ]
};

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
  score: 87,
  strengths: [
    'Strong quantified achievements with metrics',
    'Comprehensive technical skills coverage',
    'Relevant industry experience',
    'Clear career progression shown',
    'Proven leadership and cost-saving results',
  ],
  improvements: [
    'Add more cloud-specific certifications',
    'Include soft skills in achievement descriptions',
    'Optimize keywords for specific job descriptions',
    'Add testimonials or recommendations section',
  ],
};

export default function ResumeAssistantPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Full-Stack Developer');
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

✨ **ATS Optimization**: Analyze your resume for keyword density and formatting
🎯 **Role Matching**: Tailor your resume for specific job descriptions  
📊 **Performance Scoring**: Get detailed feedback with improvement suggestions
🔧 **Content Enhancement**: Improve descriptions and add impact metrics
📄 **Export Options**: Generate professional PDF and Word formats

Upload your resume or share the text, and let's make it stand out to recruiters!`,
      },
    ],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.includes('word') || file.type === 'text/plain') {
        setResumeFile(file);
        // In a real app, you'd extract text from the file
        setResumeText("Resume content would be extracted here...");
        toast({
          title: "File uploaded successfully",
          description: `${file.name} is ready for analysis`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Word document, or text file",
          variant: "destructive",
        });
      }
    }
  };

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        ...sampleAnalysis,
        targetRole,
        resumeData: resumeData,
      });
      setIsAnalyzing(false);
      setActiveTab('results');
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully",
      });
    }, 3000);
  };

  const downloadResume = (format: 'pdf' | 'docx' | 'txt') => {
    // Generate resume content
    const resumeContent = generateResumeText();
    
    // Create and download file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `Gaurav_Raj_Resume.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Resume downloaded",
      description: `Resume exported as ${format.toUpperCase()}`,
    });
  };

  const generateResumeText = () => {
    return `
GAURAV RAJ
Full-Stack Developer | Cloud Native Solutions Architect

📧 ${resumeData.personal.email} | 📱 ${resumeData.personal.phone}
🔗 LinkedIn: ${resumeData.personal.linkedin} | 🐙 GitHub: ${resumeData.personal.github}
💼 Portfolio: ${resumeData.personal.portfolio} | 🏆 LeetCode: ${resumeData.personal.leetcode}

OBJECTIVE
${resumeData.objective}

TECHNICAL SKILLS
• Programming & Scripting: ${resumeData.skills.programming.join(', ')}
• Frontend Technologies: ${resumeData.skills.frontend.join(', ')}
• Backend Technologies: ${resumeData.skills.backend.join(', ')}
• Databases & ORMs: ${resumeData.skills.database.join(', ')}
• DevOps & Cloud: ${resumeData.skills.devops.join(', ')}
• Concepts & Methodologies: ${resumeData.skills.concepts.join(', ')}

PROFESSIONAL EXPERIENCE

${resumeData.experience.map(exp => `
${exp.role.toUpperCase()} | ${exp.company.toUpperCase()}
${exp.duration} | ${exp.location}

${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

PROJECTS

${resumeData.projects.map(project => `
${project.name.toUpperCase()} | ${project.description}
Tech Stack: ${project.tech.join(', ')}
GitHub: ${project.github}

${project.features.map(feature => `• ${feature}`).join('\n')}
`).join('\n')}

EDUCATION
${resumeData.education.degree}
${resumeData.education.institution}
${resumeData.education.duration} | ${resumeData.education.location}
CGPA: ${resumeData.education.cgpa}

ACHIEVEMENTS
${resumeData.achievements.map(achievement => `
• ${achievement.title} (${achievement.year})
  ${achievement.description}
${achievement.organization ? `  Organization: ${achievement.organization}` : ''}
`).join('\n')}
    `.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portfolio
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Resume Assistant</h1>
                  <p className="text-sm text-muted-foreground">Powered by Advanced AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Professional Resume Overview</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Current resume information for Gaurav Raj - Full-Stack Developer
                </p>
              </div>

              {/* Personal Information */}
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="font-semibold">{resumeData.personal.name}</p>
                          <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-green-500" />
                        <p className="text-sm">{resumeData.personal.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-orange-500" />
                        <p className="text-sm">{resumeData.personal.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <p className="text-sm">LinkedIn: {resumeData.personal.linkedin}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Github className="w-4 h-4 text-gray-600" />
                        <p className="text-sm">GitHub: {resumeData.personal.github}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-purple-500" />
                        <p className="text-sm">Portfolio: Available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-base">{exp.role}</h4>
                            <p className="text-sm font-medium text-blue-600">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">{exp.duration} | {exp.location}</p>
                            <ul className="space-y-1 mt-3">
                              {exp.achievements.slice(0, 3).map((achievement, i) => (
                                <li key={i} className="text-xs text-muted-foreground">
                                  • {achievement.length > 80 ? `${achievement.substring(0, 80)}...` : achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold mb-2">Programming & Scripting</h5>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skills.programming.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold mb-2">Frontend Technologies</h5>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skills.frontend.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold mb-2">Backend & DevOps</h5>
                        <div className="flex flex-wrap gap-1">
                          {resumeData.skills.backend.concat(resumeData.skills.devops).slice(0, 8).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => setActiveTab('analyze')} className="gap-2">
                  <Brain className="w-4 h-4" />
                  Analyze Resume
                </Button>
                <Button onClick={() => setActiveTab('chat')} variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  AI Chat Assistant
                </Button>
                <Button onClick={() => downloadResume('pdf')} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Upload Your Resume</h2>
                <p className="text-muted-foreground">
                  Upload your current resume or paste the text below for AI analysis
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Upload Resume File</label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Click to upload resume</p>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF, Word documents, and text files
                        </p>
                        {resumeFile && (
                          <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                            <p className="text-sm text-green-600 dark:text-green-400">
                              ✓ {resumeFile.name} uploaded successfully
                            </p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="text-center text-sm text-muted-foreground">OR</div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Paste Resume Text</label>
                      <Textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume content here..."
                        rows={10}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Target Role (Optional)</label>
                      <Input
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g., Full-Stack Developer, Senior React Developer"
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={() => setActiveTab('analyze')}
                disabled={!resumeFile && !resumeText}
                className="w-full"
                size="lg"
              >
                Continue to Analysis
              </Button>
            </motion.div>
          </TabsContent>

          {/* Analyze Tab */}
          <TabsContent value="analyze" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">AI Resume Analysis</h2>
                <p className="text-muted-foreground">
                  Our AI will analyze your resume for ATS compatibility, keyword optimization, and industry standards
                </p>
              </div>

              {!isAnalyzing && !analysisResults && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${feature.color}`}>
                                <feature.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Analysis Settings</h3>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Target Role</label>
                          <Input
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            placeholder="e.g., Senior Full-Stack Developer"
                          />
                        </div>
                        <div className="pt-4">
                          <Button onClick={analyzeResume} className="w-full" size="lg">
                            <Brain className="w-4 h-4 mr-2" />
                            Start AI Analysis
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {isAnalyzing && (
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="w-16 h-16 text-blue-500 mx-auto" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
                        <p className="text-muted-foreground mb-4">
                          Our AI is examining your resume for optimization opportunities...
                        </p>
                        <Progress value={75} className="w-full max-w-md mx-auto" />
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>✓ Parsing resume content</p>
                        <p>✓ Analyzing keyword density</p>
                        <p>⏳ Checking ATS compatibility</p>
                        <p className="opacity-50">⏳ Generating improvement suggestions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {analysisResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-6"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">Analysis Results</h2>
                  <p className="text-muted-foreground">
                    Here's your detailed resume analysis with actionable insights
                  </p>
                </div>

                {/* Score Card */}
                <Card className="border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {analysisResults.score}/100
                        </h3>
                        <p className="text-lg font-semibold">ATS Compatibility Score</p>
                        <p className="text-sm text-muted-foreground">
                          Your resume is well-optimized for {targetRole} positions
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysisResults.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Improvements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <AlertCircle className="w-5 h-5" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysisResults.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Download Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Export Optimized Resume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={() => downloadResume('pdf')} className="gap-2">
                        <FileText className="w-4 h-4" />
                        Download PDF
                      </Button>
                      <Button onClick={() => downloadResume('docx')} variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        Download Word
                      </Button>
                      <Button onClick={() => downloadResume('txt')} variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        Download Text
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    AI Resume Assistant Chat
                  </CardTitle>
                  <CardDescription>
                    Get personalized advice and answers about your resume optimization
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex ${
                              message.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.role === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                              }`}
                            >
                              <div className="whitespace-pre-wrap text-sm">
                                {message.content}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask about resume optimization, ATS tips, or career advice..."
                        className="flex-1"
                        disabled={isLoading}
                      />
                      <Button type="submit" disabled={isLoading} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
