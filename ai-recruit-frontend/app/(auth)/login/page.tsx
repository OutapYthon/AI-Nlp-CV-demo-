'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Add this for better navigation
import RoleToggle from '@/components/auth/RoleToggle';
import AuthForm from '@/components/auth/AuthForm';
import Button from '@/components/ui/Button'; // Import the Button component
import { isAuthenticated, loginUser, getRole } from '@/lib/api/auth';
import Loader from '@/components/ui/loader';

export default function LoginPage() {
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      const storedRole = getRole();
      if (storedRole === 'candidate') {
        router.push('/');
      } else if (storedRole === 'recruiter') {
        router.push('/');
      } else {
        setLoading(false); 
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
      return <Loader role='candidate' />;
  }

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginUser(email, password, role);
      console.log('Login successful:', result);
      router.push('/');
    } catch (err: any) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
          setError("Le serveur n'est pas disponible. Veuillez réessayer plus tard.");
        } else {
          setError(err.message || 'Une erreur inattendue est survenue.');
        }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with role indicator */}
        <div
          className={`py-6 px-8 text-center ${
            role === 'candidate'
              ? 'bg-[var(--primary-500)]'
              : 'bg-[var(--secondary-500)]'
          }`}
        >
          <h2 className="text-2xl font-bold text-white">
            {role === 'candidate' ? 'Connexion Candidat' : 'Connexion Recruteur'}
          </h2>
        </div>

        <div className="p-8">
          <RoleToggle role={role} setRole={setRole} />

          {error && (
            <div className="mb-6 p-3 font-bold rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <AuthForm type="login" onSubmit={handleSubmit} role={role} />

          {/* Replace the anchor with Button component for submit */}
          <div className="mt-6">
            <Button 
              type="submit"
              form="auth-form" // If AuthForm has id="auth-form"
              variant="primary"
              className="w-full"
            >
              Se connecter
            </Button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link
              href="/register"
              className={`font-medium ${
                role === 'candidate'
                  ? 'text-[var(--primary-600)] hover:text-[var(--primary-500)]'
                  : 'text-[var(--secondary-600)] hover:text-[var(--secondary-500)]'
              } transition-colors`}
            >
              Créez-en un
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}