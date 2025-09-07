#!/usr/bin/env node

/**
 * Validate DOI and date consistency across project files
 * This script checks that DOI and date values are consistent across all metadata files
 * and validates against the latest version from Zenodo API.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Zenodo API endpoint for the latest version
const ZENODO_API_URL = 'https://zenodo.org/api/records/11124719/versions/latest';

// Fallback values if API is not accessible
const FALLBACK_DOI = '10.5281/zenodo.17073511';
const FALLBACK_DATE = '2024-06-03';

/**
 * Fetch latest DOI and publication date from Zenodo API
 * @returns {Promise<{doi: string, date: string}>} Latest DOI and date from Zenodo
 */
async function fetchLatestFromZenodo() {
	try {
		console.log('🌐 Fetching latest version from Zenodo API...');

		const response = await fetch(ZENODO_API_URL);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data = await response.json();

		// Extract DOI and publication date from Zenodo response
		const doi = data.doi;
		const publicationDate = data.metadata?.publication_date || data.created?.split('T')[0];

		console.log(`✅ Retrieved from Zenodo: DOI ${doi}, Date ${publicationDate}`);

		return {
			doi: doi,
			date: publicationDate
		};
	} catch (error) {
		console.warn(`⚠️  Failed to fetch from Zenodo API: ${error.message}`);
		console.log(`📋 Using fallback values: DOI ${FALLBACK_DOI}, Date ${FALLBACK_DATE}`);

		return {
			doi: FALLBACK_DOI,
			date: FALLBACK_DATE
		};
	}
}

/**
 * Extract DOI from a file content based on file type
 * @param {string} content - File content
 * @param {string} fileName - File name to determine extraction method
 * @returns {string|null} Extracted DOI or null if not found
 */
function extractDOI(content, fileName) {
	if (fileName.endsWith('.cff')) {
		// CITATION.cff: value: '10.5281/zenodo.17073511'
		const match = content.match(/value:\s*['"]([^'"]+)['"]/);
		return match ? match[1] : null;
	} else if (fileName.endsWith('.qmd')) {
		// QMD: doi: 10.5281/zenodo.17073511
		const match = content.match(/doi:\s*([^\s\n]+)/);
		return match ? match[1] : null;
	} else if (fileName.endsWith('.yml')) {
		// YAML: doi: '10.5281/zenodo.17073511'
		const match = content.match(/doi:\s*['"]([^'"]+)['"]/);
		return match ? match[1] : null;
	} else if (fileName.endsWith('.md')) {
		// README.md: https://doi.org/10.5281/zenodo.11124719 (parent DOI, not specific version)
		// We should NOT validate the parent DOI against the specific version DOI
		return null; // Skip DOI validation for README.md as it contains parent DOI
	}
	return null;
}

/**
 * Extract date from a file content based on file type
 * @param {string} content - File content
 * @param {string} fileName - File name to determine extraction method
 * @returns {string|null} Extracted date or null if not found
 */
function extractDate(content, fileName) {
	if (fileName.endsWith('.cff')) {
		// CITATION.cff: date-released: '2025-09-07'
		const match = content.match(/date-released:\s*['"]([^'"]+)['"]/);
		return match ? match[1] : null;
	} else if (fileName.endsWith('.qmd')) {
		// QMD: date: 2024-06-03
		const match = content.match(/^date:\s*([^\s\n]+)/m);
		return match ? match[1] : null;
	}
	return null;
}

/**
 * Validate DOI and date in a specific file
 * @param {string} filePath - Path to the file
 * @param {string} expectedDoi - Expected DOI value
 * @param {string} expectedDate - Expected date value
 * @returns {Object} Validation result
 */
function validateFile(filePath, expectedDoi, expectedDate) {
	try {
		console.log(`Validating file: ${filePath}`);

		const content = readFileSync(filePath, 'utf8');
		const fileName = filePath.split('/').pop();

		const doi = extractDOI(content, fileName);
		const date = extractDate(content, fileName);

		const result = {
			file: filePath,
			doi: doi,
			date: date,
			doiValid: doi === expectedDoi,
			dateValid: date === expectedDate || date === null, // Date is optional for some files
			errors: []
		};

		if (doi && !result.doiValid) {
			result.errors.push(`DOI mismatch: found "${doi}", expected "${expectedDoi}"`);
		}

		if (date && !result.dateValid) {
			result.errors.push(`Date mismatch: found "${date}", expected "${expectedDate}"`);
		}

		// Skip DOI validation for README.md as it contains parent DOI
		if (fileName.endsWith('.md') && fileName.includes('README')) {
			console.log(
				`  README.md contains parent DOI (10.5281/zenodo.11124719) - skipping version DOI validation ✅`
			);
			result.doiValid = true; // Mark as valid since README should have parent DOI
			result.errors = result.errors.filter((error) => !error.includes('DOI mismatch'));
		} else if (!doi) {
			result.errors.push('No DOI found in file');
		}

		console.log(`  DOI: ${doi || 'NOT FOUND'} ${result.doiValid ? '✅' : '❌'}`);
		if (date) {
			console.log(`  Date: ${date} ${result.dateValid ? '✅' : '❌'}`);
		}

		return result;
	} catch (error) {
		console.error(`Error validating file ${filePath}:`, error);
		return {
			file: filePath,
			doi: null,
			date: null,
			doiValid: false,
			dateValid: false,
			errors: [`File read error: ${error.message}`]
		};
	}
}

/**
 * Main validation function
 */
async function main() {
	console.log('🔍 Starting DOI and date validation...');

	// Fetch latest DOI and date from Zenodo API
	const { doi: expectedDoi, date: expectedDate } = await fetchLatestFromZenodo();

	console.log(`Expected DOI: ${expectedDoi}`);
	console.log(`Expected Date: ${expectedDate}`);
	console.log('');

	// Files that should contain DOI and/or date information
	const files = [
		'README.md', // Contains parent DOI, will be skipped for version validation
		'manuscript/handbuch-diskriminierungsfreie-metadaten.qmd',
		'manuscript/_quarto.yml',
		'CITATION.cff'
	];

	const results = [];
	let hasErrors = false;

	for (const file of files) {
		const fullPath = join(process.cwd(), file);
		const result = validateFile(fullPath, expectedDoi, expectedDate);
		results.push(result);

		if (result.errors.length > 0) {
			hasErrors = true;
		}
	}

	console.log('\n📋 Validation Summary:');
	console.log('='.repeat(50));

	for (const result of results) {
		const status = result.errors.length === 0 ? '✅ PASS' : '❌ FAIL';
		console.log(`${status} ${result.file}`);

		if (result.errors.length > 0) {
			result.errors.forEach((error) => {
				console.log(`  ⚠️  ${error}`);
			});
		}
	}

	console.log('='.repeat(50));

	if (hasErrors) {
		console.log('❌ Validation FAILED - Please fix the above issues');
		process.exit(1);
	} else {
		console.log('✅ All files passed validation!');
		console.log('🎉 DOI and date consistency check completed successfully');
	}
}

// Run the script
main().catch((error) => {
	console.error('Script failed:', error);
	process.exit(1);
});
