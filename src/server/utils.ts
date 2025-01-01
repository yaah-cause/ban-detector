import type { FastifyRequest, FastifyReply } from "fastify";

export function notImplemented(_: FastifyRequest, reply: FastifyReply) {
    reply.status(501).send({
        success: false,
        message: "Not Implemented",
    });
}
