'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  Award,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const resumeData = {
    personal: {
    name: "Gaurav Raj",
    email: "gauravupadhayay9801@gmail.com",
    phone: "+91-7992425448",
    linkedin: "gaurav-raj1",
    github: "grajrb",
    portfolio: "https://portfolio-hub-chi.vercel.app/",
    leetcode: "gauravraj_9",
    resumeDrive: "https://drive.google.com/file/d/1Wr0rt4ivdyNs-WSEbeEwhiDoyLc6RL1k/view?usp=sharing"
  },
  summary: "Results-driven Full-Stack Developer with 2.0 years of experience architecting and deploying scalable, cloud-native applications. Expert in MERN stack, microservices architecture, and system design principles. Proven track record of delivering high-impact solutions that reduce operational costs by €870K and improve performance by 25%.",
  
  experience: [
    {
      company: "Bosch Global Software Technologies",
      role: "Software Engineer", 
      duration: "January 2024 – Present",
      location: "Coimbatore, Tamil Nadu",
      achievements: [
        "Architected Full-Stack Automation Platform: Designed and developed comprehensive automation tools using React.js frontend and Node.js microservices architecture, reducing manual operational effort by 20%",
        "Built Responsive Employee Portal: Created modern, responsive web application with React.js, significantly enhancing user engagement and experience",
        "Product Owner - VS Code Migration: Led strategic migration initiative achieving 26% adoption rate and realizing ₹870K in operational cost savings",
        "Performance Optimization: Enhanced data-layer performance through PostgreSQL query optimization and Redis caching, achieving 25% faster API response times",
        "DevOps Implementation: Designed CI/CD pipelines using Jenkins and Docker on Azure, reducing deployment time by 80%"
      ]
    },
    {
      company: "HighRadius Technologies",
      role: "Full Stack Developer (Intern)",
      duration: "January 2022 – April 2022", 
      location: "Bhubaneswar, India",
      achievements: [
        "Scalable API Development: Engineered secure RESTful APIs for B2B fintech platform using Node.js/Express.js, achieving 25% improvement in response times",
        "Security Implementation: Developed comprehensive RBAC system supporting 5 distinct user roles with JavaScript/Bootstrap"
      ]
    }
  ],
  
  skills: {
    programming: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "Bash Scripting"],
    frontend: ["React.js", "Next.js 14", "Redux Toolkit", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "NestJS", "RESTful APIs", "GraphQL", "Microservices"],
    database: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "TypeORM"],
    devops: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD"],
    concepts: ["System Design", "Distributed Systems", "Agile", "Scrum", "TDD"]
  },
  
  projects: [
    {
      name: "EzCommerce",
      description: "Full-Stack E-commerce Platform",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe API"],
      github: "grajrb/EzCommerce",
      highlights: [
        "Comprehensive e-commerce solution with secure payment integration",
        "Dynamic shopping cart and real-time inventory management",
        "Administrative dashboard with analytics"
      ]
    },
    {
      name: "EventBookingSystem", 
      description: "Modern Event Management Platform",
      tech: ["TypeScript", "React.js", "Node.js", "Socket.io", "Real-time Updates"],
      github: "grajrb/EventBookingSystem",
      highlights: [
        "Full-stack event booking with real-time notifications",
        "JWT authentication and comprehensive event management",
        "WebSocket technology for real-time communication"
      ]
    },
    {
      name: "Portfolio Hub",
      description: "AI-Powered Developer Portfolio",
      tech: ["Next.js 14", "TypeScript", "Framer Motion", "AI SDK", "MongoDB"],
      github: "grajrb/portfolio-hub",
      highlights: [
        "Modern portfolio with advanced animations",
        "AI resume assistant with multiple providers",
        "SEO optimized with performance best practices"
      ]
    }
  ],
  
  education: {
    degree: "B.Tech, Computer Science and Engineering",
    institution: "SRM Institute of Science and Technology",
    duration: "2019 – 2023",
    location: "Chennai, Tamil Nadu, India",
    cgpa: "8.74/10.0",
    classification: "First Class with Distinction"
  },
  
  achievements: [
    {
      title: "Global Rank 91 - CodeChef Long Challenge",
      year: "2023",
      organization: "CodeChef",
      description: "Demonstrated exceptional algorithmic problem-solving skills among thousands of global participants"
    },
    {
      title: "VS Code Migration - Product Owner",
      year: "2024", 
      organization: "Bosch Global Software Technologies",
      description: "Led successful product adoption strategy resulting in 26% user adoption rate and ₹870K operational savings"
    },
    {
      title: "Academic Excellence",
      year: "2019-2023",
      organization: "SRM Institute of Science and Technology", 
      description: "Maintained 8.74 CGPA with First Class with Distinction"
    }
  ],
  
  certifications: [
    "Advanced React Development - Udemy",
    "Node.js Microservices - Udemy", 
    "AWS Cloud Practitioner - Udemy",
    "Docker & Kubernetes - Udemy",
    "System Design Interview Preparation - Udemy",
    "MongoDB Complete Developer Course - Udemy",
    "Complete DevOps Engineer - Udemy"
  ]
};

export default function ResumeAssistant() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [newInfo, setNewInfo] = useState('');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate ATS analysis
    setTimeout(() => {
      setAnalysisResult({
        score: 92,
        strengths: [
          "Excellent quantified achievements with specific metrics (₹870K savings, 26% adoption, 25% performance improvement)",
          "Comprehensive technical stack covering full-stack development",
          "Strong leadership experience as Product Owner",
          "Relevant modern technologies (React.js, Node.js, Docker, Kubernetes)",
          "Clear career progression with consistent growth",
          "Academic excellence with high CGPA (8.74/10.0)"
        ],
        improvements: [
          "Add cloud certifications (AWS Solutions Architect, Azure Developer)",
          "Include soft skills examples in project descriptions",
          "Add testimonials or recommendations section", 
          "Optimize for specific job posting keywords"
        ],
        keywords: [
          "Full-Stack Developer", "React.js", "Node.js", "TypeScript", "AWS", "Azure",
          "Microservices", "DevOps", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
          "System Design", "Agile", "Scrum", "CI/CD", "Jenkins", "Redis", "GraphQL"
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <motion.div 
        className="container mx-auto px-4 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Resume Co-pilot
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your resume with AI-powered suggestions, ATS optimization, and professional formatting
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analyze">ATS Check</TabsTrigger>
            <TabsTrigger value="enhance">Enhance</TabsTrigger>
            <TabsTrigger value="download">Export</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{resumeData.personal.name}</h3>
                    <p className="text-sm text-muted-foreground">{resumeData.personal.email}</p>
                    <p className="text-sm text-muted-foreground">{resumeData.personal.phone}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">GitHub: {resumeData.personal.github}</Badge>
                    <Badge variant="outline">LinkedIn: {resumeData.personal.linkedin}</Badge>
                    <Badge variant="outline">LeetCode: {resumeData.personal.leetcode}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-semibold">{exp.role}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.duration} • {exp.location}</p>
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.slice(0, 2).map((achievement, i) => (
                            <li key={i} className="text-xs text-muted-foreground">
                              • {achievement.substring(0, 80)}...
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Education & Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{resumeData.education.degree}</h4>
                    <p className="text-sm text-muted-foreground">{resumeData.education.institution}</p>
                    <p className="text-xs text-muted-foreground">{resumeData.education.duration} • {resumeData.education.location}</p>
                    <p className="text-xs text-muted-foreground">CGPA: {resumeData.education.cgpa} • {resumeData.education.classification}</p>
                  </div>
                  <div className="space-y-2">
                    {resumeData.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-3">
                        <h5 className="text-sm font-medium">{achievement.title}</h5>
                        <p className="text-xs text-muted-foreground">{achievement.year} • {achievement.organization}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Overview */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>Comprehensive overview of technical expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(resumeData.skills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-semibold mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Featured Projects</CardTitle>
                <CardDescription>Key projects showcasing technical capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1 mb-3">
                        {project.highlights.map((highlight, i) => (
                          <p key={i} className="text-xs text-muted-foreground">
                            • {highlight}
                          </p>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600">📁 {project.github}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ATS Analysis Tab */}
          <TabsContent value="analyze" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  ATS Compatibility Analysis
                </CardTitle>
                <CardDescription>
                  Analyze your resume for Applicant Tracking System (ATS) optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!analysisResult ? (
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    size="lg"
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"
                        />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Start ATS Analysis
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-6">
                    {/* Score Display */}
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-muted-foreground/20"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - analysisResult.score / 100)}`}
                            className="text-green-500"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{analysisResult.score}%</span>
                        </div>
                      </div>
                      <p className="text-lg font-semibold">ATS Compatibility Score</p>
                      <p className="text-muted-foreground">
                        {analysisResult.score >= 90 ? 'Outstanding' :
                         analysisResult.score >= 80 ? 'Excellent' : 
                         analysisResult.score >= 70 ? 'Good' : 
                         analysisResult.score >= 60 ? 'Fair' : 'Needs Improvement'}
                      </p>
                    </div>

                    {/* Strengths */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Strengths
                      </h4>
                      <div className="space-y-2">
                        {analysisResult.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/50 rounded">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Improvements */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        Areas for Improvement
                      </h4>
                      <div className="space-y-2">
                        {analysisResult.improvements.map((improvement, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950/50 rounded">
                            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Keywords */}
                    <div>
                      <h4 className="font-semibold mb-3">Detected Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhancement Tab */}
          <TabsContent value="enhance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Resume Enhancement
                </CardTitle>
                <CardDescription>
                  Add new information or improve existing content with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="new-info" className="text-sm font-medium">Add New Information</label>
                  <Textarea
                    id="new-info"
                    placeholder="Enter new achievements, skills, projects, or any other information you'd like to add to your resume..."
                    value={newInfo}
                    onChange={(e) => setNewInfo(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>
                <Button 
                  className="w-full"
                  disabled={!newInfo.trim()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Enhance with AI
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions to improve your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border-l-4 border-blue-500">
                    <h5 className="font-medium mb-2 text-blue-700 dark:text-blue-300">🎯 Experience Section</h5>
                    <p className="text-sm text-muted-foreground">
                      Your quantified achievements are excellent! Consider adding more context about the technologies used and team size you managed.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg border-l-4 border-purple-500">
                    <h5 className="font-medium mb-2 text-purple-700 dark:text-purple-300">🛠️ Skills Section</h5>
                    <p className="text-sm text-muted-foreground">
                      Add proficiency levels or years of experience for each technology to provide hiring managers with better context.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border-l-4 border-green-500">
                    <h5 className="font-medium mb-2 text-green-700 dark:text-green-300">🚀 Projects Section</h5>
                    <p className="text-sm text-muted-foreground">
                      Include live demo links and user metrics (if available) to make your projects more impactful and tangible.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg border-l-4 border-orange-500">
                    <h5 className="font-medium mb-2 text-orange-700 dark:text-orange-300">📜 Certifications</h5>
                    <p className="text-sm text-muted-foreground">
                      Consider pursuing cloud certifications (AWS Solutions Architect, Azure Developer) to strengthen your DevOps profile.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="download" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Resume
                </CardTitle>
                <CardDescription>
                  Download your resume in various professional formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button size="lg" className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <FileText className="w-6 h-6" />
                    <span className="font-semibold">Download PDF</span>
                    <span className="text-xs opacity-90">Professional format</span>
                  </Button>
                  <Button size="lg" variant="outline" className="h-20 flex-col gap-2 border-2">
                    <Upload className="w-6 h-6" />
                    <span className="font-semibold">Download DOCX</span>
                    <span className="text-xs text-muted-foreground">Editable format</span>
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Additional Formats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="justify-start">
                      📄 Plain Text
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      📝 Markdown
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      📊 JSON Data
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      📚 LaTeX
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border">
                  <h5 className="font-medium mb-3 flex items-center gap-2">
                    💡 Export Tips
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>PDF format</strong> is recommended for job applications and ATS systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span><strong>DOCX format</strong> allows for easy editing and customization by recruiters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span><strong>Plain text</strong> format is useful for online job portals and forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Markdown format</strong> is perfect for developers and GitHub profiles</span>
                    </li>
                  </ul>
                </div>

                {/* Quick Actions */}
                <div className="border-t pt-6">
                  <h5 className="font-medium mb-3">Quick Actions</h5>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      📋 Copy to Clipboard
                    </Button>
                    <Button variant="outline" size="sm">
                      📧 Email to Self
                    </Button>
                    <Button variant="outline" size="sm">
                      🔗 Share Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
