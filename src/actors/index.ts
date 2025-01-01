import type { Browser } from "puppeteer-core";

export async function isBanned(browser: Browser, username: string) {
    const url = new URL("https://instagram.com");
    url.pathname = username;

    const page = await browser.newPage();
    await page.goto(url.toString());

    try {
        await page.waitForFunction(
            (text) => document.body.innerText.includes(text),
            { timeout: 10_000 },
            "Sorry, this page isn't available.",
        );
        await page.close();
        return true;
    } catch {
        await page.close();
        return false;
    }
}
