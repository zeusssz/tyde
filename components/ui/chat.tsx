import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';

export const Chat = ({ matchId, currentUserId }: { matchId: string, currentUserId: string }) => {
  const messages = useQuery(api.queries.getMessages, { matchId });
  const sendMessage = useMutation(api.mutations.sendMessage);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage({
      matchId,
      senderId: currentUserId,
      content: newMessage.trim(),
    });
    setNewMessage("");
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <h2 className="text-xl font-semibold">Messages</h2>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === currentUserId
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
};