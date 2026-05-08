import { cookies } from "next/headers";
import crypto from "node:crypto";

type Realm = "admin" | "corretor";

const COOKIE_NAME: Record<Realm, string> = {
  admin: "aureon_session",
  corretor: "aureon_corretor",
};

const COOKIE_MAX_AGE: Record<Realm, number> = {
  admin: 60 * 60 * 8,
  corretor: 60 * 60 * 24 * 7,
};

const PASSWORD_ENV: Record<Realm, string> = {
  admin: "ADMIN_PASSWORD",
  corretor: "CORRETOR_PASSWORD",
};

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET ausente ou muito curto. Defina uma string com 32+ caracteres."
    );
  }
  return secret;
}

function getPassword(realm: Realm): string {
  const key = PASSWORD_ENV[realm];
  const pwd = process.env[key];
  if (!pwd || pwd.length < 6) {
    throw new Error(
      `${key} ausente ou muito curto. Defina uma senha com 6+ caracteres.`
    );
  }
  return pwd;
}

function sign(payload: string, realm: Realm): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`${realm}:${payload}`)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export async function login(
  password: string,
  realm: Realm = "admin"
): Promise<boolean> {
  const expected = getPassword(realm);
  if (!safeEqual(password, expected)) return false;
  const issuedAt = Date.now().toString();
  const token = `${issuedAt}.${sign(issuedAt, realm)}`;
  const c = await cookies();
  c.set(COOKIE_NAME[realm], token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE[realm],
  });
  return true;
}

export async function logout(realm: Realm = "admin") {
  const c = await cookies();
  c.delete(COOKIE_NAME[realm]);
}

export async function isAuthenticated(realm: Realm = "admin"): Promise<boolean> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME[realm])?.value;
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  try {
    if (!safeEqual(signature, sign(issuedAt, realm))) return false;
  } catch {
    return false;
  }
  const ageMs = Date.now() - Number(issuedAt);
  if (
    Number.isNaN(ageMs) ||
    ageMs < 0 ||
    ageMs > COOKIE_MAX_AGE[realm] * 1000
  ) {
    return false;
  }
  return true;
}
