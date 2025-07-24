import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://tjyikemgadpvvjeljkfo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeWlrZW1nYWRwdnZqZWxqa2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNjU0MjIsImV4cCI6MjA2ODk0MTQyMn0.SUDJIzYtwUFeIf16qMhCRGw1008nMWb7khznq9kXMbM'
);
