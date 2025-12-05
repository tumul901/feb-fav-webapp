import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { DynamicBackground } from '@/components/ui/DynamicBackground';

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
      {/* Removed bg-black text-white to make body transparent */}
      <body className={`${inter.className} text-white`}>
        
        {/* --- GLOBAL DYNAMIC BACKGROUND --- */}
        <DynamicBackground />
        
        <Header />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}