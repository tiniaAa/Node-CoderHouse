import { z } from "zod";

export const createServiceSchema = z.object({
    name: z.string({ required_error: "El nombre es obligatorio" })
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string({ required_error: "La descripción es obligatoria" })
        .trim()
        .min(3, "La descripción debe tener al menos 3 caracteres"),
    duration: z.string({ required_error: "La duración es obligatoria" })
        .trim()
        .min(1, "La duración es obligatoria"),
    price: z.coerce.number({ required_error: "El precio es obligatorio" })
        .positive("El precio debe ser un número positivo mayor a 0"),
    category: z.string({ required_error: "La categoría es obligatoria" })
        .trim()
        .min(2, "La categoría debe tener al menos 2 caracteres"),
    available: z.boolean().optional().default(true)
});

export const updateServiceSchema = createServiceSchema.partial();
