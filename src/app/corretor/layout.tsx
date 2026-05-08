import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function CorretorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated("corretor");

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
                color: "var(--gold)",
                border: "1px solid var(--gold-dim)",
                padding: "0.3rem 0.55rem",
                borderRadius: 999,
                fontWeight: 500,
              }}
            >
              AUR · CORRETOR
            </span>
            <Link
              href="/corretor"
              style={{
                fontFamily: "var(--font-geist), sans-serif",
                fontSize: "1.05rem",
                color: "var(--white)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Aureon Group<span style={{ color: "var(--gold)" }}>.</span>{" "}
              <span style={{ color: "var(--fog)", fontSize: "0.85rem" }}>
                Área do corretor
              </span>
            </Link>
          </div>

          {authed && (
            <nav
              style={{
                display: "flex",
                gap: "1.6rem",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                color: "var(--bone)",
                fontWeight: 500,
                alignItems: "center",
              }}
            >
              <Link href="/" style={{ color: "var(--gold)" }}>
                Site público ↗
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
                    fontWeight: 500,
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
