#!/usr/bin/env node

/**
 * Fetch the latest DOI from Zenodo API and replace placeholders in files
 * This script queries the Zenodo API for the latest version of the concept DOI
 * and replaces {{LATEST_DOI}} placeholders in specified files.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ZENODO_CONCEPT_ID = '11124719';
const ZENODO_API_URL = `https://zenodo.org/api/records/${ZENODO_CONCEPT_ID}/versions/latest`;
const PLACEHOLDER = '{{LATEST_DOI}}';
const SPACED_PLACEHOLDER = '{ { LATEST_DOI } }';

/**
 * Fetch the latest DOI from Zenodo API
 * @returns {Promise<string>} The latest DOI
 */
async function fetchLatestDOI() {
	try {
		console.log(`Fetching latest DOI from: ${ZENODO_API_URL}`);

		const response = await fetch(ZENODO_API_URL);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const doi = data.doi;

		if (!doi) {
			throw new Error('DOI not found in API response');
		}

		console.log(`Latest DOI: ${doi}`);
		return doi;
	} catch (error) {
		console.error('Error fetching DOI:', error);
		// Fallback to current DOI if API fails
		const fallbackDOI = '10.5281/zenodo.11124720';
		console.warn(`Using fallback DOI: ${fallbackDOI}`);
		return fallbackDOI;
	}
}

/**
 * Replace placeholder in a file with the actual DOI
 * @param {string} filePath - Path to the file
 * @param {string} doi - The DOI to inject
 */
function replaceDOIInFile(filePath, doi) {
	try {
		console.log(`Processing file: ${filePath}`);

		const content = readFileSync(filePath, 'utf8');

		if (!content.includes(PLACEHOLDER) && !content.includes(SPACED_PLACEHOLDER)) {
			console.log(`No placeholder found in ${filePath}, skipping`);
			return;
		}

		let updatedContent = content.replace(new RegExp(PLACEHOLDER, 'g'), doi);
		updatedContent = updatedContent.replace(
			new RegExp(SPACED_PLACEHOLDER.replace(/[{}]/g, '\\$&'), 'g'),
			doi
		);
		writeFileSync(filePath, updatedContent, 'utf8');

		console.log(`Updated ${filePath} with DOI: ${doi}`);
	} catch (error) {
		console.error(`Error processing file ${filePath}:`, error);
	}
}

/**
 * Main function
 */
async function main() {
	console.log('Starting DOI injection process...');

	const doi = await fetchLatestDOI();

	// Files that need DOI replacement
	const files = [
		'README.md',
		'manuscript/handbuch-diskriminierungsfreie-metadaten.qmd',
		'manuscript/_quarto.yml',
		'CITATION.cff'
	];

	files.forEach((file) => {
		const fullPath = join(process.cwd(), file);
		replaceDOIInFile(fullPath, doi);
	});

	console.log('DOI injection process completed!');
}

// Run the script
main().catch((error) => {
	console.error('Script failed:', error);
	process.exit(1);
});
