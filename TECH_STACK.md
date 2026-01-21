# TECH STACK - Yunicity

**Version:** 2.0
**Dernière mise à jour:** Janvier 2026

---

## Stack Principale

| Catégorie | Technologie | Version | Obligatoire |
|-----------|-------------|---------|-------------|
| Framework | React Native | 0.81+ | ✅ |
| Platform | Expo | SDK 54+ | ✅ |
| Language | TypeScript | 5.x | ✅ |
| Styling | NativeWind | 4.x | ✅ |
| Database | Neon (Serverless Postgres) | Latest | ✅ |
| ORM | Drizzle ORM | Latest | ✅ |
| Auth | Clerk (Expo SDK) | Latest | ✅ |

---

## Librairies Autorisées

### Navigation
| Package | Usage | Notes |
|---------|-------|-------|
| `expo-router` | File-based routing | Obligatoire |
| `react-native-screens` | Native screens | Peer dependency |
| `react-native-safe-area-context` | Safe areas | Peer dependency |

### State Management
| Package | Usage | Notes |
|---------|-------|-------|
| `zustand` | Global state | Léger, simple |
| `@tanstack/react-query` | Server state | Caching, sync |

### Database & ORM
| Package | Usage | Notes |
|---------|-------|-------|
| `@neondatabase/serverless` | Client Neon Postgres | Serverless, edge-ready |
| `drizzle-orm` | ORM TypeScript | Type-safe queries |
| `drizzle-kit` | Migrations | Dev dependency |

### Authentication
| Package | Usage | Notes |
|---------|-------|-------|
| `@clerk/clerk-expo` | Auth Clerk | Login, Sign-up, OAuth |
| `expo-secure-store` | Stockage sécurisé | Tokens Clerk |

### UI Components
| Package | Usage | Notes |
|---------|-------|-------|
| `nativewind` | Tailwind pour RN | Styling principal |
| `lucide-react-native` | Icônes | Cohérence design |
| `react-native-reanimated` | Animations | Performance native |
| `react-native-gesture-handler` | Gestures | Swipe, pan, etc. |
| `@gorhom/bottom-sheet` | Bottom sheets | Modale partenaire |
| `expo-image` | Images optimisées | Cache + placeholder |
| `@shopify/flash-list` | Listes performantes | Remplace FlatList |

### Maps & Location
| Package | Usage | Notes |
|---------|-------|-------|
| `react-native-maps` | Carte interactive | Google Maps / Apple Maps |
| `expo-location` | Géolocalisation | Permissions incluses |

### QR Code
| Package | Usage | Notes |
|---------|-------|-------|
| `react-native-qrcode-svg` | Génération QR | Côté utilisateur |
| `expo-camera` | Scan QR | Côté partenaire |

### Utilities
| Package | Usage | Notes |
|---------|-------|-------|
| `date-fns` | Manipulation dates | Léger, tree-shakable |
| `zod` | Validation schemas | Type-safe |
| `expo-haptics` | Feedback haptique | UX premium |
| `expo-linking` | Deep links | Ouvrir Maps, tel, etc. |
| `clsx` | Classes conditionnelles | Avec tailwind-merge |
| `tailwind-merge` | Merge classes TW | Évite conflits |

### Dev & Testing
| Package | Usage | Notes |
|---------|-------|-------|
| `eslint` | Linting | Config strict |
| `prettier` | Formatting | Consistance code |
| `jest` | Unit tests | Avec preset Expo |
| `@testing-library/react-native` | Component tests | Best practices |

### Monitoring (Production)
| Package | Usage | Notes |
|---------|-------|-------|
| `@sentry/react-native` | Error tracking | Crash reports |
| `expo-updates` | OTA updates | Hotfixes rapides |

---

## Librairies Interdites

| Package | Raison | Alternative |
|---------|--------|-------------|
| `@supabase/supabase-js` | Remplacé | Neon + Clerk |
| `redux` | Over-engineering | Zustand |
| `mobx` | Complexité | Zustand |
| `axios` | Pas nécessaire | fetch natif |
| `moment` | Trop lourd | date-fns |
| `styled-components` | Hors Design System | NativeWind |
| `react-native-elements` | Style non conforme | Composants custom |
| `native-base` | Style non conforme | Composants custom |
| `lodash` (full) | Bundle size | ES6 natif ou lodash-es |
| `firebase` | Hors stack | Neon + Clerk |

---

## Design System - Yurpass v2

### Palette de Couleurs

| Nom | Variable Tailwind | Hex | Usage |
|-----|-------------------|-----|-------|
| Blanc | `yunicity-white` | `#FFFFFF` | Background principal |
| Noir | `yunicity-black` | `#000000` | Textes principaux |
| Bleu Yunicity | `yunicity-blue` | `#1E40AF` | **CTA, boutons, icônes actives, bordures focus** |
| Gris | `gray-500` | `#6B7280` | Textes secondaires |
| Gris clair | `gray-100` | `#F3F4F6` | Séparateurs, backgrounds secondaires |

### Règles Visuelles Strictes

#### ✅ Couleur Primaire = Bleu Yunicity
```typescript
// ✅ Boutons principaux en Bleu
<Pressable className="bg-yunicity-blue rounded-xl py-4">
  <Text className="text-white text-center font-semibold">Action</Text>
</Pressable>

// ✅ Icônes actives en Bleu
<Home size={24} color="#1E40AF" />

// ✅ Bordures focus en Bleu
<TextInput className="border-2 border-gray-200 focus:border-yunicity-blue" />

// ✅ Liens en Bleu
<Text className="text-yunicity-blue">Mot de passe oublié ?</Text>
```

#### ❌ INTERDIT : Full Black pour CTA
```typescript
// ❌ NE PAS FAIRE
<Pressable className="bg-black">  // Interdit pour CTA
<Pressable className="bg-yunicity-black">  // Interdit pour CTA

// ✅ FAIRE
<Pressable className="bg-yunicity-blue">  // Bleu pour CTA
```

#### Textes et Contrastes
```typescript
// ✅ Titres en noir
<Text className="text-yunicity-black text-2xl font-bold">Titre</Text>

// ✅ Textes secondaires en gris
<Text className="text-gray-500">Description</Text>

// ✅ Fond toujours blanc
<View className="bg-yunicity-white flex-1">
```

---

## Règles TypeScript

### Configuration tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Règles Strictes

#### ❌ INTERDIT

```typescript
// ❌ any est INTERDIT
const data: any = fetchData();
function process(input: any): any { }

// ❌ @ts-ignore est INTERDIT
// @ts-ignore
const result = riskyOperation();

// ❌ Type assertions abusives
const user = data as User; // Sans vérification
```

#### ✅ AUTORISÉ

```typescript
// ✅ Types explicites
interface User {
  id: string;
  email: string;
  profile: UserProfile | null;
}

// ✅ unknown + type guards
function processData(data: unknown): User {
  if (isUser(data)) {
    return data;
  }
  throw new Error('Invalid user data');
}

// ✅ Zod pour validation runtime
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;
```

---

## Règles de Styling

### Configuration NativeWind

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'yunicity': {
          'white': '#FFFFFF',
          'black': '#000000',
          'blue': '#1E40AF',
        },
      },
    },
  },
};
```

### Règles Strictes

#### ❌ INTERDIT

```typescript
// ❌ StyleSheet.create
const styles = StyleSheet.create({
  container: { padding: 16 }
});

// ❌ Inline styles
<View style={{ padding: 16, backgroundColor: 'white' }}>

// ❌ Couleurs en dur
<Text style={{ color: '#1E40AF' }}>
```

#### ✅ AUTORISÉ

```typescript
// ✅ Classes Tailwind uniquement
<View className="p-4 bg-yunicity-white">

// ✅ Couleurs du thème
<Text className="text-yunicity-blue">

// ✅ Classes conditionnelles avec cn()
<View className={cn("p-4", isActive && "bg-yunicity-blue")}>
```

---

## Structure des Dossiers

```
yunicity-app/
├── src/
│   ├── app/                    # Expo Router (pages)
│   │   ├── (auth)/            # Routes authentification (Clerk)
│   │   ├── (tabs)/            # Routes principales (tabs)
│   │   ├── partner/           # Routes partenaires
│   │   ├── pass/              # Routes pass
│   │   └── _layout.tsx        # Layout racine
│   ├── components/            # Composants réutilisables
│   │   ├── ui/               # Composants UI de base
│   │   └── features/         # Composants métier
│   ├── lib/                   # Utilitaires et configs
│   │   ├── db.ts             # Client Drizzle/Neon
│   │   ├── auth.ts           # Config Clerk
│   │   ├── utils.ts          # Helpers
│   │   └── constants.ts      # Constantes
│   ├── db/                    # Schéma Drizzle
│   │   └── schema.ts         # Tables Postgres
│   ├── hooks/                 # Custom hooks
│   ├── store/                # Zustand stores
│   └── types/                # Types TypeScript
├── drizzle/                   # Migrations Drizzle
├── assets/                    # Images, fonts
└── __tests__/                 # Tests
```

---

## Variables d'Environnement

```bash
# .env.local (jamais commité)

# Neon Database
EXPO_PUBLIC_DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/yunicity?sslmode=require

# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx

# Google Maps (optionnel)
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxx
```

**Règle:** Toutes les variables publiques doivent être préfixées par `EXPO_PUBLIC_`

---

## Git Conventions

### Branches
- `main` - Production
- `develop` - Développement
- `feature/xxx` - Nouvelles features
- `fix/xxx` - Bug fixes
- `hotfix/xxx` - Fixes urgents production

### Commits (Conventional Commits)
```
feat: add QR code generation
fix: resolve map marker clustering issue
docs: update README with setup instructions
style: format code with prettier
refactor: extract auth logic to hook
test: add unit tests for pass validation
chore: update dependencies
```

---

## Checklist Avant Merge

- [ ] TypeScript: Aucune erreur (`npm run typecheck`)
- [ ] ESLint: Aucun warning (`npm run lint`)
- [ ] Tests: Tous passent (`npm test`)
- [ ] Pas de `any` dans le code
- [ ] Pas de styles inline
- [ ] CTA en `bg-yunicity-blue` (pas de full black)
- [ ] Composants dans `src/components/ui/` avant usage
- [ ] PR review par au moins 1 personne
