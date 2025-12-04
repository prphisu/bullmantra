'use server';

import { db } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Validation Schema
const RegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function register(formData: FormData) {
  // 1. Validate Form Data
  const data = Object.fromEntries(formData.entries());
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // 2. Check if user already exists
    const existingUser = await db.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'An account with this email already exists.' };
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User (Always as 'student')
    await db.users.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        role: 'student', // FORCE ROLE TO STUDENT
      },
    });

    return { success: 'Account created! Redirecting to login...' };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}