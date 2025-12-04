// app/api/auth/[...nextauth]/route.ts
import { handlers } from "../../../../../auth"; // Import from the auth.ts file you just made
export const { GET, POST } = handlers;