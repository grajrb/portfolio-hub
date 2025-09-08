'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code2, 
  Globe, 
  PlayCircle, 
  FileText, 
  Users,
  ArrowLeft,
  ExternalLink,
  Star,
  Download,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

const resources = {
  articles: [
    {
      title: "Building Scalable React Applications",
      description: "Best practices for structuring and scaling React applications for enterprise-level projects.",
      category: "React",
      type: "Article",
      icon: FileText,
      link: "/blog/scalable-react-apps",
      isExternal: false
    },
    {
      title: "Modern State Management in React",
      description: "Comprehensive guide to state management patterns using Redux Toolkit, Zustand, and Context API.",
      category: "State Management",
      type: "Article",
      icon: FileText,
      link: "/blog/react-state-management",
      isExternal: false
    },
    {
      title: "TypeScript Best Practices",
      description: "Advanced TypeScript patterns and techniques for type-safe development.",
      category: "TypeScript",
      type: "Article",
      icon: FileText,
      link: "/blog/typescript-best-practices",
      isExternal: false
    }
  ],
  tutorials: [
    {
      title: "Full-Stack MERN Development",
      description: "Step-by-step tutorial for building a complete MERN stack application from scratch.",
      category: "Full-Stack",
      type: "Tutorial",
      icon: PlayCircle,
      link: "/blog/mern-tutorial",
      isExternal: false
    },
    {
      title: "Next.js 14 Complete Guide",
      description: "Master Next.js 14 with App Router, Server Components, and modern React patterns.",
      category: "Next.js",
      type: "Tutorial",
      icon: PlayCircle,
      link: "/blog/nextjs-14-guide",
      isExternal: false
    },
    {
      title: "API Development with Node.js",
      description: "Build robust REST APIs using Node.js, Express, and MongoDB with authentication.",
      category: "Backend",
      type: "Tutorial",
      icon: PlayCircle,
      link: "/blog/nodejs-api-development",
      isExternal: false
    }
  ],
  templates: [
    {
      title: "React TypeScript Starter",
      description: "Production-ready React TypeScript template with Vite, ESLint, and Prettier configured.",
      category: "React",
      type: "Template",
      icon: Download,
      link: "https://github.com/grajrb/react-typescript-starter",
      isExternal: true
    },
    {
      title: "Next.js Portfolio Template",
      description: "Modern portfolio template built with Next.js 14, Tailwind CSS, and Framer Motion.",
      category: "Portfolio",
      type: "Template",
      icon: Download,
      link: "https://github.com/grajrb/portfolio-hub",
      isExternal: true
    },
    {
      title: "MERN Stack Boilerplate",
      description: "Complete MERN stack boilerplate with authentication, API structure, and deployment ready.",
      category: "Full-Stack",
      type: "Template",
      icon: Download,
      link: "https://github.com/grajrb/mern-boilerplate",
      isExternal: true
    }
  ],
  tools: [
    {
      title: "Code Snippet Manager",
      description: "Personal collection of useful code snippets and utilities for rapid development.",
      category: "Productivity",
      type: "Tool",
      icon: Code2,
      link: "/tools/snippets",
      isExternal: false
    },
    {
      title: "Color Palette Generator",
      description: "Generate beautiful color palettes for your web applications and designs.",
      category: "Design",
      type: "Tool",
      icon: Lightbulb,
      link: "/tools/color-generator",
      isExternal: false
    },
    {
      title: "Performance Analyzer",
      description: "Analyze web application performance and get optimization recommendations.",
      category: "Performance",
      type: "Tool",
      icon: Globe,
      link: "/tools/performance-analyzer",
      isExternal: false
    }
  ],
  external: [
    {
      title: "React Official Documentation",
      description: "The official React documentation with guides, API reference, and tutorials.",
      category: "Documentation",
      type: "External",
      icon: BookOpen,
      link: "https://react.dev/",
      isExternal: true
    },
    {
      title: "JavaScript.info",
      description: "Comprehensive JavaScript tutorial from basics to advanced concepts.",
      category: "JavaScript",
      type: "External",
      icon: BookOpen,
      link: "https://javascript.info/",
      isExternal: true
    },
    {
      title: "CSS-Tricks",
      description: "Daily articles about CSS, HTML, JavaScript, and all things related to web design.",
      category: "CSS",
      type: "External",
      icon: BookOpen,
      link: "https://css-tricks.com/",
      isExternal: true
    },
    {
      title: "MDN Web Docs",
      description: "Mozilla's comprehensive resource for developers, by developers.",
      category: "Web Standards",
      type: "External",
      icon: BookOpen,
      link: "https://developer.mozilla.org/",
      isExternal: true
    }
  ]
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-dark-bg dark:via-dark-bg dark:to-slate-900">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-6 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Developer <span className="text-blue-600 dark:text-blue-400">Resources</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
            A curated collection of articles, tutorials, templates, and tools to help developers build better applications and improve their skills.
          </p>
        </motion.div>

        {/* Resources Sections */}
        <div className="space-y-12">
          {/* Articles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Articles & Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.articles.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </motion.section>

          {/* Tutorials */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <PlayCircle className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
              Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.tutorials.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </motion.section>

          {/* Templates */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Download className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
              Templates & Starters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.templates.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </motion.section>

          {/* Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Code2 className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
              Developer Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.tools.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </motion.section>

          {/* External Resources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
              External Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.external.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </motion.section>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 p-8 bg-blue-50 dark:bg-slate-800 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Have a Resource to Share?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Found a great tutorial, tool, or resource that would benefit other developers? 
            I'd love to hear about it and potentially add it to this collection.
          </p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Suggest a Resource
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ResourceCard({ resource }: { resource: any }) {
  const IconComponent = resource.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <IconComponent className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">
                    {resource.category}
                  </Badge>
                  <Badge variant="outline">
                    {resource.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-600 dark:text-slate-400 mb-4">
            {resource.description}
          </CardDescription>
          {resource.isExternal ? (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Resource
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          ) : (
            <Link
              href={resource.link}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Resource
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
