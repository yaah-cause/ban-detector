import { z } from "zod";

interface StorageConfig<TSchema extends z.ZodSchema> {
    schema: TSchema;
}

export function createStorage<TSchema extends z.ZodSchema>(
    config: StorageConfig<TSchema>,
) {
    const records: Map<string, z.infer<TSchema>> = new Map();

    return {
        async get(key: string) {
            const data = records.get(key);
            return data ?? null;
        },
        async set(key: string, data: z.infer<TSchema>) {
            data = config.schema.parse(data);
            records.set(key, data);
            return data;
        },
        async delete(key: string) {
            if (records.has(key)) {
                records.delete(key);
                return true;
            }

            return false;
        },
    };
}
