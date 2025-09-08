'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Palette, 
  Settings, 
  Terminal,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Zap,
  Monitor,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

const toolsAndResources = {
  development: [
    {
      name: "Visual Studio Code",
      description: "Primary code editor with extensive plugin ecosystem",
      category: "Editor",
      icon: Code2,
      link: "https://code.visualstudio.com/"
    },
    {
      name: "Postman",
      description: "API development and testing platform",
      category: "API Testing",
      icon: Globe,
      link: "https://www.postman.com/"
    },
    {
      name: "Docker",
      description: "Containerization platform for consistent deployments",
      category: "DevOps",
      icon: Settings,
      link: "https://www.docker.com/"
    },
    {
      name: "Git & GitHub",
      description: "Version control and collaborative development",
      category: "Version Control",
      icon: Terminal,
      link: "https://github.com/"
    }
  ],
  design: [
    {
      name: "Figma",
      description: "Collaborative interface design and prototyping",
      category: "UI/UX Design",
      icon: Palette,
      link: "https://www.figma.com/"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid styling",
      category: "CSS Framework",
      icon: Palette,
      link: "https://tailwindcss.com/"
    },
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React",
      category: "Animation",
      icon: Zap,
      link: "https://www.framer.com/motion/"
    }
  ],
  databases: [
    {
      name: "MongoDB",
      description: "NoSQL document database for modern applications",
      category: "NoSQL Database",
      icon: Database,
      link: "https://www.mongodb.com/"
    },
    {
      name: "PostgreSQL",
      description: "Advanced open-source relational database",
      category: "SQL Database",
      icon: Database,
      link: "https://www.postgresql.org/"
    },
    {
      name: "Redis",
      description: "In-memory data structure store for caching",
      category: "Cache",
      icon: Database,
      link: "https://redis.io/"
    }
  ],
  learning: [
    {
      name: "MDN Web Docs",
      description: "Comprehensive web development documentation",
      category: "Documentation",
      icon: BookOpen,
      link: "https://developer.mozilla.org/"
    },
    {
      name: "React Documentation",
      description: "Official React library documentation and guides",
      category: "Framework Docs",
      icon: BookOpen,
      link: "https://react.dev/"
    },
    {
      name: "Next.js Documentation",
      description: "The React Framework for production applications",
      category: "Framework Docs",
      icon: BookOpen,
      link: "https://nextjs.org/docs"
    },
    {
      name: "TypeScript Handbook",
      description: "Complete guide to TypeScript programming",
      category: "Language Guide",
      icon: BookOpen,
      link: "https://www.typescriptlang.org/docs/"
    }
  ],
  productivity: [
    {
      name: "Notion",
      description: "All-in-one workspace for notes and project management",
      category: "Productivity",
      icon: Monitor,
      link: "https://www.notion.so/"
    },
    {
      name: "Slack",
      description: "Team communication and collaboration platform",
      category: "Communication",
      icon: Monitor,
      link: "https://slack.com/"
    },
    {
      name: "Trello",
      description: "Visual project management with Kanban boards",
      category: "Project Management",
      icon: Monitor,
      link: "https://trello.com/"
    }
  ]
};

export default function ToolsResourcesPage() {
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
            Tools & <span className="text-blue-600 dark:text-blue-400">Resources</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
            A curated collection of development tools, frameworks, and resources that I use to build modern applications and stay productive.
          </p>
        </motion.div>

        {/* Tools Sections */}
        <div className="space-y-12">
          {/* Development Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Code2 className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Development Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsAndResources.development.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </motion.section>

          {/* Design Tools */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Palette className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
              Design & UI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsAndResources.design.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </motion.section>

          {/* Databases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
              Databases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsAndResources.databases.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </motion.section>

          {/* Learning Resources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
              Learning Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsAndResources.learning.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </motion.section>

          {/* Productivity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Monitor className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
              Productivity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsAndResources.productivity.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: any }) {
  const IconComponent = tool.icon;
  
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
              <div>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {tool.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-600 dark:text-slate-400 mb-4">
            {tool.description}
          </CardDescription>
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            Visit Website
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}
