import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SectionMarker from "@/components/SectionMarker";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.property
    .findMany({
      where: { featured: true, status: { not: "ARCHIVED" } },
      orderBy: { createdAt: "desc" },
      take: 3,
    })
    .catch(() => []);

  return (
    <>
      <Hero />
      <Stats />
      <Featured properties={featured} />
      <Manifesto />
      <PracticeAreas />
      <CTASection />
    </>
  );
}

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "9rem 3rem 7rem",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="bg-grid" />
      <div
        className="glow glow-lime"
        style={{ width: 720, height: 720, top: "-10%", right: "-12%" }}
      />
      <div
        className="glow glow-lime"
        style={{ width: 480, height: 480, bottom: "-15%", left: "-10%", opacity: 0.35 }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <span className="live-dot" />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              fontSize: "0.7rem",
              color: "var(--bone)",
              fontWeight: 500,
            }}
          >
            Curadoria · Lançamento ao pronto · Em operação
          </span>
        </div>

        <h1
          className="headline headline-xl"
          style={{ maxWidth: 1100, marginBottom: "2.5rem" }}
        >
          Endereço como{" "}
          <em
            className="serif"
            style={{ fontSize: "1em", letterSpacing: "-0.03em" }}
          >
            biografia
          </em>
          <span style={{ color: "var(--lime)" }}>.</span>{" "}
          Do{" "}
          <em
            className="serif"
            style={{ fontSize: "1em", letterSpacing: "-0.03em" }}
          >
            lançamento
          </em>{" "}
          ao{" "}
          <em
            className="serif"
            style={{ fontSize: "1em", letterSpacing: "-0.03em" }}
          >
            pronto
          </em>
          <span style={{ color: "var(--lime)" }}>.</span>
        </h1>

        <p
          className="body"
          style={{
            maxWidth: 560,
            fontSize: "1.1rem",
            lineHeight: 1.65,
            marginBottom: "3rem",
            color: "var(--bone)",
          }}
        >
          Aureon Group atua em todo o ciclo do imóvel — do lançamento na
          planta ao pronto para morar. Curadoria com método, foco e
          atendimento sob critério.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/imoveis" className="cta">
            Ver portfólio
          </Link>
          <Link href="/contato" className="cta cta-ghost">
            Conversar com a curadoria
          </Link>
        </div>

        <div
          style={{
            marginTop: "6rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="hero-meta"
        >
          {[
            { k: "João Pessoa", v: "Sede / PB" },
            { k: "São Paulo", v: "Praça / SP" },
            { k: "Recife", v: "Praça / PE" },
            { k: "Atendimento", v: "Nacional" },
          ].map((i) => (
            <div
              key={i.k}
              style={{
                background: "var(--bg)",
                padding: "1.4rem 1.6rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <span className="eyebrow">{i.v}</span>
              <span
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontSize: "1rem",
                  color: "var(--white)",
                  fontWeight: 400,
                }}
              >
                {i.k}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .hero-meta { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "Lançamento", l: "Reserva direta com a incorporadora" },
    { n: "Construção", l: "Acompanhamento de obra e repasse" },
    { n: "Pronto", l: "Estoque de chave em mão" },
    { n: "Investimento", l: "Renda, valorização e saída" },
  ];
  return (
    <section className="section">
      <div className="section-inner">
        <SectionMarker number="01" label="Cobertura · Ciclo completo" />
        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="stats-grid"
        >
          {stats.map((s) => (
            <div
              key={s.l}
              style={{
                background: "var(--bg)",
                padding: "2.6rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

function Featured({ properties }: { properties: any[] }) {
  return (
    <section className="section">
      <div className="section-inner">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <SectionMarker number="02" label="Portfólio · Em destaque" />
            <h2 className="headline headline-lg" style={{ maxWidth: 700 }}>
              Endereços{" "}
              <em className="serif">selecionados</em> da curadoria atual.
            </h2>
          </div>
          <Link href="/imoveis" className="link-arrow">
            Ver todos →
          </Link>
        </div>

        {properties.length === 0 ? (
          <EmptyState text="Nenhum imóvel em destaque no momento. Buscas dirigidas disponíveis mediante briefing." />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="featured-grid"
          >
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .featured-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 700px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Manifesto() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-soft)", position: "relative", overflow: "hidden" }}
    >
      <div
        className="glow glow-lime"
        style={{ width: 600, height: 600, top: "-30%", right: "-15%", opacity: 0.4 }}
      />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <SectionMarker number="03" label="Manifesto" />
        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="manifesto-grid"
        >
          <h2 className="headline headline-lg">
            O imóvel certo não é o que aparece{" "}
            <em className="serif">primeiro</em>. É o que se{" "}
            <em className="serif">ajusta</em> ao seu projeto.
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.6rem",
              paddingTop: "0.8rem",
            }}
          >
            <p className="body" style={{ fontSize: "1.05rem" }}>
              Trabalhamos com lançamentos, obras em andamento e imóveis
              prontos. Cada opção apresentada passa por filtro de localização,
              construtora, planta e condição comercial.
            </p>
            <p className="body" style={{ fontSize: "1.05rem" }}>
              Nosso ponto forte é o foco. Pouca opção, bem escolhida — em vez
              de catálogo. O cliente decide melhor quando recebe menos.
            </p>
            <Link href="/sobre" className="link-arrow" style={{ marginTop: "0.6rem" }}>
              Conheça a casa →
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .manifesto-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

function PracticeAreas() {
  const areas = [
    {
      n: "I",
      title: "Lançamentos",
      desc: "Acesso a tabelas de pré-lançamento, primeiro lote e condições de incorporadora.",
    },
    {
      n: "II",
      title: "Em obra",
      desc: "Repasse, troca de titularidade e oportunidades durante a construção.",
    },
    {
      n: "III",
      title: "Pronto",
      desc: "Imóveis com chave em mão, semi-novos e usados em bairros consolidados.",
    },
    {
      n: "IV",
      title: "Investimento",
      desc: "Análise de tese, projeção de retorno e estratégia de saída.",
    },
  ];
  return (
    <section className="section">
      <div className="section-inner">
        <SectionMarker number="04" label="Atuação" />
        <h2
          className="headline headline-lg"
          style={{ marginTop: "1.8rem", marginBottom: "3rem", maxWidth: 800 }}
        >
          Quatro frentes. Um único{" "}
          <em className="serif">selo</em>.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="practice-grid"
        >
          {areas.map((a) => (
            <div
              key={a.n}
              style={{
                background: "var(--bg)",
                padding: "2.4rem 1.8rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                minHeight: 280,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-instrument), serif",
                  fontStyle: "italic",
                  color: "var(--lime)",
                  fontSize: "2.2rem",
                  lineHeight: 1,
                }}
              >
                {a.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 400,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.025em",
                  color: "var(--white)",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {a.title}
              </h3>
              <p
                className="body-fog"
                style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}
              >
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .practice-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section" style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="glow glow-lime"
        style={{ width: 700, height: 700, top: "20%", left: "-15%" }}
      />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            border: "1px solid var(--line-bright)",
            background: "var(--bg-card)",
            padding: "5rem 4rem",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="cta-block"
        >
          <h2 className="headline headline-md" style={{ maxWidth: 640 }}>
            Lançamento, repasse ou{" "}
            <em className="serif">pronto para morar</em>?
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.4rem",
              alignItems: "flex-start",
            }}
          >
            <p className="body" style={{ fontSize: "1rem", margin: 0, color: "var(--bone)" }}>
              Mande seu briefing. Respondemos em até 24h úteis com até três
              opções aderentes — não com uma lista infinita.
            </p>
            <Link href="/contato" className="cta">
              Iniciar conversa
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .cta-block {
            grid-template-columns: 1fr !important;
            padding: 2.5rem 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        padding: "3rem",
        textAlign: "center",
        color: "var(--fog)",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.28em",
      }}
    >
      {text}
    </div>
  );
}
