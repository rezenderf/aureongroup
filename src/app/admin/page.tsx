import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SectionMarker from "@/components/SectionMarker";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const [propertyCount, availableCount, leadCount, inquiryCount, recentLeads] =
    await Promise.all([
      prisma.property.count().catch(() => 0),
      prisma.property.count({ where: { status: "AVAILABLE" } }).catch(() => 0),
      prisma.lead.count().catch(() => 0),
      prisma.inquiry.count().catch(() => 0),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []),
    ]);

  const stats = [
    { n: propertyCount.toString(), l: "Imóveis cadastrados" },
    { n: availableCount.toString(), l: "Disponíveis" },
    { n: leadCount.toString(), l: "Leads totais" },
    { n: inquiryCount.toString(), l: "Solicitações de visita" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
      <div>
        <SectionMarker number="00" label="Painel · Visão geral" />
        <h1 className="headline headline-lg" style={{ marginTop: "1.5rem" }}>
          Operação{" "}
          <em className="serif">silenciosa</em>.
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--line)",
          border: "1px solid var(--line)",
        }}
        className="admin-stats"
      >
        {stats.map((s) => (
          <div
            key={s.l}
            style={{
              background: "var(--bg)",
              padding: "2.4rem 1.8rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem",
            }}
          >
            <span className="stat-number" style={{ fontSize: "3rem" }}>
              {s.n}
            </span>
            <span className="stat-label">{s.l}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
        className="admin-actions"
      >
        <Link
          href="/admin/imoveis"
          className="card"
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          <span className="eyebrow">Gerenciar</span>
          <h3 className="headline headline-md" style={{ margin: 0 }}>
            Imóveis →
          </h3>
          <p className="body-fog" style={{ margin: 0 }}>
            Criar, editar e arquivar endereços do portfólio.
          </p>
        </Link>
        <Link
          href="/admin/leads"
          className="card"
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          <span className="eyebrow">Operação</span>
          <h3 className="headline headline-md" style={{ margin: 0 }}>
            Leads & Visitas →
          </h3>
          <p className="body-fog" style={{ margin: 0 }}>
            Mensagens recebidas pelo site e pelos endereços.
          </p>
        </Link>
      </div>

      {recentLeads.length > 0 && (
        <div>
          <SectionMarker number="01" label="Últimos leads" />
          <div style={{ marginTop: "1.5rem", border: "1px solid var(--line)" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Origem</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.id}>
                    <td style={{ color: "var(--fog)" }}>{formatDate(l.createdAt)}</td>
                    <td>{l.name}</td>
                    <td>{l.email}</td>
                    <td style={{ color: "var(--fog)" }}>{l.source ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-stats { grid-template-columns: 1fr 1fr !important; }
          .admin-actions { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
