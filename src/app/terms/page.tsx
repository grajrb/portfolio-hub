'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Scale, AlertCircle, Mail, Phone, ExternalLink } from 'lucide-react';

export default function TermsOfServicePage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div 
        className="container mx-auto px-4 py-12 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Scale className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms and conditions carefully before using my portfolio website.
          </p>
        </div>

        <div className="space-y-8">
          {/* Last Updated */}
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> December 30, 2024
              </p>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to Gaurav Raj's Portfolio website ("Website", "Service"). These Terms of Service ("Terms") 
                govern your use of my portfolio website located at grajrb.github.io/portfolio-hub operated by 
                Gaurav Raj ("I", "me", "my").
              </p>
              <p>
                By accessing or using my Service, you agree to be bound by these Terms. If you disagree with 
                any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm">
                  <strong>Note:</strong> These terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Description of Service */}
          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This portfolio website provides:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Professional Portfolio:</strong> Showcasing my work, skills, and experience as a Full-Stack Developer</li>
                <li><strong>Blog Content:</strong> Technical articles, tutorials, and insights about web development</li>
                <li><strong>Contact Services:</strong> Ways to reach out for professional inquiries</li>
                <li><strong>Newsletter Subscription:</strong> Updates about new content and professional developments</li>
                <li><strong>Resume Assistant:</strong> AI-powered resume optimization tool</li>
                <li><strong>Project Showcases:</strong> Information about my completed projects and achievements</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>By using this website, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the Service for lawful purposes only</li>
                <li>Provide accurate and truthful information when using forms or services</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to gain unauthorized access to any part of the Service</li>
                <li>Not use the Service to transmit harmful, offensive, or illegal content</li>
                <li>Not interfere with or disrupt the Service or servers</li>
                <li>Comply with all applicable local, state, national, and international laws</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property Rights */}
          <Card>
            <CardHeader>
              <CardTitle>4. Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">My Content</h3>
                <p className="text-muted-foreground mb-4">
                  The Service and its original content, features, and functionality are and will remain the 
                  exclusive property of Gaurav Raj. The Service is protected by copyright, trademark, and 
                  other laws.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Open Source Components</h3>
                <p className="text-muted-foreground mb-4">
                  This website uses various open-source libraries and components. Each retains its original license:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>Next.js - MIT License</li>
                  <li>React - MIT License</li>
                  <li>Tailwind CSS - MIT License</li>
                  <li>Framer Motion - MIT License</li>
                  <li>Lucide Icons - ISC License</li>
                  <li>shadcn/ui - MIT License</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Portfolio Code</h3>
                <p className="text-muted-foreground">
                  The source code of this portfolio is available on 
                  <a href="https://github.com/grajrb/portfolio-hub" className="text-blue-600 hover:underline mx-1" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  under the MIT License. You're free to learn from it, but please don't copy the content directly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle>5. Privacy and Data Collection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your privacy is important to me. Please review my Privacy Policy, which also governs your use of the Service, 
                to understand my practices.
              </p>
              <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm">
                  <strong>Data Collection:</strong> I collect minimal data necessary for the website's functionality. 
                  See the <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link> for details.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                6. Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                I exclude all representations, warranties, and conditions relating to this website and the use of this website.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
                <li>I do not warrant that the Service will be uninterrupted, secure, or error-free</li>
                <li>Professional advice should be obtained before acting on any information provided</li>
                <li>External links are provided for convenience and I'm not responsible for their content</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In no event shall Gaurav Raj, nor his directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use 
                of the Service.
              </p>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm">
                  <strong>Maximum Liability:</strong> In jurisdictions that do not allow the exclusion of certain warranties, 
                  liability shall be limited to the greatest extent permitted by law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact and Communication */}
          <Card>
            <CardHeader>
              <CardTitle>8. Contact and Professional Inquiries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                When you contact me through this website for professional inquiries:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>I will respond to legitimate business inquiries in a timely manner</li>
                <li>Information shared will be kept confidential as appropriate</li>
                <li>No formal business relationship is established until agreed upon in writing</li>
                <li>I reserve the right not to respond to inappropriate or spam messages</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle>9. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This website may contain links to third-party services:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    External Links
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>GitHub repositories</li>
                    <li>LinkedIn profile</li>
                    <li>Live project demos</li>
                    <li>Documentation links</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Analytics & Performance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Vercel Analytics</li>
                    <li>Performance monitoring</li>
                    <li>Error tracking</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                I'm not responsible for the content, privacy policies, or practices of third-party services.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>10. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                I reserve the right, at my sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, I will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-muted-foreground">
                What constitutes a material change will be determined at my sole discretion. By continuing to access 
                or use my Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>11. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                These Terms shall be interpreted and governed by the laws of India, without regard to its conflict 
                of law provisions. Our failure to enforce any right or provision of these Terms will not be considered 
                a waiver of those rights.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                12. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about these Terms of Service, please contact me:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href="mailto:gauravupadhayay9801@gmail.com" className="text-blue-600 hover:underline">
                    gauravupadhayay9801@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+91-7992425448</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p><strong>Business Address:</strong></p>
                <p>Coimbatore, Tamil Nadu, India</p>
              </div>
            </CardContent>
          </Card>

          {/* Severability */}
          <Card>
            <CardHeader>
              <CardTitle>13. Severability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be 
                changed and interpreted to accomplish the objectives of such provision to the greatest extent possible 
                under applicable law and the remaining provisions will continue in full force and effect.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy">
              <Button variant="outline">Privacy Policy</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Me</Button>
            </Link>
            <Link href="/">
              <Button>Back to Portfolio</Button>
            </Link>
          </div>
          
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Professional Notice:</strong> This is a personal portfolio website for showcasing professional work and skills. 
              For business inquiries, project collaborations, or employment opportunities, please use the contact form or reach out directly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
