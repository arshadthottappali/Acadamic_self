import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Academic Site Builder',
  description: 'Build personal and lab websites for academics – no code required.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
