import type { FastifyInstance } from "fastify";
import { notImplemented } from "../utils";

export function apiRouter(app: FastifyInstance) {
    app.get("/status", notImplemented);

    app.get("/accounts", notImplemented);

    app.get("/queue", notImplemented);
    app.post("/queue", notImplemented);
}
