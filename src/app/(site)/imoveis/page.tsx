import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SectionMarker from "@/components/SectionMarker";

export const dynamic = "force-dynamic";

type Search = { city?: string; kind?: string };

export const metadata = {
  title: "Portfólio · Aureon Group",
  description:
    "Curadoria silenciosa de imóveis assinados. Mandatos exclusivos e oportunidades sob NDA.",
};

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { city, kind } = await searchParams;
  const where: any = { status: { not: "ARCHIVED" } };
  if (city) where.city = city;
  if (kind) where.kind = kind;

  const [properties, cities, kinds] = await Promise.all([
    prisma.property
      .findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      })
      .catch(() => []),
    prisma.property.findMany({
      where: { status: { not: "ARCHIVED" } },
      select: { city: true },
      distinct: ["city"],
    }).catch(() => []),
    prisma.property.findMany({
      where: { status: { not: "ARCHIVED" } },
      select: { kind: true },
      distinct: ["kind"],
    }).catch(() => []),
  ]);

  return (
    <>
      <section
        style={{
          padding: "9rem 3rem 5rem",
          borderBottom: "1px solid var(--line)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="glow glow-lime"
          style={{ width: 600, height: 600, top: "-15%", left: "-10%" }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <SectionMarker number="00" label="Portfólio · Atual" />
          <h1
            className="headline headline-xl"
            style={{ maxWidth: 1100, marginTop: "2.5rem" }}
          >
            Lançamento ao{" "}
            <em className="serif">pronto</em>
            <span style={{ color: "var(--lime)" }}>.</span>{" "}
            <span style={{ color: "var(--fog)" }}>
              {properties.length.toString().padStart(2, "0")} imóveis.
            </span>
          </h1>
          <p
            className="body"
            style={{
              maxWidth: 600,
              marginTop: "2.5rem",
              fontSize: "1.1rem",
            }}
          >
            Lançamentos, imóveis em obra e prontos para morar. Use os filtros
            ou mande um briefing — buscamos opções fora desta lista quando o
            ajuste pede.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="section-inner">
          <Filters
            cities={cities.map((c) => c.city)}
            kinds={kinds.map((k) => k.kind)}
            currentCity={city}
            currentKind={kind}
          />

          {properties.length === 0 ? (
            <div
              style={{
                marginTop: "3rem",
                border: "1px solid var(--line)",
                padding: "5rem 2rem",
                textAlign: "center",
              }}
            >
              <span className="eyebrow">Nenhum imóvel encontrado</span>
              <p className="body" style={{ marginTop: "1rem", maxWidth: 480, marginInline: "auto", color: "var(--bone)" }}>
                Mande um briefing pela página de contato. Conseguimos buscar
                opções fora desta lista — em lançamento, repasse ou pronto.
              </p>
            </div>
          ) : (
            <div
              style={{
                marginTop: "3rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}
              className="props-grid"
            >
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .props-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 700px) {
            .props-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}

function Filters({
  cities,
  kinds,
  currentCity,
  currentKind,
}: {
  cities: string[];
  kinds: string[];
  currentCity?: string;
  currentKind?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.6rem",
        alignItems: "center",
      }}
    >
      <span className="eyebrow" style={{ marginRight: "0.6rem" }}>
        Filtrar:
      </span>
      <FilterPill
        href="/imoveis"
        active={!currentCity && !currentKind}
        label="Tudo"
      />
      {cities.map((c) => (
        <FilterPill
          key={c}
          href={`/imoveis?city=${encodeURIComponent(c)}`}
          active={currentCity === c}
          label={c}
        />
      ))}
      <span style={{ width: 1, height: 24, background: "var(--line)" }} />
      {kinds.map((k) => (
        <FilterPill
          key={k}
          href={`/imoveis?kind=${encodeURIComponent(k)}`}
          active={currentKind === k}
          label={k.toLowerCase()}
        />
      ))}
    </div>
  );
}

function FilterPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={active ? "tag" : "tag tag-muted"}
      style={{ textTransform: "uppercase" }}
    >
      {label}
    </Link>
  );
}
