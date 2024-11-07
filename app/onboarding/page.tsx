"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { 
  ArrowLeft, 
  ArrowRight, 
  BadgeCheck, 
  HelpCircle,
  X 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OnboardingQuestions() {
  const router = useRouter();
  const { user: clerkUser } = useUser();
  //@ts-ignore
  const user = useQuery(api.queries.getUser, { email: clerkUser?.emailAddresses[0].emailAddress });
  const questions = useQuery(api.questions.getQuestions) || [];
  const userProgress = useQuery(api.questions.getUserProgress, { 
    userId: user?._id as string 
  }) || [];
  const saveAnswer = useMutation(api.questions.saveAnswer);
  const completeOnboarding = useMutation(api.questions.completeOnboarding);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [arrayAnswer, setArrayAnswer] = useState<string[]>([]);
  const [currentArrayInput, setCurrentArrayInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Load saved answer when switching questions
  useEffect(() => {
    if (!currentQuestion || !userProgress) return;
    
    const savedProgress = userProgress.find(
      p => p.questionId === currentQuestion._id
    );
    
    // Only update if the values are different
    if (savedProgress) {
      if (currentQuestion.type === 'array') {
        const savedArray = savedProgress.answer as string[];
        if (JSON.stringify(savedArray) !== JSON.stringify(arrayAnswer)) {
          setArrayAnswer(savedArray);
        }
      } else {
        const savedValue = String(savedProgress.answer);
        if (savedValue !== answer) {
          setAnswer(savedValue);
        }
      }
    } else {
      if (answer !== '' || arrayAnswer.length > 0) {
        setAnswer('');
        setArrayAnswer([]);
      }
    }
  }, [currentQuestionIndex]);

  const handleNext = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const finalAnswer = currentQuestion.type === 'array' ? arrayAnswer :
                         currentQuestion.type === 'boolean' ? answer === 'true' :
                         answer;

      await saveAnswer({
        //@ts-ignore
        userId: user?._id as string,
        questionId: currentQuestion._id,
        answer: finalAnswer,
      });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentArrayInput('');
      } else {
        //@ts-ignore
        await completeOnboarding({ userId: user?._id as string });
        router.push('/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddArrayItem = () => {
    if (currentArrayInput.trim() && !arrayAnswer.includes(currentArrayInput.trim())) {
      setArrayAnswer(prev => [...prev, currentArrayInput.trim()]);
      setCurrentArrayInput('');
    }
  };

  const renderSuggestions = () => {
    if (!currentQuestion.suggestions?.length) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {currentQuestion.suggestions.map((suggestion) => (
          <Badge
            key={suggestion}
            variant="outline"
            className="cursor-pointer hover:bg-primary/10"
            onClick={() => {
              if (currentQuestion.type === 'array') {
                if (!arrayAnswer.includes(suggestion)) {
                  setArrayAnswer(prev => [...prev, suggestion]);
                }
              } else {
                setAnswer(suggestion);
              }
            }}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    );
  };

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'array':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentArrayInput}
                onChange={(e) => setCurrentArrayInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddArrayItem()}
                placeholder={currentQuestion.placeholder || "Type and press Enter to add"}
                className="w-full text-xl font-light bg-transparent border-2 focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleAddArrayItem}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {arrayAnswer.map((item, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="text-lg p-2 pr-1 flex items-center gap-1"
                >
                  {item}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 hover:bg-destructive/20"
                    onClick={() => setArrayAnswer(prev => prev.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            {renderSuggestions()}
          </div>
        );
      case 'boolean':
        return (
          <div className="flex gap-4">
            <Button
              variant={answer === 'true' ? 'default' : 'outline'}
              onClick={() => setAnswer('true')}
              className="text-2xl px-8 py-6"
            >
              Yes
            </Button>
            <Button
              variant={answer === 'false' ? 'default' : 'outline'}
              onClick={() => setAnswer('false')}
              className="text-2xl px-8 py-6"
            >
              No
            </Button>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-4 w-full">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder || "Type your answer here"}
              className="w-full text-xl font-light bg-transparent border-2 focus:ring-2 focus:ring-primary"
            />
            {renderSuggestions()}
          </div>
        );
      case 'longtext':
        return (
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder || "Type your answer here"}
            className="w-full min-h-32 text-xl font-light bg-transparent border-2 focus:ring-2 focus:ring-primary"
          />
        );
      default:
        return null;
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 px-4 md:px-12 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex flex-row text-sm font-medium items-center gap-2">
            <BadgeCheck className="text-primary" /> 
            Your profile information is secure
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-normal">
              {currentQuestion.questionText}
            </h1>
            {currentQuestion.description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{currentQuestion.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="space-y-8 mt-8">
            {renderInput()}
            
            <div className="flex items-center gap-4 justify-between mt-12">
              <Button
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0 || isSubmitting}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (currentQuestion.type === 'array' ? !arrayAnswer.length :
                   currentQuestion.type === 'boolean' ? !answer :
                   !answer.trim()) || isSubmitting || 
                   (currentQuestion.required && !answer && !arrayAnswer.length)
                }
                className="flex items-center gap-2"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-4 border-t">
        <div className="flex justify-between text-xs text-muted-foreground max-w-3xl mx-auto">
          <span>© 2024 Tyder</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}