const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({
    toMatchImageSnapshot,
});

describe('snapshot-test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await page.close();
        await browser.close();
    });

    const urls = [
        'http://web:80',
        'https://example.com',
    ];

    urls.forEach((url) => {
        it(url, async () => {
            await page.goto(url);
            const image = await page.screenshot();
            expect(image).toMatchImageSnapshot();
        });
    })
});
