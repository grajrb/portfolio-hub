'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { StickyNavbar } from '@/components/layout/sticky-navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { PageTransition } from '@/components/layout/page-transition';

export default function Home() {
  return (
    <PageTransition>
      <ScrollProgress />
      <StickyNavbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
