/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bzdyxheowscojikrdkna.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZHl4aGVvd3Njb2ppa3Jka25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMjE4NDYsImV4cCI6MjA5OTc5Nzg0Nn0.gYGenmO-45W4b-iTeH6CjOPs9yljycqthz3Eq_-pNrI';

export const supabase = createClient(supabaseUrl, supabaseKey);
