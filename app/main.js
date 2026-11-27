// Wires the controls to the deal list: search box, category/store/discount
// filters and sorting, re-rendering the grid on every change.
import { DEALS } from "./deals.js";
import { filterDeals, sortDeals, uniqueValues } from "./filters.js";
import { renderDeals, renderSummary } from "./render.js";

const grid = document.getElementById("deals");
const summary = document.getElementById("summary");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const category = document.getElementById("category");
const store = document.getElementById("store");
const minDiscount = document.getElementById("mindiscount");
const sort = document.getElementById("sort");

function fillOptions(select, values) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

fillOptions(category, uniqueValues(DEALS, "category"));
fillOptions(store, uniqueValues(DEALS, "store"));

// A filtered view can be shared as a link: ?q=airpods&category=TVs&store=Amazon&min=40&sort=saving
const params = new URLSearchParams(location.search);
if (params.get("q")) search.value = params.get("q");
if (params.get("category")) category.value = params.get("category");
if (params.get("store")) store.value = params.get("store");
if (params.get("min")) minDiscount.value = params.get("min");
if (params.get("sort")) sort.value = params.get("sort");

function refresh() {
  const found = sortDeals(filterDeals(DEALS, {
    query: search.value,
    category: category.value,
    store: store.value,
    minDiscount: Number(minDiscount.value),
  }), sort.value);
  renderDeals(grid, found);
  renderSummary(summary, found.length, DEALS.length, found);
  empty.hidden = found.length > 0;
}

for (const control of [search, category, store, minDiscount, sort]) {
  control.addEventListener("input", refresh);
  control.addEventListener("change", refresh);
}

refresh();
