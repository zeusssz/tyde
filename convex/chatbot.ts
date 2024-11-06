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
      const prompt = `You are an expert in marine science. Answer the user's question: ${args.message}`;
  
      try {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
          const geminires = await model.generateContent(prompt);
          const res = await geminires.response;
          let content = await res.text();

          content = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);

          console.log(content);
  
          const response = JSON.parse(content as string);
          console.log(response);

          return response;
        } catch (e) {
          console.error('Error in path generation:', e);
          throw new ConvexError("Failed to generate learning path. Please try again.");
        }
    },
});