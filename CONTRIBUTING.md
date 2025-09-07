# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## DOI and Date Management

This repository manages DOI and publication date consistency across all metadata files. The system works as follows:

### How it works

1. **Hardcoded Values**: DOI and dates are hardcoded directly in source files for reliability
2. **Validation Script**: A validation script (`scripts/fetch-latest-doi.js`) checks consistency across files
3. **Quality Assurance**: Ensures all metadata files reference the correct DOI and dates

### Files with DOI information

- `README.md`: Zenodo badge with DOI link
- `manuscript/handbuch-diskriminierungsfreie-metadaten.qmd`: Citation DOI
- `manuscript/_quarto.yml`: Format DOI
- `CITATION.cff`: Official citation DOI and release date

### Manual DOI and date validation

To validate DOI and date consistency across all files:

```bash
npm run validate-doi
# or
node scripts/fetch-latest-doi.js
```

### Technical details

- **Current DOI**: `10.5281/zenodo.17073511` (v1.0.1 release)
- **Release Date**: `2024-06-03`
- **Script Location**: `scripts/fetch-latest-doi.js` (validation mode)
- **Expected Values**: Script validates against hardcoded expected values for each release

This ensures that all documentation and citations reference the correct published version and date consistently across all files.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.
