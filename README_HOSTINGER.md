# ROMUO VTC — Web App (PWA) — Déploiement Hostinger (statique)

Ce projet est une application React + Vite + Tailwind, installable comme PWA.
Il n’y a **pas** de backend à déployer sur Hostinger : vous uploadez uniquement le dossier **/dist**.

---

## 1) Où mettre la clé TomTom (sans .env)

1. Ouvrez le fichier :

- `client/public/config.js`

2. Remplacez la valeur :

- `TOMTOM_API_KEY: "VOTRE_CLE"`

3. (Déploiement) Après `npm run build`, vous pourrez aussi modifier directement :

- `dist/config.js`

---

## 2) Lancer en local (Windows)

Ouvrez un terminal **dans le dossier du projet** (là où se trouve `package.json`), puis :

```bash
npm install --include=dev
npm run dev
```

Ouvrez ensuite l’URL affichée (ex: `http://localhost:5173`).

---

## 3) Compiler (générer /dist)

Toujours à la racine du projet :

```bash
npm run build
```

Vous obtenez un dossier **dist/** à la racine.

---

## 4) Déployer sur Hostinger (statique)

1. Dans Hostinger > Gestionnaire de fichiers, ouvrez :
- `public_html/` (ou le dossier du sous-domaine)

2. **Uploadez uniquement le contenu de `dist/`**  
   (NE PAS uploader `node_modules`, sinon vous aurez des dizaines de milliers de fichiers.)

3. Vérifiez que ces fichiers se trouvent bien à la racine du site :
- `index.html`
- `assets/`
- `config.js`
- `.htaccess`

---

## 5) Restriction de domaine TomTom (si vous sécurisez la clé)

Dans le portail TomTom, ajoutez au minimum :

- `http://localhost:5173/*` (dev)
- `https://romuo.ch/*`
- `https://www.romuo.ch/*`
- `https://*.romuo.ch/*` (si sous-domaines)

---

## Dépannage rapide

- Message “Clé TomTom manquante” :
  - Vérifiez `client/public/config.js` et relancez `npm run dev`
  - En production, vérifiez `dist/config.js` sur Hostinger

- Erreur 403 TomTom :
  - La clé n’a pas les droits sur **Search** et/ou **Routing**, ou elle est trop restreinte (domaines).
