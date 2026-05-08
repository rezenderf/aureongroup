import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Acesso · Aureon Admin" };

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "5rem auto 0",
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        padding: "2.8rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--lime)",
        }}
      >
        / Acesso restrito
      </span>
      <h1
        className="headline headline-md"
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
      >
        Painel{" "}
        <em className="serif">interno</em>.
      </h1>
      <LoginForm />
    </div>
  );
}
