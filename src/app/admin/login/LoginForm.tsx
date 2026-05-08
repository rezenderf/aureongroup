"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
      <div className="field">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
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
        {pending ? "Validando…" : "Entrar"}
      </button>
    </form>
  );
}
