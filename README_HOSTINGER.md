# ROMUO VTC — Web App (PWA) — Déploiement Hostinger

Cette application est une PWA React + Vite + Tailwind. **Par défaut, c'est un frontend statique** : vous déployez uniquement le dossier **/dist**.

> Type d'hébergement Hostinger inconnu : suivez l'un des deux parcours ci-dessous.

---

## Parcours A — Hébergement Shared (statique)

### 1) Préparer la clé TomTom (sans .env)
1. Ouvrez le fichier :
   - `client/public/config.js`
2. Remplacez la valeur :
   - `TOMTOM_API_KEY: "VOTRE_CLE"`
3. (Après build) vous pourrez aussi modifier :
   - `dist/config.js`

### 2) Lancer en local (Windows)
```bash
npm install --include=dev
npm run dev
```
Ouvrez ensuite l’URL affichée (ex: `http://localhost:5173`).

### 3) Compiler (générer /dist)
```bash
npm run build
```
Vous obtenez un dossier **dist/** à la racine.

### 4) Déployer sur Hostinger (statique)
1. Dans Hostinger > Gestionnaire de fichiers, ouvrez :
   - `public_html/` (ou le dossier du sous-domaine)
2. **Uploadez uniquement le contenu de `dist/`**
3. Vérifiez que ces fichiers se trouvent bien à la racine du site :
   - `index.html`
   - `assets/`
   - `config.js`
   - `.htaccess`

---

## Parcours B — VPS/Cloud (Nginx + build statique)

### 1) Build
```bash
npm install --include=dev
npm run build
```

### 2) Déploiement
1. Copiez le dossier `dist/` vers votre serveur (ex: `/var/www/romuo/dist`).
2. Utilisez la config Nginx fournie :
   - `deploy/nginx/romuo.conf`
3. Redémarrez Nginx :
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 3) Healthcheck
- L'endpoint est servi par Nginx : `https://romuo.ch/health`

---

## Variables d'environnement (optionnel)
Un fichier `.env.example` est fourni si vous préférez injecter des variables au build :
- `VITE_TOMTOM_API_KEY`
- `VITE_GA_MEASUREMENT_ID`
- `VITE_API_BASE_URL`

---

## Restriction de domaine TomTom (si vous sécurisez la clé)
Ajoutez au minimum :
- `http://localhost:5173/*` (dev)
- `https://romuo.ch/*`
- `https://www.romuo.ch/*`
- `https://*.romuo.ch/*` (sous-domaines)

---

## Dépannage rapide
- **Message “Clé TomTom manquante”** :
  - Vérifiez `client/public/config.js` et relancez `npm run dev`
  - En production, vérifiez `dist/config.js` sur Hostinger
- **Erreur 403 TomTom** :
  - La clé n’a pas les droits sur **Search** et/ou **Routing**, ou elle est trop restreinte (domaines).
