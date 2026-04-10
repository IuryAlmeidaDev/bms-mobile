export function formatSalaTipo(tipo: string) {
  return tipo
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ");
}
