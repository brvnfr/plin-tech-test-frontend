import { Weather } from '../entities/Weather';
import { WeatherApi } from '../../infrastructure/api/WeatherApi';
import { weatherSchema } from '@/schemas/weatherSchema';

export class WeatherService {
    private api: WeatherApi;

    constructor() {
        this.api = new WeatherApi();
    }

    async getWeatherByCoordinates(lat: number, lon: number): Promise<Weather> {
        const data = await this.api.fetchWeatherByCoordinates(lat, lon);

        const weatherData = weatherSchema.parse({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        });

        return new Weather(weatherData);
    }
}
