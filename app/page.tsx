'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Globe, Share2 } from 'lucide-react';

const testimonials = [
  {
    quote: "Tyde has transformed how we collaborate on marine research. The platform's ability to connect scientists globally has accelerated our research on coral reef conservation significantly.",
    name: "Dr. Sarah Pani",
    title: "Marine Biologist, Pacific Research Institute",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote: "As an early-career researcher, Tyde has been invaluable in connecting me with mentors and collaborators. The data sharing features are particularly impressive.",
    name: "Wade R.",
    title: "PhD Candidate, Ocean Sciences",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote: "Tyde's platform has revolutionized our approach to oceanographic data analysis. The collaborative tools have significantly enhanced our research efficiency.",
    name: "Dr. Elena Morales",
    title: "Oceanographer, Global Marine Institute",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const features = [
  {
    title: "Social Platform",
    description: "Connect with leading experts through our intuitive social platform designed specifically for marine research.",
    icon: Users,
  },
  {
    title: "Global Community",
    description: "Join a worldwide network of marine biologists, researchers, and conservationists making real impact.",
    icon: Globe,
  },
  {
    title: "Collaborate",
    description: "Seamlessly share data, findings, and insights with researchers worldwide to amplify your research impact.",
    icon: Share2,
  },
];

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden py-10 md:py-20 px-4 text-center">
        <div className="floating-bubbles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={{
                width: `${Math.random() * 120 + 40}px`,
                height: `${Math.random() * 120 + 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in">
            Dive into The Ocean with <span className="text-gradient">Tyde</span>
          </h1>
          <p className="max-w-xl mb-6 text-base sm:text-lg text-muted-foreground animate-slide-up">
            Join the world&apos;s leading platform for marine research collaboration. Connect with scientists, share discoveries, and
            contribute to ocean conservation efforts.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="btn-primary w-full sm:w-auto">Sign Up</Button>
            <Button variant="secondary" size="lg" className="btn-secondary w-full sm:w-auto">Login</Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-secondary-foreground text-center">Explore What Makes Tyde Special</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background border-none card-hover">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/20 p-2 mb-2">
                    <feature.icon className="w-full h-full text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background text-foreground overflow-hidden px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center">Trusted by Leading Researchers</h2>
          <div className="flex justify-center mt-4">
            <div className="flex-shrink-0 w-full max-w-lg">
              <Card className="bg-secondary border-none card-hover">
                <CardContent className="p-4 sm:p-8">
                  <p className="mb-4 text-base italic">&ldquo;{testimonials[activeTestimonial].quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="border-2 border-primary">
                      <AvatarImage src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonials[activeTestimonial].name}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[activeTestimonial].title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="testimonial-navigation flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${index === activeTestimonial ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 bg-background text-foreground text-center">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Team ProjectBeta. All rights reserved.</p>
      </footer>
    </div>
  );
}
