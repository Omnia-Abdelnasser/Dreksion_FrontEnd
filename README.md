# 🚀 Feature-Based Architecture

<div align="center">
<p>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
<a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
</p>

<p><strong>A scalable and maintainable project structure for modern React applications</strong></p>
<p>Optimized for developer experience, code organization, and build performance</p>
</div>

## 📁 Project Structure

# ui/ux :
[figma](https://www.figma.com/design/QRCUXacXCsPnzk1hbbS2RA/index.?node-id=2-106&t=TsWiOUQVa2nPFWPb-1)

```
src/
├── main.tsx           # Application entry point
├── app/               # Application shell
│   ├── app.tsx        # Main App component
│   ├── providers/     # Global context providers
│   ├── layouts/       # Layout components
│   └── routes/        # Route definitions
├── features/          # Feature modules
│   └── [feature]/     # Individual feature
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── types/       # Feature-specific types
│       └── index.ts     # Public API
├── shared/            # Shared code
│   ├── components/    # Shared UI components
│   ├── hooks/         # Shared hooks
│   ├── lib/           # Utility functions and shared libraries
│   │   └── utils/     # Common utility functions
│   └── types/         # Shared types
└── index.css          # Global styles
```

## 🏗️ Architecture Overview

### Core Principles

1. **Unidirectional Dependencies** 🔄

   ```
   ┌────────┐      ┌────────┐      ┌────────┐
   │        │      │        │      │        │
   │ shared ├─────►│features├─────►│  app   │
   │        │      │        │      │        │
   └────────┘      └────────┘      └────────┘
   ```

   - `shared` modules can only import from other `shared` modules
   - `features` can import from `shared` modules but not from other features
   - `app` can import from both `features` and `shared` modules

2. **Feature Encapsulation** 📦

   - Self-contained features
   - Public API through index.ts
   - Hidden implementation details

3. **Application Shell** 🏗️
   - Routing management
   - Layout components
   - Global providers

## 📋 Import Rules

### Feature Imports

```typescript
// ✅ Allowed
import { FeatureComponent } from '@/features/feature';

// ❌ Disallowed
import { FeatureComponent } from '@/features/feature/components';
```

### Shared Imports

```typescript
// ✅ Allowed
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@/shared/hooks/useAuth';

// ❌ Disallowed
import { Button } from '@/shared/components';
```

### App Shell Imports

```typescript
// ✅ Allowed
import { AppLayout } from '@/app/layouts/AppLayout';
import { AuthProvider } from '@/app/providers/AuthProvider';

// ❌ Disallowed
import { AppLayout } from '@/app/layouts';
```

## 💅 Code Style

### Quotes

- Use single quotes for strings and JSX attributes
- Enforced by Prettier configuration

### Imports

- Use absolute imports with `@/` prefix
- Group imports by type (React, external, internal)
- Use named exports for better tree-shaking

### Components

- Use functional components with TypeScript
- Props should be typed with `type` instead of `interface`
- Use Tailwind CSS for styling

## 📦 Barrel Files & Tree-shaking

### Feature Barrel Files

```typescript
// features/feature/index.ts
export { FeatureComponent } from './components/FeatureComponent';
export { useFeature } from './hooks/useFeature';
export type { FeatureType } from './types';
```

### Shared Barrel Files

```typescript
// shared/components/index.ts
export { Button } from './ui/button';
export { Input } from './ui/input';
```

### Benefits

- 🎯 Only imported exports included in bundle
- 🔒 Internal implementation details excluded
- ⚡ Better code splitting and lazy loading

---

<div align="center">

Inspired by [Bulletproof React](https://github.com/alan2207/bulletproof-react)

</div>
