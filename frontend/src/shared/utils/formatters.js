export function formatPoints(points) {
  return new Intl.NumberFormat().format(points ?? 0);
}

export function formatDateTime(isoString) {
  if (!isoString) return '-';
  return new Date(isoString).toLocaleString();
}
