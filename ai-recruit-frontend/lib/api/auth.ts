import { supabase } from '@/lib/supabase/client';

// Your FastAPI backend URL (defaulting to local port 8000)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Checks if the user is authenticated synchronously for UI rendering.
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  // Check if we saved a session token or role during login/register
  return !!localStorage.getItem('user_role');
};

/**
 * Retrieves the user's role from local storage.
 */
export const getRole = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('user_role');
};

/**
 * Registers a new user via Supabase and prepares them for the FastAPI pipeline.
 */
export const registerUser = async (email: string, password: string, role: 'candidate' | 'recruiter') => {
  // 1. Supabase Auth & Database Trigger
  // This automatically inserts the user into the candidates/recruiters tables.
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: role } // The metadata required by our SQL Trigger
    }
    });

    if (error) {
    throw new Error(error.message);
    }

  // 2. Save role locally for immediate UI updates (removes loading spinners)
    if (typeof window !== 'undefined') {
    localStorage.setItem('user_role', role);
    }

  // 3. (Optional) Sync with FastAPI 
  // We don't need FastAPI to create the user in the database anymore.
  // However, we can send a request to FastAPI here if you need to initialize 
  // specific NLP pipelines or AI agent environments for this user immediately.
    /*
    t ry {
    await fetch(`${API_BASE_URL}/api/users/init-ai-workspace`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.session?.access_token}`
        },
        body: JSON.stringify({ email, role, userId: data.user?.id })
    });
    } catch (err) {
    console.warn("FastAPI AI initialization delayed. User created in DB successfully.", err);
    }
  */

    return {
    user: data.user,
    session: data.session,
    message: "Inscription réussie !"
    };
};