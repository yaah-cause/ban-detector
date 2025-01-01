import * as puppeteer from "@lib/puppeteer";
import { z } from "zod";

import { createQueue, createWorker } from "@src/modules/work_queue";
import { createStorage } from "@src/modules/storage";
import { createServer } from "@src/server";
import { env } from "@src/env";

main().catch(console.error);
async function main() {
    console.log("starting ban-detector");

    const browser = await puppeteer.setup({
        executablePath: env.BROWSER_PATH,
        headless: env.BROWSER_HEADLESS,
    });

    const storage = createStorage({
        schema: z.object({
            username: z.string(),
            is_banned: z.boolean(),
        }),
    });

    const queue = createQueue();

    for (let i = 1; i <= env.NUM_WORKERS; i++) {
        console.log(`creating worker #${i}`);
        createWorker({ storage, browser });
    }

    const server = createServer({ browser, storage, queue });
    server.listen({ port: 3000 }, async (err, address) => {
        if (err) {
            await browser.close();
            process.exit(1);
        }

        console.log("server started on:", address);
    });

    signals(async () => {
        console.log("closing server");
        await server.close();

        console.log("closing browser");
        await browser.close();
    });
}

function signals(func: (signal: NodeJS.Signals) => any) {
    const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

    for (const signal of signals) {
        process.on(signal, async () => {
            console.log("received signal:", signal);
            await func(signal);

            process.exit(0); // Exit gracefully
        });
    }
}
