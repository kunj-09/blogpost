import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";

// Defining authentication options for NextAuth
const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      // Using environment variables for security
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // The session callback receives both the session and token objects.
    // In this example, the user's name is modified by appending the token.sub
    // (which is usually the user ID or identifier) to the user's name.
    async session({ session, token }) {
      console.log(session, token); // Logging session and token for debugging

      // Modify the session user name by appending token.sub
      if (session?.user?.name && token?.sub) {
        session.user.name = `${session.user.name}_${token.sub}`;
      }

      return session; // Return modified session object
    },
  },
  // Using an environment variable for the secret key
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth configuration exported as GET and POST handlers
const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
