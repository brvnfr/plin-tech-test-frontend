declare global {
    type WeatherApiResponse = {
        coord: {
            lon: number;
            lat: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        wind: {
            speed: number;
            deg: number;
        };
        clouds: {
            all: number;
        };
        sys: {
            country: string;
            sunrise: number;
            sunset: number;
        };
        timezone: number;
        name: string;
        cod: number;
    };


    type CepApiResponse = {
        cep: string;
        logradouro: string;
        complemento?: string | null;
        unidade?: string | null;
        bairro?: string | null;
        localidade: string;
        uf: string;
        estado: string;
        regiao: string;
        ibge: string;
        gia?: string | null;
        ddd: string;
        siafi: string;
    };

    type ContactRequest = {
        name: string;
        email: string;
        message: string;
        file: string;
    };
}

export { };
