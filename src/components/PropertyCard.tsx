import Link from "next/link";
import { formatPriceShort, formatArea } from "@/lib/format";
import type { Property } from "@prisma/client";

const statusLabel: Record<string, string> = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  ARCHIVED: "Arquivado",
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/imoveis/${property.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        padding: "1.5rem",
        transition: "border-color 0.25s ease",
      }}
      className="property-card"
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          background: "var(--bg-soft)",
          border: "1px solid var(--line)",
          backgroundImage: property.coverUrl
            ? `url(${property.coverUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "0.85rem",
            left: "0.85rem",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--lime)",
            border: "1px solid var(--lime-dim)",
            background: "rgba(10, 11, 8, 0.7)",
            padding: "0.3rem 0.6rem",
            borderRadius: 999,
            backdropFilter: "blur(6px)",
          }}
        >
          {statusLabel[property.status] ?? property.status}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <span className="eyebrow">
          {property.district} · {property.city}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            fontWeight: 300,
            fontSize: "1.6rem",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--white)",
            margin: 0,
          }}
        >
          {property.title}
        </h3>
        {property.subtitle && (
          <p
            className="body-fog"
            style={{ fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}
          >
            {property.subtitle}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: "1rem",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: "0.35rem" }}>
            Valor
          </div>
          <div
            className="serif"
            style={{ fontSize: "1.7rem", lineHeight: 1 }}
          >
            {formatPriceShort(property.price)}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="eyebrow" style={{ marginBottom: "0.35rem" }}>
            Área
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist), sans-serif",
              fontSize: "1rem",
              color: "var(--bone)",
              fontWeight: 400,
            }}
          >
            {formatArea(property.area)}
          </div>
        </div>
      </div>

      <style>{`
        .property-card:hover {
          border-color: var(--line-bright) !important;
        }
      `}</style>
    </Link>
  );
}
