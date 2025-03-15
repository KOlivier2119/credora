'use client';

import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#0A1124]">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">Log in to your account to continue</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#4A56E2]">
              <Mail className="text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ml-2 outline-none text-[#333]"
              />
            </div>
            <div className="flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#4A56E2]">
              <Lock className="text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ml-2 outline-none text-[#333]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4A56E2] text-white py-3 rounded-lg hover:bg-[#3B48C7] transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#4A56E2] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}