import { ContactForm } from '../entities/ContactForm';
import { contactSchema } from '@/schemas/contactSchema';

export class ContactService {
    static async submitForm(data: FormData) {
        const validatedData = contactSchema.parse(Object.fromEntries(data.entries()));
        const contactForm = new ContactForm(validatedData);

        console.log("Formulário enviado com sucesso:");
        console.log({
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
            file: contactForm.file ? contactForm.file.name : null,
        });

        return null;
    }
}
