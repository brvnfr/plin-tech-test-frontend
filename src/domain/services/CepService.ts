import { CepResult } from '../entities/CepResult';
import { CepApi } from '@/infrastructure/api/CepApi';
import { cepSchema } from '@/schemas/cepSchema';

export class CepService {
    private api: CepApi;

    constructor() {
        this.api = new CepApi();
    }

    async searchByStreet(uf: string, city: string, street: string): Promise<CepResult[]> {
        const rawData = await this.api.fetchCepByStreet(uf, city, street);

        if (!Array.isArray(rawData) || rawData.length === 0) {
            throw new Error('Nenhum resultado encontrado.');
        }

        return rawData.map((item) => new CepResult(cepSchema.parse(item)));
    }
}
