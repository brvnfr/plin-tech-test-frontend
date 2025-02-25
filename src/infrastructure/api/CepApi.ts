import { HttpClient } from './HttpClient';

const BASE_URL = process.env.PUBLIC_CEP_API_URL || '';

export class CepApi extends HttpClient {
    constructor() {
        super(BASE_URL);
    }

    async fetchCepByStreet(uf: string, city: string, street: string): Promise<CepApiResponse[]> {
        return await this.get<CepApiResponse[]>(
            `/${uf}/${encodeURIComponent(city)}/${encodeURIComponent(street)}/json/`
        );
    }
}
