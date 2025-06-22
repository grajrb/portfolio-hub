import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Github, Mail, Phone, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'Event Booking System',
    description: 'A modern full-stack app for browsing, booking, and managing events with real-time updates and admin features.',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/grajrb/EventBookingSystem',
  },
  {
    id: 2,
    title: 'CryptoChatSphere',
    description: 'A modern decentralized messaging application that combines traditional chat functionality with Web3 capabilities, allowing users to connect their crypto wallets.',
    tags: ['TypeScript', 'React', 'Web3', 'Blockchain'],
    githubUrl: 'https://github.com/grajrb/crypto-chat-sphere',
  },
  {
    id: 3,
    title: 'EzCommerce',
    description: 'A full-stack e-commerce platform built with the MERN stack featuring user authentication, product management, shopping cart, and order processing.',
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/grajrb/EzCommerce',
  },  {
    id: 4,
    title: 'ProSyncHub',
    description: 'A collaborative project management tool with real-time synchronization and team collaboration features.',
    tags: ['TypeScript', 'React', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/grajrb/ProSyncHub',
  },
  {
    id: 5,
    title: 'SecureAuthHub',
    description: 'A comprehensive authentication system with multi-factor authentication, OAuth integration, and advanced security features.',
    tags: ['TypeScript', 'React', 'Node.js', 'Security'],
    githubUrl: 'https://github.com/grajrb/SecureAuthHub',
  },
  {
    id: 7,
    title: 'NewsContextGPT',
    description: 'An AI-powered news analysis tool that provides context and insights for current news articles.',
    tags: ['TypeScript', 'React', 'OpenAI', 'News API'],
    githubUrl: 'https://github.com/grajrb/NewsContextGPT',
  },
  {
    id: 8,
    title: 'Task Management with Blockchain Rewards',
    description: 'Manage your tasks efficiently and earn token rewards for your productivity. Combines task management with blockchain incentives.',
    tags: ['TypeScript', 'React', 'Blockchain', 'Smart Contracts'],
    githubUrl: 'https://github.com/grajrb/Task-Management',
  },
];

export const ProjectsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary/50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">          <h2 className="section-title">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A showcase of my development work, featuring full-stack applications, web3 technologies, and AI integrations.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "reveal-on-scroll",
                index % 3 === 1 ? "delay-100" : index % 3 === 2 ? "delay-200" : ""
              )}
            >
              <Card
                className={cn(
                  "overflow-hidden h-full transition-all duration-300 bg-card hover:shadow-lg border border-border/60",
                  hoveredCard === project.id ? "shadow-lg" : ""
                )}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <CardTitle className="font-display text-xl font-bold">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium py-1 px-2 bg-secondary rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <a
                    className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded text-sm font-medium hover:shadow-lg transition-all duration-300"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-1" />
                    Code
                  </a>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>        <div className="mt-12 text-center reveal-on-scroll">
          <a
            className="button-hover-effect inline-flex items-center justify-center px-6 py-3 border border-border/60 rounded text-lg font-medium hover:shadow-lg transition-all duration-300"
            href="https://github.com/grajrb?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} className="mr-2" />
            View More Projects
          </a>
        </div>

        <div className="reveal-on-scroll delay-200">
          <Card className="h-full border border-border/60">
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">gauravupadhayay9801@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">+91 7992425448</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Coimbatore</h4>
                    <p className="text-muted-foreground">Coimbatore, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              {/* Follow Me Section */}
              <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/grajrb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Github size={16} className="mr-1" />
                    GitHub
                  </a>                  <a
                    href="https://www.linkedin.com/in/gaurav-raj1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Linkedin size={16} className="mr-1" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
