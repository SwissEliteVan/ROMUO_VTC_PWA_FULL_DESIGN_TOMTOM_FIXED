# Guide de Déploiement Hostinger (ROMUO VTC)

Ce guide détaille la procédure pour déployer l'application **ROMUO VTC** sur un hébergement **Hostinger Business** (ou tout VPS Node.js).

## 1. Prérequis Hostinger

Assurez-vous d'avoir accès à votre panneau hPanel et d'avoir activé un environnement **Node.js**.

*   **Version Node.js** : 18 ou supérieur (recommandé : 20 LTS).
*   **Base de données** : Pas nécessaire pour cette version (simulation frontend), mais prête pour une future connexion PostgreSQL/MySQL.

## 2. Préparation des Fichiers

L'archive que vous avez téléchargée contient deux dossiers principaux après extraction :

*   `dist/` : Contient le build de production (client + serveur).
*   `package.json` : Le fichier de configuration des dépendances.
*   `server.js` : Le point d'entrée du serveur Node.js.

## 3. Installation sur le Serveur

1.  **Upload** :
    *   Connectez-vous via FTP ou le Gestionnaire de Fichiers Hostinger.
    *   Allez dans le dossier `public_html` (ou le dossier racine de votre domaine).
    *   Supprimez les fichiers par défaut s'il y en a.
    *   Téléversez **tout le contenu** de l'archive du projet.

2.  **Installation des Dépendances** :
    *   Dans hPanel, ouvrez le **Terminal** (ou connectez-vous via SSH).
    *   Naviguez vers le dossier : `cd public_html`
    *   Lancez l'installation : `npm install --production`

## 4. Démarrage de l'Application

1.  **Configuration Node.js (hPanel)** :
    *   Allez dans la section **Site Web > Node.js**.
    *   **Application Startup File** : `server.js`
    *   **Application Root** : `/public_html` (ou votre chemin)
    *   Cliquez sur **Save** puis **Restart**.

2.  **Vérification** :
    *   Ouvrez votre navigateur et allez sur votre domaine (ex: `romuo.ch`).
    *   L'application doit se charger instantanément.

## 5. Configuration Post-Déploiement

### Google Analytics 4
*   Ouvrez le fichier `client/dist/assets/index-*.js` (ou modifiez `client/src/lib/analytics.ts` avant le build).
*   Recherchez `G-XXXXXXXXXX` et remplacez-le par votre ID de mesure réel.

### SEO & Meta Tags
*   Les balises meta sont gérées dynamiquement. Pour modifier les textes par défaut, éditez `client/src/components/SEO.tsx` avant de rebuilder.

### Numéro de Téléphone
*   Le numéro `076 842 89 98` est codé en dur dans `client/src/pages/Contact.tsx` et `client/src/components/Chat.tsx`.

## 6. Dépannage

*   **Erreur 500** : Vérifiez les logs dans hPanel. Assurez-vous que `npm install` s'est bien terminé.
*   **Page Blanche** : Vérifiez la console du navigateur (F12). Si des fichiers JS/CSS manquent (404), vérifiez que le dossier `dist/client` est bien servi par `server.js`.

---

**Support Technique** : Pour toute modification majeure, contactez votre développeur ou référez-vous à la documentation React/Vite.
