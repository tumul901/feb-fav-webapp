import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header'; // <-- 1. IMPORT THE HEADER

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MusicCo - Official Site',
  description: 'The official website for MusicCo artists and releases.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Header /> {/* <-- 2. ADD THE HEADER HERE */}
        <main>{children}</main>
      </body>
    </html>
  );
}
