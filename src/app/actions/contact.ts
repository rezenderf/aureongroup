"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  email: z.string().trim().email("E-mail inválido").max(160),
  phone: z.string().trim().max(40).optional().nullable(),
  message: z.string().trim().min(10, "Mensagem muito curta").max(4000),
  source: z.string().trim().max(80).optional().nullable(),
});

const InquirySchema = ContactSchema.extend({
  propertyId: z.string().trim().min(1),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = ContactSchema.safeParse({
    name: raw.name,
    email: raw.email,
    phone: raw.phone || null,
    message: raw.message,
    source: raw.source || "contato",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Verifique os campos.", fieldErrors };
  }

  try {
    await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message,
        source: parsed.data.source ?? "contato",
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("submitContact failed:", err);
    return { ok: false, error: "Não foi possível registrar agora. Tente novamente." };
  }
}

export async function submitInquiry(
  _prev: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = InquirySchema.safeParse({
    name: raw.name,
    email: raw.email,
    phone: raw.phone || null,
    message: raw.message,
    propertyId: raw.propertyId,
    source: raw.source || "imovel",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Verifique os campos.", fieldErrors };
  }
  try {
    await prisma.inquiry.create({
      data: {
        propertyId: parsed.data.propertyId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message,
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("submitInquiry failed:", err);
    return { ok: false, error: "Não foi possível registrar agora. Tente novamente." };
  }
}
