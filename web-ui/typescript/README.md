# Studio Web UI - TypeScript Version

## 🚀 Migration JavaScript vers TypeScript

Cette version TypeScript de l'application Studio Web UI a été créée en appliquant les principes **DRY**, **SOC** et la **destructuration atomique**.

## 📋 Fonctionnalités

### ✅ Principes appliqués

- **DRY (Don't Repeat Yourself)** : Élimination de la duplication de code
- **SOC (Separation of Concerns)** : Séparation claire des responsabilités
- **Destructuration atomique** : Utilisation intensive de la destructuration pour une meilleure lisibilité

### 🛠️ Technologies utilisées

- **TypeScript 5.7.2** : Typage statique avancé
- **React 19.1.0** : Dernière version de React
- **Bootstrap 5.3.7** : Framework CSS moderne
- **Redux Toolkit** : Gestion d'état moderne
- **React Router 6.26.1** : Navigation côté client
- **Vite 7.0.0** : Build tool ultra-rapide
- **i18next 23.10.0** : Internationalisation

## 🏗️ Architecture

### Structure des dossiers

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants communs
│   ├── layout/         # Composants de mise en page
│   └── ui/             # Composants d'interface
├── hooks/              # Hooks personnalisés
├── pages/              # Pages de l'application
├── store/              # Store Redux
│   └── slices/         # Slices Redux Toolkit
├── types/              # Types TypeScript
├── constants/          # Constantes de l'application
├── utils/              # Utilitaires
└── services/           # Services API
```

### Principes de destructuration atomique

#### 1. Destructuration des props
```typescript
interface ComponentProps {
  readonly title: string;
  readonly description?: string;
  readonly onAction: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  description = 'Description par défaut',
  onAction
}) => {
  // Utilisation des props destructurées
};
```

#### 2. Destructuration des états Redux
```typescript
const { isPlugged, deviceInfo } = useSelector(selectDevice);
const { version, announce } = useSelector(selectEvergreen);
```

#### 3. Destructuration des constantes
```typescript
const {
  BUTTON,
  BUTTON_PRIMARY,
  MODAL,
  MODAL_DIALOG
} = BOOTSTRAP_CLASSES;
```

#### 4. Destructuration des hooks
```typescript
const {
  eventBus,
  isConnected,
  connect,
  disconnect
} = useEventBus(options);
```

## 🎨 Interface utilisateur

### Bootstrap 5.3.7

- **Design responsive** : Adaptation automatique à tous les écrans
- **Mode sombre/clair** : Support des thèmes
- **Composants modernes** : Utilisation des dernières fonctionnalités Bootstrap
- **Accessibilité** : Respect des standards WCAG

### Composants personnalisés

- **Header** : Navigation principale avec sélecteurs de langue et thème
- **Modal** : Système de modales personnalisées
- **LoadingSpinner** : Indicateurs de chargement
- **Notification** : Système de notifications toast

## 🔧 Configuration

### Installation des dépendances

```bash
npm install
```

### Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Vérification des types
npm run type-check

# Linting
npm run lint

# Prévisualisation
npm run preview
```

### Configuration TypeScript

Le projet utilise une configuration TypeScript stricte avec :

- **Strict mode** activé
- **Path mapping** pour les imports
- **ES2020** comme target
- **React JSX** supporté

### Configuration Vite

- **Hot Module Replacement** (HMR)
- **TypeScript** support natif
- **CSS modules** support
- **Optimisation** automatique

## 📦 Gestion d'état

### Redux Toolkit

Utilisation de Redux Toolkit avec des slices pour une gestion d'état moderne :

```typescript
// Exemple de slice
export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    devicePlugged: (state, action: PayloadAction<DeviceInfo>) => {
      const { id, name, version, connectedAt } = action.payload;
      state.isPlugged = true;
      state.deviceInfo = { id, name, version, connectedAt };
    }
  }
});
```

### Hooks personnalisés

- **useEventBus** : Gestion de l'EventBus Vert.x
- **useLocalStorage** : Gestion du stockage local
- **useNotification** : Système de notifications

## 🌐 Internationalisation

Support multilingue avec i18next :

- **Français** (fr)
- **Anglais** (en)
- **Détection automatique** de la langue
- **Persistance** des préférences

## 🔌 EventBus

Intégration avec Vert.x EventBus pour la communication temps réel :

- **Connexion automatique**
- **Gestion des erreurs**
- **Handlers typés**
- **Reconnexion automatique**

## 🎯 Bonnes pratiques

### 1. Immutabilité
```typescript
// ✅ Bon
const newState = { ...state, property: newValue };

// ❌ Mauvais
state.property = newValue;
```

### 2. Types stricts
```typescript
// ✅ Bon
interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

// ❌ Mauvais
interface User {
  id: any;
  name: any;
  email: any;
}
```

### 3. Destructuration atomique
```typescript
// ✅ Bon
const { id, name, email } = user;
const { isConnected, eventBus } = useEventBus();

// ❌ Mauvais
const id = user.id;
const name = user.name;
const email = user.email;
```

### 4. Séparation des responsabilités
```typescript
// ✅ Bon - Un fichier par responsabilité
// hooks/useEventBus.ts
// components/Header.tsx
// store/slices/deviceSlice.ts

// ❌ Mauvais - Tout dans un seul fichier
```

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Le build génère des fichiers optimisés dans le dossier `dist/`.

### Variables d'environnement

```env
VITE_API_URL=http://localhost:8080
VITE_EVENTBUS_URL=http://localhost:8080/eventbus
VITE_APP_VERSION=0.0.2
```

## 📝 Migration depuis JavaScript

### Étapes de migration

1. **Conversion des fichiers** : `.js` → `.tsx`
2. **Ajout des types** : Interfaces et types TypeScript
3. **Refactoring** : Application des principes DRY/SOC
4. **Destructuration** : Implémentation de la destructuration atomique
5. **Tests** : Vérification du bon fonctionnement

### Avantages de la migration

- **Sécurité de type** : Détection d'erreurs à la compilation
- **Meilleure maintenabilité** : Code plus lisible et structuré
- **Performance** : Optimisations TypeScript
- **DX amélioré** : Meilleure expérience développeur

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MPL-2.0. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :

1. Consultez la documentation
2. Vérifiez les issues existantes
3. Créez une nouvelle issue avec les détails du problème
