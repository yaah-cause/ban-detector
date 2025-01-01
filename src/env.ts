import { z } from "zod";
import "dotenv/config";

export const EnvironmentSchema = z.object({
    BROWSER_PATH: z.string(),
    BROWSER_HEADLESS: z.boolean({ coerce: true }).optional().default(true),

    KV_HOST: z.string(),
    KV_PORT: z.number({ coerce: true }),

    NUM_WORKERS: z.number({ coerce: true }).optional().default(1),
});

export const env = EnvironmentSchema.parse(process.env);
