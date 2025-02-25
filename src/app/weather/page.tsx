'use client';

import { useEffect, useState } from 'react';
import { WeatherService } from '@/domain/services/WeatherService';
import { UserLocationService } from '@/infrastructure/utils/UserLocationService';
import { Weather } from '@/domain/entities/Weather';

export default function WeatherPage() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState<boolean>(false);

  const weatherService = new WeatherService();
  const locationService = new UserLocationService();

  async function fetchWeatherByLocation() {
    try {
      const { lat, lon } = await locationService.getLocation();
      const weatherData = await weatherService.getWeatherByCoordinates(lat, lon);
      setWeather(weatherData);
      setError(null);
      setLocationDenied(false);
    } catch {
      setLocationDenied(true);
    }
  }

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-all duration-500">
      <h1 className="text-3xl font-bold mb-6">Clima</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Card Centralizado e Reduzido */}
      {weather ? (
        <div className="group relative text-center bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 text-gray-900 dark:text-gray-200 rounded-3xl shadow-lg p-4 w-64 sm:w-80 transition-all duration-500 ease-in-out overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-3xl mix-blend-overlay" />
          </div>

          <h2 className="text-2xl font-bold capitalize mb-2">{weather.city}</h2>
          <p className="text-md capitalize mb-3">{weather.description}</p>
          <img src={weather.icon} alt="Weather icon" className="mx-auto w-20 h-20 mb-3" />
          <p className="text-5xl font-bold mb-2">{Math.round(weather.temperature)}°</p>
          <div className="flex justify-center items-center gap-6 mt-3">
            <div className="w-14 h-14 border-2 border-gray-500 border-dotted dark:border-gray-400 rounded-full flex items-center justify-center">
              <div>
                <p className="text-xs mb-1">Max</p>
                <p className="text-lg font-bold">34°</p>
              </div>
            </div>
            <div className="w-14 h-14 border-2 border-gray-500 border-dotted dark:border-gray-400 rounded-full flex items-center justify-center">
              <div>
                <p className="text-xs mb-1">Min</p>
                <p className="text-lg font-bold">30°</p>
              </div>
            </div>
          </div>
        </div>
      ) : locationDenied ? (
        <div className="flex flex-col items-center space-y-4 bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-3xl p-4 w-64 sm:w-80">
          <p className="text-md">Não foi possível obter sua localização.</p>
        </div>
      ) : (
        <div className="text-center">Carregando...</div>
      )}
    </div>
  );
}
