const bengaliNumberFormat = new Intl.NumberFormat("bn-BD");

export function formatNumber(value) {
  return bengaliNumberFormat.format(value);
}

export function formatPrice(value) {
  return `${formatNumber(value)} টাকা`;
}

export function getUnitLabel(unit) {
  const labels = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };
  return labels[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

export function getChangeLabel(dir, pct) {
  if (dir === "flat" || pct === 0) return `— ${formatNumber(0)}.০%`;
  const indicator = dir === "up" ? "▲" : "▼";
  return `${indicator} ${formatNumber(pct)}%`;
}

export function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export function getProductSummary(product) {
  const minimum = Math.min(...product.markets.map((market) => market.min));
  const maximum = Math.max(...product.markets.map((market) => market.max));
  const average = Math.round(
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length,
  );

  return { minimum, maximum, average };
}
