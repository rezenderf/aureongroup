import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "aureon_session";
const COOKIE_MAX_AGE = 60 * 60 * 8;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET ausente ou muito curto. Defina uma string com 32+ caracteres."
    );
  }
  return secret;
}

function getAdminPassword(): string {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd || pwd.length < 6) {
    throw new Error(
      "ADMIN_PASSWORD ausente ou muito curto. Defina uma senha com 6+ caracteres."
    );
  }
  return pwd;
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export async function login(password: string): Promise<boolean> {
  const expected = getAdminPassword();
  if (!safeEqual(password, expected)) return false;
  const issuedAt = Date.now().toString();
  const token = `${issuedAt}.${sign(issuedAt)}`;
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return true;
}

export async function logout() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  try {
    if (!safeEqual(signature, sign(issuedAt))) return false;
  } catch {
    return false;
  }
  const ageMs = Date.now() - Number(issuedAt);
  if (Number.isNaN(ageMs) || ageMs < 0 || ageMs > COOKIE_MAX_AGE * 1000) {
    return false;
  }
  return true;
}
