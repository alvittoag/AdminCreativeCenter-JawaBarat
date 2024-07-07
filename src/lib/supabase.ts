import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://mqnweghrbsuketcrwstb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbndlZ2hyYnN1a2V0Y3J3c3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MzExNDEsImV4cCI6MjAzNTUwNzE0MX0.0jEvSiMe4yRNZicpkhs0rGQLhpCGKe6c0moWGdZCelU"
);
