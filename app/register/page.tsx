'use client';

import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../lib/firebase';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'trainee' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // إرسال البيانات إلى باكند Neon
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          role: form.role
        })
      });
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth(app);
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      // إرسال البيانات إلى باكند Neon
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          role: form.role,
          password: form.password
        })
      });
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <img src="/images/logo.svg" alt="FitRyne Logo" className="w-16 h-16 animate-spin-slow mb-2" />
          <h1 className="text-3xl font-bold text-green-800 mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-500">سجّل بحساب Google أو البريد الإلكتروني</p>
        </div>
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-all shadow-lg scale-100 hover:scale-105 animate-bounce mb-4"
          disabled={loading}
        >
          <img src="/images/google.svg" alt="Google" className="w-6 h-6" />
          التسجيل عبر Google
        </button>
        <form onSubmit={handleEmailSignup} className="space-y-3">
          <input type="text" name="name" placeholder="الاسم الكامل" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          <input type="password" name="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          <input type="password" name="confirmPassword" placeholder="تأكيد كلمة المرور" value={form.confirmPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="trainee">متدرب</option>
            <option value="coach">مدرب</option>
            <option value="nutritionist">طبيب تغذية</option>
          </select>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all" disabled={loading}>
            {loading ? 'جاري التسجيل...' : 'تسجيل بالبريد الإلكتروني'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span>لديك حساب بالفعل؟ </span>
          <a href="/login" className="text-green-600 hover:underline">تسجيل الدخول</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;