import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { StudioProvider } from '@/context/StudioContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Outfiq — AI Fashion Studio | Controlled Editorial Image & Video Generation',
  description: 'Turn clothing references into studio-ready fashion content with zero AI redesign. Input fidelity over creativity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
        <StudioProvider>
          {children}
        </StudioProvider>
      </body>
    </html>
  );
}
