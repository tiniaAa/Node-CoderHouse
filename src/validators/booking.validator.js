import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createBookingSchema = z.object({
    clientName: z.string({ required_error: "El nombre del cliente es obligatorio" })
        .trim()
        .min(2, "El nombre del cliente debe tener al menos 2 caracteres"),
    clientEmail: z.string({ required_error: "El email del cliente es obligatorio" })
        .trim()
        .email("Debe ser un email válido (ej: cliente@dominio.com)"),
    date: z.string({ required_error: "La fecha es obligatoria" })
        .trim()
        .min(1, "La fecha es obligatoria"),
    time: z.string({ required_error: "La hora es obligatoria" })
        .trim()
        .min(1, "La hora es obligatoria"),
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional().default("pending"),
    services: z.array(
        z.object({
            service: z.string().regex(objectIdRegex, "El id del servicio debe ser un ObjectId válido"),
            quantity: z.number().int().positive().optional().default(1)
        })
    ).optional().default([])
});

export const addServiceToBookingParamsSchema = z.object({
    bid: z.string().regex(objectIdRegex, "El id de la reserva (bid) debe ser un ObjectId válido de 24 caracteres hexadecimales"),
    sid: z.string().regex(objectIdRegex, "El id del servicio (sid) debe ser un ObjectId válido de 24 caracteres hexadecimales")
});
