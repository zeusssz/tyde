import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";

interface Scientist {
  _id: string;
  name: string;
  title: string;
  institution: string;
  fields: string[];
  bio: string;
  photoUrl?: string;
  skills: string[];
}

export const SwipeCard = ({ 
  scientist,
  onSwipe 
}: { 
  scientist: Scientist;
  onSwipe: (isLike: boolean) => void;
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Avatar className="w-32 h-32 mx-auto">
          <AvatarImage src={scientist.photoUrl} />
          <AvatarFallback>{scientist.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{scientist.name}</h2>
          <p className="text-lg">{scientist.title}</p>
          <p>{scientist.institution}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {scientist.fields.map(field => (
            <Badge key={field} variant="secondary">
              {field}
            </Badge>
          ))}
        </div>
        <p>{scientist.bio}</p>
        <div>
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {scientist.skills.map(skill => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center space-x-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => onSwipe(false)}
          className="rounded-full"
        >
          <X className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          onClick={() => onSwipe(true)}
          className="rounded-full"
        >
          <Check className="w-6 h-6" />
        </Button>
      </CardFooter>
    </Card>
  );
};