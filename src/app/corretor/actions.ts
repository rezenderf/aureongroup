"use server";

import { redirect } from "next/navigation";
import { login, logout } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const password = (formData.get("password") || "").toString();
  if (!password) return { error: "Senha obrigatória." };
  const ok = await login(password, "corretor");
  if (!ok) return { error: "Senha incorreta." };
  redirect("/corretor");
}

export async function logoutAction() {
  await logout("corretor");
  redirect("/corretor/login");
}
