import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables. Check your .env file.");
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);;