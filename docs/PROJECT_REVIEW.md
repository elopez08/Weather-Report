# Weather Report — Historical Review and Reconstruction Guide

**Repository:** https://github.com/elopez08/Weather-Report  
**Review date:** October 27, 2026  
**Method:** Static inspection of README, HTML, CSS, JavaScript, and Git commit diffs. No browser/API runtime test. Original application code unchanged.

## Attribution: group foundation, later personal revisions

**User-confirmed background:** Weather Report **started as a group project**. The user recalls subsequently trying to modify it independently. This distinction must be preserved in resumes and project summaries.

**What the repository independently establishes:** An initial version was committed July 24–25, 2022 (UTC); a substantial revision was committed November 1, 2022; and further experimental changes were committed January 16, 2023 (UTC). Git diffs identify the changed code, but **do not independently establish authorship of every line**. Describe the initial application as collaborative; describe the later revisions as user-recalled personal work, with the exact individual contribution subject to confirmation.

## Timeline from Git commits

- **July 25, 2022 UTC — `9b2277c0d`:** Initial HTML/CSS/JS weather dashboard, API calls, current weather, five forecast cards, and history buttons; README and archived code. These are the baseline collaborative-era files, not proof of sole authorship.
- **November 1, 2022 UTC — `305694dd6`:** Major restructuring from `weatherthree` to `weatherReport`: fetch → validate city → deduplicate/add history button → render weather; city timezone/time display, Fahrenheit conversion, temperature-based colors, revised history logic, search handling, CSS responsive layout, and detailed README update. This is strong evidence of a later substantial modification phase.
- **January 16, 2023 UTC — `85a2e642d`:** Added popup markup and styling, experimental popup JavaScript, and clearing stale weather elements on invalid city searches. Popup integration appears incomplete.

Links:
- https://github.com/elopez08/Weather-Report/commit/9b2277c0d
- https://github.com/elopez08/Weather-Report/commit/305694dd6
- https://github.com/elopez08/Weather-Report/commit/85a2e642d

## Source map

| Path | Role |
|---|---|
| `index.html` | Search input, history buttons, current conditions, forecast cards, experimental popup |
| `assets/js/script.js` | OpenWeather fetch, validation, history deduplication, date/time calculation, rendering, event delegation |
| `assets/css/style.css` | Grid/Flex layout, responsive rules, temperature-based card classes, popup styles |
| `README.md` | Original project walkthrough and dated November 2022 revision log |
| `oldcode.md` | Preserved earlier experiments and alternative implementations |
| `Notes` | Small `Array.includes` deduplication experiment |

## Current intended flow

```text
Search city (button or Enter)
 → weatherReport.searchExtract()
 → fetchWeatherData(cityName)
 → OpenWeather forecast API
 → validationCity(data)
    → invalid: show error and clear old result elements
    → valid: makeCountryButton(data)
       → deduplicate city name using countryArrayInfo.includes(name)
       → displayWeatherInfo(data)
          → calculate city-local time
          → convert Kelvin to Fahrenheit
          → render current weather and forecast cards
          → apply temperature-dependent CSS classes
```

History buttons use delegated event handling via `addGlobalEventEventListener` so dynamically created buttons can be clicked.

## Technical concepts demonstrated

- JavaScript `fetch` and Promise chains
- API JSON traversal, object destructuring
- DOM selection, text and HTML updates
- Arrays, `includes`, `push`, `join`
- Event listeners and event delegation
- CSS Grid, Flexbox, responsive media queries
- Timezone-offset calculations and temperature conversions
- Conditional error handling and dynamic class application
- Debugging through iteration and written documentation

## Important source-level issues

These are static observations; reproduce symptoms in a browser before claiming tests passed.

1. **Forecast is not five days:** The API request uses `/data/2.5/forecast?...&cnt=5`. This retrieves five forecast *time slots* (normally three-hour increments), not five daily forecasts. The loop labels these as consecutive weekdays. Use actual timestamps (`data.list[].dt`) and select five distinct forecast dates, requesting enough slots.
2. **Exposed API key:** The README and frontend source contain a hardcoded OpenWeather key. Treat it as public and rotate/revoke it if still active. Do not copy it into new docs or examples. Browser apps cannot truly hide embedded keys; consider a backend proxy or a provider-supported public-key strategy with restrictions.
3. **Invalid destructuring:** `const { message } = data.message` destructures a property from `data.message` rather than `data`. On typical API errors, `data.message` is a string; this does not produce the intended message variable. Use `const { message } = data` or access `data.message` directly.
4. **Popup JavaScript is broken/incomplete:** The latest code uses `(window).load(function () {...})` and jQuery-style `$(...)` without including jQuery in `index.html`. `window.load` is not the standard native event registration method. Use `window.addEventListener("load", ...)` and native DOM handlers, or explicitly load the required library.
5. **Popup element mismatch:** `document.getElementById("hover_bkgr_fricc")` looks for an ID, but the HTML has `class="hover_bkgr_fricc"`. The variable will be null. Use a class selector or add a matching unique ID.
6. **Error cleanup removes DOM structure:** On invalid city, `document.querySelector(".flex").innerHTML = ""` removes the `.icontoday` and `.descriptiontoday` elements. Later successful searches try to update those elements, potentially causing null-element errors. Clear their contents instead of deleting the containers.
7. **Invalid selector in fallback:** `document.getElementById(".weather-day2")` passes a CSS selector to an ID lookup. Use `document.querySelector(".weather-day2")`.
8. **Incorrect time condition:** `0<hour<13` is a chained comparison in JavaScript and is not equivalent to `hour > 0 && hour < 13`. Fix AM/PM branching, including noon and midnight.
9. **Minute formatting:** `minute<9` misses minute 9, which should be `09`; prefer `String(minute).padStart(2,"0")`.
10. **Wind units:** OpenWeather's standard wind speed is typically m/s, but the UI labels the unconverted value km/h. Convert units or request an appropriate unit and label correctly.
11. **Duplicate IDs:** Every generated history button uses `id="countryid2"`. IDs must be unique; delegate using `.country-btn` or a data attribute.
12. **Search history not persistent:** The array tracks cities during the current page session; no persistent localStorage history was verified.
13. **Global variables and loop state:** `weatherarray = []` is assigned without declaration, and global counters `i` and `j` can complicate repeated renders. Prefer locally scoped state.
14. **Network errors:** The `fetch` chain lacks `response.ok` checks and `.catch` handling for connectivity/permission issues.
15. **Potential HTML injection:** API-derived city and weather descriptions are interpolated into `innerHTML`. Escape text or build DOM nodes using `textContent`.
16. **Search semantics:** The UI asks for a city, but README examples mention searching countries/states; the `q=` API endpoint is intended for city queries. Verify actual accepted input.
17. **Responsive layout:** At widths under 700px the CSS still uses a 400px grid column, potentially overflowing narrow mobile screens.
18. **Temperature classification:** Verify threshold logic against the actual Fahrenheit conversion and ensure each card receives exactly one intended color class.

## Reconstruction and testing plan

Preserve original code and start a separate branch:

```bash
git clone https://github.com/elopez08/Weather-Report.git
cd Weather-Report
git switch -c revival/weather-report
python -m http.server 8000
```

Open `http://localhost:8000/index.html`, use browser Developer Tools Console and Network, and test using a **new, valid API key** under an appropriate key-management approach. These steps have **not** been run as part of this review.

Suggested order:

1. Capture original design screenshots.
2. Repair or disable the broken experimental popup code so the app can initialize cleanly.
3. Replace the exposed key and investigate provider/API compatibility.
4. Fix invalid-city cleanup so later valid searches still work.
5. Check errors, network response status, and search behavior.
6. Build a true five-day forecast from distinct dates and timestamps.
7. Correct timezone formatting, wind units, and responsive behavior.
8. Verify history deduplication and delegated click handling.
9. Add automated tests for date selection, unit conversion, and invalid API responses.
10. Record confirmed results and distinguish original group code from later personal modifications.

## Portfolio framing

Conservative draft:

> **Weather Report — Collaborative Weather Dashboard with Later Individual Revisions (2022–2023).** Contributed to a group weather dashboard using HTML, CSS, JavaScript, and OpenWeather API data. Subsequently revisited the application to restructure API validation and search-history handling, experiment with local-time display, temperature-based forecast styling, responsive layout, and error-state cleanup. Maintained detailed development notes. Specific ownership of each later change should be confirmed before making stronger claims.

**Status:** Historical source and Git revision timeline reviewed. Runtime tests and ownership confirmation pending.
