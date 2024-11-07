"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const TypingIndicator = () => (
  <div className="flex items-start gap-3">
    <Avatar className="w-8 h-8">
      <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
      <AvatarImage src="/api/placeholder/32/32" />
    </Avatar>
    <div className="bg-muted rounded-lg p-3 inline-flex items-center gap-1">
      <div className="w-2 h-2 rounded-full animate-bounce bg-muted-foreground" />
      <div className="w-2 h-2 rounded-full animate-bounce bg-muted-foreground delay-150" />
      <div className="w-2 h-2 rounded-full animate-bounce bg-muted-foreground delay-300" />
    </div>
  </div>
);

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const generatePathAction = useAction(api.chatbot.generatePath);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    
    // Wait a minimum time to show typing indicator
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsTyping(false);
    return response;
  };

  const handleSend = async () => {
    if (input.trim() === "" || isTyping) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    try {
      const response = await generatePathAction({ message: input });
      // Simulate typing effect
      const typedResponse = await simulateTyping(response);
      
      const botMessage: Message = { 
        role: "bot", 
        content: typedResponse
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      await simulateTyping("");
      const errorMessage: Message = {
        role: "bot",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col mt-10">
      <ScrollArea 
        className="flex-1 p-4"
        ref={scrollAreaRef}
      >
        <div
              className={`flex items-start gap-3 justify-start`}
            >
                <Avatar className="w-8 h-8">
                  <AvatarFallback><Bot className="w-4 h-4 " /></AvatarFallback>
                  <AvatarImage src="/api/placeholder/32/32" />
                </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[80%] bg-muted`}
              >
                Hello! I'm Marina - a marine science expert. How can I help you today?
              </div>

            </div>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback><Bot className="w-4 h-4 " /></AvatarFallback>
                  <AvatarImage src="/api/placeholder/32/32" />
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <Avatar className="w-8 h-8 flex items-center justify-center">
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                  <AvatarImage src="/api/placeholder/32/32" />
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={isTyping || input.trim() === ""}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}