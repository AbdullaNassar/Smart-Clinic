import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssqskgoxbbmpyrdyiulc.supabase.co'
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcXNrZ294YmJtcHlyZHlpdWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNjg0ODcsImV4cCI6MjAxMTg0NDQ4N30.HmL711OAW9fqLxvmsfzFz0GJoORRnNQezI0tdqS298s"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;