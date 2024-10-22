import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { compare } from "bcryptjs"; // Importing the compare function
import prisma from "@/database"; // Your Prisma instance

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string } | undefined) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }
      
        const { email, password } = credentials;
      
        // Implement your user authentication logic here
        const user = await prisma.user.findUnique({
          where: { email },
        });
      
        if (user && (await compare(password, user.password))) {
          // Convert id to string
          return { id: String(user.id), name: user.name, email: user.email }; // Return user object with id as a string
        }
      
        return null; // Return null if authentication fails
      }
      
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user?.name && token?.sub) {
        session.user.name = `${session.user.name}_${token.sub}`;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };