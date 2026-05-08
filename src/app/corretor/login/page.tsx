import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Acesso · Aureon Corretor" };

export default async function CorretorLoginPage() {
  if (await isAuthenticated("corretor")) redirect("/corretor");

  return (
    <div
      style={{
        maxWidth: 440,
        margin: "5rem auto 0",
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        padding: "2.8rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--gold)",
          fontWeight: 500,
        }}
      >
        / Área do corretor
      </span>
      <h1
        className="headline headline-md"
        style={{ marginTop: "1rem", marginBottom: "1.2rem" }}
      >
        Acesso{" "}
        <em className="serif">restrito</em>.
      </h1>
      <p
        className="body"
        style={{ color: "var(--bone)", marginBottom: "2rem", fontSize: "0.95rem" }}
      >
        Acesso aos sistemas, materiais e ferramentas internas do time de
        vendas. Sessão válida por 7 dias.
      </p>
      <LoginForm />
    </div>
  );
}
