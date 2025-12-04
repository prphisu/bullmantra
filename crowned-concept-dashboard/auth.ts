// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/prisma"; // Use your Prisma client
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        console.log('--- Authorize Attempt ---');
      console.log('1. Email from form:', credentials.email);

        // 1. Find user in your database
        const user = await db.users.findUnique({
          where: { email: credentials.email as string },
        });

       if (!user) {
        console.log('2. Result: USER NOT FOUND.');
        console.log('---------------------------');
        return null; // No user found
      }
      
      console.log('2. User found in DB:', user.email);

        // 2. Check if password matches
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password_hash // Use the column name from your database
        );

        if (passwordsMatch) {
        console.log('3. Password check: SUCCESS.');
        console.log('---------------------------');
        // Return the user object (without password)
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
       console.log('3. Password check: FAILED. Hashes do not match.');
      console.log('---------------------------');
      // Passwords don't match
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" }, // Use JSON Web Tokens for sessions
  callbacks: {
    // Add user ID and role to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Add user ID and role to the session object (for client-side use)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'student' | 'admin';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Redirect users to /login if they are not authenticated
  }
});