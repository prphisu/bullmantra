// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the default session to include custom properties
   */
  interface Session {
    user: {
      id: string;
     // role: 'student' | 'admin' | 'mentor';
    } & DefaultSession["user"]; // Keep the default properties like name, email, image
  }

  /**
   * Extends the default user object (from authorize callback)
   */
  interface User {
   // role: 'student' | 'admin' | 'mentor';
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the default JWT token
   */
  interface JWT {
    id: string;
  //  role: 'student' | 'admin' | 'mentor';
  }
}