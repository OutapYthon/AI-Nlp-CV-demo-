import os
from dotenv import load_dotenv
from supabase import create_client

# Load the secret keys from your .env file
load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print(" Missing SUPABASE_URL or SUPABASE_KEY in .env file!")
    exit()

# Create the bridge to Supabase
supabase = create_client(url, key)

try:
    # Ask Supabase to check the new tables by pulling 0 rows (just checking if they exist)
    supabase.table("candidates").select("id").limit(1).execute()
    supabase.table("jobs").select("id").limit(1).execute()
    supabase.table("companies").select("id").limit(1).execute()
    
    print(" SUCCESS! Python is officially connected to your new Master Schema.")
    print(" The tables are ready for data.")
    
except Exception as e:
    print(f" Connection Error: {e}")