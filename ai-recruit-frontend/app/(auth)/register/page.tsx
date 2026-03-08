'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleToggle from '@/components/auth/RoleToggle';
import AuthForm from '@/components/auth/AuthForm';
import Loader from '@/components/ui/loader';
import { registerUser } from '@/lib/api/auth';

export default function RegisterPage() {
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const router = useRouter();

  // This function connects your AuthForm to your auth.ts logic
  const handleRegister = async (e: React.FormEvent, email: string, password: string, fullName?: string) => {
    setMessage(null);
    setIsPageLoading(true);

    try {
      const result = await registerUser(email, password, role, fullName);

      if (result.session) {
        // Success! Route them to their specific dashboard
        router.push(role === 'candidate' ? '/candidate-dashboard' : '/recruiter-dashboard');
      } else if (result.message) {
        // Supabase requires email confirmation
        setMessage({ type: 'success', text: result.message });
        setIsPageLoading(false);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Une erreur est survenue lors de l'inscription." });
      setIsPageLoading(false);
    }
  };

  // Show your custom full-screen loader if the page is processing a redirect
  if (isPageLoading) {
    return <Loader role={role} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-500">
            Rejoignez la plateforme de recrutement IA
          </p>
        </div>

        {/* The component you built to swap between Candidate and Recruiter */}
        <RoleToggle role={role} setRole={setRole} />

        {/* Display success or error messages from Supabase */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${
            message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="mt-6">
          {/* The advanced form you perfected earlier */}
          <AuthForm
            type="register"
            role={role}
            onSubmit={handleRegister}
          />
        </div>

      </div>
    </div>
  );
}