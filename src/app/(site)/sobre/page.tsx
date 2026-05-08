import SectionMarker from "@/components/SectionMarker";
import Link from "next/link";

export const metadata = {
  title: "A casa · Aureon Group",
  description:
    "A Aureon nasceu como uma casa de curadoria, não como uma imobiliária. Filosofia, método e biografia da firma.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero />
      <Pillars />
      <Method />
      <Team />
    </>
  );
}

function PageHero() {
  return (
    <section
      style={{
        padding: "9rem 3rem 6rem",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="glow glow-lime"
        style={{ width: 600, height: 600, top: "-10%", right: "-15%" }}
      />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionMarker number="00" label="A casa · Aureon Group" />
        <h1
          className="headline headline-xl"
          style={{ maxWidth: 1100, marginTop: "2.5rem" }}
        >
          Uma casa de{" "}
          <em className="serif">curadoria</em>, não uma{" "}
          <em className="serif">vitrine</em>
          <span style={{ color: "var(--lime)" }}>.</span>
        </h1>
        <p
          className="body"
          style={{ maxWidth: 580, marginTop: "2.5rem", fontSize: "1.05rem" }}
        >
          A Aureon Prime Estates foi fundada em 2018 como reação ao excesso
          do mercado de luxo. Onde havia barulho, escolhemos silêncio. Onde
          havia inventário, escolhemos seleção.
        </p>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      n: "01",
      title: "Critério",
      desc: "Cada imóvel passa por banca interna antes de virar mandato. Recusamos mais do que aceitamos.",
    },
    {
      n: "02",
      title: "Discrição",
      desc: "Mandatos exclusivos. NDA por padrão. Sem portais. Sem placa.",
    },
    {
      n: "03",
      title: "Tempo",
      desc: "Operamos em tempo de patrimônio, não em tempo de mídia. Pressa nunca foi sinônimo de bom negócio.",
    },
  ];
  return (
    <section className="section">
      <div className="section-inner">
        <SectionMarker number="01" label="Princípios" />
        <h2
          className="headline headline-lg"
          style={{ marginTop: "1.8rem", marginBottom: "3rem", maxWidth: 800 }}
        >
          Três pilares.{" "}
          <em className="serif">Inegociáveis</em>.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="pillars-grid"
        >
          {pillars.map((p) => (
            <div
              key={p.n}
              style={{
                background: "var(--bg)",
                padding: "3rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                minHeight: 360,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: "var(--lime)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.32em",
                }}
              >
                / {p.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                  fontSize: "2rem",
                  letterSpacing: "-0.03em",
                  color: "var(--white)",
                  margin: 0,
                }}
              >
                {p.title}
              </h3>
              <p className="body-fog" style={{ margin: 0, lineHeight: 1.65 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Method() {
  const steps = [
    {
      n: "I",
      title: "Briefing fechado",
      desc: "Conversa técnica sob NDA. Mapeamos tese, prazo, exposição e biografia.",
    },
    {
      n: "II",
      title: "Mira",
      desc: "Cruzamento entre carteira off-market, mandatos exclusivos e busca dirigida.",
    },
    {
      n: "III",
      title: "Curadoria",
      desc: "Pré-seleção interna. O cliente recebe três opções no máximo.",
    },
    {
      n: "IV",
      title: "Visita guiada",
      desc: "Apresentação cirúrgica com dossiê técnico, jurídico e patrimonial.",
    },
    {
      n: "V",
      title: "Estruturação",
      desc: "Negociação, diligência e fechamento sob acompanhamento dedicado.",
    },
  ];
  return (
    <section className="section" style={{ background: "var(--bg-soft)" }}>
      <div className="section-inner">
        <SectionMarker number="02" label="Método" />
        <h2
          className="headline headline-lg"
          style={{ marginTop: "1.8rem", marginBottom: "3rem", maxWidth: 800 }}
        >
          Cinco passos do{" "}
          <em className="serif">briefing</em> ao{" "}
          <em className="serif">brinde</em>.
        </h2>
        <div
          style={{
            border: "1px solid var(--line)",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 2fr",
                gap: "2rem",
                padding: "2.4rem 2rem",
                borderTop: i === 0 ? "none" : "1px solid var(--line)",
                alignItems: "center",
              }}
              className="method-row"
            >
              <span
                className="serif"
                style={{ fontSize: "2.2rem", lineHeight: 1 }}
              >
                {s.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.025em",
                  color: "var(--white)",
                  margin: 0,
                }}
              >
                {s.title}
              </h3>
              <p className="body-fog" style={{ margin: 0, fontSize: "0.95rem" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .method-row {
            grid-template-columns: 1fr !important;
            gap: 0.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function Team() {
  return (
    <section className="section">
      <div className="section-inner">
        <SectionMarker number="03" label="Casa & equipe" />
        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="team-grid"
        >
          <div>
            <h2 className="headline headline-md">
              Time enxuto, agenda{" "}
              <em className="serif">cheia</em>.
            </h2>
            <p
              className="body"
              style={{ fontSize: "1rem", marginTop: "1.5rem", maxWidth: 520 }}
            >
              Doze profissionais, três praças, uma única filosofia operacional.
              Cada cliente é atendido por sócio. Sem etapa via assistente.
            </p>
            <Link href="/contato" className="cta" style={{ marginTop: "2rem" }}>
              Falar com sócio
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--line)",
              border: "1px solid var(--line)",
            }}
          >
            {[
              { k: "Fundação", v: "2018" },
              { k: "Equipe", v: "12 prof." },
              { k: "Praças", v: "3 BR + 1 INT" },
              { k: "Idioma", v: "PT · EN · ES" },
            ].map((i) => (
              <div
                key={i.k}
                style={{
                  background: "var(--bg)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <span className="eyebrow">{i.k}</span>
                <span
                  className="serif"
                  style={{ fontSize: "1.8rem", lineHeight: 1 }}
                >
                  {i.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
