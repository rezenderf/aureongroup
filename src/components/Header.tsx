import Link from "next/link";

const NAV = [
  { href: "/imoveis", label: "Portfólio" },
  { href: "/sobre", label: "A casa" },
  { href: "/servicos", label: "Atuação" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "rgba(10, 11, 8, 0.78)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "1.1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.4em",
              color: "var(--lime)",
              border: "1px solid var(--lime-dim)",
              padding: "0.3rem 0.55rem",
              borderRadius: 999,
            }}
          >
            AUR · BR
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 500,
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              color: "var(--white)",
            }}
          >
            Aureon Group<span style={{ color: "var(--lime)" }}>.</span>
          </span>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "2.4rem",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            color: "var(--bone)",
            fontWeight: 500,
          }}
          className="hide-mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transition: "color 0.2s ease" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contato" className="cta cta-sm">
          Marcar visita
        </Link>
      </div>
      <style>{`
        header nav a:hover { color: var(--lime); }
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
