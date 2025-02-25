import { HttpClient } from './HttpClient';

const API_KEY = process.env.WEATHER_API_KEY || '';
const BASE_URL = process.env.WEATHER_API_URL || '';

export class WeatherApi extends HttpClient {
    constructor() {
        super(BASE_URL);
    }

    async fetchWeatherByCoordinates(lat: number, lon: number): Promise<WeatherApiResponse> {

        return this.get<WeatherApiResponse>('/data/2.5/weather', {
            lat,
            lon,
            units: 'metric',
            lang: 'pt_br',
            APPID: API_KEY,
        });
    }
}
