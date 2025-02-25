'use client'
import '@/styles/globals.css';
import AnchorButton from './components/AnchorButton';
import Header from './components/Header';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Verifica o tema salvo no localStorage e aplica a classe "dark" ao <html>
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('theme') === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  return (
    <html lang="pt-br">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow w-full mx-auto">{children}</main>
          <AnchorButton />
        </div>
      </body>
    </html>
  );
}
