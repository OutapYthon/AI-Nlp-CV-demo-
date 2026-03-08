'use client';

interface LoaderProps {
  role?: 'candidate' | 'recruiter';
}

export default function Loader({ role }: LoaderProps) {
  const borderColor =
    role === 'candidate'
      ? 'var(--primary-500)'
      : 'var(--secondary-500)';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80">
      <div
        className="w-12 h-12 border-4 border-gray-300 rounded-full animate-spin"
        style={{ borderTopColor: borderColor }}
      />
    </div>
  );
}