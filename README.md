# Black Friday Scout

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/m1651/makefun-black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/m1651/makefun-black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

A Black Friday deal finder with 27 real deals, checked by hand on Black Friday, 27 November 2026. Each deal names its product, store, sale price, usual price, discount, an honest verdict (new low / strong price / routine sale, with the evidence), when the price was checked, where it was read, and a link to the product at its store. Searchable and filterable by category, store and discount; sorted biggest-discount-first by default. Static files only — no network requests, no build step.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Then serve `out/app` with any static server, e.g. `python3 -m http.server` inside it, and open `index.html`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=mee18qb6&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
