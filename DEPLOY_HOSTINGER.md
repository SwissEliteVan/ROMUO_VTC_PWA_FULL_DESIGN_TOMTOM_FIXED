# Guide de Déploiement Hostinger (ROMUO VTC)

Ce guide propose **deux parcours** en fonction de votre hébergement Hostinger. Si vous ne connaissez pas le type, choisissez **Shared** si vous n'avez pas d'accès SSH/Node.js et **VPS/Cloud** si vous avez un serveur complet.

---

## Parcours A — Hébergement Shared (statique)

### 1) Pré-requis
- Accès au Gestionnaire de fichiers Hostinger.
- Aucun backend à déployer (PWA statique).

### 2) Build local
```bash
npm install --include=dev
npm run build
```

### 3) Upload
1. Ouvrez `public_html/` (ou le dossier du sous-domaine).
2. **Uploadez uniquement le contenu de `dist/`**.
3. Vérifiez la présence : `index.html`, `assets/`, `config.js`, `.htaccess`.

### 4) Healthcheck
- Vérifiez l'accès à `https://romuo.ch/health` via l'entrée Nginx si vous êtes en VPS/Cloud.
- En Shared, un fichier `health` peut être ajouté si besoin côté `dist/`.

---

## Parcours B — VPS/Cloud (Nginx)

### 1) Prérequis
- Node.js 18+ (recommandé 20 LTS).
- Nginx installé.

### 2) Build
```bash
npm install --include=dev
npm run build
```

### 3) Déploiement
1. Copiez `dist/` vers `/var/www/romuo/dist`.
2. Activez la configuration Nginx fournie :
   - `deploy/nginx/romuo.conf`
3. Redémarrez Nginx :
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 4) Optimisations serveur
- Cache long pour assets statiques.
- Gzip activé.
- Headers de sécurité (X-Content-Type-Options, Referrer-Policy, etc.).

---

## Variables d'environnement
Un fichier `.env.example` est fourni pour centraliser la configuration. Les variables `VITE_*` sont injectées au build.

---

## SEO & Config métier
- **GA4** : remplacer `VITE_GA_MEASUREMENT_ID` ou ajuster avant build.
- **TomTom** : éditer `client/public/config.js` ou `dist/config.js`.

---

## Dépannage
- **Erreur 500** : vérifier les logs Nginx.
- **Assets 404** : vérifier que `dist/` est bien servi en racine.
- **Clé TomTom invalide** : vérifier les domaines autorisés dans le portail TomTom.
