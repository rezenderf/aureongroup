import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import SectionMarker from "@/components/SectionMarker";
import PropertyForm from "../PropertyForm";
import { createPropertyAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewPropertyPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <Link href="/admin/imoveis" className="link-arrow" style={{ alignSelf: "flex-start" }}>
        ← Imóveis
      </Link>
      <div>
        <SectionMarker number="01" label="Imóveis · Cadastro" />
        <h1 className="headline headline-lg" style={{ marginTop: "1.5rem" }}>
          Novo{" "}
          <em className="serif">endereço</em>.
        </h1>
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          padding: "2.5rem",
        }}
      >
        <PropertyForm action={createPropertyAction} submitLabel="Criar imóvel" />
      </div>
    </div>
  );
}
