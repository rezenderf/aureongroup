import { PrismaClient, PropertyKind, PropertyStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.property.count();
  if (count > 0) {
    console.log(`Seed pulado: ${count} imóveis já cadastrados.`);
    return;
  }

  await prisma.property.createMany({
    data: [
      {
        slug: "residencial-aurora-jardins",
        title: "Residencial Aurora",
        subtitle: "Penthouse de 480m² com terraço panorâmico",
        city: "São Paulo",
        district: "Jardins",
        kind: PropertyKind.COBERTURA,
        status: PropertyStatus.AVAILABLE,
        price: BigInt(28500000),
        area: 480,
        bedrooms: 4,
        bathrooms: 5,
        parking: 4,
        description:
          "Cobertura duplex assinada por escritório premiado, com vista privilegiada da skyline. Materiais nobres, automação integrada e plantas reformuladas. Curadoria silenciosa, ponto final.",
        highlights: [
          "Terraço de 180m² com piscina aquecida",
          "Pé-direito duplo na sala principal",
          "Automação Lutron e climatização VRF",
          "Posição solar nascente/oeste",
        ],
        coverUrl:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
        ],
        featured: true,
      },
      {
        slug: "casa-itaim",
        title: "Casa Itaim",
        subtitle: "Residência minimalista de autor",
        city: "São Paulo",
        district: "Itaim Bibi",
        kind: PropertyKind.CASA,
        status: PropertyStatus.AVAILABLE,
        price: BigInt(19800000),
        area: 620,
        bedrooms: 5,
        bathrooms: 6,
        parking: 6,
        description:
          "Projeto arquitetônico em concreto aparente, vidro e madeira certificada. Integração total entre interior e jardim, biblioteca, adega climatizada e home theater calibrado.",
        highlights: [
          "Jardim assinado por paisagista renomado",
          "Adega climatizada para 1.200 garrafas",
          "Sistema de captação solar",
          "Garagem coberta para 6 veículos",
        ],
        coverUrl:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
        ],
        featured: true,
      },
      {
        slug: "apartamento-leblon-vista-mar",
        title: "Leblon Beachfront",
        subtitle: "Apartamento de frente para o mar",
        city: "Rio de Janeiro",
        district: "Leblon",
        kind: PropertyKind.APARTAMENTO,
        status: PropertyStatus.AVAILABLE,
        price: BigInt(22000000),
        area: 320,
        bedrooms: 3,
        bathrooms: 4,
        parking: 3,
        description:
          "Andar alto, vista frontal e plena para o mar do Leblon. Reforma recém-concluída em padrão hoteleiro. Living social com 14m de fachada envidraçada.",
        highlights: [
          "Vista frontal para o mar",
          "Reforma 2024 em padrão hoteleiro",
          "Suíte master com closet de 18m²",
          "Edifício com concierge 24h",
        ],
        coverUrl:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
        ],
        featured: true,
      },
      {
        slug: "terreno-fasano-trancoso",
        title: "Terreno Trancoso",
        subtitle: "Lote frente-mar em condomínio fechado",
        city: "Trancoso",
        district: "Praia do Espelho",
        kind: PropertyKind.TERRENO,
        status: PropertyStatus.RESERVED,
        price: BigInt(9500000),
        area: 2400,
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        description:
          "Lote singular com 60m de testada para o mar, em condomínio com curadoria arquitetônica e acesso restrito.",
        highlights: [
          "60m de testada para o mar",
          "Curadoria arquitetônica obrigatória",
          "Acesso por estrada privativa",
        ],
        coverUrl:
          "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1600&q=80",
        gallery: [],
        featured: false,
      },
    ],
  });

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
