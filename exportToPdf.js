import { promises as fs } from "fs";
import puppeteer from "puppeteer";
import { render } from "resumed";

const resume = JSON.parse(await fs.readFile("resume.json", "utf-8"));
// Load theme defined in meta
const theme = await import(resume.meta.theme);
const html = await render(resume, theme);

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: "networkidle0" });
await page.pdf({
  path: "resume.pdf",
  format: "a4",
  printBackground: true,
  margin: { top: 16, right: 16, bottom: 16, left: 16 },
});
await browser.close();
