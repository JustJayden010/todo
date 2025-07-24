'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push('/login');
        } else {
            alert('Signup failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
            <form
                onSubmit={handleSignup}
                className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-white space-y-6"
            >
                <h2 className="text-3xl font-bold text-center">Create Account</h2>

                <div>
                    <label className="block mb-1 text-sm">Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white text-white"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white text-white"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-white text-white"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold hover:scale-105 transition-transform"
                >
                    Sign Up
                </button>
                <p className="text-center text-sm text-white/80">
                    Already have an account?{' '}
                    <a href="/login" className="text-white underline hover:text-pink-300">
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}
