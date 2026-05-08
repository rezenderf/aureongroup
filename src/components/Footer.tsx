import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bg-soft)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "5rem 3rem 3rem",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 300,
              fontSize: "1.6rem",
              letterSpacing: "-0.03em",
              color: "var(--white)",
              marginBottom: "0.9rem",
            }}
          >
            Endereço como{" "}
            <em className="serif">biografia</em>
            <span style={{ color: "var(--lime)" }}>.</span>
          </div>
          <p
            className="body-fog"
            style={{ fontSize: "0.85rem", maxWidth: 360, lineHeight: 1.6 }}
          >
            Aureon Prime Estates. Curadoria silenciosa de imóveis assinados em
            mercados primários. Atendimento sob critério.
          </p>
        </div>

        <FooterCol title="Navegar">
          <Link href="/imoveis">Portfólio</Link>
          <Link href="/sobre">A casa</Link>
          <Link href="/servicos">Atuação</Link>
          <Link href="/contato">Contato</Link>
        </FooterCol>

        <FooterCol title="Praças">
          <span>São Paulo</span>
          <span>Rio de Janeiro</span>
          <span>Trancoso</span>
          <span>Internacional</span>
        </FooterCol>

        <FooterCol title="Contato">
          <a href="mailto:contato@aureongroup.com.br">
            contato@aureongroup.com.br
          </a>
          <a href="tel:+551130000000">+55 11 3000-0000</a>
          <span>São Paulo · BR</span>
        </FooterCol>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--line)",
          padding: "1.5rem 3rem",
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--fog)",
        }}
      >
        <span>© {new Date().getFullYear()} Aureon Group</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
          <span className="live-dot" /> Operando · {new Date().getFullYear()}
        </span>
      </div>

      <style>{`
        footer a:hover { color: var(--lime); }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            padding: 3rem 1.5rem 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          fontSize: "0.6rem",
          color: "var(--lime)",
          marginBottom: "0.4rem",
        }}
      >
        {title}
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
          color: "var(--bone)",
          fontSize: "0.85rem",
          fontWeight: 300,
        }}
      >
        {children}
      </div>
    </div>
  );
}
