import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://dwksawfzzgxdefpcnkqz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3a3Nhd2Z6emd4ZGVmcGNua3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzY0MzQsImV4cCI6MjA3MTc1MjQzNH0.LHUaeabWlCWSjD2JQ4423iUgiMqN6RZvvKt4epy4Ho4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
