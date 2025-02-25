'use client';

import Image from 'next/image';
import RouteButtons from './RouteButtons';

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-dark px-4 sm:px-8">
      <div className="gradient absolute"></div>

     
      <Image
        src="/brand/images/logo-white.webp"
        alt="Plin Logo"
        width={150}
        height={150}
        priority
        className="mb-6 sm:mb-8 drop-shadow-lg relative z-10"
      />

      <h1 className="text-2xl sm:text-3xl text-white font-serif italic mb-8 sm:mb-10 drop-shadow-md relative z-10 text-center">
        Teste Front End
      </h1>

      {/* Botões de Rotas */}
      <RouteButtons />
    </div>
  );
}
