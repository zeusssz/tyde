import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPotentialCollaborators = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Get all scientists except current user
    const scientists = await ctx.db
      .query("scientists")
      .filter(q => 
        q.and(
          q.neq(q.field("_id"), args.userId),
          q.eq(q.field("availableForProjects"), true)
        )
      )
      .collect();

    // Get already swiped users
    const swipes = await ctx.db
      .query("swipes")
      .filter(q => q.eq(q.field("swiperId"), args.userId))
      .collect();

    const swipedIds = new Set(swipes.map(swipe => swipe.swipedId));
    
    // Filter out already swiped scientists
    return scientists.filter(scientist => !swipedIds.has(scientist._id));
  }
});

export const getUser = query({
    args: {
        email: v.string(),
    },
    async handler(ctx, args_0) {
        const user = await ctx.db
            .query("scientists")
            .filter(q => q.eq(q.field("email"), args_0.email))
            .first();
        return user;
    },
})

export const getMatches = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("matches")
      .filter(q =>
        q.or(
          q.eq(q.field("scientist1Id"), args.userId),
          q.eq(q.field("scientist2Id"), args.userId)
        )
      )
      .collect();

    const scientistIds = matches.map(match =>
      match.scientist1Id === args.userId ? match.scientist2Id : match.scientist1Id
    );

    const scientists = await Promise.all(
        //@ts-ignore
      scientistIds.map(id => ctx.db.get(id))
    );

    return matches.map((match, i) => ({
      ...match,
      scientist: scientists[i]
    }));
  }
});

export const getMessages = query({
  args: { matchId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter(q => q.eq(q.field("matchId"), args.matchId))
      .order("desc")
      .collect();
  }
});