import { chromium } from "playwright";
import path from "node:path";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  await page.goto("https://www.tbtool.cn/download/index.html", { timeout: 60000 });

  const [ download ] = await Promise.all([
    page.waitForEvent("download"),
    page.click("text=立即下载")
  ]);

  const savePath = path.resolve(process.cwd(), "tbtool.exe");

  await download.saveAs(savePath);
  console.log("下载完成，文件保存到:", savePath);

  await browser.close();
}

main().catch(console.error);
