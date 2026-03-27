# Prüffuchs – Influencer Marketing Plattform

Prüffuchs verbindet Marken mit Influencern für authentisches Marketing. Die Plattform ermöglicht Marken das Erstellen von Kampagnen, Influencern das Bewerben auf Kampagnen und Administratoren die vollständige Verwaltung der Plattform.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentifizierung:** Supabase Auth
- **Datenbank:** Supabase (PostgreSQL) mit Row Level Security
- **Styling:** Tailwind CSS
- **Sprache:** TypeScript

## Rollen

| Rolle | Beschreibung |
|-------|-------------|
| `brand` | Marken erstellen Kampagnen und verwalten Bewerbungen |
| `influencer` | Influencer bewerben sich auf aktive Kampagnen |
| `admin` | Vollzugriff auf alle Nutzer, Kampagnen und Bewerbungen |

## Setup

### 1. Repository klonen

```bash
git clone <repository-url>
cd prueffuchs
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Supabase Projekt einrichten

1. Erstelle ein neues Projekt auf [supabase.com](https://supabase.com)
2. Navigiere zu **SQL Editor** und führe die Migration aus:
   - Öffne `supabase/migrations/20240101000000_initial.sql`
   - Kopiere den gesamten Inhalt in den SQL Editor
   - Klicke auf **Run**

### 4. Umgebungsvariablen konfigurieren

Kopiere die `.env.example` Datei:

```bash
cp .env.example .env.local
```

Füge deine Supabase-Werte ein (zu finden unter **Settings > API** in deinem Supabase-Projekt):

```env
NEXT_PUBLIC_SUPABASE_URL=https://deine-projekt-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key
```

### 5. Entwicklungsserver starten

```bash
npm run dev
```

Die Anwendung ist jetzt unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Admin-Nutzer erstellen

Admin-Rechte werden manuell über das Supabase Dashboard vergeben:

1. Registriere dich als normaler Nutzer in der Anwendung
2. Öffne das Supabase Dashboard → **Table Editor** → `profiles`
3. Suche deinen Nutzer und ändere das `role` Feld auf `admin`

Alternativ über den SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = 'deine-user-uuid';
```

## Projektstruktur

```
prueffuchs/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx          # Auth-Layout (zentriert, Hintergrundgradient)
│   │   ├── login/page.tsx      # Login-Seite
│   │   └── signup/page.tsx     # Registrierung mit Rollenauswahl
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard-Layout mit Navigation
│   │   ├── logout-button.tsx   # Client-seitiger Abmelde-Button
│   │   ├── brand/
│   │   │   ├── page.tsx               # Marken-Dashboard
│   │   │   └── create-campaign-modal.tsx  # Modal zum Erstellen von Kampagnen
│   │   ├── influencer/
│   │   │   ├── page.tsx        # Influencer-Dashboard
│   │   │   └── apply-button.tsx    # Bewerbungs-Button
│   │   └── admin/
│   │       ├── page.tsx                # Admin-Dashboard
│   │       └── application-actions.tsx # Bewerbungen annehmen/ablehnen
│   ├── globals.css             # Globale Styles + Tailwind
│   ├── layout.tsx              # Root Layout
│   └── page.tsx                # Startseite (Weiterleitung)
├── lib/
│   └── supabase/
│       ├── client.ts           # Browser-Client
│       ├── server.ts           # Server-Client (mit Cookies)
│       └── middleware.ts       # Middleware-Client
├── middleware.ts               # Rollenbasiertes Routing
├── types/
│   └── index.ts                # TypeScript-Typen
├── supabase/
│   └── migrations/
│       └── 20240101000000_initial.sql  # Datenbankschema + RLS
├── .env.example                # Beispiel-Umgebungsvariablen
└── README.md
```

## Funktionen

### Authentifizierung
- E-Mail/Passwort Login und Registrierung
- Rollenauswahl bei der Registrierung (Marke oder Influencer)
- Automatische Weiterleitung nach Login basierend auf Rolle
- Session-Management über Supabase Auth

### Marken-Dashboard
- Übersichtsstatistiken (Kampagnen, Bewerbungen, Budget)
- Kampagnenliste mit Status, Budget und Bewerbungsanzahl
- Kampagne erstellen (Modal mit Titel, Beschreibung, Budget, Status)

### Influencer-Dashboard
- Alle aktiven Kampagnen entdecken
- Auf Kampagnen bewerben (mit Duplikat-Schutz)
- Eigene Bewerbungen und deren Status einsehen

### Admin-Dashboard
- Alle Nutzer mit Rollen verwalten
- Alle Kampagnen plattformweit einsehen
- Bewerbungen annehmen oder ablehnen

## Deployment

### Vercel (empfohlen)

1. Verbinde dein Repository mit [Vercel](https://vercel.com)
2. Füge die Umgebungsvariablen in den Vercel-Projekteinstellungen hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

### Supabase Auth Redirect URLs

Füge nach dem Deployment folgende URLs in deinem Supabase-Projekt unter **Authentication > URL Configuration** hinzu:

- **Site URL:** `https://deine-domain.vercel.app`
- **Redirect URLs:** `https://deine-domain.vercel.app/**`
