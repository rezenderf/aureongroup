"use client";

import { useActionState } from "react";
import type { PropertyFormState } from "../actions";

const initial: PropertyFormState = { ok: false };

type Initial = {
  id?: string;
  slug?: string;
  title?: string;
  subtitle?: string | null;
  city?: string;
  district?: string;
  kind?: string;
  status?: string;
  price?: string | number | bigint;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  description?: string;
  highlights?: string[];
  coverUrl?: string | null;
  gallery?: string[];
  featured?: boolean;
};

export default function PropertyForm({
  action,
  initial: data,
  submitLabel,
}: {
  action: (
    prev: PropertyFormState | null,
    formData: FormData
  ) => Promise<PropertyFormState>;
  initial?: Initial;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const d = data ?? {};

  const err = (k: string) => state.fieldErrors?.[k];

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
      <Row>
        <Field label="Título" name="title" required defaultValue={d.title} error={err("title")} />
        <Field
          label="Subtítulo"
          name="subtitle"
          defaultValue={d.subtitle ?? ""}
        />
      </Row>

      <Row>
        <Field label="Slug (opcional)" name="slug" defaultValue={d.slug ?? ""} />
        <Select
          label="Tipo"
          name="kind"
          defaultValue={d.kind ?? "APARTAMENTO"}
          options={[
            ["APARTAMENTO", "Apartamento"],
            ["COBERTURA", "Cobertura"],
            ["CASA", "Casa"],
            ["TERRENO", "Terreno"],
            ["COMERCIAL", "Comercial"],
          ]}
        />
        <Select
          label="Status"
          name="status"
          defaultValue={d.status ?? "AVAILABLE"}
          options={[
            ["AVAILABLE", "Disponível"],
            ["RESERVED", "Reservado"],
            ["SOLD", "Vendido"],
            ["ARCHIVED", "Arquivado"],
          ]}
        />
      </Row>

      <Row>
        <Field label="Cidade" name="city" required defaultValue={d.city} />
        <Field label="Bairro" name="district" required defaultValue={d.district} />
      </Row>

      <Row>
        <Field
          label="Valor (R$)"
          name="price"
          required
          type="number"
          defaultValue={d.price !== undefined ? String(d.price) : ""}
          error={err("price")}
        />
        <Field
          label="Área (m²)"
          name="area"
          required
          type="number"
          defaultValue={d.area?.toString() ?? ""}
        />
      </Row>

      <Row>
        <Field
          label="Suítes"
          name="bedrooms"
          type="number"
          defaultValue={(d.bedrooms ?? 0).toString()}
        />
        <Field
          label="Banheiros"
          name="bathrooms"
          type="number"
          defaultValue={(d.bathrooms ?? 0).toString()}
        />
        <Field
          label="Vagas"
          name="parking"
          type="number"
          defaultValue={(d.parking ?? 0).toString()}
        />
      </Row>

      <div className="field">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={d.description}
        />
        {err("description") && <Err msg={err("description")!} />}
      </div>

      <div className="field">
        <label htmlFor="highlights">Destaques (uma linha por item)</label>
        <textarea
          id="highlights"
          name="highlights"
          defaultValue={(d.highlights ?? []).join("\n")}
          placeholder="Terraço de 180m² com piscina&#10;Pé-direito duplo na sala principal"
        />
      </div>

      <Field
        label="URL da capa"
        name="coverUrl"
        type="url"
        defaultValue={d.coverUrl ?? ""}
        placeholder="https://..."
      />

      <div className="field">
        <label htmlFor="gallery">Galeria (uma URL por linha)</label>
        <textarea
          id="gallery"
          name="gallery"
          defaultValue={(d.gallery ?? []).join("\n")}
          placeholder="https://...&#10;https://..."
        />
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--bone)",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          name="featured"
          defaultChecked={!!d.featured}
          style={{ accentColor: "var(--lime)" }}
        />
        Em destaque na home
      </label>

      {state.error && !state.fieldErrors && <Err msg={state.error} />}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
        <button type="submit" className="cta" disabled={pending}>
          {pending ? "Salvando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const count = Array.isArray(children) ? children.length : 1;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gap: "1.4rem",
      }}
      className="form-row"
    >
      {children}
      <style>{`
        @media (max-width: 700px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {error && <Err msg={error} />}
    </div>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: [string, string][];
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue={defaultValue}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}

function Err({ msg }: { msg: string }) {
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
