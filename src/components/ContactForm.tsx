"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { ok: false };

export default function ContactForm({ source }: { source?: string }) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div
        style={{
          border: "1px solid var(--lime-dim)",
          background: "var(--bg-card)",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <span className="eyebrow" style={{ color: "var(--lime)" }}>
          Mensagem registrada
        </span>
        <h3 className="headline headline-md" style={{ margin: 0 }}>
          Recebemos seu contato.
        </h3>
        <p className="body" style={{ margin: 0, color: "var(--bone)" }}>
          Um consultor da casa retornará em até 24h úteis com um shortlist
          aderente ao seu briefing.
        </p>
      </div>
    );
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
      <input type="hidden" name="source" value={source ?? "contato"} />

      <div className="field">
        <label htmlFor="name">Nome completo</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Como devemos te chamar"
        />
        {state.fieldErrors?.name && <FieldError msg={state.fieldErrors.name} />}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.4rem",
        }}
        className="contact-row"
      >
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@dominio.com"
          />
          {state.fieldErrors?.email && <FieldError msg={state.fieldErrors.email} />}
        </div>
        <div className="field">
          <label htmlFor="phone">Telefone (opcional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+55 11 90000-0000"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Conte região, momento da compra (lançamento, em obra ou pronto) e faixa de orçamento."
        />
        {state.fieldErrors?.message && <FieldError msg={state.fieldErrors.message} />}
      </div>

      {state.error && !state.fieldErrors && (
        <div
          style={{
            border: "1px solid var(--line-bright)",
            padding: "0.9rem 1.1rem",
            color: "var(--lime)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          {state.error}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="cta" disabled={pending}>
          {pending ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .contact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <span
      style={{
        color: "var(--lime)",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
      }}
    >
      {msg}
    </span>
  );
}
