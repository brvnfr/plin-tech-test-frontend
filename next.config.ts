import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    PUBLIC_CEP_API_URL: process.env.PUBLIC_CEP_API_URL,
  },
};

export default nextConfig;
