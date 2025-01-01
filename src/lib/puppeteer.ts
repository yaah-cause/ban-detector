import type { LaunchOptions } from "puppeteer-core";
import puppeteer from "puppeteer-core";

export async function setup(opts: LaunchOptions) {
    return await puppeteer.launch(opts);
}
