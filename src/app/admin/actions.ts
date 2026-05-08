"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { login, logout, isAuthenticated } from "@/lib/auth";
import { slugify } from "@/lib/format";

const ADMIN_KIND = ["APARTAMENTO", "COBERTURA", "CASA", "TERRENO", "COMERCIAL"] as const;
const ADMIN_STATUS = ["AVAILABLE", "RESERVED", "SOLD", "ARCHIVED"] as const;

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const password = (formData.get("password") || "").toString();
  if (!password) return { error: "Senha obrigatória." };
  const ok = await login(password);
  if (!ok) return { error: "Senha incorreta." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

async function ensureAuth() {
  const ok = await isAuthenticated();
  if (!ok) redirect("/admin/login");
}

const PropertySchema = z.object({
  title: z.string().trim().min(2).max(160),
  subtitle: z.string().trim().max(280).optional().nullable(),
  slug: z.string().trim().min(2).max(160).optional().nullable(),
  city: z.string().trim().min(2).max(80),
  district: z.string().trim().min(2).max(80),
  kind: z.enum(ADMIN_KIND),
  status: z.enum(ADMIN_STATUS),
  price: z.coerce.number().int().nonnegative(),
  area: z.coerce.number().int().nonnegative(),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  parking: z.coerce.number().int().nonnegative(),
  description: z.string().trim().min(10).max(8000),
  highlights: z.string().trim().optional().nullable(),
  coverUrl: z.string().trim().url().optional().or(z.literal("")).nullable(),
  gallery: z.string().trim().optional().nullable(),
  featured: z.coerce.boolean().optional().nullable(),
});

export type PropertyFormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function parseList(input: string | null | undefined): string[] {
  if (!input) return [];
  return input
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function uniqueSlug(base: string, currentId?: string): Promise<string> {
  let candidate = base;
  let i = 2;
  while (true) {
    const existing = await prisma.property.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === currentId) return candidate;
    candidate = `${base}-${i++}`;
  }
}

export async function createPropertyAction(
  _prev: PropertyFormState | null,
  formData: FormData
): Promise<PropertyFormState> {
  await ensureAuth();
  const raw = Object.fromEntries(formData);
  const parsed = PropertySchema.safeParse({
    ...raw,
    featured: raw.featured === "on" || raw.featured === "true",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Verifique os campos.", fieldErrors };
  }
  const data = parsed.data;
  const baseSlug = data.slug ? slugify(data.slug) : slugify(data.title);
  const slug = await uniqueSlug(baseSlug);

  await prisma.property.create({
    data: {
      slug,
      title: data.title,
      subtitle: data.subtitle || null,
      city: data.city,
      district: data.district,
      kind: data.kind,
      status: data.status,
      price: BigInt(data.price),
      area: data.area,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      parking: data.parking,
      description: data.description,
      highlights: parseList(data.highlights),
      coverUrl: data.coverUrl || null,
      gallery: parseList(data.gallery),
      featured: !!data.featured,
    },
  });

  revalidatePath("/imoveis");
  revalidatePath("/");
  redirect("/admin/imoveis");
}

export async function updatePropertyAction(
  id: string,
  _prev: PropertyFormState | null,
  formData: FormData
): Promise<PropertyFormState> {
  await ensureAuth();
  const raw = Object.fromEntries(formData);
  const parsed = PropertySchema.safeParse({
    ...raw,
    featured: raw.featured === "on" || raw.featured === "true",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Verifique os campos.", fieldErrors };
  }
  const data = parsed.data;
  const baseSlug = data.slug ? slugify(data.slug) : slugify(data.title);
  const slug = await uniqueSlug(baseSlug, id);

  await prisma.property.update({
    where: { id },
    data: {
      slug,
      title: data.title,
      subtitle: data.subtitle || null,
      city: data.city,
      district: data.district,
      kind: data.kind,
      status: data.status,
      price: BigInt(data.price),
      area: data.area,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      parking: data.parking,
      description: data.description,
      highlights: parseList(data.highlights),
      coverUrl: data.coverUrl || null,
      gallery: parseList(data.gallery),
      featured: !!data.featured,
    },
  });

  revalidatePath("/imoveis");
  revalidatePath(`/imoveis/${slug}`);
  revalidatePath("/");
  redirect("/admin/imoveis");
}

export async function deletePropertyAction(formData: FormData) {
  await ensureAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.property.delete({ where: { id } });
  revalidatePath("/imoveis");
  revalidatePath("/admin/imoveis");
}

export async function deleteLeadAction(formData: FormData) {
  await ensureAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

export async function deleteInquiryAction(formData: FormData) {
  await ensureAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
