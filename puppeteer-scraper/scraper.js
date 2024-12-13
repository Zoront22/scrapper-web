const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setUserAgent("Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.3");

        // The url page to scraper (WSJ, Fox News, washington times, NY times, washington post, associated press)
        const url = 'https://example.com'; 
        
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('h1, h2, h3', { visible: true,  setTimeout: 0 });
        // Extract data
        const data = await page.evaluate(() => {
            const tittles = Array.from(document.querySelectorAll('h1, h2, h3'));
            return tittles.map(title => title.innerText);
        });

        if (data.length === 0) {
            console.log("No data found")
        } else {
            console.log('extract data complete', data);
        }

        await browser.close();
    } catch (error) {
            console.error('scraper fail', error);
        }
    })();