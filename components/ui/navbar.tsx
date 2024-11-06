"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
  const { user, isLoaded } = useUser();

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-foreground">Tyde.</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isLoaded && (
              user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/tinder">
                    <Button variant="ghost">Tinder</Button>
                  </Link>
                  <Link href="/marina">
                    <Button variant="ghost">Marina</Button>
                  </Link>
                  <Link href="/feed">
                    <Button variant="ghost">Feed</Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button>Sign in</Button>
                </SignInButton>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;