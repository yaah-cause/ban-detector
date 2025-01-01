import * as puppeteer from "@lib/puppeteer";
import { env } from "@src/env";

main().catch(console.error);
async function main() {
    console.log("starting ban-detector");
    const browser = await puppeteer.setup({
        executablePath: env.BROWSER_PATH,
        headless: false,
    });

    // TODO

    await browser.close();
}
