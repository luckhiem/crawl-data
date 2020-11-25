class ElementHandler {
    async waitForOrderCandleFinished(page) {
        return await page.waitForXPath("//div[@id='rightContent']//p[text()='Hãy đặt lệnh']", { timeout: 60000 });
    }

    async waitForDisplayResultFinished(page) {
        return await page.waitForXPath("//div[@id='rightContent']//p[text()='Chờ Kết quả']", { timeout: 60000 });
    }
}

module.exports = new ElementHandler()