'use client';

import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';
import { SwipeCard } from '@/components/ui/swipe-card';
import { Chat } from '@/components/ui/chat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const clerkUser = useUser();
  const user = useQuery(api.queries.getUser, { email: clerkUser.user?.emailAddresses[0].emailAddress });
  const scientists = useQuery(api.queries.getPotentialCollaborators, { userId: user?._id });
  const matches = useQuery(api.queries.getMatches, { userId: user?._id });
  const swipe = useMutation(api.mutations.swipe);

  const handleSwipe = async (isLike: boolean) => {
    if (!scientists?.[0]) return;
    await swipe({
      swiperId: userId,
      swipedId: scientists[0]._id,
      isLike,
      projectId: "project-123" // In real app, get from project context
    });
  };

  return (
    <main className="container py-6">
      <Tabs defaultValue="swipe">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="swipe">Find Collaborators</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="swipe" className="mt-6">
          {scientists?.[0] ? (
            <SwipeCard
              scientist={scientists[0]}
              onSwipe={handleSwipe}
            />
          ) : (
            <div className="text-center">No more scientists to show!</div>
          )}
        </TabsContent>
        <TabsContent value="matches" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {matches?.map(match => (
              <Chat
                key={match._id}
                matchId={match._id}
                currentUserId={userId}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}