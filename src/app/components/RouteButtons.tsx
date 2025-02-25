'use client';

import Link from 'next/link';

interface Route {
  name: string;
  path: string;
}

const routes: Route[] = [
  { name: 'Clima', path: '/weather' },
  { name: 'Busca CEP', path: '/cep-search' },
  { name: 'Contato', path: '/contact' },
];

export default function RouteButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 relative z-10">
      {routes.map((route, index) => (
        <Link key={index} href={route.path}>
          <div className="group relative w-32 sm:w-36 h-12 border border-gray-900 dark:border-white rounded-xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 overflow-hidden">
            <span className="relative z-10 text-gray-900 dark:text-white font-medium text-md sm:text-lg transition-colors duration-300 group-hover:text-white dark:group-hover:text-gray-900">
              {route.name}
            </span>
            <div className="absolute inset-0 rounded-xl bg-gray-900 dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
      ))}
    </div>
  );
}
