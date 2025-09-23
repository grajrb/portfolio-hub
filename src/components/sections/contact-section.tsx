'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Coffee,
  MessageCircle,
  CheckCircle,
  Loader2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  // honeypot field (should remain empty)
  company: z.string().max(0).optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

// Environment variable guards (NEXT_PUBLIC_*)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'gauravupadhayay9801@gmail.com',
    href: 'mailto:gauravupadhayay9801@gmail.com',
    color: 'text-blue-500',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-7992425448',
    href: 'tel:+917992425448',
    color: 'text-green-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Coimbatore, Tamil Nadu, India',
    href: '#',
    color: 'text-purple-500',
  },
];

const services = [
  'Full-Stack Web Development',
  'AI Integration & Development',
  'Mobile App Development',
  'Cloud Architecture & DevOps',
  'Technical Consulting',
  'Code Review & Optimization',
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(async (data: FormData) => {
    // Basic honeypot check
    if (data.company) {
      return; // silently drop bot submission
    }

    setIsSubmitting(true);
    const start = performance.now();
    let emailSent = false;
    let apiStored = false;
    let emailError: unknown = null;
    let apiError: unknown = null;

    try {
      // Fire both operations (EmailJS + API persistence) sequentially but independently to ensure reliability
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: data.name,
              reply_to: data.email,
              subject: data.subject,
              message: data.message,
              budget: data.budget || 'N/A',
              timeline: data.timeline || 'N/A'
            },
            EMAILJS_PUBLIC_KEY
          );
          emailSent = true;
        } catch (err) {
          emailError = err;
          console.error('EmailJS send failed', err);
        }
      } else {
        console.warn('EmailJS env vars missing: skipping direct email send');
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            budget: data.budget,
            timeline: data.timeline,
          }),
        });
        if (response.ok) {
          apiStored = true;
        } else {
          const status = response.status;
            apiError = await response.json().catch(() => ({}));
            toast({
              title: 'Contact API issue',
              description: `Failed storing message (status ${status}). ${status === 404 ? 'Endpoint not found in deployed build.' : 'Will retry later.'}`,
              variant: 'destructive'
            });
        }
      } catch (err) {
        apiError = err;
        console.error('Contact API store failed', err);
        toast({
          title: 'Network error',
          description: 'Could not reach contact endpoint. Check deployment /api/contact route.',
          variant: 'destructive'
        });
      }

      const duration = Math.round(performance.now() - start);

      if (emailSent) {
        toast({
          title: 'Message sent successfully!',
          description: `Thanks for reaching out. I'll get back to you soon. (${duration}ms)`
        });
        reset();
      } else if (apiStored) {
        toast({
          title: 'Message stored',
          description: 'Your message was saved but email notification failed. I will still review it shortly.'
        });
        reset();
      } else {
        throw new Error('Both email and storage failed');
      }
    } catch (err) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again or contact me directly via email.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [toast, reset]);

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <motion.div 
        ref={ref}
        className="container max-w-6xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let's Build Something
            <span className="text-primary"> Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to turn your ideas into reality? I'm here to help you create 
            exceptional digital experiences that make a lasting impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="text-primary" size={24} />
                  <span>Send a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Your full name"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="What's this about?"
                      className={errors.subject ? 'border-destructive' : ''}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Honeypot field - hidden from real users */}
                  <div className="hidden">
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" autoComplete="off" tabIndex={-1} {...register('company')} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <select
                        id="budget"
                        {...register('budget')}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under ₹5,000</option>
                        <option value="5k-15k">₹5,000 - ₹15,000</option>
                        <option value="15k-30k">₹15,000 - ₹30,000</option>
                        <option value="30k-plus">₹30,000+</option>
                        <option value="discuss">Let's discuss</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline (Optional)</Label>
                      <select
                        id="timeline"
                        {...register('timeline')}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="3-plus-months">3+ months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                      rows={6}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {!EMAILJS_SERVICE_ID && (
                      <div className="flex items-start gap-2 rounded border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-700 dark:text-amber-300">
                        <AlertTriangle className="h-4 w-4 mt-0.5" />
                        <span>Email sending not configured (missing env vars). Message will still be stored.</span>
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Protected by basic anti-spam measures.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`p-2 rounded-full bg-secondary ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coffee className="text-primary" size={20} />
                  <span>What I Can Help With</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="text-primary" size={20} />
                  <span className="font-semibold">Current Availability</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm currently accepting new projects for Q4 2025. 
                  Let's discuss your timeline and requirements.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Available for new projects
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
