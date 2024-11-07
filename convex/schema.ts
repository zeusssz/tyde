import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  scientists: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    title: v.optional(v.string()),
    institution: v.optional(v.string()),
    fields: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
    publications: v.optional(v.array(v.string())),
    skills: v.optional(v.array(v.string())),
    availableForProjects: v.optional(v.boolean()),
    onboardingCompleted: v.optional(v.boolean()),
  }),

  onboardingQuestions: defineTable({
    questionText: v.string(),
    fieldToUpdate: v.string(),
    type: v.string(),
    order: v.number(),
    required: v.boolean(),
    placeholder: v.optional(v.string()),
    description: v.optional(v.string()),
    suggestions: v.optional(v.array(v.string()))
  }),

  onboardingProgress: defineTable({
    scientistId: v.string(),
    questionId: v.string(),
    answer: v.union(v.string(), v.array(v.string()), v.boolean()),
  }),
  swipes: defineTable({
    swiperId: v.string(),
    swipedId: v.string(),
    isLike: v.boolean(),
    timestamp: v.number(),
  }),
  matches: defineTable({
    scientist1Id: v.string(),
    scientist2Id: v.string(),
    timestamp: v.number(),
    projectId: v.string(),
  }),
  messages: defineTable({
    matchId: v.string(),
    senderId: v.string(),
    content: v.string(),
    timestamp: v.number(),
    read: v.boolean(),
  }),
  projects: defineTable({
    creatorId: v.string(),
    title: v.string(),
    description: v.string(),
    requiredSkills: v.array(v.string()),
    status: v.string(), // "open", "in_progress", "completed"
  }),
})