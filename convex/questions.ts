import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getQuestions = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("onboardingQuestions")
      .collect();
  }
});

export const getUserProgress = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("onboardingProgress")
      .filter(q => q.eq(q.field("scientistId"), args.userId))
      .collect();
  }
});

export const saveAnswer = mutation({
  args: {
    userId: v.id('scientists'),
    questionId: v.id('onboardingQuestions'),
    answer: v.union(v.string(), v.array(v.string()), v.boolean()),
  },
  handler: async (ctx, args) => {
    // Save progress
    await ctx.db.insert("onboardingProgress", {
      scientistId: args.userId,
      questionId: args.questionId,
      answer: args.answer,
    });

    // Get question to know which field to update
    const question = await ctx.db.get(args.questionId);
    if (!question) return;

    // Update scientist profile
    await ctx.db.patch(args.userId, {
      [question.fieldToUpdate]: args.answer,
    });
  }
});

export const completeOnboarding = mutation({
  args: { userId: v.id('scientists') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      onboardingCompleted: true,
    });
  }
});