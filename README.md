# Aureon Group

Site institucional da Aureon Prime Estates. Next.js 15 (App Router) + Prisma + Postgres, com painel administrativo simples para CRUD de imóveis e leads.

## Stack

- **Framework:** Next.js 15 (App Router · React 19 · Server Actions)
- **DB:** Postgres + Prisma ORM
- **Estilo:** Tailwind v4 + design tokens próprios (Geist · Geist Mono · Instrument Serif)
- **Auth admin:** senha em env var + cookie HMAC-assinado (httpOnly)

## Deploy na Railway (zero config além de env vars)

1. Crie um projeto novo na Railway e clique em **Deploy from GitHub** → este repositório.
2. Adicione o plugin **Postgres** ao projeto. A Railway injeta `DATABASE_URL` automaticamente no serviço.
3. Configure as variáveis abaixo em `Variables`:

   | Var               | Obrigatório | Descrição                                                                   |
   | ----------------- | ----------- | --------------------------------------------------------------------------- |
   | `DATABASE_URL`    | sim         | Preenchida pelo plugin Postgres da Railway.                                 |
   | `ADMIN_PASSWORD`  | sim         | Senha do painel `/admin` (mín. 6 caracteres).                               |
   | `SESSION_SECRET`  | sim         | Segredo para assinar sessão. Gere com `openssl rand -hex 32`.               |
   | `NEXT_PUBLIC_SITE_URL` | não    | URL pública (usada em OG/metadata).                                         |

4. Pronto. Não há nada mais a configurar:
   - `npm install` roda `prisma generate` automaticamente (postinstall).
   - `npm run build` empacota o Next.
   - `npm start` roda `prisma migrate deploy` antes de subir o servidor — então as migrations são aplicadas a cada deploy.

## Inicialização local

```bash
npm install
cp .env.example .env
# preencha DATABASE_URL local (ex: postgres rodando em docker)
npx prisma migrate dev --name init
npm run db:seed   # opcional: imóveis de exemplo
npm run dev
```

Acesse `http://localhost:3000`. Painel em `/admin/login` com a senha de `ADMIN_PASSWORD`.

## Estrutura

```
src/
  app/
    (site)/            ← páginas públicas com header/footer
      page.tsx         ← home
      sobre/           ← /sobre
      servicos/        ← /servicos
      imoveis/         ← /imoveis e /imoveis/[slug]
      contato/         ← /contato
    admin/             ← painel protegido
      login/           ← /admin/login
      imoveis/         ← /admin/imoveis (CRUD)
      leads/           ← /admin/leads
    actions/           ← server actions públicas
  components/          ← UI compartilhada
  lib/                 ← prisma, auth, format
prisma/
  schema.prisma        ← Property · Lead · Inquiry
  seed.ts              ← dados de exemplo
```

## Identidade visual

A identidade segue o sistema **dark luxury tech**: paleta bicromática (lime `#C7F250` sobre noir `#0A0B08`), tipografia Geist + Instrument Serif itálico para acentos editoriais, glow radial sutil e textura de noise overlay. Tokens em `src/app/globals.css`.

## Comandos úteis

```bash
npm run dev           # dev server
npm run build         # gera prisma client + build do next
npm run start         # roda migrate deploy + start
npm run db:push       # sincroniza schema sem migration
npm run db:seed       # popula imóveis de exemplo
```
