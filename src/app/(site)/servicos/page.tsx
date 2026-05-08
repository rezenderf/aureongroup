import Link from "next/link";
import SectionMarker from "@/components/SectionMarker";

export const metadata = {
  title: "Atuação · Aureon Group",
  description:
    "Frentes de atuação da Aureon Prime Estates: mandatos exclusivos, buyer side, off-market e consultoria patrimonial.",
};

const services = [
  {
    n: "01",
    title: "Mandato exclusivo",
    eyebrow: "Sell side · Curadoria editorial",
    body: "Representação singular para venda de imóveis acima de R$ 8M. Dossier técnico, plano de mira, comprador qualificado.",
    bullets: [
      "Avaliação patrimonial com banca interna",
      "Material editorial e curadoria fotográfica autoral",
      "Lista fechada de potenciais compradores",
      "Negociação conduzida exclusivamente por sócio",
    ],
  },
  {
    n: "02",
    title: "Buyer side",
    eyebrow: "Mira cirúrgica · Tese definida",
    body: "Para clientes com tese de patrimônio formalizada. Identificamos, qualificamos e negociamos endereços que cabem na biografia.",
    bullets: [
      "Briefing técnico com mapa de exposição",
      "Acesso a carteira off-market e mandatos",
      "Diligência jurídica e estrutural",
      "Estruturação de aquisição (PJ, holding, offshore)",
    ],
  },
  {
    n: "03",
    title: "Off-market",
    eyebrow: "Acesso restrito · NDA por padrão",
    body: "Oportunidades fora de portais e fora de mídia. Operações só apresentadas após assinatura de NDA bilateral.",
    bullets: [
      "Dossiê reservado por endereço",
      "Encontro presencial obrigatório",
      "Lista de clientes pré-qualificados",
      "Histórico curado por sócio",
    ],
  },
  {
    n: "04",
    title: "Consultoria patrimonial",
    eyebrow: "Estratégia · Avaliação · Saída",
    body: "Para holdings, family offices e investidores com exposição imobiliária. Análise, recomendação e execução de saída.",
    bullets: [
      "Avaliação multi-cenário (8 anos)",
      "Análise de exposição e diversificação",
      "Recomendação de timing e estrutura",
      "Execução completa sob acompanhamento",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
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
          style={{ width: 600, height: 600, top: "-15%", left: "-15%" }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <SectionMarker number="00" label="Atuação · Frentes" />
          <h1
            className="headline headline-xl"
            style={{ maxWidth: 1100, marginTop: "2.5rem" }}
          >
            Quatro frentes. Um único{" "}
            <em className="serif">selo</em>
            <span style={{ color: "var(--lime)" }}>.</span>
          </h1>
          <p
            className="body"
            style={{
              maxWidth: 580,
              marginTop: "2.5rem",
              fontSize: "1.05rem",
            }}
          >
            Cada frente opera com método próprio, mas sob a mesma filosofia
            editorial: critério, discrição e tempo de patrimônio.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--line)",
              border: "1px solid var(--line)",
            }}
            className="services-grid"
          >
            {services.map((s) => (
              <div
                key={s.n}
                style={{
                  background: "var(--bg)",
                  padding: "3rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    className="serif"
                    style={{ fontSize: "2.4rem", lineHeight: 1 }}
                  >
                    / {s.n}
                  </span>
                  <span className="eyebrow" style={{ textAlign: "right" }}>
                    {s.eyebrow}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-geist), sans-serif",
                    fontWeight: 300,
                    fontSize: "2.2rem",
                    letterSpacing: "-0.035em",
                    color: "var(--white)",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {s.title}
                </h3>
                <p className="body-fog" style={{ margin: 0, lineHeight: 1.65 }}>
                  {s.body}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0.5rem 0 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        gap: "0.7rem",
                        alignItems: "flex-start",
                        color: "var(--bone)",
                        fontSize: "0.9rem",
                        fontWeight: 300,
                        lineHeight: 1.55,
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
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "5rem", textAlign: "center" }}>
            <Link href="/contato" className="cta">
              Solicitar atendimento
            </Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .services-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
