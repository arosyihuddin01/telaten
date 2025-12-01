import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BottomNav } from '@/components/BottomNav';
import { CollapsibleSidebar } from '@/components/CollapsibleSidebar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TLATEN - Teknologi yang Sabar',
  description: 'Asisten digital untuk UMKM Indonesia yang inklusif dan ramah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <CollapsibleSidebar />
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
        </div>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
