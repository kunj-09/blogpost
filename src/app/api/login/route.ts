import { compare } from "bcryptjs"; // To compare entered password with the hashed password
import prisma from "@/database"; // Your Prisma instance
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Use NextAuth's signIn function for manual login
  const result = await signIn('credentials', {
    redirect: false, // Prevent automatic redirection
    email,
    password,
  });

  if (result?.error) {
    return NextResponse.json(
      { success: false, message: result.error },
      { status: 401 }
    );
  }

  // If successful, return user information or redirect as needed
  return NextResponse.json({ success: true, message: "Login successful" });
}
