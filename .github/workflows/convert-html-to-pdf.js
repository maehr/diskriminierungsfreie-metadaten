import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	const filePath = 'file://' + path.resolve('manuscript/_manuscript/index.html');
	await page.goto(filePath, { waitUntil: 'networkidle0' });

	// Check if the page content is loaded
	const content = await page.content();
	if (!content || content.trim().length === 0) {
		console.error('Page content is empty');
		await browser.close();
		process.exit(1);
	}

	// Create a CDP session
	const client = await page.target().createCDPSession();

	// Set up PDF options
	const pdfOptions = {
		format: 'A4',
		landscape: true,
		printBackground: true,
		marginTop: 1 * 72,
		marginBottom: 1 * 72,
		marginLeft: 1 * 72,
		marginRight: 1 * 72,
	};

	// Generate the PDF using the DevTools Protocol
	const pdfBuffer = await client.send('Page.printToPDF', pdfOptions);

	// Write the PDF to a file
	const outputFilePath = 'manuscript/_manuscript/handbuch-diskriminierungsfreie-metadaten.pdf';
	fs.writeFileSync(outputFilePath, Buffer.from(pdfBuffer.data, 'base64'));

	await browser.close();
})();
