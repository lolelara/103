'use client';

import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../lib/firebase';
import { Box, Container, Typography } from '@mui/material';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError('بيانات الدخول غير صحيحة أو الحساب غير موجود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #23283a 80%, #181c24 100%)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          padding: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="form-container animate-fade-in"
      >
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          background: 'radial-gradient(circle at 60% 40%, #7c4dff55 0%, #23283a00 80%)',
          zIndex: 0,
          filter: 'blur(8px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 120,
          height: 120,
          background: 'radial-gradient(circle at 40% 60%, #00bcd455 0%, #23283a00 80%)',
          zIndex: 0,
          filter: 'blur(8px)',
        }} />

        <div className="flex flex-col items-center mb-6 relative z-10">
          <img 
            src="/images/logo.svg" 
            alt="FitRyne Logo" 
            className="w-24 h-24 drop-shadow-2xl mb-2" 
            style={{filter: 'drop-shadow(0 0 16px #00bcd4)'}} 
          />
          <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-wide">
            تسجيل الدخول
          </h1>
          <p className="text-gray-400 text-lg">
            سجّل دخولك بحساب Google أو البريد الإلكتروني
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-transparent text-white py-3 rounded-2xl transition-all shadow-xl scale-100 hover:scale-105 mb-4 relative z-10"
          style={{
            borderImage: 'linear-gradient(90deg,#00bcd4 0%,#7c4dff 100%) 1',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '1rem',
          }}
          disabled={loading}
        >
          <img src="/images/google.svg" alt="Google" className="w-6 h-6" />
          <span className="text-lg font-bold">متابعة مع Google</span>
        </button>

        <form onSubmit={handleEmailLogin} className="space-y-5 w-full relative z-10">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-[#23283a]/70 border-2 border-primary/40 focus:border-primary text-[#e3e8ef] rounded-2xl px-5 py-3 shadow-inner transition-all outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-[#b0b8c1] text-lg font-bold"
              style={{backdropFilter: 'blur(6px)'}}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">@</span>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-[#23283a]/70 border-2 border-secondary/40 focus:border-secondary text-[#e3e8ef] rounded-2xl px-5 py-3 shadow-inner transition-all outline-none focus:ring-2 focus:ring-secondary/40 placeholder:text-[#b0b8c1] text-lg font-bold"
              style={{backdropFilter: 'blur(6px)'}}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70">🔒</span>
          </div>

          {error && (
            <div className="error-message text-center text-base font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-transparent text-white py-3 rounded-2xl font-bold transition-all relative"
            style={{
              borderImage: 'linear-gradient(90deg,#43e97b 0%,#38f9d7 100%) 1',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '1rem',
            }}
            disabled={loading}
          >
            <img src="/images/google.svg" alt="Google" className="w-6 h-6" />
            <span className="text-lg">
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول بالبريد الإلكتروني'}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400">
          <span>ليس لديك حساب؟ </span>
          <a href="/register" className="text-primary hover:text-secondary transition-colors font-bold">
            إنشاء حساب جديد
          </a>
        </div>
      </Box>
    </Container>
  );
};

export default LoginPage;