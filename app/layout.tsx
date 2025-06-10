import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FitRyne - منصة التدريب الرياضي',
  description: 'منصة متكاملة للتدريب الرياضي والحياة الصحية',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 