import Fastify from "fastify";
import type { Queue } from "bullmq";
import type { Browser } from "puppeteer-core";

import type { Storage } from "@src/modules/types";
import type {
    AccountInformation,
    BanInformation,
} from "@src/modules/work_queue";

import { router } from "./router";

export interface ServerConfig {
    browser: Browser;
    storage: Storage<AccountInformation & BanInformation>;
    queue: Queue<AccountInformation>;
}

export function createServer(_: ServerConfig) {
    const app = Fastify();
    app.register(router);

    return app;
}
