import { QueueEvents, Queue, Worker } from "bullmq";

import type { ProcessorConfig } from "./processor";
import { JobProcessor } from "./processor";
import { env } from "@src/env";

const QUEUE_NAME = "yaah-workqueue";
const connection = {
    host: env.KV_HOST,
    port: env.KV_PORT,
};

export function createEvents() {
    return new QueueEvents(QUEUE_NAME, {
        connection,
    });
}

export function createQueue() {
    return new Queue(QUEUE_NAME, {
        connection,
        defaultJobOptions: {
            removeOnComplete: true,

            // Retry indefinitely
            attempts: 10_000,
            backoff: {
                type: "fixed",

                // 15 minutes in milliseconds
                delay: 15 * 60 * 1000,
                // delay: 5 * 1000,
            },
        },
    });
}

export function createWorker(config: ProcessorConfig) {
    const processJob = JobProcessor(config);
    return new Worker(QUEUE_NAME, processJob, {
        connection,
    });
}
