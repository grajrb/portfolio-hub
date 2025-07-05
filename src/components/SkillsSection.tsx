import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    title: 'Frontend Technologies',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Redux', level: 80 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Backend Technologies',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 },
      { name: 'RESTful APIs', level: 85 },
      { name: 'GraphQL', level: 75 },
      { name: 'Socket.IO', level: 75 },
      { name: 'Microservices', level: 70 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'MySQL', level: 80 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Azure', level: 75 },
      { name: 'CI/CD', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Bitbucket', level: 85 },
    ],
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Kubernetes', level: 75 },
      { name: 'Jenkins', level: 80 },
      { name: 'JIRA', level: 85 },
      { name: 'Agile', level: 85 },
      { name: 'Scrum', level: 80 },
      { name: 'Test-Driven Development', level: 75 },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="section-title">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A comprehensive overview of my technical abilities, tools, and technologies I specialize in.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className={cn(
                "reveal-on-scroll",
                categoryIndex % 3 === 1 ? "delay-100" : categoryIndex % 3 === 2 ? "delay-200" : ""
              )}
            >
              <Card className="h-full border border-border/60">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold mb-6">{category.title}</h3>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%`, transitionDelay: '300ms' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 reveal-on-scroll delay-200">
          <Card className="text-center p-8 bg-secondary/50 border border-border/40">
            <h4 className="font-display text-4xl font-bold text-primary mb-2">1.7+</h4>
            <p className="text-muted-foreground text-sm">Years Experience</p>
          </Card>
          
          <Card className="text-center p-8 bg-secondary/50 border border-border/40">
            <h4 className="font-display text-4xl font-bold text-primary mb-2">10+</h4>
            <p className="text-muted-foreground text-sm">Projects Completed</p>
          </Card>
          
          <Card className="text-center p-8 bg-secondary/50 border border-border/40">
            <h4 className="font-display text-4xl font-bold text-primary mb-2">91</h4>
            <p className="text-muted-foreground text-sm">Global CodeChef Rank</p>
          </Card>
          
          <Card className="text-center p-8 bg-secondary/50 border border-border/40">
            <h4 className="font-display text-4xl font-bold text-primary mb-2">€870K</h4>
            <p className="text-muted-foreground text-sm">Savings Generated</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
