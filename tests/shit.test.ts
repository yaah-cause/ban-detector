import type { Browser } from "puppeteer-core";
import { beforeAll, describe, test, expect } from "vitest";

import { isBanned } from "../src/actors";
import { setup } from "../src/lib/puppeteer";
import { env } from "../src/env";

interface TestCase {
    username: string;
    expect_banned: boolean;
}

const cases: TestCase[] = [
    { username: "you.are.a.hitman", expect_banned: false },
    { username: "ashlee_raining", expect_banned: true },
];

describe("Shit test", () => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await setup({
            executablePath: env.BROWSER_PATH,
            headless: true,
        });
    });

    for (const { username, expect_banned } of cases) {
        const name = `${username} should ${expect_banned ? "be banned" : "not be banned"}`;
        test(name, async () => {
            const banned = await isBanned(browser, username);
            expect(banned).toEqual(expect_banned);
        });
    }
});
