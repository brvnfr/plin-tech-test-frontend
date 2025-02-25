'use client';

import { useState } from 'react';
import { CepService } from '@/domain/services/CepService';
import { CepResult } from '@/domain/entities/CepResult';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CepFormType, cepFormSchema } from '@/schemas/cepSchema';

const ITEMS_PER_PAGE = 3;

export default function CepPage() {
  const [results, setResults] = useState<CepResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const cepService = new CepService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CepFormType>({
    resolver: zodResolver(cepFormSchema),
  });

  async function searchCep({ uf, city, street }: CepFormType) {
    setLoading(true);
    setError(null);

    try {
      const data = await cepService.searchByStreet(uf, city, street);
      setResults(data);
      setShowForm(false);
      setCurrentPage(1);
    } catch {
      setError('Não foi possível buscar os CEPs. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setResults([]);
    setError(null);
    setShowForm(true);
    reset();
  };

  // Paginação
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-all duration-500">
      <div className="w-full max-w-md bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-3xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Busca de CEP</h1>

        {/* Formulário */}
        {showForm && (
          <form onSubmit={handleSubmit(searchCep)} className="space-y-4">
            <div>
              <label htmlFor="uf" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                UF
              </label>
              <input
                type="text"
                {...register('uf')}
                id="uf"
                placeholder="Ex: SP"
                maxLength={2}
                className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.uf ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.uf && <p className="text-red-500 text-sm mt-1">{errors.uf.message}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cidade
              </label>
              <input
                type="text"
                {...register('city')}
                id="city"
                placeholder="Digite a cidade"
                className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.city ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome da Rua
              </label>
              <input
                type="text"
                {...register('street')}
                id="street"
                placeholder="Digite o nome da rua"
                className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.street ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-all duration-300"
            >
              Buscar
            </button>
          </form>
        )}

        {loading && <div className="text-center text-green-500 font-medium">Carregando...</div>}
        {error && <div className="text-center text-red-500 font-medium">{error}</div>}

        {/* Resultados */}
        {!showForm && results.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-center">Resultados Encontrados</h2>
            <ul className="space-y-2">
              {paginatedResults.map((result, index) => (
                <li
                  key={index}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800"
                >
                  <p>
                    <strong>CEP:</strong> {result.cep}
                  </p>
                  <p>
                    <strong>Rua:</strong> {result.street || 'Não informado'}
                  </p>
                  <p>
                    <strong>Bairro:</strong> {result.neighborhood || 'Não informado'}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {result.city} - {result.state}
                  </p>
                </li>
              ))}
            </ul>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
                    } transition-all duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-all duration-300"
              >
                Fazer outra busca
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
