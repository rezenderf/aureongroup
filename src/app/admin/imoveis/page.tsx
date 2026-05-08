import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SectionMarker from "@/components/SectionMarker";
import { formatPriceShort } from "@/lib/format";
import { deletePropertyAction } from "../actions";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  ARCHIVED: "Arquivado",
};

export default async function AdminPropertiesPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const properties = await prisma.property
    .findMany({ orderBy: [{ createdAt: "desc" }] })
    .catch(() => []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <SectionMarker number="01" label="Imóveis · Portfólio interno" />
          <h1 className="headline headline-lg" style={{ marginTop: "1.5rem" }}>
            Curadoria{" "}
            <em className="serif">ativa</em>
            <span style={{ color: "var(--lime)" }}>.</span>
          </h1>
        </div>
        <Link href="/admin/imoveis/novo" className="cta">
          + Novo imóvel
        </Link>
      </div>

      {properties.length === 0 ? (
        <div
          style={{
            border: "1px solid var(--line)",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <span className="eyebrow">Nenhum imóvel cadastrado</span>
          <p className="body-fog" style={{ marginTop: "1rem" }}>
            Comece criando o primeiro endereço do portfólio.
          </p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--line)", overflow: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Imóvel</th>
                <th>Local</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Destaque</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <span style={{ color: "var(--white)" }}>{p.title}</span>
                      <span
                        className="eyebrow"
                        style={{ fontSize: "0.55rem", letterSpacing: "0.25em" }}
                      >
                        /{p.slug}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: "var(--fog)" }}>
                    {p.district} · {p.city}
                  </td>
                  <td>
                    <span
                      className="tag tag-muted"
                      style={{
                        color:
                          p.status === "AVAILABLE" ? "var(--lime)" : "var(--fog)",
                        borderColor:
                          p.status === "AVAILABLE"
                            ? "var(--lime-dim)"
                            : "var(--line-bright)",
                      }}
                    >
                      {statusLabel[p.status]}
                    </span>
                  </td>
                  <td className="serif" style={{ fontSize: "1.05rem" }}>
                    {formatPriceShort(p.price)}
                  </td>
                  <td style={{ color: p.featured ? "var(--lime)" : "var(--fog)" }}>
                    {p.featured ? "Sim" : "—"}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.6rem", justifyContent: "flex-end" }}>
                      <Link
                        href={`/admin/imoveis/${p.id}`}
                        className="link-arrow"
                        style={{ fontSize: "0.6rem" }}
                      >
                        Editar
                      </Link>
                      <form action={deletePropertyAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--fog)",
                            fontFamily: "var(--font-geist-mono), monospace",
                            fontSize: "0.6rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Excluir
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
