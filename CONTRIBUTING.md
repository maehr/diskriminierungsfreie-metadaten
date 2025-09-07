# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Automated DOI and Date Management

This repository uses automated DOI and publication date injection from Zenodo to keep citations up-to-date. The system works as follows:

### How it works

1. **Placeholders**: Source files use `{{LATEST_DOI}}` and `{{LATEST_DATE}}` placeholders instead of hardcoded values
2. **API Integration**: A script queries the Zenodo API (`https://zenodo.org/api/records/11124719/versions/latest`) to fetch the current latest DOI and publication date
3. **Automatic Replacement**: During the build process, placeholders are replaced with the actual latest values
4. **Fallback**: If the API is unavailable, the system falls back to known working values

### Files with DOI placeholders

- `README.md`: Zenodo badge
- `manuscript/handbuch-diskriminierungsfreie-metadaten.qmd`: Citation DOI
- `manuscript/_quarto.yml`: Format DOI

### Manual DOI and date update

To manually update DOIs and publication dates locally for testing:

```bash
npm run fetch-doi
# or
node scripts/fetch-latest-doi.js
```

### Technical details

- **Concept DOI**: `10.5281/zenodo.11124719` (always points to the latest version)
- **API Endpoint**: `https://zenodo.org/api/records/11124719/versions/latest`
- **Script Location**: `scripts/fetch-latest-doi.js`
- **Placeholders**:
  - `{{LATEST_DOI}}` for DOI injection
  - `{{LATEST_DATE}}` for publication date injection
- **Build Integration**: GitHub Actions workflow automatically runs the script before rendering

This ensures that all generated documentation and citations reference the most current published version and date without manual intervention.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.
