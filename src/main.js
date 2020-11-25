const puppeteer = require("puppeteer");
const XLSX = require('xlsx')
const Utils = require("./ultils");
const axios = require('axios');
const moment = require('moment');
const ElementHandler = require('./elementHandler');

(async () => {
    const fileIndex = moment().format("DD-MM-YYYY_hh-mm-ss_A")
    const response = await axios.get(`http://localhost:9222/json/version`);
    const { webSocketDebuggerUrl } = response.data;
    const wsChromeEndpointUrl = webSocketDebuggerUrl
    const browser = await puppeteer.connect({
        browserWSEndpoint: wsChromeEndpointUrl,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto("https://wefinex.net/index", {
        waitUntil: 'networkidle0'
    });
    await ElementHandler.waitForOrderCandleFinished(page)
    await page.waitForSelector('path.highcharts-point')
    const totalCandle = await page.$$('path.highcharts-point');
    const lastCandle = totalCandle.length - 1;
    const candleData = [];
    while (1 === 1) {
        for (let j = 0; j < 60; j++) {
            await ElementHandler.waitForDisplayResultFinished(page)
            await page.waitForSelector(`path.highcharts-point:nth-child(${lastCandle})`);
            await page.click(`path.highcharts-point:nth-child(${lastCandle})`);
            let candleResult = await Utils.getValuePerCandle(page, lastCandle, 1);
            candleData.unshift(candleResult);
            await ElementHandler.waitForOrderCandleFinished(page)
            await page.waitForSelector(`path.highcharts-point:nth-child(${lastCandle})`);
            await page.click(`path.highcharts-point:nth-child(${lastCandle})`);
            let candleResult1 = await Utils.getValuePerCandle(page, lastCandle, 1);
            candleData.unshift(candleResult1);
        }
        const data = XLSX.utils.json_to_sheet(candleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, data)
        XLSX.writeFile(workbook, `data/data_${fileIndex}.xlsx`);
    }
})();