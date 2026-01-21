# ROADMAP - Yunicity MVP

**Version:** 2.0
**Objectif:** Lancement MVP sur les stores en 8 semaines

---

## Phase 1: Setup & Auth
**Durée estimée:** Semaines 1-2

### 1.1 Infrastructure Projet
- [x] Initialiser projet Expo avec TypeScript strict
- [x] Configurer NativeWind (Tailwind CSS)
- [x] Setup Expo Router (file-based routing)
- [x] Installer Lucide React Native (icônes)
- [x] Créer structure de dossiers (src/)
- [ ] Configurer ESLint + Prettier
- [ ] Setup variables d'environnement (.env)

### 1.2 Neon Database Setup
- [ ] Créer projet sur https://neon.tech
- [ ] Récupérer connection string
- [ ] Installer Drizzle ORM + Neon client
  ```bash
  npm install @neondatabase/serverless drizzle-orm
  npm install -D drizzle-kit
  ```
- [ ] Configurer `src/lib/db.ts`
- [ ] Créer schéma Drizzle (`src/db/schema.ts`)
- [ ] Configurer `drizzle.config.ts`
- [ ] Générer et exécuter migrations
  ```bash
  npx drizzle-kit generate
  npx drizzle-kit push
  ```

### 1.3 Clerk Auth Setup
- [ ] Créer compte sur https://clerk.com
- [ ] Créer application Clerk
- [ ] Activer providers: Email, Google, Apple
- [ ] Récupérer Publishable Key
- [ ] Installer Clerk SDK
  ```bash
  npx expo install @clerk/clerk-expo expo-secure-store
  ```
- [ ] Configurer `src/lib/auth.ts`
- [ ] Intégrer ClerkProvider dans `_layout.tsx`

### 1.4 Authentification Screens
- [ ] Écran Welcome (splash)
- [ ] Écran Sign Up (Clerk)
- [ ] Écran Sign In (Clerk)
- [ ] Forgot Password flow
- [ ] Protection des routes (middleware Clerk)

### 1.5 Design System Base
- [x] Configurer thème Tailwind (couleurs Yurpass v2)
- [ ] Créer composants UI de base:
  - [ ] Button (primary=bleu, secondary, outline)
  - [ ] Input (text, email, password)
  - [ ] Card
  - [ ] Avatar
  - [ ] Loading states

**Deliverable:** App fonctionnelle avec auth Clerk complète

---

## Phase 2: Core Features (Map & Feed)
**Durée estimée:** Semaines 3-4

### 2.1 Navigation
- [x] Setup Tab Navigator (4 tabs)
- [x] Icônes Lucide et labels
- [ ] Header customisé
- [ ] Transitions fluides

### 2.2 Feed d'Actualité
- [ ] Table `posts` dans Neon (via Drizzle)
- [ ] API: fetch posts avec pagination
- [ ] Composant PostCard
- [ ] FlashList optimisée
- [ ] Pull-to-refresh
- [ ] Loading skeletons
- [ ] Empty state
- [ ] Système de likes

### 2.3 Carte Interactive
- [ ] Intégration react-native-maps
- [ ] Centrage initial sur Reims
- [ ] Markers custom (style Yurpass - bleu)
- [ ] Géolocalisation utilisateur
- [ ] Bottom sheet partenaire
- [ ] Navigation vers fiche détail

### 2.4 Optimisation Images
- [ ] Setup expo-image
- [ ] Placeholder blur
- [ ] Cache images
- [ ] Lazy loading

**Deliverable:** Feed et Map fonctionnels avec données Neon

---

## Phase 3: Partenaires & Offres
**Durée estimée:** Semaines 5-6

### 3.1 Base de Données Partenaires
- [ ] Seed data: Belga Queen, etc.
- [ ] Query partners depuis Neon
- [ ] Filtrage par catégorie

### 3.2 Fiche Partenaire
- [ ] Écran détail partenaire
- [ ] Header avec cover image
- [ ] Infos (adresse, horaires, contact)
- [ ] Liste des Pass disponibles
- [ ] Bouton "Obtenir le Pass" (bleu)

### 3.3 Système Pass QR Code
- [ ] Logique d'obtention d'un Pass
- [ ] Génération QR Code unique
- [ ] Écran détail Pass avec QR
- [ ] Validation côté partenaire (scan)
- [ ] Historique des Pass utilisés
- [ ] Gestion des quotas/limites

### 3.4 Profil Utilisateur
- [ ] Écran profil (données Clerk)
- [ ] Édition profil (photo, nom)
- [ ] Mes Pass actifs
- [ ] Historique Pass
- [ ] Paramètres + déconnexion

**Deliverable:** Système Pass complet et fonctionnel

---

## Phase 4: Polishing & ASO
**Durée estimée:** Semaines 7-8

### 4.1 Onboarding
- [ ] 3 écrans d'introduction
- [ ] Animations Lottie
- [ ] Skip / Get Started
- [ ] Stockage "onboarding done"

### 4.2 Notifications
- [ ] Setup Expo Notifications
- [ ] Permission request flow
- [ ] Push pour nouveaux Pass
- [ ] Push pour événements locaux

### 4.3 Performance & Polish
- [ ] Audit performance (bundle size)
- [ ] Optimisation re-renders
- [ ] Error boundaries
- [ ] Offline mode basique
- [ ] Haptic feedback
- [ ] Animations micro-interactions

### 4.4 Testing
- [ ] Tests unitaires (Jest)
- [ ] Tests composants (React Testing Library)
- [ ] Tests E2E critiques (Detox)
- [ ] QA manuel sur devices réels

### 4.5 App Store Optimization
- [ ] Icône app (1024x1024)
- [ ] Screenshots (6.5" et 5.5")
- [ ] Preview video (optionnel)
- [ ] Description optimisée SEO
- [ ] Keywords recherchés
- [ ] Catégorie: Lifestyle / Social

### 4.6 Déploiement
- [ ] Build iOS (EAS Build)
- [ ] Build Android (EAS Build)
- [ ] Soumission TestFlight
- [ ] Soumission Play Console (Internal Testing)
- [ ] Review Apple (prévoir itérations)
- [ ] Lancement public

**Deliverable:** App publiée sur App Store et Play Store

---

## Jalons Clés

| Semaine | Jalon | Status |
|---------|-------|--------|
| S2 | Auth Clerk complète + Design System | 🔲 |
| S4 | Feed + Map fonctionnels (Neon) | 🔲 |
| S6 | Système Pass opérationnel | 🔲 |
| S7 | Beta TestFlight/Play Console | 🔲 |
| S8 | Lancement MVP Public | 🔲 |

---

## Stack Technique Résumée

| Composant | Technologie |
|-----------|-------------|
| Framework | React Native (Expo SDK 54) |
| Navigation | Expo Router |
| Styling | NativeWind (Tailwind) |
| **Database** | **Neon (Serverless Postgres)** |
| **ORM** | **Drizzle ORM** |
| **Auth** | **Clerk (Expo SDK)** |
| State | Zustand + React Query |
| Icons | Lucide React Native |

---

## Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Rejet App Store | Élevé | Suivre guidelines Apple, prévoir buffer |
| Performance Map | Moyen | Limiter markers, clustering |
| Adoption partenaires | Élevé | Onboarding simple, support dédié |
| Bugs critiques post-launch | Moyen | Monitoring Sentry, hotfix rapide |
| Cold starts Neon | Faible | Neon scaling automatique |

---

## Post-MVP (Backlog)

- Mode sombre
- Multi-langue (EN)
- Système de réservation
- Chat avec partenaires
- Programme fidélité avancé
- Gamification (badges, niveaux)
- Extension à d'autres villes
