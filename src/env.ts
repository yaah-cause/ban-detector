import { z } from "zod";
import "dotenv/config";

export const EnvironmentSchema = z.object({
    BROWSER_PATH: z.string(),
});

export const env = EnvironmentSchema.parse(process.env);
