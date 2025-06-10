import React from 'react';

const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-700 via-blue-500 to-green-400 shadow-lg py-3 px-6 flex items-center justify-between animate-fade-in-down">
    <div className="flex items-center gap-2">
      <img src="/images/logo.svg" alt="FitRyne Logo" className="w-10 h-10 animate-spin-slow" />
      <span className="text-white text-2xl font-bold tracking-widest drop-shadow-lg">FitRyne</span>
    </div>
    <div className="flex gap-4">
      <a href="/" className="text-white hover:text-yellow-300 font-semibold transition-all duration-200">الرئيسية</a>
      <a href="/dashboard" className="text-white hover:text-yellow-300 font-semibold transition-all duration-200">لوحة التحكم</a>
      <a href="/login" className="text-white hover:text-yellow-300 font-semibold transition-all duration-200">تسجيل الدخول</a>
    </div>
  </nav>
);

export default Navbar;
