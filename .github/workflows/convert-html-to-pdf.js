import puppeteer from 'puppeteer';
import fs from 'fs';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto('file://' + process.cwd() + '/manuscript/_manuscript/index.html', {
	waitUntil: 'networkidle0'
});

const client = await page.target().createCDPSession();

const pdfOptions = {
	format: 'A4',
	landscape: true,
	printBackground: true,
	marginTop: 1 * 72,
	marginBottom: 1 * 72,
	marginLeft: 1 * 72,
	marginRight: 1 * 72
};

const pdfBuffer = await client.send('Page.printToPDF', pdfOptions);

fs.writeFileSync(
	'manuscript/_manuscript/handbuch-diskriminierungsfreie-metadaten.pdf',
	Buffer.from(pdfBuffer.data, 'base64')
);

await browser.close();
