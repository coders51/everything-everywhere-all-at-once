import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cwiqhixpdjrzwjswhwlb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3aXFoaXhwZGpyendqc3dod2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5ODg4MzIsImV4cCI6MjAzMDU2NDgzMn0.K0imvFxyc0YNsv8HSTlqLLSxDoBVLZmmZg8e9Iwy2Yc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
