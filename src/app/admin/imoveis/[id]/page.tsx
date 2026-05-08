import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SectionMarker from "@/components/SectionMarker";
import PropertyForm from "../PropertyForm";
import { updatePropertyAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id } });
  if (!property) notFound();

  const bound = updatePropertyAction.bind(null, property.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <Link href="/admin/imoveis" className="link-arrow" style={{ alignSelf: "flex-start" }}>
        ← Imóveis
      </Link>
      <div>
        <SectionMarker number="01" label={`Editar · /${property.slug}`} />
        <h1 className="headline headline-lg" style={{ marginTop: "1.5rem" }}>
          {property.title}
          <span style={{ color: "var(--lime)" }}>.</span>
        </h1>
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          padding: "2.5rem",
        }}
      >
        <PropertyForm
          action={bound}
          submitLabel="Salvar alterações"
          initial={{
            id: property.id,
            slug: property.slug,
            title: property.title,
            subtitle: property.subtitle,
            city: property.city,
            district: property.district,
            kind: property.kind,
            status: property.status,
            price: property.price.toString(),
            area: property.area,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            parking: property.parking,
            description: property.description,
            highlights: property.highlights,
            coverUrl: property.coverUrl,
            gallery: property.gallery,
            featured: property.featured,
          }}
        />
      </div>
    </div>
  );
}
