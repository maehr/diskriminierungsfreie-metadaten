# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Versions, Dates and DOIs

Each version has one version date. Keep it the same in `CHANGELOG.md`, `CITATION.cff` (`date-released`) and `manuscript/index.qmd` (`date`).

`date-modified` in `manuscript/index.qmd` is the date of the last editorial change. Change it by hand only for an editorial change. A new build does not change it.

A version gets a DOI only after a GitHub release that Zenodo archives. Do not add a DOI to a version that Zenodo has not archived.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.
