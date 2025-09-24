'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Rocket, Users, Trophy } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const stats = [
  { icon: Code2, label: 'Projects Completed', value: '15+', color: 'text-blue-500' },
  { icon: Rocket, label: 'Technologies Mastered', value: '20+', color: 'text-green-500' },
  { icon: Users, label: 'Team Collaborations', value: '5+', color: 'text-purple-500' },
  { icon: Trophy, label: 'Years Experience', value: '2', color: 'text-orange-500' },
];

const skills = [
  'React.js & Next.js',
  'TypeScript & JavaScript',
  'Node.js & Express.js',
  'PostgreSQL & MongoDB',
  'AWS & Azure',
  'Docker & Kubernetes',
  'CI/CD & DevOps',
  'System Design',
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
  <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/10 scroll-mt-32 md:scroll-mt-40 safe-scroll-offset">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container max-w-6xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Crafting Digital
            <span className="text-primary"> Experiences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a results-driven full-stack developer with 2 years of experience architecting 
            scalable, cloud-native applications and leading technical innovations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                With 2 years of experience in full-stack development at Bosch Global Software Technologies, 
                I specialize in building automation tools and employee portals using React.js and Node.js microservices. 
                As a Product Owner, I successfully led the VS Code migration strategy, achieving a 26% adoption rate 
                and realizing €870K in operational savings.
              </motion.p>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                I excel in optimizing system performance through PostgreSQL query optimization and Redis caching, 
                achieving 25% faster API responses. My expertise spans the entire development lifecycle, from CI/CD 
                pipeline implementation with Jenkins and Docker on Azure to building secure RBAC systems for B2B fintech platforms.
              </motion.p>

              {/* Skills */}
              <motion.div variants={itemVariants} className="pt-4">
                <h3 className="text-xl font-semibold mb-4">Core Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-sm py-2 px-4 hover:bg-primary/10 transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="cursor-default"
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 w-fit ${stat.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon size={24} />
                      </motion.div>
                      <motion.div
                        className="text-3xl font-bold text-primary mb-2"
                        initial={{ scale: 1 }}
                        whileInView={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline/Journey Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">My Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-purple-500 opacity-20"></div>
            
            {[
              {
                year: '2021',
                title: 'Started Programming Journey',
                description: 'Began learning web development with HTML, CSS, and JavaScript',
              },
              {
                year: '2022',
                title: 'Full-Stack Development',
                description: 'Mastered React, Node.js, and database technologies',
              },
              {
                year: '2023',
                title: 'Professional Experience',
                description: 'Started working on client projects and building scalable applications',
              },
              {
                year: '2024',
                title: 'AI Integration Expert',
                description: 'Specialized in AI/ML integration and modern cloud architecture',
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ delay: 1 + index * 0.2 }}
                className={`relative mb-8 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 ml-auto'} max-w-md`}
              >
                <div className={`absolute top-4 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg`}></div>
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
