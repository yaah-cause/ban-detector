import type { Browser } from "puppeteer-core";
import type { Job } from "bullmq";

import type { Storage } from "@src/modules/types";
import { isBanned } from "@src/actors";

export interface AccountInformation {
    username: string;
}

export interface BanInformation {
    is_banned: boolean;
}

export interface ProcessorConfig {
    storage: Storage<AccountInformation & BanInformation>;
    browser: Browser;
}

export function JobProcessor(config: ProcessorConfig) {
    const { browser, storage } = config;
    return async function (job: Job<AccountInformation>) {
        const { username } = job.data;

        const info = await storage.get(username);
        if (info?.is_banned) {
            console.log(`[BANNED] ${username} is already banned`);
            return;
        }

        const is_banned = await isBanned(browser, username);
        await storage.set(username, { username, is_banned });
        if (!is_banned) {
            console.log(`[NOT_BANNED] ${username} has not been banned (yet)`);
            throw new Error(`${username} is not banned (yet)`);
        }

        console.log(`[BANNED] ${username} has been banned`);
    };
}
