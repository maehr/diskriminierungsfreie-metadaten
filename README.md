# diskriminierungsfreie-metadaten

This repository contains the source of [Handbuch zur Erstellung diskriminierungsfreier Metadaten für historische Quellen und Forschungsdaten. Erfahrungen aus dem historischen Forschungsprojekt Stadt.Geschichte.Basel.](https://maehr.github.io/diskriminierungsfreie-metadaten/) The publication and the data in this repository is openly available to everyone and is intended to support reproducible research in the humanities.

[![GitHub issues](https://img.shields.io/github/issues/maehr/diskriminierungsfreie-metadaten.svg)](https://github.com/maehr/diskriminierungsfreie-metadaten/issues)
[![GitHub forks](https://img.shields.io/github/forks/maehr/diskriminierungsfreie-metadaten.svg)](https://github.com/maehr/diskriminierungsfreie-metadaten/network)
[![GitHub stars](https://img.shields.io/github/stars/maehr/diskriminierungsfreie-metadaten.svg)](https://github.com/maehr/diskriminierungsfreie-metadaten/stargazers)
[![Code license](https://img.shields.io/github/license/maehr/diskriminierungsfreie-metadaten.svg)](https://github.com/maehr/diskriminierungsfreie-metadaten/blob/main/LICENSE-AGPL.md)
[![Data license](https://img.shields.io/github/license/maehr/diskriminierungsfreie-metadaten.svg)](https://github.com/maehr/diskriminierungsfreie-metadaten/blob/main/LICENSE-CCBYSA.md)
[![DOI](https://zenodo.org/badge/11124720.svg)](https://zenodo.org/badge/latestdoi/11124720)

## What is the publication about?

This manual is a guide to creating non-discriminatory metadata for historical sources and research data, developed as part of the Stadt.Geschichte.Basel research project. It is aimed at professional historians, archivists, librarians and anyone involved in open research data in the field of history. The authors Moritz Mähr and Noëlle Schnegg guide readers through the practical aspects of creating metadata based on the FAIR principles to make research data discoverable, accessible, interoperable and reusable. Through practical instructions and illustrated case studies, the manual shows how machine-readable metadata can enrich research and teaching and influence the interpretation of historical sources. As a publicly accessible "living document", it is designed for continuous development by the community and is committed to an inclusive and non-discriminatory representation of historical content. The handbook is a fundamental resource for anyone interested in modern digital history and open research data. It is available in German.

Furthermore this repository contains a mapping of the [Schlagwortindex GenderOpen](https://opengenderplatform.de/schlagwortindex) to the [Gemeinsame Normdatei (GND)](https://gnd.network/). The mapping was created as part of the Stadt.Geschichte.Basel research project according to the [Rules for GND cross concordances (mapping methodology)](https://wiki.dnb.de/pages/viewpage.action?pageId=263851113).

## How to cite

See the [CITATION.cff](CITATION.cff) file for citation information.

## Repository Structure

This repository is organized as follows:

- `manuscript/`: the manuscript of the publication
- `manuscript/data/genderopen_gnd_mapping.csv`: the mapping of the Schlagwortindex GenderOpen to the GND
- `manuscript/media/`: images, logos, etc. used in the manuscript
- `manuscript/_quarto.yml`: the configuration file for the manuscript
- `manuscript/handbuch-diskriminierungsfreie-metadaten.qmd`: the main document, in markdown format
- `manuscript/custom-reference.docx`: a custom reference document for the manuscript
- `manuscript/custom.css`: a custom css style sheet for printing
- `manuscript/references.bib`: the bibliography file for the manuscript

## Getting Started

Install [Quarto](https://quarto.org), run `quarto preview manuscript` to preview the manuscript, or run `quarto render manuscript` to render the manuscript.

Run `cd manuscript && quarto publish gh-pages` to publish the manuscript to GitHub Pages.

## Support

This project is maintained by [@maehr](https://github.com/maehr). Please understand that we can't provide individual support via email. We also believe that help is much more valuable when it's shared publicly, so more people can benefit from it.

| Type                                   | Platforms                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------ |
| 🚨 **Bug Reports**                     | [GitHub Issue Tracker](https://github.com/maehr/diskriminierungsfreie-metadaten/issues)    |
| 📊 **Report bad data**                 | [GitHub Issue Tracker](https://github.com/maehr/diskriminierungsfreie-metadaten/issues)    |
| 📚 **Docs Issue**                      | [GitHub Issue Tracker](https://github.com/maehr/diskriminierungsfreie-metadaten/issues)    |
| 🎁 **Feature Requests**                | [GitHub Issue Tracker](https://github.com/maehr/diskriminierungsfreie-metadaten/issues)    |
| 🛡 **Report a security vulnerability** | See [SECURITY.md](SECURITY.md)                                                             |
| 💬 **General Questions**               | [GitHub Discussions](https://github.com/maehr/diskriminierungsfreie-metadaten/discussions) |

## Roadmap

This handbook is a living document and will be updated regularly. The discussion of the handbook is open to everyone and we welcome feedback and suggestions for improvement on [GitHub Discussions](https://github.com/maehr/diskriminierungsfreie-metadaten/discussions).

## Contributing

All contributions to this repository are welcome! If you find errors or problems with the data, or if you want to add new data or features, please open an issue or pull request. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. The available versions are listed in the [tags on this repository](https://github.com/maehr/diskriminierungsfreie-metadaten/tags).

## Authors and acknowledgment

- **Moritz Mähr** - _Initial work_ - [maehr](https://github.com/maehr)
- **Noëlle Schnegg** - _Initial work_ - [noelleschnegg](https://github.com/noelleschnegg)

See also the list of [contributors](https://github.com/maehr/diskriminierungsfreie-metadaten/graphs/contributors) who contributed to this project.

## License

The data in this repository is released under the Creative Commons Attribution 4.0 International (CC BY 4.0) License - see the [LICENSE-CCBYSA](LICENSE-CCBYSA.md) file for details. By using this data, you agree to give appropriate credit to the original author(s) and to indicate if any modifications have been made.

The code in this repository is released under the GNU Affero General Public License v3.0 - see the [LICENSE-AGPL](LICENSE-AGPL.md) file for details. By using this code, you agree to make any modifications available under the same license.
