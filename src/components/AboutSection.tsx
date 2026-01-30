import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { LeetCodeIcon } from '@/components/icons/leetcode-icon';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-light-bg dark:bg-dark-bg reveal-on-scroll" aria-label="About Me">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* About Me Section */}
          <div>
            <h2 className="section-title font-display text-3xl md:text-4xl font-extrabold mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground mb-6">
              Results-driven Full-Stack Developer with 2.3 years of experience architecting and deploying scalable, cloud-native applications. Expert in MERN stack, microservices architecture, and DevOps practices.
            </p>
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                I am a skilled full-stack developer with 2.3 years of professional experience in designing, developing, and deploying scalable applications. I specialize in JavaScript/TypeScript, Node.js, and React.js, with expertise in PostgreSQL, MongoDB, and cloud-native technologies.
              </p>
              <p>
                My professional achievements include delivering €870K in operational savings, achieving 26% user adoption rates in enterprise environments, and reducing deployment times by 80% through CI/CD pipeline implementation. I have hands-on experience with Docker, Jenkins, AWS, Azure, and microservices architecture.
              </p>
              <p>
                I am a 3-star CodeChef coder with Global Rank 91 in competitive programming. I continuously improve my skills and stay updated with emerging technologies in full-stack development and system design.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                className="button button-hover-effect group"
                href="https://drive.google.com/file/d/1Wr0rt4ivdyNs-WSEbeEwhiDoyLc6RL1k/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume"
              >
                <FileText size={18} className="mr-2" /> View Resume
              </a>
              <a
                className="button button-outline button-hover-effect"
                href="https://github.com/grajrb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} className="mr-2" /> GitHub
              </a>
              <a
                className="button button-outline button-hover-effect"
                href="https://www.linkedin.com/in/gaurav-raj1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="mr-2" /> LinkedIn
              </a>
              <a
                className="button button-outline button-hover-effect"
                href="https://leetcode.com/u/gauravraj_9/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
              >
                <LeetCodeIcon size={18} className="mr-2" /> LeetCode
              </a>
              <Button variant="outline" asChild>
                <a
                  className="button button-outline button-hover-effect"
                  href="mailto:gauravupadhayay9801@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <Mail size={18} className="mr-2" /> Email
                </a>
              </Button>
            </div>
          </div>
          {/* Experience Section */}
          <div className="reveal-on-scroll delay-200">
            <h3 className="font-display text-2xl font-bold mb-6">Experience</h3>
            <div className="space-y-8">
              {/* Software Engineer */}
              <div className="relative pl-8 border-l border-border/60">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2">
                  <h4 className="font-semibold">Software Engineer</h4>
                  <p className="text-sm text-muted-foreground">Bosch Global Software Technologies • January 2024 – Present</p>
                </div>
                <p className="text-muted-foreground">Coimbatore, Tamil Nadu</p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Architected and developed full-stack automation tools using React.js frontend and Node.js microservices, reducing manual effort by 20%.</li>
                  <li>Designed and implemented responsive Employee portal with React.js, significantly improving user engagement.</li>
                  <li>Led VS Code migration strategy as Product Owner, achieving 26% adoption rate and realizing €870K in operational savings.</li>
                  <li>Enhanced data-layer performance by optimizing PostgreSQL queries and Redis caching, achieving 25% faster API responses.</li>
                  <li>Implemented and managed CI/CD pipelines using Jenkins and Docker on Azure, reducing deployment time by 80%.</li>
                </ul>
              </div>
              {/* Full Stack Developer (Intern) */}
              <div className="relative pl-8 border-l border-border/60">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2">
                  <h4 className="font-semibold">Full Stack Developer (Intern)</h4>
                  <p className="text-sm text-muted-foreground">HighRadius Technologies • January 2022 – April 2022</p>
                </div>
                <p className="text-muted-foreground">Bhubaneswar, India</p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Engineered scalable, secure RESTful APIs for B2B fintech platform using Node.js/Express.js, achieving 25% faster response times.</li>
                  <li>Implemented robust Role-Based Access Control (RBAC) system for 5 distinct user roles using JavaScript/Bootstrap, ensuring stringent access control.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};