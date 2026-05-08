export function formatPrice(value: bigint | number): string {
  const num = typeof value === "bigint" ? Number(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatPriceShort(value: bigint | number): string {
  const num = typeof value === "bigint" ? Number(value) : value;
  if (num >= 1_000_000) {
    return `R$ ${(num / 1_000_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })}M`;
  }
  if (num >= 1_000) {
    return `R$ ${(num / 1_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 0,
    })}K`;
  }
  return `R$ ${num}`;
}

export function formatArea(value: number): string {
  return `${value.toLocaleString("pt-BR")} m²`;
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
