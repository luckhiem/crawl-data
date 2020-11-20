class Utils {
    async getValuePerCandle(page, candleIndex) {
        const O_VALUE_LOCATOR = await page.$x(`//*[@class='highcharts-point highcharts-point-down'][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[1]/span[1]`);
        const C_VALUE_LOCATOR = await page.$x(`//*[@class='highcharts-point highcharts-point-down'][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[2]`);
        const H_VALUE_LOCATOR = await page.$x(`//*[@class='highcharts-point highcharts-point-down'][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[4]`);
        const L_VALUE_LOCATOR = await page.$x(`//*[@class='highcharts-point highcharts-point-down'][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[5]`);
        const VOL_VALUE_LOCATOR = await page.$x(`//*[@class='highcharts-point highcharts-point-down'][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[6]`);
        let O_Result = await page.evaluate((el) => { return el.textContent }, O_VALUE_LOCATOR[0]);
        let C_Result = await page.evaluate((el) => { return el.textContent }, C_VALUE_LOCATOR[0]);
        let H_Result = await page.evaluate((el) => { return el.textContent }, H_VALUE_LOCATOR[0]);
        let L_Result = await page.evaluate((el) => { return el.textContent }, L_VALUE_LOCATOR[0]);
        let Vol_Result = await page.evaluate((el) => { return el.textContent }, VOL_VALUE_LOCATOR[0]);
        return {
            O: O_Result,
            C: C_Result,
            H: H_Result,
            L: L_Result,
            Vol: Vol_Result
        }
    }
}
module.exports = new Utils()