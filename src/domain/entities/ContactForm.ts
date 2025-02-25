import { ContactType } from '@/schemas/contactSchema';

export class ContactForm {
    constructor(private props: ContactType) { }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get message() {
        return this.props.message;
    }

    get file() {
        return this.props.file;
    }
}
