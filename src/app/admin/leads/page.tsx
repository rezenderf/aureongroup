import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SectionMarker from "@/components/SectionMarker";
import { formatDate } from "@/lib/format";
import { deleteLeadAction, deleteInquiryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const [leads, inquiries] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.inquiry
      .findMany({
        orderBy: { createdAt: "desc" },
        include: { property: { select: { title: true, slug: true } } },
      })
      .catch(() => []),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
      <div>
        <SectionMarker number="01" label="Leads · Página de contato" />
        <h1 className="headline headline-lg" style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
          Mensagens{" "}
          <em className="serif">recebidas</em>.
        </h1>

        {leads.length === 0 ? (
          <Empty text="Nenhum lead registrado ainda." />
        ) : (
          <div style={{ border: "1px solid var(--line)" }}>
            {leads.map((l) => (
              <div
                key={l.id}
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: "1.6rem",
                  display: "grid",
                  gridTemplateColumns: "200px 1fr auto",
                  gap: "1.5rem",
                  alignItems: "start",
                }}
                className="lead-row"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span className="eyebrow">{formatDate(l.createdAt)}</span>
                  <span style={{ color: "var(--white)", fontSize: "1rem" }}>{l.name}</span>
                  <a
                    href={`mailto:${l.email}`}
                    style={{
                      color: "var(--lime)",
                      fontSize: "0.85rem",
                      borderBottom: "1px solid var(--line)",
                      paddingBottom: "0.15rem",
                      width: "fit-content",
                    }}
                  >
                    {l.email}
                  </a>
                  {l.phone && (
                    <span style={{ color: "var(--fog)", fontSize: "0.85rem" }}>
                      {l.phone}
                    </span>
                  )}
                  <span
                    className="eyebrow"
                    style={{ marginTop: "0.4rem", fontSize: "0.55rem" }}
                  >
                    {l.source ?? "—"}
                  </span>
                </div>
                <p
                  className="body"
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {l.message}
                </p>
                <form action={deleteLeadAction}>
                  <input type="hidden" name="id" value={l.id} />
                  <button
                    type="submit"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--line-bright)",
                      color: "var(--fog)",
                      padding: "0.4rem 0.8rem",
                      borderRadius: 999,
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <SectionMarker number="02" label="Solicitações de visita" />
        <h2
          className="headline headline-lg"
          style={{ marginTop: "1.5rem", marginBottom: "2rem" }}
        >
          Pedidos por{" "}
          <em className="serif">endereço</em>.
        </h2>

        {inquiries.length === 0 ? (
          <Empty text="Nenhuma solicitação de visita registrada ainda." />
        ) : (
          <div style={{ border: "1px solid var(--line)" }}>
            {inquiries.map((i) => (
              <div
                key={i.id}
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: "1.6rem",
                  display: "grid",
                  gridTemplateColumns: "200px 1fr auto",
                  gap: "1.5rem",
                  alignItems: "start",
                }}
                className="lead-row"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span className="eyebrow">{formatDate(i.createdAt)}</span>
                  <span style={{ color: "var(--white)", fontSize: "1rem" }}>{i.name}</span>
                  <a
                    href={`mailto:${i.email}`}
                    style={{ color: "var(--lime)", fontSize: "0.85rem" }}
                  >
                    {i.email}
                  </a>
                  {i.phone && (
                    <span style={{ color: "var(--fog)", fontSize: "0.85rem" }}>{i.phone}</span>
                  )}
                  <span
                    className="eyebrow"
                    style={{
                      marginTop: "0.4rem",
                      color: "var(--lime)",
                      fontSize: "0.55rem",
                    }}
                  >
                    {i.property?.title ?? "Imóvel"}
                  </span>
                </div>
                <p
                  className="body"
                  style={{ margin: 0, fontSize: "0.95rem", whiteSpace: "pre-wrap" }}
                >
                  {i.message}
                </p>
                <form action={deleteInquiryAction}>
                  <input type="hidden" name="id" value={i.id} />
                  <button
                    type="submit"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--line-bright)",
                      color: "var(--fog)",
                      padding: "0.4rem 0.8rem",
                      borderRadius: 999,
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .lead-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        padding: "3rem",
        textAlign: "center",
        color: "var(--fog)",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.65rem",
        textTransform: "uppercase",
        letterSpacing: "0.28em",
      }}
    >
      {text}
    </div>
  );
}
