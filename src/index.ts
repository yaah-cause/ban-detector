import * as puppeteer from "@lib/puppeteer";
import { z } from "zod";

import { createQueue, createWorker } from "@src/modules/work_queue";
import { createStorage } from "@src/modules/storage";
import { sleep } from "@src/utils";
import { env } from "@src/env";

main().catch(console.error);
async function main() {
    console.log("starting ban-detector");

    const browser = await puppeteer.setup({
        executablePath: env.BROWSER_PATH,
        headless: false,
    });

    const storage = createStorage({
        schema: z.object({
            username: z.string(),
            is_banned: z.boolean(),
        }),
    });

    for (let i = 1; i <= env.NUM_WORKERS; i++) {
        console.log(`creating worker #${i}`);
        createWorker({ storage, browser });
    }

    const queue = createQueue();

    const usernames = [
        "ashlee_raining",
        "you.are.a.hitman",
        "grouphub_",
        "cilp1_0",
        "xvideo_gifs33",
    ];
    for (const username of usernames) {
        console.log(`adding ${username} to queue`);
        await queue.add(username, { username });
    }

    await sleep(30_000);
    await browser.close();
}
