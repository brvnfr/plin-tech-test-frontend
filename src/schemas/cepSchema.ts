import { z } from 'zod';

export const cepSchema = z.object({
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
    logradouro: z.string(),
    complemento: z.string().nullable().optional(),
    unidade: z.string().nullable().optional(),
    bairro: z.string().nullable().optional(),
    localidade: z.string(),
    uf: z.string().length(2, 'UF deve ter 2 caracteres'),
    estado: z.string(),
    regiao: z.string(),
    ibge: z.string(),
    gia: z.string().nullable().optional(),
    ddd: z.string(),
    siafi: z.string(),
});

export const cepFormSchema = z.object({
    uf: z.string().min(2, 'UF deve ter 2 caracteres').max(2, 'UF deve ter 2 caracteres'),
    city: z.string().min(3, 'Cidade deve ter pelo menos 3 caracteres'),
    street: z.string().min(3, 'Nome da rua deve ter pelo menos 3 caracteres').nonempty('O logradouro é obrigatório'),
});

export type CepType = z.infer<typeof cepSchema>;
export type CepFormType = z.infer<typeof cepFormSchema>;
