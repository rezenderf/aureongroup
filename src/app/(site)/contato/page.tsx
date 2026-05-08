import SectionMarker from "@/components/SectionMarker";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contato · Aureon Group",
  description: "Inicie uma conversa com a curadoria. Resposta em até 24h úteis.",
};

export default function ContatoPage() {
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
          style={{ width: 600, height: 600, top: "-15%", right: "-15%" }}
        />
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <SectionMarker number="00" label="Contato · Curadoria" />
          <h1
            className="headline headline-xl"
            style={{ maxWidth: 1100, marginTop: "2.5rem" }}
          >
            Inicie uma{" "}
            <em className="serif">conversa</em>
            <span style={{ color: "var(--lime)" }}>.</span>
          </h1>
          <p
            className="body"
            style={{
              maxWidth: 580,
              marginTop: "2.5rem",
              fontSize: "1.1rem",
            }}
          >
            Conte o que você procura — lançamento, repasse ou pronto para
            morar — que respondemos em até 24h úteis com um shortlist
            aderente.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "5rem",
            }}
            className="contact-grid"
          >
            <ContactInfo />
            <ContactForm source="contato" />
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}

function ContactInfo() {
  const items = [
    { label: "E-mail", value: "contato@aureongroup.com.br", href: "mailto:contato@aureongroup.com.br" },
    { label: "Telefone", value: "+55 83 3000-0000", href: "tel:+558330000000" },
    { label: "Sede", value: "João Pessoa · PB" },
    { label: "Praças", value: "São Paulo · Recife · Atendimento nacional" },
    { label: "Horário", value: "Seg–Sex · 09h às 19h" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <h2 className="headline headline-md">
          Linhas{" "}
          <em className="serif">diretas</em>.
        </h2>
        <p className="body" style={{ marginTop: "1.2rem", maxWidth: 440, color: "var(--bone)" }}>
          Atendimento por consultor da casa, do briefing à assinatura.
          Indique região, faixa de orçamento e momento da compra.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--line)",
        }}
      >
        {items.map((i) => (
          <div
            key={i.label}
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <span className="eyebrow">{i.label}</span>
            {i.href ? (
              <a
                href={i.href}
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontSize: "1.05rem",
                  color: "var(--white)",
                  fontWeight: 400,
                  borderBottom: "1px solid var(--line)",
                  paddingBottom: "0.3rem",
                  width: "fit-content",
                }}
              >
                {i.value}
              </a>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontSize: "1.05rem",
                  color: "var(--white)",
                }}
              >
                {i.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
