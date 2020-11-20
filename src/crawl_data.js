const puppeteer = require("puppeteer");

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
    await page.click("path.highcharts-point:nth-child(5)")
    const O_VALUE_LOCATOR  = await page.$x("//*[@class='highcharts-point highcharts-point-down'][2]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[1]/span[1]");
    const C_VALUE_LOCATOR  = await page.$x("//*[@class='highcharts-point highcharts-point-down'][2]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[2]");
    const H_VALUE_LOCATOR  = await page.$x("//*[@class='highcharts-point highcharts-point-down'][2]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[4]");
    const L_VALUE_LOCATOR  = await page.$x("//*[@class='highcharts-point highcharts-point-down'][2]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[5]");
    const VOL_VALUE_LOCATOR  = await page.$x("//*[@class='highcharts-point highcharts-point-down'][2]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[6]");
    let O_Result = await page.evaluate((el) => {return el.textContent}, O_VALUE_LOCATOR[0]);
    let C_Result = await page.evaluate((el) => {return el.textContent}, C_VALUE_LOCATOR[0]);
    let H_Result = await page.evaluate((el) => {return el.textContent}, H_VALUE_LOCATOR[0]);
    let L_Result = await page.evaluate((el) => {return el.textContent}, L_VALUE_LOCATOR[0]);
    let Vol_Result = await page.evaluate((el) => {return el.textContent}, VOL_VALUE_LOCATOR[0]);
    console.log(O_Result);
    console.log(C_Result);
    console.log(H_Result)
    console.log(L_Result)
    console.log(Vol_Result)
})();