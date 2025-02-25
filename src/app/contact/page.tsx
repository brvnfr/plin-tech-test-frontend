'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactType } from '@/schemas/contactSchema';
import { ContactService } from '@/domain/services/ContactService';

export default function ContactPage() {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ContactType>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactType) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);
        if (data.file) formData.append('file', data.file);

        await ContactService.submitForm(formData);
        reset();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-all duration-500">
            <div className="w-full max-w-lg bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-3xl shadow-lg p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center">Contato</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Nome"
                            className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                                errors.name ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email"
                            className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                                errors.email ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Mensagem */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem</label>
                        <textarea
                            {...register('message')}
                            placeholder="Mensagem"
                            className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                                errors.message ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Arquivo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Arquivo (PDF)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setValue('file', file);
                            }}
                            className={`w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ${
                                errors.file ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
                    </div>

                    {/* Botão de Envio */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-all duration-300"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
