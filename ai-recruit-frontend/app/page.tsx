import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <div className="z-10 w-full max-w-500px items-center justify-between font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">AI Recruitment Platform</h1>
        <p className="text-gray-600 mb-12 text-center">
          Connect with top talent using AI-powered matching.
        </p>
        
        <div className="flex gap-6">
          <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </Link>
          <Link href="/login" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}