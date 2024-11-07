"use node";

import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCB-VBfGIRQ2GGL5OhUnrz4ZJpCLzZ9XjA")

//@ts-ignore
export const generatePath = action({
    args: {
      message: v.string(),
    },
    //@ts-ignore
    async handler(ctx, args) {
      const prompt = `You are Marina, an expert in marine science. Answer the user's question: ${args.message}`;
  
      try {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
          const geminires = await model.generateContent(prompt);
          const res = await geminires.response;
          const content = await res.text();


          console.log(content);

          return content;
        } catch (e) {
          console.error('Error in path generation:', e);
          throw new ConvexError("Failed to generate learning path. Please try again.");
        }
    },
});