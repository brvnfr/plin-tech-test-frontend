import { HttpClient } from './HttpClient';

export class ContactApi extends HttpClient {
    constructor() {
        super(process.env.NEXT_PUBLIC_CONTACT_API_URL as string);
    }

    async submitForm(data: ContactRequest): Promise<void> {
        return this.post<void>('/submit', data);
    }
}
