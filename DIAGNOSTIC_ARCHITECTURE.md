# Diagnostic & Architecture - ROMUO VTC (Suisse)

## A. Diagnostic Priorisé

### P0 - Critique (Bloquant pour déploiement/légal)
*   **Deploy Hostinger** : Structure actuelle (Vite dev server) incompatible avec Node.js Apps en prod. Nécessite séparation build client/serveur.
    *   *Effort : M*
*   **Légal Suisse (LPD)** : Absence de mentions légales, politique de confidentialité et gestion des cookies conformes.
    *   *Effort : S*
*   **Données Factuelles** : Remplacer les fausses données (prix, adresses) par des placeholders "À compléter" ou le numéro officiel (076 842 89 98).
    *   *Effort : S*

### P1 - Important (Performance & SEO)
*   **SEO Technique** : Manque de balises meta, canonical, JSON-LD (LocalBusiness), sitemap.xml, robots.txt.
    *   *Effort : M*
*   **Performance (CWV)** : Optimisation du chargement des assets (images, polices), configuration du cache serveur (Express).
    *   *Effort : M*
*   **Accessibilité (WCAG)** : Contraste couleurs, navigation clavier, labels formulaires.
    *   *Effort : M*

### P2 - Optimisation (CRO & UX)
*   **Conversion** : CTA persistants, réassurance (paiement, sécurité), formulaire de devis simplifié.
    *   *Effort : M*
*   **Contenu** : Wording adapté "Suisse" (VTC, Transfert, CHF).
    *   *Effort : S*

---

## B. Design System & Tokens

### Couleurs (Accessibilité AA visée)
*   `primary`: `#000000` (Noir pur - Texte principal, CTA forts)
*   `secondary`: `#FFFFFF` (Blanc pur - Fond, Texte sur fond sombre)
*   `accent`: `#D90000` (Rouge Suisse - pour éléments d'appel, à utiliser avec parcimonie) - *À vérifier contraste*
*   `background`: `#F6F6F6` (Gris très clair - Fond général pour réduire fatigue visuelle)
*   `surface`: `#FFFFFF` (Cartes, Modales)
*   `text-muted`: `#555555` (Gris moyen - Texte secondaire, contraste > 4.5:1 sur blanc)
*   `border`: `#E5E5E5` (Gris pâle - Séparateurs subtils)

### Typographie
*   Font: `Inter` ou `System UI` (Performance & Lisibilité)
*   Scale:
    *   H1: 2.5rem (Mobile: 2rem) - Bold
    *   H2: 2rem (Mobile: 1.75rem) - SemiBold
    *   H3: 1.5rem - Medium
    *   Body: 1rem (16px) - Regular
    *   Small: 0.875rem - Regular

### Espacement (Grid 4px)
*   `xs`: 4px
*   `sm`: 8px
*   `md`: 16px
*   `lg`: 24px
*   `xl`: 32px
*   `2xl`: 48px

---

## C. Information Architecture (IA) & Plan de Pages

### Arborescence
1.  **Accueil (`/`)**
    *   Hero (Proposition de valeur + CTA "Réserver/Appeler")
    *   Services (Aperçu)
    *   Réassurance (Sécurité, Pro)
    *   Zones d'intervention (Placeholders)
    *   CTA Final
2.  **Services (`/services`)**
    *   Transfert Aéroport
    *   Business / Corporate
    *   Événementiel
    *   Mise à disposition
3.  **Réservation / Devis (`/reservation`)**
    *   Formulaire (Départ, Arrivée, Date, Type véhicule)
    *   Coordonnées
    *   Validation (Envoi demande devis - pas de paiement direct si prix non fixes)
4.  **À Propos (`/a-propos`)**
    *   Mission / Valeurs
    *   Engagement Qualité
    *   Flotte (Description générique si pas de photos réelles)
5.  **Contact (`/contact`)**
    *   Tel (076 842 89 98)
    *   Formulaire contact simple
    *   Horaires (Placeholder)
6.  **Légal**
    *   Mentions Légales (`/mentions-legales`)
    *   Confidentialité (`/confidentialite`) - Conforme LPD
    *   CGV (`/cgv`)

---

## D. Architecture Technique (Hostinger Node.js)

### Structure des Dossiers
```
/
├── client/                 # Code source Frontend (Vite/React)
│   ├── public/             # Assets statiques (robots.txt, sitemap.xml)
│   ├── src/
│   │   ├── components/     # UI Components (Accessibles)
│   │   ├── pages/          # Pages routes
│   │   ├── lib/            # Utils, Hooks
│   │   └── styles/         # CSS/Tailwind
│   ├── index.html
│   └── vite.config.ts      # Config build client
├── server/                 # Code source Backend (Express)
│   └── index.ts            # Point d'entrée serveur (API + Static serve)
├── dist/                   # Output de build (Généré)
│   ├── client/             # Fichiers statiques frontend
│   └── server/             # Fichier serveur compilé (index.js)
├── server.js               # Entry point racine pour Hostinger (proxy vers dist/server)
├── package.json            # Scripts unifiés
└── .npmrc                  # Config NPM (si besoin)
```

### Stratégie de Build
1.  `pnpm build:client`: Vite compile `client/` vers `dist/client/`.
2.  `pnpm build:server`: esbuild compile `server/index.ts` vers `dist/server/index.js`.
3.  `pnpm start`: Node exécute `server.js` (qui require `dist/server/index.js`).

### SEO & Meta
*   Utilisation de `react-helmet-async` pour gérer les balises `<head>` dynamiques côté client (SPA).
*   Prerendering ou SSR non prioritaire pour V1 (SPA bien indexée par Google ajd), mais structure prête.
*   `sitemap.xml` statique généré ou dynamique via serveur.

---

## E. Prochaines Étapes (Exécution)
1.  **Configuration Build** : Mettre en place `vite.config.ts`, `package.json`, et `server.js`.
2.  **Refonte Serveur** : Adapter `server/index.ts` pour servir `dist/client` et gérer le fallback SPA.
3.  **Implémentation Pages** : Créer les pages avec le contenu "Suisse" et les placeholders.
4.  **Optimisation** : Appliquer les règles WCAG et SEO.
