// Renders deal cards into the page. One card per deal: product, store, sale price,
// usual price, discount, verdict with evidence, check time and source, store link.
import { CHECKED_ON } from "./deals.js";
import { discountOf, savingOf } from "./filters.js";

const VERDICT_LABEL = {
  "new-low": "New low",
  "strong": "Strong price",
  "routine": "Routine sale",
};

export function money(amount) {
  return "$" + amount.toFixed(2).replace(/\.00$/, "");
}

export function dealCard(deal) {
  const card = document.createElement("article");
  card.className = "card";
  const off = discountOf(deal);

  const top = document.createElement("div");
  top.className = "row";
  const cat = document.createElement("span");
  cat.className = "cat";
  cat.textContent = deal.category;
  const store = document.createElement("span");
  store.className = "store";
  store.textContent = deal.store;
  top.append(cat, store);

  const title = document.createElement("h2");
  title.textContent = deal.product;

  const prices = document.createElement("div");
  prices.className = "prices";
  const sale = document.createElement("span");
  sale.className = "sale";
  sale.textContent = money(deal.sale);
  const was = document.createElement("span");
  was.className = "was";
  was.textContent = "was " + money(deal.usual);
  const badge = document.createElement("span");
  badge.className = "off";
  badge.textContent = off + "% off · save " + money(savingOf(deal));
  prices.append(sale, was, badge);

  const verdict = document.createElement("span");
  verdict.className = "verdict " + deal.signal;
  verdict.textContent = VERDICT_LABEL[deal.signal] || deal.signal;

  const evidence = document.createElement("p");
  evidence.className = "evidence";
  evidence.textContent = deal.evidence;

  const checked = document.createElement("p");
  checked.className = "checked";
  checked.innerHTML = "";
  const when = document.createElement("b");
  when.textContent = "Checked " + CHECKED_ON;
  checked.append(when, document.createTextNode(" · source: " + deal.source));

  const go = document.createElement("a");
  go.className = "go";
  go.href = deal.link;
  go.target = "_blank";
  go.rel = "noopener";
  go.textContent = "View at " + deal.store + " →";

  card.append(top, title, prices, verdict, evidence, checked, go);
  return card;
}

export function renderDeals(container, deals) {
  container.replaceChildren(...deals.map(dealCard));
}

export function renderSummary(el, shown, total, deals) {
  const best = deals.length ? Math.max(...deals.map(discountOf)) : 0;
  const saved = deals.reduce((sum, deal) => sum + savingOf(deal), 0);
  el.innerHTML = "";
  const b1 = document.createElement("b");
  b1.textContent = shown + " of " + total + " deals";
  const b2 = document.createElement("b");
  b2.textContent = "up to " + best + "% off";
  const b3 = document.createElement("b");
  b3.textContent = money(saved) + " total savings";
  el.append(b1, document.createTextNode(" · best "), b2, document.createTextNode(" · "), b3, document.createTextNode(" if you bought one of each."));
}
