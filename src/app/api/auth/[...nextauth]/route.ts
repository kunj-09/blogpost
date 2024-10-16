import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: "Iv23li2rTFtb8C0GThdg",
      clientSecret: "5cc8cec9b6d6f3bcf8b1edb73f7181dd238efea3",
    }),
  ],
  callbacks: {
    //The session callback receives both the session and token objects.
    //In this example, the user's name is modified by appending the token.sub (which is usually the user ID or identifier) to the user's name.
    async session({ session, token }: any) {
      console.log(session, token);

      session.user.name = `${session?.user?.name}_${token?.sub}`;

      return session;
    },
  },
  secret: "default_secret_key",
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };