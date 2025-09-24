'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Database, 
  Server, 
  Smartphone, 
  Cloud, 
  Brain, 
  Wrench, 
  GitBranch 
} from 'lucide-react';

const skillCategories = {
  frontend: {
    icon: Code2,
    title: 'Frontend Development',
    color: 'text-blue-500',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Three.js', level: 75 },
    ],
  },
  backend: {
    icon: Server,
    title: 'Backend Development',
    color: 'text-green-500',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 80 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  cloud: {
    icon: Cloud,
    title: 'Cloud & DevOps',
    color: 'text-purple-500',
    skills: [
      { name: 'AWS', level: 83 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 80 },
      { name: 'Terraform', level: 70 },
    ],
  },
  ai: {
    icon: Brain,
    title: 'AI & Machine Learning',
    color: 'text-orange-500',
    skills: [
      { name: 'OpenAI API', level: 88 },
      { name: 'Langchain', level: 82 },
      { name: 'TensorFlow', level: 75 },
      { name: 'Hugging Face', level: 78 },
      { name: 'Vector Databases', level: 80 },
    ],
  },
};

const tools = [
  'VS Code',
  'Git',
  'Figma',
  'Postman',
  'Vercel',
  'Netlify',
  'Prisma',
  'Supabase',
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('frontend');

  return (
  <section id="skills" className="py-20 bg-gradient-to-b from-secondary/10 to-background scroll-mt-32 md:scroll-mt-40 safe-scroll-offset">
      <motion.div 
        ref={ref}
        className="container max-w-6xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Skills & Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Technical
            <span className="text-primary"> Skills </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit spanning modern web technologies, cloud platforms, 
            and AI integration to build cutting-edge solutions.
          </p>
        </motion.div>

        {/* Skills Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-secondary/50">
              {Object.entries(skillCategories).map(([key, category]) => (
                <TabsTrigger 
                  key={key}
                  value={key}
                  className="flex items-center space-x-2 data-[state=active]:bg-primary/10"
                >
                  <category.icon size={16} className={category.color} />
                  <span>{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(skillCategories).map(([key, category]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <category.icon className={`${category.color}`} size={24} />
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView && activeTab === key 
                              ? { opacity: 1, x: 0 } 
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="relative">
                            <Progress 
                              value={isInView && activeTab === key ? skill.level : 0} 
                              className="h-2"
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full opacity-20"
                              initial={{ width: 0 }}
                              animate={
                                isInView && activeTab === key 
                                  ? { width: `${skill.level}%` } 
                                  : { width: 0 }
                              }
                              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Tools & Platforms
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={
                  isInView 
                    ? { opacity: 1, scale: 1, y: 0 } 
                    : { opacity: 0, scale: 0.8, y: 20 }
                }
                transition={{ 
                  delay: 0.6 + index * 0.05, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="cursor-default"
              >
                <Badge 
                  variant="secondary" 
                  className="text-base py-2 px-6 bg-gradient-to-r from-secondary to-secondary/80 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 border border-border hover:border-primary/20"
                >
                  {tool}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">
            Continuous Learning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'AWS Solutions Architect',
                platform: 'Amazon Web Services',
                status: 'In Progress',
                color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
              },
              {
                title: 'Advanced React Patterns',
                platform: 'Udemy',
                status: 'Completed',
                color: 'bg-green-500/10 text-green-500 border-green-500/20',
              },{
                title: 'Machine Learning with Python',
                platform: 'Coursera',
                status: 'Completed',
                color: 'bg-green-500/10 text-green-500 border-green-500/20',
              }
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView 
                    ? { opacity: 1, y: 0 } 
                    : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Card className="border-2 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold mb-2">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{cert.platform}</p>
                    <Badge className={cert.color}>
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
