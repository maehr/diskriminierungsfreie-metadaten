# Implementationsplan: Diskriminierungssensible Metadatenpraxis

**Konsolidiert aus:** `reviews/external/review-meeting-notes.md`, `reviews/external/review-summary.md`, `notes.md`  
**Datum:** 2026-02-02  
**Ziel:** Vollständige Überarbeitung für Publikation (Zenodo + GitHub Pages)

---

## Phase 0: Wissenschaftliche Debatten im Theorieteil (Priorität: HOCH)

Der Theorieteil geht derzeit zu wenig auf den wissenschaftlichen Diskurs und aktuelle Debatten ein. Drei zentrale Debatten sollen integriert werden, wobei das Handbuch jeweils eine eigenständige Position vertritt (mit Platzhaltern, falls die Positionierung noch unklar ist).

### 0.1 Literaturrecherche und -beschaffung

#### Fehlende Schlüsselliteratur in Zotero ergänzen

**Priorität HOCH (zwingend erforderlich):**

| Nr. | Quelle                                                                                                                                                                           | Debatte              | Fundstelle                                        |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------- |
| 1   | Crenshaw, Kimberlé (1989): "Demarginalizing the Intersection of Race and Sex: A Black Feminist Critique of Antidiscrimination Doctrine, Feminist Theory and Antiracist Politics" | Intersektionalität   | University of Chicago Legal Forum 1989(1), Art. 8 |
| 2   | Collins, Patricia Hill (2000/2022): "Black Feminist Thought: Knowledge, Consciousness, and the Politics of Empowerment"                                                          | Intersektionalität   | ISBN 978-0-415-92484-2                            |
| 3   | Olson, Hope A. (2002): "The Power to Name: Locating the Limits of Subject Representation in Libraries"                                                                           | Historische Begriffe | Kluwer Academic Publishers                        |
| 4   | Drabinski, Emily (2013): "Queering the Catalog: Queer Theory and the Politics of Correction"                                                                                     | Historische Begriffe | The Library Quarterly 83(2), 94-111               |

**Priorität MITTEL (empfohlen):**

| Nr. | Quelle                                                                                                  | Debatte              | Fundstelle                   |
| --- | ------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------- |
| 5   | Berman, Sanford (1971): "Prejudices and Antipathies: A Tract on the LC Subject Heads Concerning People" | Historische Begriffe | Scarecrow Press              |
| 6   | Cifor, Marika & Gilliland, Anne (2016): "Affect and the archive, archives and their affects"            | Historische Begriffe | Archival Science 16(1), 1-28 |
| 7   | Library of Congress (2016): Policy Statement zu "Illegal aliens" → "Noncitizens"                        | Historische Begriffe | LC Policy                    |
| 8   | Homosaurus Editorial Board: Homosaurus Vocabulary                                                       | Historische Begriffe | https://homosaurus.org       |

#### Vorhandene Zotero-Einträge in references.yaml überführen

Folgende Einträge aus Zotero sind relevant und müssen in `manuscript/references.yaml` aufgenommen werden:

- [ ] `buolamwini_gender_2018` - Gender Shades: Intersectional Accuracy Disparities
- [ ] `caswell_dusting_2019` - Dusting for Fingerprints: Feminist Standpoint Appraisal
- [ ] `sparber_whats_2016` - (Queer)feministische Kritik an Sexismen und Rassismen im Schlagwortkatalog
- [ ] `gruber_knuepfen_2020` - Vom Knüpfen feministischer Begriffsnetze
- [ ] `farnel_unsettling_2018` - Unsettling our practices: Decolonizing description
- [ ] `drage_does_2022` - Does AI Debias Recruitment?
- [ ] `petz_evaluating_2023` - Evaluating bias within an epistemological framework
- [ ] DE-BIAS Projekt-Dokumentation (Europeana)

### 0.2 Debatte 1: Bias vs. Diskriminierung

**Datei:** `04-theorie-02-verzerrungen-und-fehler-bias.qmd`  
**Position:** Neue Einleitung/Erweiterung des bestehenden Einleitungsabsatzes  
**Umfang:** 800-1000 Wörter

**Gliederung:**

```markdown
### Verhältnis von Bias und Diskriminierung {#sec-verhaeltnis-bias-diskriminierung}

#### Das Problem der Begriffsverwirrung

[Einleitung: Warum werden Bias und Diskriminierung oft verwechselt?]

#### Position A: Bias als technischer Fehler

- Fairness-ML-Forschung (Mehrabi et al. 2021)
- Messbarkeit, Korrigierbarkeit
- Verschiedene Fairness-Definitionen (mathematisch unvereinbar!)
  - Demographic Parity
  - Equalized Odds
  - Individual Fairness
    [Quellenangaben: @mehrabi2021]

#### Position B: Bias als Symptom struktureller Diskriminierung

- Critical Data Studies (D'Ignazio & Klein)
- Bias ist nicht "der Fehler", sondern Symptom
- Technische Fixes = "Harm Reduction", nicht Lösung
  [Quellenangaben: @dignazio2020, @buolamwini_gender_2018]

#### Positionierung des Handbuchs

[PLATZHALTER falls Positionierung noch offen]

Vorschlag: "Dieses Handbuch versteht Bias als operationalisierte,
analysierbare Form von Diskriminierung. Bias-Kategorien bieten
technische Handgriffe, die strukturelle Kritik nicht ersetzen,
sondern ergänzen. Die Korrektur einzelner Biases ist notwendig,
aber nicht hinreichend für eine diskriminierungssensible Praxis."
```

**Aufgaben:**

- [ ] Einleitungsabsatz in `04-theorie-02` erweitern
- [ ] Position A (technisch) mit Quellen ausarbeiten
- [ ] Position B (kritisch) mit Quellen ausarbeiten
- [ ] Eigenständige Position des Handbuchs formulieren (oder Platzhalter)
- [ ] Querverweise zur bestehenden Bias-Taxonomie

### 0.3 Debatte 2: Intersektionalität

**Datei:** `04-theorie-01-diskriminierung-in-und-durch-daten.qmd`  
**Position:** Neuer Unterabschnitt nach "Statistische Diskriminierung", vor "Spezifische Diskriminierungen"  
**Umfang:** 600-800 Wörter

**Gliederung:**

```markdown
### Intersektionalität: Verflechtung von Diskriminierungsformen {#sec-intersektionalitaet}

#### Begriff und Herkunft

- Crenshaw 1989: Schwarze Frauen fielen durch das Raster
- Collins' "Matrix of Domination": Rasse, Klasse, Geschlecht als verwobene Systeme
  [Quellenangaben: @crenshaw1989, @collins2000]

#### Relevanz für Metadatenpraxis

- Diskriminierungen wirken nicht additiv, sondern multiplikativ
- Single-Axis-Analyse erfasst nicht die Realität

**Beispiel:**
Historische Volkszählungsdaten erfassen "Geschlecht" und "Ethnie"
als separate Variablen. Eine intersektionale Analyse zeigt jedoch,
dass Schwarze Frauen im 19. Jahrhundert weder als "typische Frauen"
(bürgerliches Frauenbild) noch als "typische Schwarze"
(männlich konnotierter Widerstand) sichtbar werden.

#### Praktische Implikationen

- Mehrfachkategorisierung ermöglichen (nicht: entweder/oder)
- Analyse-Tools für Kreuzungen entwickeln
- Vorsicht: Granularität vs. Datenschutz/Re-Identifikation

#### Positionierung des Handbuchs

[PLATZHALTER falls Positionierung noch offen]

Vorschlag: "Dieses Handbuch empfiehlt, Diskriminierungsformen nicht
isoliert zu betrachten. Jede Analyse sollte prüfen, ob bestimmte
Gruppen an der Kreuzung mehrerer Merkmale besonders betroffen sind."
```

**Aufgaben:**

- [ ] Neuen Unterabschnitt in `04-theorie-01` einfügen
- [ ] Crenshaw und Collins korrekt zitieren
- [ ] Konkretes Beispiel aus Metadatenpraxis entwickeln
- [ ] Eigenständige Position formulieren (oder Platzhalter)
- [ ] Querverweise zu bestehenden Diskriminierungsformen

### 0.4 Debatte 3: Historische Treue vs. Gegenwartssensibilität

**Datei:** `04-theorie-01-diskriminierung-in-und-durch-daten.qmd`  
**Position:** Neuer Unterabschnitt am Ende, als konzeptionelle Brücke zur Praxis  
**Umfang:** 800-1000 Wörter

**Gliederung:**

```markdown
### Historische Begriffe: Bewahren oder Korrigieren? {#sec-historische-begriffe}

#### Das Dilemma

- Historische Quellen enthalten diskriminierende Begriffe
- Zwei scheinbar unvereinbare Ansprüche:
  1. Quellentreue und historischer Kontext
  2. Schutz vor Verletzung und Perpetuierung

#### Position A: Archivische Provenienz (Bewahrungsprinzip)

- Jenkinson-Tradition: Archivar*innen als neutrale Hüter*innen
- Argument: Änderung = Geschichtsfälschung
- Historischer Kontext geht verloren
- Forschende brauchen Originalbegriffe für Quellensuche

#### Position B: Reparative Beschreibung

- Critical Archival Studies: Archive sind nie neutral
- Argument: Weitergabe von Verletzungen ohne Korrektur ist aktive Entscheidung
- Metadaten sind nicht die Quelle, sondern Zugangsschicht
  [Quellenangaben: @caswell_dusting_2019, @A4BLiP2020, @farnel_unsettling_2018]

#### Kompromissmodelle in der Praxis

1. **Dual-Cataloging**: Historische + aktuelle Begriffe parallel führen
   - Beispiel: Library of Congress "Illegal aliens" → "Noncitizens" (2016)
2. **Kontextualisierung**: Problematische Begriffe markieren + erklären
   - Beispiel: DE-BIAS Projekt (Europeana)
3. **Community-Involvement**: Betroffene Communities entscheiden
   - Beispiel: Traditional Knowledge Labels, Homosaurus
4. **Versionierte Beschreibung**: Alle Änderungen nachvollziehbar dokumentieren

[Quellenangaben: @sparber_whats_2016, @gruber_knuepfen_2020, @drabinski2013]

#### Positionierung des Handbuchs

[PLATZHALTER falls Positionierung noch offen]

Vorschlag: "Dieses Handbuch empfiehlt ein kontextsensitives Vorgehen:

- Für **Metadaten** (Beschreibungsebene): Aktuelle, respektvolle Begriffe
  mit Verweis auf historische Varianten
- Für **Transkriptionen/Editionen**: Originalwortlaut mit Content Notes
- Für **Normdaten**: Versionierte Änderungen mit dokumentierter Provenienz
- Grundsatz: Betroffene Communities einbeziehen, wo möglich"
```

**Aufgaben:**

- [ ] Neuen Unterabschnitt in `04-theorie-01` einfügen
- [ ] Position A (Bewahrung) fair darstellen
- [ ] Position B (Reparativ) mit Quellen ausarbeiten
- [ ] Kompromissmodelle mit konkreten Beispielen
- [ ] Eigenständige Position formulieren (oder Platzhalter)
- [ ] Querverweise zum Praxisteil

### 0.5 Zeitschätzung Phase 0

| Nr. | Aufgabe                                              | Geschätzte Zeit |
| --- | ---------------------------------------------------- | --------------- |
| 1   | Fehlende Literatur in Zotero ergänzen (4-8 Einträge) | 30 min          |
| 2   | Zotero-Einträge in references.yaml exportieren       | 15 min          |
| 3   | Debatte 1 (Bias vs. Diskriminierung) schreiben       | 45 min          |
| 4   | Debatte 2 (Intersektionalität) schreiben             | 30 min          |
| 5   | Debatte 3 (Historische Begriffe) schreiben           | 45 min          |
| 6   | Querverweise und Pandoc-Crossref                     | 20 min          |
| 7   | npm run validate                                     | 5 min           |

**Gesamtgeschätzte Zeit Phase 0: ca. 3 Stunden**

---

## Phase 1: Strukturelle Änderungen (Priorität: HOCH)

### 1.1 Reihenfolge umstellen

- [ ] **Praxisteil vor Theorieteil**: Umstrukturierung so, dass praktische Anwendung zuerst kommt, dann theoretische Hintergründe
- [ ] Entsprechende Umbenennung der Sektionen (ggf. neue Nummerierung in `specs/outline.md`)

### 1.2 Danksagung verschieben

- [ ] `03-danksagung.qmd` verschieben: nach Praxis/Theorie, vor Literatur
- [ ] Pronomen bei "Levyn" entfernen

### 1.3 Abschnitte integrieren/verschieben

- [ ] **"Unterdrückung in Daten (Oppression in Data)"** (`04-theorie-03-unterdrueckung-in-daten-oppression-in-data.qmd`): Als abschliessenden Kommentar oder in Fussnoten integrieren, nicht als separaten Abschnitt belassen
- [ ] **"Spezifische Diskriminierungen in historischen Quellen und Forschungsdaten"**: Direkt in die jeweiligen Diskriminierungsformen-Unterkapitel integrieren, Abschnitt entfernen
- [ ] **Detaillierte Metadatenebenen (7 Ebenen)**: In den Anhang verschieben

---

## Phase 2: Inhaltliche Überarbeitungen (Priorität: HOCH)

### 2.1 Begriffliche Klärungen

- [ ] **Bias vs. Diskriminierung**: Verhältnis klären → siehe **Phase 0.2** (Debatte 1)
- [ ] **Content Note vs. Content Warning**: Konsequent "Content Note" (oder "Hinweis") verwenden, nicht "Warnung"
- [ ] **"diskriminierende Fremdzuschreibungen"**: Erklärung hinzufügen
- [ ] **"technischer Neutralität"**: Kurz erklären, was damit gemeint ist
- [ ] **Historische Verzerrung (Historical Bias)**: Besser erklären, wissenschaftlich belegen und von Diskriminierung abgrenzen → siehe **Phase 0.2** (Debatte 1)

### 2.2 Erweiterungen der Diskriminierungsformen

- [ ] **Kernelemente** für alle Diskriminierungsformen ergänzen (analog "Statistische Diskriminierung")
- [ ] **Intersektionalität**: Hinweis ergänzen → siehe **Phase 0.3** (Debatte 2)
- [ ] Mehr wissenschaftliche Literatur zu Diskriminierungsdefinition und -formen → siehe **Phase 0.1** (Literatur)

### 2.3 Zugangsbeschränkungen in Archiven

- [ ] Zwei Aspekte trennen:
  1. Zugang/Nutzung von Forschenden
  2. Eingang/Ausschluss von Quellen

### 2.4 Argumentativer Stil

- [ ] Theoretische Abschnitte argumentativer gestalten (weniger deskriptiv)
- [ ] Deutlicher herausarbeiten, warum das Thema für die Geschichtswissenschaft zentral ist
- [ ] Mehr Orientierung und Lenkung für Lesende
- [ ] Komplexe Passagen vereinfachen

---

## Phase 3: Textuelle Korrekturen (Priorität: MITTEL)

### 3.1 Untertitel und globale Änderungen

- [ ] Untertitel ändern: "Ein Handbuch zur ethischen **Beschreibung** historischer Quellen und Forschungsdaten" (statt "Auszeichnung")
- [ ] Alle Vorkommen im Text anpassen

### 3.2 Zielgruppe erweitern

- [ ] "Es richtet sich an Historiker*innen, Archivar*innen, Bibliothekar*innen und Daten-Kurator*innen" → Alle wissenschaftlichen GLAM-Mitarbeitenden mit historischem Hintergrund adressieren

### 3.3 Spezifische Textkorrekturen

| Stelle          | Alt                                                        | Neu                                                                           |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Einleitung      | "Ein Blick in die deutschsprachige Archive"                | "Ein Blick in die deutschsprachig**en** Archive"                              |
| Einleitung      | "Veränderungen von Normen"                                 | "Veränderungen von **gesellschaftlichen** Normen"                             |
| Einleitung      | "entlang des gesamten Forschungsdatenlebenszyklus"         | "entlang **der Phasen** des Forschungsdatenlebenszyklus"                      |
| Einleitung      | "Persistente Identifikatoren"                              | "persistente Identifikatoren **(PIDs)**"                                      |
| FAIR-Abschnitt  | (implizit)                                                 | FAIR explizit benennen bei Auffindbar, Zugänglich, Interoperabel, Nachnutzbar |
| LOUD-Abschnitt  | "Nutzbarkeit in Arbeitsabläufen der Geisteswissenschaften" | "Nutzbarkeit in **wissenschaftlichen** Arbeitsabläufen"                       |
| Diskriminierung | "Digitisierungsauswahl nach Zitationsmetriken"             | "**Digitalisierungspolitik** nach Zitationsmetriken"                          |
| Standards       | "CIDOC-CRM"                                                | "CIDOC CRM" (ohne Bindestrich)                                                |

### 3.4 Erklärungen hinzufügen

- [ ] **Contributor Covenant**: Erklären, was es ist
- [ ] **dc:description**: Früher erklären, dass es um Dublin-Core-Werte handelt und woher diese Nomenklatur kommt
- [ ] **Europeana**: Kurz erklären, was Europeana ist (beim Europeana-Datensatz-Beispiel)

### 3.5 Redundanzen entfernen

- [ ] Überarbeiten: "Das Ziel dieses Handbuchs ist es, anhand konkreter Beispiele, Methoden und Strategien Hilfestellungen zu bieten, die es der Leser\*in erlauben sollen, Diskriminierung in der Metadatenpraxis zu erkennen und Entscheidungen in Bezug auf den eigenen Forschungskontext und auf die zur Verfügung stehenden Ressourcen fällen zu können."
- [ ] Falls keine Handbuch-eigene Ontologie-Map vorhanden: Verweise auf Ontologien entfernen/klären

---

## Phase 4: Sprachregeln (Priorität: MITTEL)

- [ ] Abkürzungen wie "z.B." oder "ggf." immer ausschreiben
- [ ] Eindeutige Begriffe konsequent verwenden:
  - Hist. Quellen und FD
  - Objekt (in Abgrenzung zu Quelle oder Material)
  - Quelle
  - Material
  - Forschungsdaten

---

## Phase 5: Technische Änderungen (Priorität: MITTEL)

### 5.1 Glossar

- [ ] Glossar prüfen und vereinheitlichen (funktioniert manchmal nicht)
- [ ] Neue Einträge hinzufügen:
  - DOI
  - ORCID
  - OCAP
  - Traditional Knowledge Labels (TK-Labels)

### 5.2 Querverweise (Pandoc Crossref)

- [ ] QUERVERWEISE mit pandoc crossref implementieren
- [ ] Abbildung 1 (Datenlebenszyklus): Sektionen im Text verlinken
- [ ] Abbildung 2 (Entscheidungshilfe): Sektionen im Text verlinken
- [ ] Abbildung 3 (Hilfestellungen): Pandoc citekeys für Referenzen hinzufügen

### 5.3 Checkliste

- [ ] Checkliste als eigenständiges PDF/DOCX mit Download-Link am Anfang des Handbuchs
- [ ] Entscheidungsbaum zu Beginn der Handbuchversion belassen
- [ ] Falls möglich: Checkbox-Links zwischen Sektionen und Spiegel-Checkliste am Ende

### 5.4 Darstellung

- [ ] Längere Beispiele zu Diskriminierungsformen als aufklappbare Elemente gestalten (collapsible)
- [ ] Engere Anbindung an den Theorieteil durch Verlinkungen und Querverweise

---

## Phase 6: Formalia vor Publikation (Priorität: NIEDRIG)

- [ ] Workshop Dezember (ISGV) streichen
- [ ] Review-Phase (Hypothes.is) dokumentieren
- [ ] Zitation aktualisieren:
  > Mähr, Moritz, und Noëlle Schnegg. 2026. Diskriminierungssensible Metadatenpraxis: Ein Handbuch zur ethischen Beschreibung historischer Quellen und Forschungsdaten. Zenodo. https://doi.org/10.5281/zenodo.11124719
- [ ] Online-Version-Link: https://maehr.github.io/diskriminierungssensible-metadatenpraxis/

---

## Validierung

Nach jeder Änderungsbatch:

```bash
npm run validate
```

Finale Akzeptanzkriterien:

- [ ] `npm run validate` passes
- [ ] Alle Zitationen in `manuscript/sections/*.qmd` existieren in `manuscript/references.yaml`
- [ ] Version + Datum reviewed
- [ ] Render handbook (Quarto)
- [ ] Publish web build (GitHub Pages)
- [ ] Create Zenodo release

---

## Empfohlene Reihenfolge für OpenCode-Session

1. **Phase 0** (Wissenschaftliche Debatten) - Zuerst, da inhaltlich grundlegend
2. **Phase 1** (Strukturelle Änderungen) - Dateistruktur anpassen
3. **Phase 2** (Inhaltliche Überarbeitungen) - Kernarbeit
4. **Phase 3** (Textuelle Korrekturen) - Search & Replace + manuelle Edits
5. **Phase 4** (Sprachregeln) - Kann parallel zu Phase 3
6. **Phase 5** (Technische Änderungen) - Quarto/Pandoc-spezifisch
7. **Phase 6** (Formalia) - Abschluss vor Publikation

---

## Anhang: Relevante Literatur in Zotero (Bestandsaufnahme)

### Für Debatte 1 (Bias vs. Diskriminierung) - vorhanden:

- Mehrabi et al. 2021 - "A Survey on Bias and Fairness in Machine Learning"
- D'Ignazio & Klein 2020 - "Data Feminism"
- Buolamwini & Gebru - "Gender Shades"
- Drage & Mackereth - "Does AI Debias Recruitment?"
- Petz & Oberbichler - "Evaluating bias within an epistemological framework"
- DE-BIAS Projekt (Europeana)
- Mitchell et al. - "Stable Bias"

### Für Debatte 2 (Intersektionalität) - vorhanden:

- Buolamwini & Gebru - "Gender Shades: Intersectional Accuracy Disparities"
- Young 1990 - "Justice and the Politics of Difference"

### Für Debatte 3 (Historische Begriffe) - vorhanden:

- Caswell - "Toward a survivor-centered approach"
- Caswell - "Dusting for Fingerprints: Feminist Standpoint Appraisal"
- Sparber - "(queer)feministische Kritik an Sexismen und Rassismen im Schlagwortkatalog"
- Gruber - "Vom Knüpfen feministischer Begriffsnetze"
- DE-BIAS - "Detecting and cur(at)ing harmful language"
- Farnel et al. - "Unsettling our practices: Decolonizing description"
