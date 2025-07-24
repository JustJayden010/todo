'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('name', data.name);
            console.log(data.name)
            router.push('/dashboard');
        } else {
            alert('Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-white space-y-6"
            >
                <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

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
                    Login
                </button>
                <p className="text-center text-sm text-white/80">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-white underline hover:text-pink-300">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
