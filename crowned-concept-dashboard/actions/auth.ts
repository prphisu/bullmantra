// actions/auth.ts
'use server';

import { signIn } from '../auth'; // Your path '../auth' is correct
import { AuthError } from 'next-auth';

export async function login(formData: FormData) {
  try {
    // We convert formData to an object and add the redirectTo property
    await signIn('credentials', {
      ...Object.fromEntries(formData), // Convert form data to a plain object
      redirectTo: '/dashboard',        // <-- THIS IS THE FIX
    });
  } catch (error) {
    
    // This checks if the error is the special NEXT_REDIRECT error
    if ((error as Error).message.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw the error so Next.js can complete the redirect
    }

    // This will catch the "Invalid credentials" error
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }

    // This will catch any other error
    console.error('Non-AuthError in login:', error); 
    return 'An unexpected error occurred. Please try again.';
  }
}