import { z } from 'zod';

export const weatherSchema = z.object({
    city: z.string(),
    temperature: z.number(),
    description: z.string(),
    icon: z.string(),
});

export type WeatherType = z.infer<typeof weatherSchema>;
