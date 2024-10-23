import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

// API route to handle saving a user's reaction
export async function POST(request: NextRequest) {
  try {
    const { postId, user, type } = await request.json();

    // Check if the user has already reacted to this post
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        postId: parseInt(postId),
        user: user,
      },
    });

    // If the user already reacted, update the reaction type
    if (existingReaction) {
      await prisma.reaction.update({
        where: { id: existingReaction.id },
        data: { type },
      });
    } else {
      // If not, create a new reaction
      await prisma.reaction.create({
        data: {
          type,
          user,
          postId: parseInt(postId),
        },
      });
    }

    return NextResponse.json({ success: true, message: "Reaction saved successfully" });
  } catch (error) {
    console.error("Error saving reaction:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to save reaction",
    });
  }
}
