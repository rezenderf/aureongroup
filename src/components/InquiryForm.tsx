"use client";

import { useActionState } from "react";
import { submitInquiry, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { ok: false };

export default function InquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initial);

  if (state.ok) {
    return (
      <div
        style={{
          border: "1px solid var(--lime-dim)",
          padding: "2rem",
          background: "var(--bg-card)",
        }}
      >
        <span className="eyebrow" style={{ color: "var(--lime)" }}>
          Visita solicitada
        </span>
        <p style={{ color: "var(--white)", marginTop: "0.7rem", marginBottom: 0 }}>
          Recebemos seu pedido para <strong>{propertyTitle}</strong>. Um sócio
          retornará em até 24h úteis.
        </p>
      </div>
    );
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <input type="hidden" name="propertyId" value={propertyId} />
      <input type="hidden" name="source" value={`imovel:${propertyTitle}`} />

      <div className="field">
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="phone">Telefone (opcional)</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          required
          defaultValue={`Tenho interesse em ${propertyTitle}. Gostaria de agendar uma visita.`}
        />
      </div>

      {state.error && (
        <div
          style={{
            color: "var(--lime)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {state.error}
        </div>
      )}

      <button type="submit" className="cta" disabled={pending}>
        {pending ? "Enviando…" : "Solicitar visita"}
      </button>
    </form>
  );
}
