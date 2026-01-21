# TODO - Session de Code

**Date:** Janvier 2026
**Objectif:** Setup initial du projet Yunicity MVP

---

## Initialisation Projet

- [ ] Créer le projet Expo avec TypeScript
  ```bash
  npx create-expo-app@latest yunicity-app -t expo-template-blank-typescript
  ```
- [ ] Vérifier que le projet compile (`npx expo start`)
- [ ] Configurer le `tsconfig.json` en mode strict

---

## Setup NativeWind (Tailwind)

- [ ] Installer NativeWind et dépendances
  ```bash
  npm install nativewind tailwindcss
  npx tailwindcss init
  ```
- [ ] Configurer `tailwind.config.js` avec couleurs Yurpass
  - [ ] Ajouter `yunicity-blue: '#1E40AF'`
  - [ ] Ajouter `yunicity-black: '#000000'`
  - [ ] Ajouter `yunicity-white: '#FFFFFF'`
- [ ] Configurer `babel.config.js` pour NativeWind
- [ ] Créer `global.css` avec directives Tailwind
- [ ] Tester un composant avec classes Tailwind

---

## Setup Expo Router

- [ ] Installer Expo Router
  ```bash
  npx expo install expo-router expo-linking expo-constants
  ```
- [ ] Configurer `package.json` (main: expo-router/entry)
- [ ] Créer structure de dossiers `app/`
- [ ] Créer `app/_layout.tsx` (Root Layout)
- [ ] Créer `app/(auth)/_layout.tsx`
- [ ] Créer `app/(tabs)/_layout.tsx`
- [ ] Tester la navigation entre routes

---

## Setup Supabase

- [ ] Créer projet sur supabase.com
- [ ] Récupérer URL et Anon Key
- [ ] Créer fichier `.env.local`
  ```
  EXPO_PUBLIC_SUPABASE_URL=xxx
  EXPO_PUBLIC_SUPABASE_ANON_KEY=xxx
  ```
- [ ] Ajouter `.env.local` au `.gitignore`
- [ ] Installer Supabase client
  ```bash
  npm install @supabase/supabase-js
  ```
- [ ] Créer `lib/supabase.ts` (client singleton)
- [ ] Installer expo-secure-store
  ```bash
  npx expo install expo-secure-store
  ```
- [ ] Configurer auth storage avec SecureStore

---

## Schéma Base de Données

- [ ] Créer table `profiles`
  ```sql
  CREATE TABLE profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Créer table `partners`
  ```sql
  CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    address TEXT,
    latitude FLOAT,
    longitude FLOAT,
    cover_image TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Créer table `passes`
  ```sql
  CREATE TABLE passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID REFERENCES partners(id),
    title TEXT NOT NULL,
    description TEXT,
    conditions TEXT,
    max_uses INT DEFAULT 1,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Créer table `user_passes`
  ```sql
  CREATE TABLE user_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    pass_id UUID REFERENCES passes(id),
    qr_token TEXT UNIQUE,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  ```
- [ ] Activer RLS sur toutes les tables
- [ ] Créer policies de sécurité

---

## State Management

- [ ] Installer Zustand
  ```bash
  npm install zustand
  ```
- [ ] Créer `stores/authStore.ts`
  - [ ] State: user, session, isLoading
  - [ ] Actions: signIn, signUp, signOut
- [ ] Installer React Query
  ```bash
  npm install @tanstack/react-query
  ```
- [ ] Créer QueryClientProvider dans `_layout.tsx`

---

## Composants UI Base

- [ ] Créer `components/ui/Button.tsx`
  - [ ] Variants: primary (bleu), secondary (noir), outline
  - [ ] States: default, loading, disabled
- [ ] Créer `components/ui/Input.tsx`
  - [ ] Types: text, email, password
  - [ ] States: default, error, focused
- [ ] Créer `components/ui/Card.tsx`
  - [ ] Style Yurpass (fond noir, texte blanc)
- [ ] Créer `components/ui/Avatar.tsx`
  - [ ] Fallback avec initiales
- [ ] Créer `components/ui/Loading.tsx`
  - [ ] Spinner style Yunicity

---

## Écrans Auth

- [ ] Créer `app/(auth)/welcome.tsx`
  - [ ] Logo Yunicity
  - [ ] Tagline
  - [ ] Boutons Sign In / Sign Up
- [ ] Créer `app/(auth)/sign-in.tsx`
  - [ ] Form email + password
  - [ ] Bouton connexion
  - [ ] Lien "Mot de passe oublié"
  - [ ] Lien vers Sign Up
- [ ] Créer `app/(auth)/sign-up.tsx`
  - [ ] Form email + password + confirm
  - [ ] Bouton inscription
  - [ ] Lien vers Sign In
- [ ] Créer `app/(auth)/forgot-password.tsx`
  - [ ] Form email
  - [ ] Envoi lien reset

---

## Validation & Linting

- [ ] Installer ESLint + config
  ```bash
  npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```
- [ ] Créer `.eslintrc.js` avec règles strictes
- [ ] Installer Prettier
  ```bash
  npm install -D prettier
  ```
- [ ] Créer `.prettierrc`
- [ ] Ajouter scripts npm
  ```json
  "lint": "eslint . --ext .ts,.tsx",
  "format": "prettier --write ."
  ```
- [ ] Vérifier: aucune erreur TypeScript
- [ ] Vérifier: aucune erreur ESLint

---

## Tests Setup

- [ ] Vérifier Jest (inclus avec Expo)
- [ ] Installer Testing Library
  ```bash
  npm install -D @testing-library/react-native
  ```
- [ ] Créer premier test (`__tests__/Button.test.tsx`)
- [ ] Vérifier que les tests passent (`npm test`)

---

## Git & Commits

- [ ] Initialiser repo Git (si pas fait)
- [ ] Créer `.gitignore` complet
- [ ] Commit initial: "chore: initialize expo project"
- [ ] Commit config: "chore: setup nativewind and tailwind"
- [ ] Commit supabase: "chore: configure supabase client"
- [ ] Commit components: "feat: add base ui components"
- [ ] Commit auth: "feat: add auth screens"

---

## Checklist Fin de Session

- [ ] `npx tsc --noEmit` - Aucune erreur TypeScript
- [ ] `npm run lint` - Aucune erreur ESLint
- [ ] `npx expo start` - App démarre sans crash
- [ ] Navigation fonctionne (auth flow)
- [ ] Supabase connecté (test auth)
- [ ] Tous les commits poussés
- [ ] Documentation à jour

---

## Notes de Session

_Espace pour noter les décisions, blocages, et points à retenir._

```
Date:
Durée:
Fait:
À faire ensuite:
Blocages:
```
