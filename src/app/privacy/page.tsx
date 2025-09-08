'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to me. This policy explains how I collect, use, and protect your information.
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
                <Eye className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to Gaurav Raj's Portfolio (grajrb.github.io/portfolio-hub). I respect your privacy and am committed 
                to protecting your personal data. This privacy policy will inform you about how I look after your personal 
                data when you visit my website and tell you about your privacy rights.
              </p>
              <p>
                This website is a personal portfolio showcasing my work, skills, and experience as a Full-Stack Developer. 
                I collect minimal personal information and only what is necessary to provide you with the best experience.
              </p>
            </CardContent>
          </Card>

          {/* Information I Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Information I Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Information You Provide Directly</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Contact Form:</strong> Name, email address, and message when you use the contact form</li>
                  <li><strong>Newsletter Subscription:</strong> Email address and optional name when you subscribe to updates</li>
                  <li><strong>Resume Assistant:</strong> Any information you provide when using the AI resume assistant feature</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Information Collected Automatically</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Usage Analytics:</strong> Page views, time spent on pages, and general usage patterns (via Google Analytics/Vercel Analytics)</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, device information, and referring URLs</li>
                  <li><strong>Performance Data:</strong> Page load times and user interactions for website optimization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How I Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                How I Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>I use the information I collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Communication:</strong> To respond to your inquiries and messages sent through the contact form</li>
                <li><strong>Newsletter:</strong> To send you updates about new blog posts, projects, and professional updates (only if you subscribe)</li>
                <li><strong>Website Improvement:</strong> To analyze usage patterns and improve the website's functionality and user experience</li>
                <li><strong>Resume Assistant:</strong> To provide AI-powered resume optimization suggestions</li>
                <li><strong>Security:</strong> To protect against spam, abuse, and other harmful activities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Storage and Security */}
          <Card>
            <CardHeader>
              <CardTitle>Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Where Your Data is Stored</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Vercel:</strong> Website hosting and form submissions</li>
                  <li><strong>MongoDB Atlas:</strong> Newsletter subscriptions and contact form data</li>
                  <li><strong>GitHub:</strong> Website code and public information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>All data transmission is encrypted using HTTPS/SSL</li>
                  <li>Database access is secured with authentication and encryption</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Minimal data collection principle - only what's necessary</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This website uses the following third-party services:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Vercel Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    For website performance monitoring and basic usage analytics. 
                    <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">GitHub Pages</h4>
                  <p className="text-sm text-muted-foreground">
                    For website hosting and deployment. 
                    <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restrict Processing:</strong> Request limitation of how your data is processed</li>
                <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Object:</strong> Object to processing of your personal data</li>
                <li><strong>Unsubscribe:</strong> Opt out of marketing communications at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Local Storage */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Local Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This website uses minimal cookies and local storage:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> To understand how you use the website (anonymous)</li>
                <li><strong>Preference Storage:</strong> To remember your theme preference (dark/light mode)</li>
                <li><strong>Form Data:</strong> Temporary storage of form inputs to improve user experience</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. Disabling cookies may affect some website functionality.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Contact Form Data:</strong> Retained for 2 years or until deletion is requested</li>
                <li><strong>Newsletter Subscriptions:</strong> Until you unsubscribe</li>
                <li><strong>Analytics Data:</strong> Aggregated and anonymized data retained for performance analysis</li>
                <li><strong>Resume Assistant Data:</strong> Not permanently stored; processed in real-time only</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Me About Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about this privacy policy or want to exercise your rights, please contact me:
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
              <p className="text-sm text-muted-foreground">
                I will respond to your privacy-related requests within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Updates to This Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                I may update this privacy policy from time to time. Any changes will be posted on this page with 
                an updated "Last Updated" date. I encourage you to review this policy periodically to stay informed 
                about how I protect your information.
              </p>
              <p className="text-sm text-muted-foreground">
                For significant changes, I will provide notice through the website or via email if you're subscribed to my newsletter.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms">
              <Button variant="outline">Terms of Service</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Me</Button>
            </Link>
            <Link href="/">
              <Button>Back to Portfolio</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
