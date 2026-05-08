import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import SectionMarker from "@/components/SectionMarker";

export const dynamic = "force-dynamic";

export const metadata = { title: "Área do corretor · Aureon Group" };

type LinkItem = {
  category: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

const LINKS: LinkItem[] = [
  {
    category: "CRM",
    title: "Ezen · WTS Chat",
    description:
      "Sistema oficial de CRM e atendimento. Gestão de leads, conversas e pipeline de vendas.",
    href: "https://ezen.wts.chat/",
    cta: "Abrir CRM",
  },
];

export default async function CorretorHome() {
  if (!(await isAuthenticated("corretor"))) redirect("/corretor/login");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <div>
        <SectionMarker number="00" label="Área restrita · Time de vendas" />
        <h1 className="headline headline-lg" style={{ marginTop: "1.5rem", maxWidth: 900 }}>
          Ferramentas e{" "}
          <em className="serif">sistemas</em> do corretor.
        </h1>
        <p
          className="body"
          style={{ marginTop: "1.5rem", maxWidth: 580, fontSize: "1.05rem" }}
        >
          Atalhos para os sistemas internos da Aureon Group. Acesse o CRM,
          materiais e ferramentas usadas no dia a dia.
        </p>
      </div>

      <div>
        <SectionMarker number="01" label="Sistemas" />
        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="links-grid"
        >
          {LINKS.map((l) => (
            <LinkCard key={l.href} item={l} />
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) {
            .links-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

function LinkCard({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        padding: "2.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        minHeight: 220,
        transition: "border-color 0.2s ease, transform 0.3s ease",
      }}
      className="link-card"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            color: "var(--gold)",
            border: "1px solid var(--gold-dim)",
            padding: "0.3rem 0.7rem",
            borderRadius: 999,
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {item.category}
        </span>
        <span
          style={{
            color: "var(--gold)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          ↗
        </span>
      </div>

      <h3
        className="headline headline-md"
        style={{ margin: 0, fontSize: "1.8rem" }}
      >
        {item.title}
      </h3>

      <p
        className="body"
        style={{
          margin: 0,
          color: "var(--bone)",
          fontSize: "0.95rem",
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {item.description}
      </p>

      <span
        style={{
          color: "var(--gold)",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          fontWeight: 500,
          paddingTop: "0.4rem",
          borderTop: "1px solid var(--line)",
        }}
      >
        {item.cta} →
      </span>

      <style>{`
        .link-card:hover {
          border-color: var(--gold-dim) !important;
        }
      `}</style>
    </a>
  );
}
