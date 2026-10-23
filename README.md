# Portfolio — Mathéo Nguyen

Portfolio professionnel de **Mathéo Nguyen**, développeur backend (systèmes de
messagerie d'entreprise & architecture microservices).

- **Framework** : [Astro](https://astro.build) (sortie statique)
- **Hébergement** : [Cloudflare Pages](https://pages.cloudflare.com)
- **Formulaire de contact** : [Formspree](https://formspree.io)
- **Direction artistique** : consomme mon [design system](https://github.com/LiberiBg)
  personnel (tokens W3C DTCG, composants `ds-*`, thème clair/sombre, JetBrains
  Mono auto-hébergée).

## Démarrage rapide

Prérequis : **Node.js ≥ 20**.

```bash
npm install     # installe les dépendances
npm run dev     # serveur de développement sur http://localhost:4321
npm run build   # build de production dans dist/
npm run preview # prévisualise le build de production
```

## Structure

```
public/
  ds/                 Artefacts du design system (copiés depuis le dépôt design-system)
    tokens.css        Variables CSS (thème clair sur :root, sombre sur [data-theme="dark"])
    components.css     Composants ds-* (HTML/CSS pur)
    ds-components.js  Comportements (navbar, reveal, tilt) — amélioration progressive
    fonts.css + fonts/  JetBrains Mono auto-hébergée (OFL)
  styles/site.css     Mise en page du site (structure uniquement)
  _headers            En-têtes de cache Cloudflare Pages
src/
  layouts/BaseLayout.astro  Charge le design system + gestion du thème (anti-flash)
  components/Navbar.astro    Navbar ds-* + bascule de thème
  pages/index.astro          Page unique : hero, à propos, expériences, compétences, projets, contact
astro.config.mjs      Configuration Astro (output: static)
wrangler.toml         Configuration Cloudflare Pages
```

## Configurer le formulaire de contact (Formspree)

Le formulaire de contact envoie les messages via Formspree. **Avant le
déploiement**, remplace l'identifiant de démonstration :

1. Crée un compte sur [formspree.io](https://formspree.io) et un nouveau
   formulaire.
2. Copie l'**ID du formulaire** (ex. `xqkzabcd`).
3. Dans [`src/pages/index.astro`](src/pages/index.astro), remplace :

   ```js
   const FORMSPREE_ID = 'VOTRE_ID_FORMSPREE';
   ```

   par ton identifiant réel.
4. Rebuild (`npm run build`). À la première soumission, Formspree demande une
   confirmation par email.

Le formulaire inclut un champ honeypot anti-spam (`_gotcha`) et les champs
`name`, `email`, `message`.

## Mettre à jour le design system

Les artefacts dans `public/ds/` sont **copiés** depuis le dépôt `design-system`.
Pour les régénérer après une évolution du design system :

```bash
# Dans le dépôt design-system
npm run build
node dist/cli.js --tokens tokens --out dist

# Puis recopier les artefacts dans ce dépôt
cp design-system/dist/tokens.css          portfolio/public/ds/tokens.css
cp design-system/dist/ds-components.js    portfolio/public/ds/ds-components.js
cp design-system/src/components/components.css  portfolio/public/ds/components.css
cp design-system/src/components/fonts.css portfolio/public/ds/fonts.css
cp design-system/src/components/fonts/*.ttf portfolio/public/ds/fonts/
```

## Déploiement sur Cloudflare Pages

### Option A — via le tableau de bord (recommandé)

1. Pousse ce dépôt sur GitHub.
2. Sur [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
   → **Create** → **Pages** → **Connect to Git**.
3. Sélectionne ce dépôt et configure :
   - **Framework preset** : `Astro`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Node version** : `20` (lu depuis `.nvmrc`)
4. **Save and Deploy**. Chaque push sur `main` redéploie automatiquement.

### Option B — via Wrangler (CLI)

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name portfolio-matheo-nguyen
```

### Domaine personnalisé

Dans le projet Pages → **Custom domains**, ajoute ton domaine et suis les
instructions DNS.

## Accessibilité & performance

- Lien d'évitement, navigation au clavier, `aria-*` sur la navbar et les icônes.
- Thème clair/sombre avec préférence persistée et respect de
  `prefers-color-scheme` (sans flash au chargement).
- Les comportements (reveal, tilt) se dégradent proprement sans JavaScript et
  respectent `prefers-reduced-motion`.
- Polices auto-hébergées (pas de CDN tiers, RGPD-safe).

## Licence

Code du portfolio : usage personnel. La police JetBrains Mono est distribuée
sous SIL Open Font License 1.1 (voir `public/ds/fonts/OFL.txt`).
