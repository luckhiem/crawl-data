const puppeteer = require("puppeteer");
const XLSX = require('xlsx')
const Utils = require("./ultils");

(async () => {
    const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/browser/9799ab1d-f347-476c-bebf-644d7223f9a6';
    const browser = await puppeteer.connect({
        browserWSEndpoint: wsChromeEndpointUrl,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto("https://wefinex.net/index", {
        waitUntil: 'networkidle0'
    });
    await page.waitForSelector('path.highcharts-point');
    const total_candle = await page.$$('path.highcharts-point')
    let result = []
    const test = await Utils.getTimeLabel(page);
    console.log(test)
    for (let i = 1; i < total_candle.length; i++) {
        await page.waitForSelector(`path.highcharts-point:nth-child(${i})`);
        await page.click(`path.highcharts-point:nth-child(${i})`)
        const candleResult = await Utils.getValuePerCandle(page, i);
        result.push(candleResult)
    }
    const data = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, data) 
    XLSX.writeFile(workbook, 'data.xlsx');
})();