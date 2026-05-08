import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-soft)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
              AUR / ADMIN
            </span>
            <Link
              href="/admin"
              style={{
                fontFamily: "var(--font-geist), sans-serif",
                fontSize: "1.05rem",
                color: "var(--white)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Aureon<span style={{ color: "var(--lime)" }}>.</span> Admin
            </Link>
          </div>

          {authed && (
            <nav
              style={{
                display: "flex",
                gap: "2rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                color: "var(--fog)",
                alignItems: "center",
              }}
            >
              <Link href="/admin" style={{ transition: "color 0.2s" }}>
                Dashboard
              </Link>
              <Link href="/admin/imoveis">Imóveis</Link>
              <Link href="/admin/leads">Leads</Link>
              <Link
                href="/"
                target="_blank"
                style={{ color: "var(--lime)" }}
              >
                Ver site ↗
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--line-bright)",
                    color: "var(--bone)",
                    padding: "0.45rem 0.9rem",
                    borderRadius: 999,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Sair
                </button>
              </form>
            </nav>
          )}
        </div>
      </header>

      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </main>
    </div>
  );
}
