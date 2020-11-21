
class Utils {
    dataFormater(text){
        const data = text.split(":")
        return data[1]
    }

    async getValuePerCandle(page, candleIndex) {
        let datetime = new Date().toLocaleString();
        let O_Result;
        let C_Result;
        let H_Result;
        let L_Result;
        let Vol_Result;
        const O_VALUE_LOCATOR = await page.$x(`//*[contains(@class, 'highcharts-candlestick-series')]//*[contains(@class,'highcharts-point')][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[1]/span[1]`);
        const C_VALUE_LOCATOR = await page.$x(`//*[contains(@class, 'highcharts-candlestick-series')]//*[contains(@class,'highcharts-point')][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[2]`);
        const H_VALUE_LOCATOR = await page.$x(`//*[contains(@class, 'highcharts-candlestick-series')]//*[contains(@class,'highcharts-point')][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[4]`);
        const L_VALUE_LOCATOR = await page.$x(`//*[contains(@class, 'highcharts-candlestick-series')]//*[contains(@class,'highcharts-point')][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[5]`);
        const VOL_VALUE_LOCATOR = await page.$x(`//*[contains(@class, 'highcharts-candlestick-series')]//*[contains(@class,'highcharts-point')][${candleIndex}]//ancestor::div[@class='highcharts-container ']//div[contains(@class, 'highcharts-tooltip')]//span[6]`);
        if (O_VALUE_LOCATOR.length >= 1) {
            let O_Data = await page.evaluate((el) => { return el.textContent }, O_VALUE_LOCATOR[0]);
            O_Result = this.dataFormater(O_Data)
        }
        if (C_VALUE_LOCATOR.length >= 1) {
            let C_Data = await page.evaluate((el) => { return el.textContent }, C_VALUE_LOCATOR[0]);
            C_Result = this.dataFormater(C_Data)
        }
        if (H_VALUE_LOCATOR.length >= 1) {
            let H_Data = await page.evaluate((el) => { return el.textContent }, H_VALUE_LOCATOR[0]);
            H_Result = this.dataFormater(H_Data)
        }
        if (L_VALUE_LOCATOR.length >= 1) {
            let L_Data = await page.evaluate((el) => { return el.textContent }, L_VALUE_LOCATOR[0]);
            L_Result = this.dataFormater(L_Data)
        }
        if (VOL_VALUE_LOCATOR.length >= 1) {
            let Vol_Data = await page.evaluate((el) => { return el.textContent }, VOL_VALUE_LOCATOR[0]);
            Vol_Result = this.dataFormater(Vol_Data)
        }
        return {
            index: candleIndex,
            datetime: datetime,
            O: O_Result,
            C: C_Result,
            H: H_Result,
            L: L_Result,
            Vol: Vol_Result
        }
    }
}
module.exports = new Utils()