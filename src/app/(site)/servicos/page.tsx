import Link from "next/link";
import SectionMarker from "@/components/SectionMarker";

export const metadata = {
  title: "Atuação · Aureon Group",
  description:
    "Atuação da Aureon Group: lançamentos, repasse durante a obra, imóveis prontos e consultoria de investimento.",
};

const services = [
  {
    n: "01",
    title: "Lançamentos",
    eyebrow: "Planta · Pré-lançamento",
    body: "Acesso a tabelas de pré-lançamento e primeiro lote junto às incorporadoras parceiras. Reserva direta, condições de fundação e plano de pagamento alongado.",
    bullets: [
      "Análise de planta, fachada e materiais",
      "Comparativo de tabelas e descontos vigentes",
      "Reserva direta com a incorporadora",
      "Acompanhamento até a entrega das chaves",
    ],
  },
  {
    n: "02",
    title: "Em obra",
    eyebrow: "Repasse · Troca de titularidade",
    body: "Oportunidades durante a construção: repasse de cota, troca de titularidade e renegociação de saldo devedor com financiamento bancário.",
    bullets: [
      "Diligência da matrícula e contrato",
      "Análise do saldo a quitar e índice de correção",
      "Suporte para financiamento e assinatura",
      "Coordenação com a construtora",
    ],
  },
  {
    n: "03",
    title: "Pronto para morar",
    eyebrow: "Chave em mão · Semi-novo · Usado",
    body: "Imóveis prontos em bairros consolidados ou regiões em valorização. Apartamentos, casas, coberturas e comerciais — para morar ou alugar.",
    bullets: [
      "Visita acompanhada por consultor da casa",
      "Avaliação técnica e comparativo de mercado",
      "Negociação de valor e condições",
      "Apoio em financiamento e documentação",
    ],
  },
  {
    n: "04",
    title: "Investimento",
    eyebrow: "Renda · Valorização · Saída",
    body: "Para quem compra imóvel como investimento: análise de tese, projeção de retorno, montagem de carteira e estratégia de saída.",
    bullets: [
      "Estudo de demanda da região",
      "Projeção de aluguel e valorização",
      "Estratégia de short-stay vs long-stay",
      "Plano de saída com janelas alvo",
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
              maxWidth: 600,
              marginTop: "2.5rem",
              fontSize: "1.1rem",
            }}
          >
            Cobrimos todo o ciclo do imóvel — do lançamento na planta ao pronto
            para morar — com método e foco. Aderência ao briefing antes de
            volume de oferta.
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
                    fontWeight: 400,
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
                        fontWeight: 400,
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
