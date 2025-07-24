'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();


const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/forgot-password/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
    setStep('otp');
  } catch (err) {
    alert((err as Error).message);
  }
};

const verifyOtp = async () => {
  const code = otp.join('');
  if (code.length !== 4) return alert('Enter full OTP');
  try {
    const res = await fetch('/api/forgot-password/verify', {
      method: 'POST',
      body: JSON.stringify({ email, otp: code }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid OTP');
    setStep('reset');
  } catch (err) {
    alert((err as Error).message);
  }
};

const resetPassword = async () => {
  if (newPassword !== confirmPassword) return alert("Passwords don't match");
  try {
    const res = await fetch('/api/forgot-password/reset', {
      method: 'POST',
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Password reset failed');
    router.push('/login');
  } catch (err) {
    alert((err as Error).message);
  }
};



  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Forgot Password</h2>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-4 py-2"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Send OTP
                </button>
              </form>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-blue-700 mb-2">Enter OTP</h2>
              <p className="text-sm text-gray-500 mb-4">Sent to {email}</p>
              <div className="flex justify-center gap-3 mb-4">
                {otp.map((val, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    value={val}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    maxLength={1}
                    className="w-12 h-12 border text-center text-lg font-semibold rounded shadow"
                  />
                ))}
              </div>
              <button
                onClick={verifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Verify OTP
              </button>
            </motion.div>
          )}

          {step === 'reset' && (
            <motion.div
              key="reset"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-blue-700 mb-4">Reset Password</h2>
              <input
                type="password"
                placeholder="New password"
                className="w-full mb-3 border rounded px-4 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full mb-4 border rounded px-4 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={resetPassword}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Reset Password
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
