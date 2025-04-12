
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ejvtdxngsrrrqaihtgih.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdnRkeG5nc3JycnFhaWh0Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODQ4NDIsImV4cCI6MjA2MDA2MDg0Mn0.IYVWCnW6g5xqvNcaMYhR51w9AdII2fKpyGe3ag-HQvk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
