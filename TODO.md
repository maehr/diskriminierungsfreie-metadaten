# TODO

## Literatur und Auszeichnung

- [x] @schopper_2024_einfuehrung_metadaten und @forschungsdateninfo_metadaten_2024 sind vollständig.
- [ ] Folgende Literaturangaben sind unvollständig. Zotero und Crossref haben die Werte nicht.
      @Europeana_EDM_Documentation (kein Datum, keine Urheberschaft); @humanrightsCH_FormenDiskriminierung (kein Datum);
      @kaiser2023 (Zeitschriftentitel fehlt)
- [ ] Gibt es eine Regelung was fett ausgezeichnet wird?
- [ ] Gibt es eine Regelung, was monospaced `` ausgezeichnet wird?
- [ ] Folgende Literaturangaben sollten inhaltlich überprüft und ggf. korrigiert werden:
      [@sparber2016; @gruber2022; @rottmann2023]
      [@kaiser2023; @baroncini2025]

## Redaktion

- [x] Generelle Sprachregeln (Überprüfen mit AI)  
       - [x] Abkürzungen wie z.B. oder ggf. immer ausschreiben  
       - [x] Schweizer Hochdeutsch (kein scharfes S)  
       - [x] Bildunterschrift und Alttext für jede Abbildung  
       - [x] Keine “Vgl./Siehe/Siehe auch” bei Referenzen  
       - [x] Gender-Sternchen statt Doppelpunkt  
       - [x] Anführungszeichen einheitlich versus Kursivierung versus Fett?
- [x] Folgende Dinge auszeichnen  
       - [x] BEISPIELE?  
       - [x] REFERENZ für bibliografische Angaben  
       - [x] FIGURE für Bildunterschrift  
       - [x] ALTTEXT für Alternativtext  
       - [x] BOX  
       - [x] CHECKLIST (Überschrift wiederholen im Titel)  
       - [x] QUERVERWEIS  
       - [x] CODE  
       - [ ] (Siehe [https://www.andreashandel.com/posts/2023-06-13-custom-callouts-quarto/](https://www.andreashandel.com/posts/2023-06-13-custom-callouts-quarto/) für CUSTOM CALLOUT BOXES)
- [ ] Eindeutige Begriffe konsequent verwenden  
       - [ ] Hist. Quellen und FD  
       - [ ] Objekt (in Abgrenzung zu Quelle oder Material)  
       - [ ] Quelle  
       - [ ] Material  
       - [ ] Forschungsdaten  
       - [ ] …
- [x] Schlussredaktion 4.9.2025  
       - [x] Welche Begriffe sind explikationsbedürftig (allenfalls Glossar)  
       - [x] Checkliste im Anhang komplett?
- [x] Onlineversion herstellen [Moritz Mähr](mailto:moritz.maehr@gmail.com)8.9.25  
       - [x] Literaturreferenzen einpflegen  
       - [x] Links hinterlegen bei Begriffen und Konzepten wie DCTerm etc.  
       - [x] [https://debruine.github.io/quarto-glossary/](https://debruine.github.io/quarto-glossary/)
- [x] Glossar
- [ ] Anweisungen an Reviewers (Schwache Teile)  
       - [ ] Teil Praxis  
       - [ ] 1.2 Ethische und rechtliche Rahmenbedingungen

## Review PR #41 (CodeRabbit, 30.10.2026)

Kleine Befunde sind im PR behoben. Diese Punkte bleiben offen.

### Inhalt

- [ ] Einleitung, Absatz 4: Die Aussagen zu deutschsprachigen Archiven («vielerorts», «meist», «Oft») belegen oder auf das Basler Beispiel begrenzen.
- [ ] 04-theorie-02: Den Abschnitt zu Oppression gemäss Spec als Schlussnotiz nach der Bias-Taxonomie setzen oder kürzen.
- [ ] 04-theorie-05: FAIR F1 verlangt persistente Identifikatoren. Die Formulierung «minimal gefordert» prüfen.
- [ ] 05-praxis-03, 3.2: Die DCMI Metadata Terms sind Metadatenelemente, keine «Datenwertstandards». Prüfen, ob das DCMI Type Vocabulary gemeint ist.
- [ ] 05-praxis-03: Die «verhältnismässig tiefe Erkennungsrate» von DE-BIAS belegen oder streichen.
- [ ] 05-praxis-04, 4.2: Die Regel «Metadaten nicht löschen» mit der rechtlichen Löschpflicht in 7.2 abgleichen.
- [ ] 05-praxis-07, 7.1: BagIt und RO-Crate als Containerformate nennen. Die Spec verlangt beide.
- [ ] 05-praxis-07, 7.2: Bei einer Löschung auch archivierte Editionen und Pakete zurückziehen.
- [ ] 05-praxis-08: Öffentliche Zusammenfassung und geschütztes Audit-Protokoll trennen.
- [ ] 07-anhang-03: Der Entscheidungsbaum hat keine Links, obwohl die Einleitung das sagt. Links ergänzen oder den Satz ändern.
- [ ] 07-anhang-03: Sieben Kurzbelege haben keinen Eintrag in `references.yaml`: Breslau 2019, Hahn 2016, Gasser & Hötea 2024, Knaus 2019, Bruckmann 2024, Baresel-Brand 2019, Ahrndt 2021.

### Technik

- [ ] `glossary.lua`: `stringify` entfernt Links aus den Definitionen, etwa bei EDTF.
- [ ] `glossary.lua`: Ein Inline-Shortcode ohne Begriff bricht das Rendering ab, statt einen Fehler zu melden.
- [ ] `check-glossary.cjs`: Shortcodes mit `name=value` als erstem Argument werden ohne Prüfung übersprungen.
- [ ] `check-citations.py`: Code-Blöcke und Code-Spans vor der Suche entfernen. Sonst gilt `@` in Code als Zitat.
