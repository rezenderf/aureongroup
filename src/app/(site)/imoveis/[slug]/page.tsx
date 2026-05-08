import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SectionMarker from "@/components/SectionMarker";
import InquiryForm from "@/components/InquiryForm";
import PropertyCard from "@/components/PropertyCard";
import { formatPrice, formatArea } from "@/lib/format";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  ARCHIVED: "Arquivado",
};

const kindLabel: Record<string, string> = {
  APARTAMENTO: "Apartamento",
  COBERTURA: "Cobertura",
  CASA: "Casa",
  TERRENO: "Terreno",
  COMERCIAL: "Comercial",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await prisma.property
    .findUnique({ where: { slug } })
    .catch(() => null);
  if (!property) return { title: "Imóvel · Aureon Group" };
  return {
    title: `${property.title} · Aureon Group`,
    description: property.subtitle ?? property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await prisma.property
    .findUnique({ where: { slug } })
    .catch(() => null);

  if (!property) notFound();

  const related = await prisma.property
    .findMany({
      where: {
        slug: { not: slug },
        city: property.city,
        status: { not: "ARCHIVED" },
      },
      take: 3,
      orderBy: { featured: "desc" },
    })
    .catch(() => []);

  const cover = property.coverUrl ?? property.gallery[0];
  const restGallery = property.gallery.filter((g) => g !== cover);

  return (
    <>
      <section
        style={{
          padding: "6rem 3rem 3rem",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link href="/imoveis" className="link-arrow">
            ← Portfólio
          </Link>
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              flexWrap: "wrap",
            }}
          >
            <span className="tag">{statusLabel[property.status]}</span>
            <span className="tag tag-muted">{kindLabel[property.kind]}</span>
            <span className="tag tag-muted">
              {property.district} · {property.city}
            </span>
          </div>
          <h1
            className="headline headline-xl"
            style={{ marginTop: "2rem", maxWidth: 1100 }}
          >
            {property.title}
            <span style={{ color: "var(--lime)" }}>.</span>
          </h1>
          {property.subtitle && (
            <p
              className="body"
              style={{
                marginTop: "1.4rem",
                fontSize: "1.15rem",
                maxWidth: 720,
                color: "var(--bone)",
              }}
            >
              {property.subtitle}
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: "3rem 3rem", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              aspectRatio: "16 / 9",
              background: "var(--bg-soft)",
              border: "1px solid var(--line)",
              backgroundImage: cover ? `url(${cover})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {restGallery.length > 0 && (
            <div
              style={{
                marginTop: "1.5rem",
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(restGallery.length, 3)}, 1fr)`,
                gap: "1.5rem",
              }}
            >
              {restGallery.slice(0, 3).map((img) => (
                <div
                  key={img}
                  style={{
                    aspectRatio: "4 / 3",
                    background: "var(--bg-soft)",
                    border: "1px solid var(--line)",
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "5rem",
              alignItems: "start",
            }}
            className="detail-grid"
          >
            <div>
              <SectionMarker number="01" label="Especificações" />
              <div
                style={{
                  marginTop: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1px",
                  background: "var(--line)",
                  border: "1px solid var(--line)",
                  marginBottom: "3.5rem",
                }}
                className="specs-grid"
              >
                <Spec label="Valor" value={formatPrice(property.price)} highlight />
                <Spec label="Área" value={formatArea(property.area)} />
                <Spec label="Suítes" value={property.bedrooms.toString()} />
                <Spec label="Vagas" value={property.parking.toString()} />
              </div>

              <SectionMarker number="02" label="Descrição" />
              <p
                className="body"
                style={{
                  marginTop: "2rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {property.description}
              </p>

              {property.highlights.length > 0 && (
                <>
                  <div style={{ marginTop: "3.5rem" }}>
                    <SectionMarker number="03" label="Destaques" />
                  </div>
                  <ul
                    style={{
                      marginTop: "2rem",
                      listStyle: "none",
                      padding: 0,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1px",
                      background: "var(--line)",
                      border: "1px solid var(--line)",
                    }}
                    className="highlights-grid"
                  >
                    {property.highlights.map((h) => (
                      <li
                        key={h}
                        style={{
                          background: "var(--bg)",
                          padding: "1.4rem 1.6rem",
                          color: "var(--bone)",
                          fontSize: "0.95rem",
                          fontWeight: 400,
                          display: "flex",
                          gap: "0.8rem",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--lime)",
                            fontFamily: "var(--font-geist-mono), monospace",
                            fontSize: "0.7rem",
                            marginTop: "0.25rem",
                          }}
                        >
                          ▸
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                padding: "2.4rem",
                position: "sticky",
                top: "5rem",
              }}
            >
              <SectionMarker number="04" label="Solicitar visita" />
              <h3
                className="headline headline-md"
                style={{ marginTop: "1.4rem", marginBottom: "1.8rem" }}
              >
                Atendimento por{" "}
                <em className="serif">sócio</em>.
              </h3>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .detail-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .specs-grid { grid-template-columns: 1fr 1fr !important; }
            .highlights-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="section-inner">
            <SectionMarker number="05" label={`Outros endereços em ${property.city}`} />
            <div
              style={{
                marginTop: "2.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}
              className="related-grid"
            >
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 1000px) {
              .related-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 700px) {
              .related-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      )}
    </>
  );
}

function Spec({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--bg)",
        padding: "1.6rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        minHeight: 120,
      }}
    >
      <span className="eyebrow">{label}</span>
      <span
        className={highlight ? "serif" : ""}
        style={
          highlight
            ? { fontSize: "1.7rem", lineHeight: 1.1 }
            : {
                fontFamily: "var(--font-geist), sans-serif",
                fontSize: "1.4rem",
                color: "var(--white)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
              }
        }
      >
        {value}
      </span>
    </div>
  );
}
