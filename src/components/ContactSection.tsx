import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';

export const ContactSection = () => {
  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Log the form data to verify it's correct
    console.log('Form data being sent:', formData);    // Using @emailjs/browser with explicit send method and different parameter names
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        {
          // Try with different variations of parameter names
          name: formData.from_name,
          email: formData.from_email,
          from_name: formData.from_name,
          from_email: formData.from_email,
          // Also include the original field names
          subject: formData.subject,
          message: formData.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ).then((result) => {
        console.log('Success:', result.text);
        console.log('Email sent with parameters:', {
          name: formData.from_name,
          email: formData.from_email,
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message
        });
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Error:', error.text);
        toast({
          title: "Error sending message",
          description: "Please try again later.",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">          <h2 className="section-title">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Interested in discussing opportunities or collaborating on projects? Feel free to reach out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 reveal-on-scroll">
            <Card className="border border-border/60">
              <CardContent className="p-6">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hidden fields with alternative names */}
                    <input type="hidden" name="name" value={formData.from_name} />
                    <input type="hidden" name="email" value={formData.from_email} />
                    
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>                      <Input
                        id="name"
                        name="from_name"
                        placeholder="John Doe"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className="bg-background/50"
                        // Add data attribute for debugging
                        data-name="from_name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>                      <Input
                        id="email"
                        name="from_email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.from_email}
                        onChange={handleChange}
                        required
                        className="bg-background/50"
                        // Add data attribute for debugging
                        data-name="from_email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] bg-background/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full button-hover-effect" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={18} className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
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
                    <div>                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-muted-foreground">Coimbatore, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>

                {/* Follow Me Section */}
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Follow Me</h4>                  <div className="flex space-x-3">
                    <a
                      href="https://github.com/grajrb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <Github size={16} className="mr-1" />
                      GitHub
                    </a>                    <a
                      href="https://www.linkedin.com/in/gaurav-raj1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <Linkedin size={16} className="mr-1" />
                      LinkedIn
                    </a>
                    <a
                      href="https://leetcode.com/graj_rb/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover-effect inline-flex items-center justify-center px-4 py-2 border border-border/60 rounded text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                        <path d="m14.5 15 3 3 3-3"/>
                      </svg>
                      LeetCode
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
