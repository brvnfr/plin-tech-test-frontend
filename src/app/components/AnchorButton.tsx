'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

interface Route {
  name: string;
  path: string;
}

const routes: Route[] = [
  { name: 'Home', path: '/' },
  { name: 'Clima', path: '/weather' },
  { name: 'Buscar CEP', path: '/cep' },
  { name: 'Contato', path: '/contact' },
];

export default function AnchorButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Botão Flutuante */}
      <button
        onClick={toggleMenu}
        className={`p-4 rounded-full text-white shadow-lg hover:scale-110 transition-all duration-300 bg-gray-800
        }`}
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Menu de Rotas */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <ul className="flex flex-col">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  href={route.path}
                  className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
