import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Email inválido."),
    message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
    file: z
        .custom<File | undefined>((val) => val instanceof File || val === undefined, {
            message: "O arquivo deve ser do tipo PDF.",
        })
        .refine((file) => !file || file.type === 'application/pdf', {
            message: "O arquivo deve ser do tipo PDF.",
        })
        .optional(),
});

export type ContactType = z.infer<typeof contactSchema>;
