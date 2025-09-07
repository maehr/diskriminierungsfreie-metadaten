#!/usr/bin/env node

/**
 * Fetch the latest DOI and date from Zenodo API and replace placeholders in files
 * This script queries the Zenodo API for the latest version of the concept DOI
 * and replaces {{LATEST_DOI}} and {{LATEST_DATE}} placeholders in specified files.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ZENODO_CONCEPT_ID = '11124719';
const ZENODO_API_URL = `https://zenodo.org/api/records/${ZENODO_CONCEPT_ID}/versions/latest`;
const DOI_PLACEHOLDER = '{{LATEST_DOI}}';
const DOI_SPACED_PLACEHOLDER = '{ { LATEST_DOI } }';
const DATE_PLACEHOLDER = '{{LATEST_DATE}}';
const DATE_SPACED_PLACEHOLDER = '{ { LATEST_DATE } }';

/**
 * Fetch the latest DOI and date from Zenodo API
 * @returns {Promise<{doi: string, date: string}>} The latest DOI and publication date
 */
async function fetchLatestData() {
	try {
		console.log(`Fetching latest data from: ${ZENODO_API_URL}`);

		const response = await fetch(ZENODO_API_URL);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const doi = data.doi;
		const date = data.publication_date;

		if (!doi) {
			throw new Error('DOI not found in API response');
		}

		if (!date) {
			throw new Error('Publication date not found in API response');
		}

		console.log(`Latest DOI: ${doi}`);
		console.log(`Latest date: ${date}`);
		return { doi, date };
	} catch (error) {
		console.error('Error fetching data:', error);
		// Fallback to current values if API fails
		const fallbackDOI = '10.5281/zenodo.11124720';
		const fallbackDate = '2024-06-03';
		console.warn(`Using fallback DOI: ${fallbackDOI}`);
		console.warn(`Using fallback date: ${fallbackDate}`);
		return { doi: fallbackDOI, date: fallbackDate };
	}
}

/**
 * Replace placeholders in a file with the actual DOI and date
 * @param {string} filePath - Path to the file
 * @param {string} doi - The DOI to inject
 * @param {string} date - The date to inject
 */
function replaceDataInFile(filePath, doi, date) {
	try {
		console.log(`Processing file: ${filePath}`);

		const content = readFileSync(filePath, 'utf8');

		const hasDOIPlaceholder =
			content.includes(DOI_PLACEHOLDER) || content.includes(DOI_SPACED_PLACEHOLDER);
		const hasDatePlaceholder =
			content.includes(DATE_PLACEHOLDER) || content.includes(DATE_SPACED_PLACEHOLDER);

		if (!hasDOIPlaceholder && !hasDatePlaceholder) {
			console.log(`No placeholders found in ${filePath}, skipping`);
			return;
		}

		let updatedContent = content;

		// Replace DOI placeholders
		if (hasDOIPlaceholder) {
			updatedContent = updatedContent.replace(new RegExp(DOI_PLACEHOLDER, 'g'), doi);
			updatedContent = updatedContent.replace(
				new RegExp(DOI_SPACED_PLACEHOLDER.replace(/[{}]/g, '\\$&'), 'g'),
				doi
			);
			console.log(`Updated DOI in ${filePath}: ${doi}`);
		}

		// Replace date placeholders
		if (hasDatePlaceholder) {
			updatedContent = updatedContent.replace(new RegExp(DATE_PLACEHOLDER, 'g'), date);
			updatedContent = updatedContent.replace(
				new RegExp(DATE_SPACED_PLACEHOLDER.replace(/[{}]/g, '\\$&'), 'g'),
				date
			);
			console.log(`Updated date in ${filePath}: ${date}`);
		}

		writeFileSync(filePath, updatedContent, 'utf8');
		console.log(`Successfully processed ${filePath}`);
	} catch (error) {
		console.error(`Error processing file ${filePath}:`, error);
	}
}

/**
 * Main function
 */
async function main() {
	console.log('Starting DOI and date injection process...');

	const { doi, date } = await fetchLatestData();

	// Files that need DOI and/or date replacement
	const files = [
		'README.md',
		'manuscript/handbuch-diskriminierungsfreie-metadaten.qmd',
		'manuscript/_quarto.yml',
		'CITATION.cff'
	];

	files.forEach((file) => {
		const fullPath = join(process.cwd(), file);
		replaceDataInFile(fullPath, doi, date);
	});

	console.log('DOI and date injection process completed!');
}

// Run the script
main().catch((error) => {
	console.error('Script failed:', error);
	process.exit(1);
});
