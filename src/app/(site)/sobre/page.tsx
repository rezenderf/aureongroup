import SectionMarker from "@/components/SectionMarker";
import Link from "next/link";

export const metadata = {
  title: "A casa · Aureon Group",
  description:
    "Aureon Group: curadoria de imóveis do lançamento ao pronto. Filosofia, método e biografia da casa.",
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
          style={{ maxWidth: 600, marginTop: "2.5rem", fontSize: "1.1rem" }}
        >
          A Aureon Group nasceu para reorganizar a forma como se compra
          imóvel: do lançamento na planta ao pronto para morar, com método
          e foco. Onde havia catálogo, oferecemos seleção. Onde havia ruído,
          oferecemos clareza.
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
      desc: "Filtramos cada lançamento, repasse e imóvel pronto antes de apresentar. Recusamos mais do que aceitamos.",
    },
    {
      n: "02",
      title: "Foco",
      desc: "Pouca opção, bem escolhida. O cliente recebe um shortlist com até três imóveis aderentes — não um catálogo.",
    },
    {
      n: "03",
      title: "Acompanhamento",
      desc: "Da reserva à entrega das chaves. Diligência, repasse, financiamento e pós-venda sob acompanhamento próprio.",
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
                  fontWeight: 400,
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
      title: "Briefing",
      desc: "Conversa para mapear momento de vida, prazo, orçamento e prioridade entre lançamento, obra e pronto.",
    },
    {
      n: "II",
      title: "Mira",
      desc: "Cruzamento entre carteira de incorporadoras parceiras, repasses e estoque pronto que se ajustam ao briefing.",
    },
    {
      n: "III",
      title: "Curadoria",
      desc: "Shortlist com até três imóveis. Cada opção vem com dossiê de planta, condições e contexto da região.",
    },
    {
      n: "IV",
      title: "Visita",
      desc: "Apresentação técnica do estande, da obra ou do imóvel pronto, sempre acompanhada por consultor da casa.",
    },
    {
      n: "V",
      title: "Fechamento",
      desc: "Negociação, diligência jurídica, financiamento e repasse — até a entrega das chaves.",
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
                  fontWeight: 400,
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
              Time enxuto, atendimento{" "}
              <em className="serif">próximo</em>.
            </h2>
            <p
              className="body"
              style={{ fontSize: "1.05rem", marginTop: "1.5rem", maxWidth: 540 }}
            >
              Cada cliente é acompanhado por consultor da casa do briefing à
              entrega das chaves. Sem repasse via assistente, sem corretor
              terceirizado.
            </p>
            <Link href="/contato" className="cta" style={{ marginTop: "2rem" }}>
              Falar com a casa
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
              { k: "Sede", v: "João Pessoa · PB" },
              { k: "Praças", v: "PB · SP · PE" },
              { k: "Atuação", v: "Lançamento → pronto" },
              { k: "Atendimento", v: "Nacional" },
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
                  style={{
                    fontFamily: "var(--font-geist), sans-serif",
                    fontSize: "1.15rem",
                    color: "var(--white)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
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
