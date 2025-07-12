import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  Shield,
  Bot,
  Zap,
  Lock,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Layout/Navbar';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Shield,
      title: 'Advanced Vulnerability Detection',
      description: 'AI-powered scanning and detection of security vulnerabilities across your entire infrastructure.',
    },
    {
      icon: Bot,
      title: 'Intelligent AI Assistant',
      description: 'Conversational AI that helps you understand, prioritize, and remediate security issues.',
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Streamlined project management with automated vulnerability tracking and resolution.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and compliance standards.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless collaboration tools for security teams and stakeholders.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Comprehensive reporting and analytics to track security posture improvements.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CISO at TechCorp',
      content: 'SHERPA has revolutionized our vulnerability management process. The AI insights are incredibly accurate.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Security Engineer at DataFlow',
      content: 'The conversational AI feature makes complex security analysis accessible to our entire team.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'DevSecOps Lead at CloudTech',
      content: 'Outstanding platform! The automated workflows have reduced our response time by 70%.',
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>SHERPA - AI-Powered Vulnerability Management Platform</title>
        <meta name="description" content="Revolutionary AI-powered vulnerability management tool with intelligent project workflows and conversational AI assistance." />
      </Helmet>

      <div className={cn("min-h-screen", theme === 'light' ? 'gradient-bg-light' : 'gradient-bg-dark')}>
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Security Platform</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Meet SHERPA
                </h1>
                
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
                  The next-generation AI vulnerability management platform that transforms how you detect, analyze, and remediate security threats.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Link to="/login">
                  <Button size="lg" className="text-lg px-8 py-4 pulse-glow">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Watch Demo
                </Button>
              </motion.div>

              {/* 3D Floating Elements */}
              <motion.div
                className="relative mx-auto max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="relative">
                  <img 
                    class="w-full h-auto rounded-2xl shadow-2xl floating-animation" 
                    alt="SHERPA Dashboard Preview"
                   src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
                  
                  <motion.div
                    className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                    animate={{
                      y: [0, 20, 0],
                      scale: [1, 0.9, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful Features for Modern Security
              </h2>
              <p className="text-xl max-w-3xl mx-auto">
                Discover how SHERPA's AI-driven approach revolutionizes vulnerability management
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className={cn("border-0 h-full", theme === 'dark' ? 'glass-effect' : 'bg-card')}>
                    <CardHeader>
                      <feature.icon className="h-12 w-12 text-primary mb-4" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  AI That Understands Security
                </h2>
                <p className="text-xl mb-8">
                  Our advanced AI doesn't just detect vulnerabilities—it understands context, prioritizes threats, and provides actionable insights.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Intelligent threat prioritization',
                    'Natural language vulnerability explanations',
                    'Automated remediation suggestions',
                    'Predictive risk analysis',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img   
                  class="w-full h-auto rounded-2xl shadow-2xl" 
                  alt="AI Security Analysis Interface"
                 src="https://images.unsplash.com/photo-1686061593213-98dad7c599b9" />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted by Security Leaders
              </h2>
              <p className="text-xl max-w-3xl mx-auto">
                See what industry experts are saying about SHERPA
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className={cn("border-0 h-full", theme === 'dark' ? 'glass-effect' : 'bg-card')}>
                    <CardHeader>
                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-base">
                        "{testimonial.content}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={cn("rounded-3xl p-12", theme === 'dark' ? 'glass-effect' : 'bg-card border')}
            >
              <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Security?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of security professionals who trust SHERPA to protect their organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg" className="text-lg px-8 py-4 pulse-glow">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SHERPA</span>
            </div>
            <p>
              © 2025 SHERPA AI. All rights reserved. Securing the future with intelligent vulnerability management.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;