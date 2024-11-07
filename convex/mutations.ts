import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        name: v.string(),
        email: v.string(),
        tokenIdentifier: v.string(),
    },
    async handler(ctx, args) {
        await ctx.db.insert("scientists", {
            name: args.name,
            email: args.email,
            tokenIdentifier: args.tokenIdentifier,
        });
    },
})

export const swipe = mutation({
  args: {
    swiperId: v.string(),
    swipedId: v.string(),
    isLike: v.boolean(),
    projectId: v.string(),
  },
  handler: async (ctx, args) => {
    // Record the swipe
    await ctx.db.insert("swipes", {
      swiperId: args.swiperId,
      swipedId: args.swipedId,
      isLike: args.isLike,
      timestamp: Date.now(),
    });

    if (args.isLike) {
      // Check if other person also liked
      const otherSwipe = await ctx.db
        .query("swipes")
        .filter(q =>
          q.and(
            q.eq(q.field("swiperId"), args.swipedId),
            q.eq(q.field("swipedId"), args.swiperId),
            q.eq(q.field("isLike"), true)
          )
        )
        .first();

      if (otherSwipe) {
        // Create a match
        await ctx.db.insert("matches", {
          scientist1Id: args.swiperId,
          scientist2Id: args.swipedId,
          timestamp: Date.now(),
          projectId: args.projectId,
        });
      }
    }
  }
});

export const sendMessage = mutation({
  args: {
    matchId: v.string(),
    senderId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      matchId: args.matchId,
      senderId: args.senderId,
      content: args.content,
      timestamp: Date.now(),
      read: false,
    });
  }
});