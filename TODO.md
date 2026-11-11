# TODO

## Inhalt

- [ ] Eindeutige Begriffe konsequent verwenden: Quelle, Objekt, Material, Forschungsdaten.
- [ ] 04-theorie-02: Den Abschnitt zu Oppression gemäss Spec als Schlussnotiz nach der Bias-Taxonomie setzen oder kürzen. Die Datei `04-theorie-03-unterdrueckung-in-daten-oppression-in-data.qmd` ist nicht mehr eingebunden.

## Technik

- [ ] `glossary.lua`: `stringify` entfernt Links aus den Definitionen, etwa bei EDTF.
- [ ] CI `build-deploy`: Den Checkout mit `persist-credentials: false` ausführen. Rendern und Veröffentlichen in zwei Jobs trennen, damit Render-Code kein schreibberechtigtes Token sieht.
