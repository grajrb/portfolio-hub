import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3 animate-fade-in">            <p className="inline-block py-1 px-3 bg-secondary text-foreground text-sm rounded-full mb-6 font-medium">
          Software Engineer
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-balance">
              <span className="text-balance">Hi, I'm</span>
              <span className="text-primary"> Gaurav Raj</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-xl text-balance">
              A full-stack developer with expertise in DevOps practices, dedicated to developing efficient software solutions and automating workflows.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* View My Work Button */}
              <Button
                size="lg"
                className="button-hover-effect"
                onClick={() => {
                  const featuredProjects = document.getElementById('projects');
                  if (featuredProjects) {
                    featuredProjects.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View My Work
              </Button>

              {/* Contact Me Button */}
              <Button
                size="lg"
                variant="outline"
                className="button-hover-effect focus:ring-2 focus:ring-blue-500"
                asChild
              >
                <a href="mailto:gauravupadhayay9801@gmail.com">
                  Contact Me
                </a>
              </Button>
            </div>
          </div>          {/* Right Content (removed video) */}
          <div className="lg:col-span-2 flex justify-center animate-slide-in-right hidden lg:block">
            <div className="w-full max-w-md">
              {/* Video removed */}
              <div className="w-full h-auto flex items-center justify-center rounded-lg bg-secondary/30 p-6 min-h-[300px]">
                <p className="text-lg text-center text-muted-foreground">
                  Building innovative solutions with modern technologies
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 md:mt-32 animate-fade-in">
          <a
            href="#about"
            className="group flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm font-medium mb-2">Scroll Down</span>
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};