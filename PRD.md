# PRD - Yunicity MVP
## Product Requirements Document

**Version:** 2.0
**Date:** Janvier 2026
**Produit:** Yunicity - Réseau Social Local de Reims

---

## 1. Vision Produit

Yunicity est une application mobile de réseau social hyperlocal dédiée à la ville de Reims. Elle connecte les habitants avec les commerces, événements et bons plans de leur ville via un système de "Pass" exclusif.

### Proposition de Valeur
- **Pour les utilisateurs:** Découvrir et profiter des meilleures adresses de Reims avec des avantages exclusifs
- **Pour les partenaires:** Gagner en visibilité locale et fidéliser une clientèle engagée

---

## 2. Design System - Yurpass v2

### Palette de Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Blanc | `#FFFFFF` | **Background principal** (strict) |
| Noir | `#000000` | Textes principaux, titres |
| Bleu Yunicity | `#1E40AF` | **Couleur primaire** - CTA, boutons, icônes actives, tabs, bordures focus |
| Gris | `#6B7280` | Textes secondaires, placeholders |
| Gris clair | `#F3F4F6` | Séparateurs, cards secondaires |

### Hiérarchie Visuelle

#### Couleur Primaire = Bleu Yunicity (#1E40AF)
| Élément | Couleur | Exemple |
|---------|---------|---------|
| Boutons CTA | `bg-yunicity-blue` | "Se connecter", "Obtenir le Pass" |
| Icônes actives (tabs) | `#1E40AF` | Tab sélectionné |
| Liens cliquables | `text-yunicity-blue` | "Mot de passe oublié ?" |
| Bordures focus | `border-yunicity-blue` | Input actif |
| Badges/Tags | `bg-yunicity-blue/10 text-yunicity-blue` | Catégories |

#### Textes et Contrastes
| Élément | Couleur |
|---------|---------|
| Titres (H1, H2) | `text-yunicity-black` |
| Corps de texte | `text-yunicity-black` |
| Textes secondaires | `text-gray-500` |
| Placeholders | `text-gray-400` |
| Icônes inactives | `text-gray-400` |

### Principes UI
- ❌ **Interdit:** Dégradés, ombres lourdes, boutons noirs pour CTA
- ✅ **Autorisé:** Flat design, contrastes forts, espaces blancs généreux
- 📸 **Photos:** Haute qualité, format 16:9 ou carré, optimisées WebP
- 🎯 **CTA:** Toujours en Bleu Yunicity, jamais en noir

---

## 3. Features MVP

### 3.1 Authentification (Clerk)
| Feature | Priorité | Description |
|---------|----------|-------------|
| Sign Up Email | P0 | Inscription avec email + mot de passe via Clerk |
| Sign In | P0 | Connexion classique via Clerk |
| OAuth Google | P1 | Connexion rapide Google (Clerk) |
| OAuth Apple | P1 | Connexion rapide Apple iOS (Clerk) |
| Forgot Password | P1 | Réinitialisation par email (Clerk) |
| Onboarding | P2 | 3 écrans de présentation au premier lancement |

### 3.2 Feed d'Actualité (Reims)
| Feature | Priorité | Description |
|---------|----------|-------------|
| Liste des posts | P0 | Affichage chronologique des actualités locales |
| Post avec image | P0 | Contenu: titre, description, image, lieu, date |
| Like | P1 | Système de like sur les posts |
| Partage | P2 | Partager un post en externe |
| Filtres | P2 | Par catégorie (Food, Events, Shopping, Culture) |

### 3.3 Carte Interactive
| Feature | Priorité | Description |
|---------|----------|-------------|
| Map centrée Reims | P0 | Vue carte avec position initiale sur Reims |
| Markers partenaires | P0 | Points d'intérêt des partenaires (ex: Belga Queen) |
| Fiche partenaire | P0 | Bottom sheet avec infos du lieu |
| Géolocalisation | P1 | Centrer sur position utilisateur |
| Clusters | P2 | Regroupement des markers zoomés out |
| Itinéraire | P3 | Ouvrir dans Maps/Waze |

### 3.4 Profil Utilisateur
| Feature | Priorité | Description |
|---------|----------|-------------|
| Affichage profil | P0 | Photo, nom, email, date inscription |
| Édition profil | P1 | Modifier photo et nom |
| Historique Pass | P1 | Liste des Pass utilisés |
| Paramètres | P1 | Notifications, déconnexion |
| Suppression compte | P2 | RGPD compliance |

### 3.5 Système Pass QR Code
| Feature | Priorité | Description |
|---------|----------|-------------|
| Liste des Pass | P0 | Offres disponibles par partenaire |
| Détail Pass | P0 | Conditions, validité, description |
| Génération QR | P0 | QR code unique par utilisation |
| Scan validation | P0 | Le partenaire scanne et valide |
| Historique | P1 | Pass utilisés avec dates |
| Limites | P1 | Quota d'utilisation par Pass |

---

## 4. Architecture des Écrans

```
App
├── (auth)
│   ├── welcome.tsx
│   ├── sign-in.tsx          # Clerk SignIn
│   ├── sign-up.tsx          # Clerk SignUp
│   └── forgot-password.tsx
├── (tabs)
│   ├── index.tsx (Feed)
│   ├── map.tsx (Carte)
│   ├── pass.tsx (Mes Pass)
│   └── profile.tsx (Profil)
├── partner/[id].tsx (Fiche Partenaire)
├── pass/[id].tsx (Détail Pass + QR)
└── settings/
    ├── index.tsx
    ├── edit-profile.tsx
    └── notifications.tsx
```

---

## 5. Sécurité

### 5.1 Authentification (Clerk)
- **Session management:** Géré par Clerk SDK
- **JWT Tokens:** Automatique via `@clerk/clerk-expo`
- **OAuth providers:** Google, Apple configurés dans Clerk Dashboard
- **Password policy:** Configurable dans Clerk Dashboard

### 5.2 Base de Données (Neon + Drizzle)
```typescript
// Exemple: Vérification user côté API
import { auth } from "@clerk/clerk-expo";

export async function getMyPasses() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return db.select().from(userPasses).where(eq(userPasses.userId, userId));
}
```

### 5.3 Règles de Sécurité
| Règle | Implementation |
|-------|----------------|
| Données sensibles | Jamais en clair, toujours chiffrées |
| API Keys | Variables d'environnement (.env) |
| QR Codes | Token unique + timestamp + signature HMAC |
| Rate Limiting | Middleware API Routes |

---

## 6. Performance

### 6.1 Optimisation Images
- **Format:** WebP prioritaire, fallback JPEG
- **Dimensions:**
  - Feed cards: 400x300px
  - Profil: 200x200px
  - Partenaire cover: 800x400px
- **CDN:** Cloudflare ou équivalent
- **Lazy loading:** Images hors viewport non chargées

### 6.2 Listes Performantes
```typescript
// Utiliser FlashList au lieu de FlatList
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={posts}
  renderItem={renderPost}
  estimatedItemSize={300}
/>
```

### 6.3 Caching Strategy
| Donnée | TTL | Strategy |
|--------|-----|----------|
| Feed posts | 5 min | stale-while-revalidate |
| Partenaires | 1 heure | cache-first |
| Profil user | Session | cache + invalidation |
| Pass actifs | 1 min | network-first |

### 6.4 Métriques Cibles
| Métrique | Objectif |
|----------|----------|
| Time to Interactive | < 3s |
| First Contentful Paint | < 1.5s |
| Bundle Size | < 15 MB |
| Memory Usage | < 150 MB |

---

## 7. Analytics & Tracking

### Events Clés
- `user_signed_up`
- `user_signed_in`
- `feed_viewed`
- `post_liked`
- `map_opened`
- `partner_viewed`
- `pass_opened`
- `qr_generated`
- `qr_scanned`

---

## 8. Critères de Succès MVP

| KPI | Objectif M+3 |
|-----|--------------|
| Downloads | 1,000 |
| MAU | 500 |
| Pass utilisés | 200 |
| Partenaires actifs | 10 |
| Note App Store | > 4.0 |

---

## 9. Out of Scope (Post-MVP)

- Messagerie entre utilisateurs
- Système de réservation
- Paiement in-app
- Programme de fidélité avancé
- Multi-villes (hors Reims)
- Version Web
