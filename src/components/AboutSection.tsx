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
              Software Engineer at Bosch Global Software Technologies with expertise in full stack development and DevOps practices.
            </p>
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                I am a skilled software engineer with experience in designing, developing, and deploying full-stack applications using modern JavaScript technologies including TypeScript, Node.js, and React.js.
              </p>
              <p>
                My expertise includes developing web applications, automating workflows, and implementing DevOps practices. I have hands-on experience with Docker, CI/CD pipelines, and cloud-native technologies. I am proficient in Git, GitHub Actions, and have a strong understanding of system design principles.
              </p>
              <p>
                I am a 3-star coder on CodeChef and have achieved a rank of 91 in the CodeChef Long Challenge. I continuously improve my skills through problem-solving and technical challenges.
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
                  <li>Architected full-stack automation tools using Node.js/React.js, reducing manual effort by 20%.</li>
                  <li>Designed responsive Employee portal with React.js, improving user engagement and experience.</li>
                  <li>Led VS Code migration as Product Owner, achieving 26% adoption and €870K savings.</li>
                  <li>Facilitated Visual Studio to VS Code transition, targeting €5M annual optimization.</li>
                  <li>Enhanced PostgreSQL/Redis performance through optimization, achieving 25% faster API responses.</li>
                  <li>Implemented CI/CD pipelines with Docker, reducing deployment time by 80%.</li>
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
                  <li>Engineered RESTful APIs for B2B fintech platform using Node.js/Express.js, achieving 25% faster response times.</li>
                  <li>Implemented RBAC system for 5 user roles using JavaScript/Bootstrap, ensuring secure access control.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};