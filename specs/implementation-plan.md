# Implementationsplan: Diskriminierungssensible Metadatenpraxis

**Konsolidiert aus:** `reviews/external/review-meeting-notes.md`, `reviews/external/review-summary.md`, `notes.md`  
**Datum:** 2026-02-02  
**Ziel:** Vollständige Überarbeitung für Publikation (Zenodo + GitHub Pages)

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

- [ ] **Bias vs. Diskriminierung**: Verhältnis klären. Ansatz: "Biases entstehen oft aufgrund von Diskriminierungsformen, sind jedoch von diesen losgelöst und lassen sich konkreter als technische Fehler analysieren"
- [ ] **Content Note vs. Content Warning**: Konsequent "Content Note" (oder "Hinweis") verwenden, nicht "Warnung"
- [ ] **"diskriminierende Fremdzuschreibungen"**: Erklärung hinzufügen
- [ ] **"technischer Neutralität"**: Kurz erklären, was damit gemeint ist
- [ ] **Historische Verzerrung (Historical Bias)**: Besser erklären, wissenschaftlich belegen und von Diskriminierung abgrenzen

### 2.2 Erweiterungen der Diskriminierungsformen

- [ ] **Kernelemente** für alle Diskriminierungsformen ergänzen (analog "Statistische Diskriminierung")
- [ ] **Intersektionalität**: Hinweis ergänzen, dass Diskriminierungsformen sich nicht trennscharf trennen lassen und in hierarchischem Verhältnis zueinander stehen
- [ ] Mehr wissenschaftliche Literatur zu Diskriminierungsdefinition und -formen

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

1. **Phase 1** (Strukturelle Änderungen) - Zuerst, da sie die Dateistruktur betreffen
2. **Phase 2** (Inhaltliche Überarbeitungen) - Kernarbeit
3. **Phase 3** (Textuelle Korrekturen) - Search & Replace + manuelle Edits
4. **Phase 4** (Sprachregeln) - Kann parallel zu Phase 3
5. **Phase 5** (Technische Änderungen) - Quarto/Pandoc-spezifisch
6. **Phase 6** (Formalia) - Abschluss vor Publikation
