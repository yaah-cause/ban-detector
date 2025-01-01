import type { FastifyInstance } from "fastify";
import { apiRouter } from "./routes/api";

export function router(app: FastifyInstance) {
    app.register(apiRouter, { prefix: "/api" });

    // TODO: Add overview dashboard
}
