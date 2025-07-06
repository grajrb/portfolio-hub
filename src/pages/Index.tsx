import React from 'react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';
import BlogList from './blog/BlogList';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <BlogList />
    </Layout>
  );
};

export default Index;
