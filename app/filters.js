// Search, filter and sort for the deal list. Pure functions over the deal data,
// so the same rules drive the page and any test of it.
export function discountOf(deal) {
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

export function savingOf(deal) {
  return Math.round((deal.usual - deal.sale) * 100) / 100;
}

export function filterDeals(deals, { query = "", category = "", store = "", minDiscount = 0 } = {}) {
  const q = query.trim().toLowerCase();
  return deals.filter((deal) => {
    if (q && !(deal.product + " " + deal.store + " " + deal.category).toLowerCase().includes(q)) return false;
    if (category && deal.category !== category) return false;
    if (store && deal.store !== store) return false;
    if (discountOf(deal) < minDiscount) return false;
    return true;
  });
}

export function sortDeals(deals, mode = "discount") {
  const list = [...deals];
  if (mode === "saving") list.sort((a, b) => savingOf(b) - savingOf(a));
  else if (mode === "price-asc") list.sort((a, b) => a.sale - b.sale);
  else if (mode === "price-desc") list.sort((a, b) => b.sale - a.sale);
  else list.sort((a, b) => discountOf(b) - discountOf(a) || savingOf(b) - savingOf(a));
  return list;
}

export function uniqueValues(deals, key) {
  return [...new Set(deals.map((deal) => deal[key]))].sort();
}
