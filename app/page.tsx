"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="relative min-h-screen bg-[#102a44]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="floating-bubbles">
            <div className="bubble" style={{ width: '100px', height: '100px', left: '10%', top: '20%' }}></div>
            <div className="bubble" style={{ width: '150px', height: '150px', right: '15%', top: '30%' }}></div>
            <div className="bubble" style={{ width: '80px', height: '80px', left: '20%', bottom: '30%' }}></div>
            <div className="bubble" style={{ width: '120px', height: '120px', right: '25%', bottom: '20%' }}></div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-8 text-center text-white">
          <h1 className="text-4xl font-bold">
            Dive into The Ocean with<span className="text-[#1abc9c]"> Tyde</span>
          </h1>
          <p className="text-lg">
            Join the world's leading platform for marine research collaboration. Connect with scientists, share discoveries, and
            contribute to ocean conservation efforts.
          </p>
          <div className="flex gap-4">
            <Button variant="default" size="lg">
              Sign Up
            </Button>
            <Button variant="secondary" size="lg">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="py-20 bg-[#102a44]/80">
        <div className="container mx-auto">
          <h2 className="mb-10 text-3xl font-bold text-center">Explore</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Social Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Interact with experts and others on our feed based social platform.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Global Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect with marine biologists and researchers worldwide.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Collaborate</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect and Collaborate with others to amplify your research.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="py-20 bg-[#102a44] text-white">
        <div className="container mx-auto">
          <h2 className="mb-10 text-3xl font-bold text-center">What Our Community Says</h2>
          <div className="flex flex-col gap-8 sm:flex-row">
            <Card className="flex-1">
              <CardContent>
                <p className="mb-4 text-lg font-medium">
                  "Tyde has transformed how we collaborate on marine research. The platform's ability to connect scientists globally has
                  accelerated our research on coral reef conservation significantly."
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/avatar-1.jpg" alt="Dr. Sarah Pani" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Dr. Sarah Pani</div>
                    <div className="text-sm text-muted-foreground">Marine Biologist, Pacific Research Institute</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent>
                <p className="mb-4 text-lg font-medium">
                  "As an early-career researcher, Tyde has been invaluable in connecting me with mentors and collaborators. The data
                  sharing features are particularly impressive."
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/avatar-2.jpg" alt="Wade R." />
                    <AvatarFallback>WR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Wade R.</div>
                    <div className="text-sm text-muted-foreground">PhD Candidate, Ocean Sciences</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent>
                <p className="mb-4 text-lg font-medium">
                  "The community here is exceptional. We've managed to coordinate multiple international research projects through Tyde,
                  something that would have been much more challenging before."
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/avatar-3.jpg" alt="Dr. Paige Watterson" />
                    <AvatarFallback>PW</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Dr. Paige Watterson</div>
                    <div className="text-sm text-muted-foreground">Research Director, Marine Conservation Alliance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

