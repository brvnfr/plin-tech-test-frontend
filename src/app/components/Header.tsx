'use client';

import Image from 'next/image';
import ThemeToggle from '@/app/components/Themetoggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
      <div className="relative w-[100px] h-[50px] transition-opacity duration-500">
        <Image
          src="/brand/images/logo-white.webp" 
          alt="Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <ThemeToggle />
    </header>
  );
}
