export function formatNumber(n) {
    if (!Number.isFinite(n)) return String(n);
    return Number.isInteger(n) ? String(n) : Number(n.toFixed(10)).toString();
}