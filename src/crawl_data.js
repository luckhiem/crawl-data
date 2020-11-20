const puppeteer = require("puppeteer");
const Utils = require("./ultils");

(async () => {
    const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/browser/8916b773-6a93-4708-8e63-df958cbc57ff';
    const browser = await puppeteer.connect({
        browserWSEndpoint: wsChromeEndpointUrl,
    });
    const page = await browser.newPage();
    await page.goto("https://wefinex.net/index", {
        waitUntil: 'networkidle0'
    });
    await page.setViewport({ width: 1366, height: 768 });
    await page.waitForSelector('path.highcharts-point');
    let result = []
    for (let i = 1; i < 5; i++) {
        await page.click(`path.highcharts-point:nth-child(${i})`)
        const candleResult = await Utils.getValuePerCandle(page, 5);
        result.push(candleResult)
    }
})();