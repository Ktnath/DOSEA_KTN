# D.O.S.E.A.

**D**osage **O**ptimisé **S**ûr pour **E**nfants et **A**dolescents

Application mobile et PWA de calcul de posologie pédiatrique, destinée aux professionnels de santé.

## Stack Technique

- **Frontend** : React 19 + TypeScript + Vite
- **Styling** : Tailwind CSS
- **State** : Zustand
- **DB locale** : Dexie (IndexedDB)
- **Mobile** : Capacitor (Android/iOS)
- **PWA** : VitePWA
- **IA** : Google Gemini API
- **PDF** : jsPDF

## Démarrage

```bash
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`.

## Build

```bash
npm run build
```

## Mobile (Capacitor)

```bash
npx cap add android
npx cap add ios
npm run build
npx cap sync
npx cap open android  # ou ios
```

## Qualité / CI

Avant d'ouvrir une pull request, lancer en local :

```bash
npm run typecheck
npm run validate:data
npm run test
npm run build
```

Ces mêmes vérifications sont exécutées automatiquement par la CI GitHub Actions (`DOSEA Quality Gate`) sur chaque pull request et push vers `main`.

## Licence

MIT
