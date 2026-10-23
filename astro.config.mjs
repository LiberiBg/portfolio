// @ts-check
import { defineConfig } from 'astro/config';

// Portfolio statique déployé sur Cloudflare Pages.
// Le formulaire de contact est géré par Formspree (pas de backend requis),
// donc une sortie statique suffit et maximise la fiabilité/performance.
export default defineConfig({
  output: 'static',
  site: 'https://portfolio.pages.dev',
  compressHTML: true,
});
