// ---------------------------------------------------------------------------
// Contenu bilingue du portfolio (FR / EN).
// Source unique de vérité : les pages index.astro (FR) et en/index.astro (EN)
// consomment `content[lang]`. Édite ici pour mettre à jour les deux langues.
// ---------------------------------------------------------------------------

export type Lang = 'fr' | 'en';

export const languages: Record<Lang, string> = {
  fr: 'Français',
  en: 'English',
};

// Préfixe d'URL par langue (fr = racine, en = /en).
export function localizedPath(lang: Lang, hash = ''): string {
  const base = lang === 'fr' ? '/' : '/en/';
  return hash ? `${base}${hash}` : base;
}

interface Experience {
  role: string;
  org: string;
  place: string;
  period: string;
  points: string[];
  tags: string[];
}

interface Education {
  title: string;
  period: string;
  desc: string;
}

interface SkillGroup {
  group: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string | null;
}

interface Content {
  htmlLang: string;
  title: string;
  description: string;
  nav: {
    about: string;
    education: string;
    experience: string;
    skills: string;
    projects: string;
    contact: string;
    menu: string;
    themeToggle: string;
    langLabel: string;
  };
  skip: string;
  hero: {
    title: string;
    subtitle: string;
    ctaContact: string;
    ctaProjects: string;
  };
  about: {
    title: string;
    lead: string;
  };
  educationSection: { title: string };
  experienceSection: { title: string };
  skillsSection: { title: string };
  projectsSection: { title: string; repoLink: string };
  contact: {
    title: string;
    lead: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    or: string;
  };
  footer: string;
  experiences: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
}

const sharedTags = {
  laposte1: ['Java 21', 'Spring Boot', 'Kafka'],
  laposte2: ['Python', 'Robot Framework', 'Kafka'],
  laposte3: ['PowerApps', 'Low-code'],
  ds: ['TypeScript', 'DTCG', 'MCP'],
  kafka: ['Kafka', 'Spring Boot', 'Java 21'],
  homelab: ['Linux', 'Self-hosting', 'SysAdmin'],
};

export const content: Record<Lang, Content> = {
  fr: {
    htmlLang: 'fr',
    title: 'Mathéo Nguyen — Développeur Backend',
    description:
      "Portfolio de Mathéo Nguyen, développeur backend spécialisé en systèmes de messagerie d'entreprise et architecture microservices.",
    nav: {
      about: 'À propos',
      education: 'Formation',
      experience: 'Expériences',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact',
      menu: 'Menu',
      themeToggle: 'Basculer le thème clair/sombre',
      langLabel: 'Langue',
    },
    skip: 'Aller au contenu',
    hero: {
      title: 'Mathéo Nguyen',
      subtitle:
        "Développeur backend — systèmes de messagerie d'entreprise & architecture microservices. Je construis des services Kafka fiables à haut débit chez La Poste, en parallèle de mon cursus ingénieur à l'ESIEA.",
      ctaContact: 'Me contacter',
      ctaProjects: 'Voir les projets',
    },
    about: {
      title: 'À propos',
      lead: "Ingénieur backend passionné par les systèmes de messagerie d'entreprise et les architectures microservices. Je développe actuellement des solutions Kafka en production chez La Poste tout en préparant mon diplôme d'ingénieur à l'ESIEA.",
    },
    educationSection: { title: 'Formation' },
    experienceSection: { title: 'Expériences' },
    skillsSection: { title: 'Compétences' },
    projectsSection: { title: 'Projets', repoLink: 'Voir le dépôt →' },
    contact: {
      title: 'Contact',
      lead: "Un projet, une opportunité d'alternance ou simplement envie d'échanger ? Écris-moi via ce formulaire.",
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      email: 'Email',
      emailPlaceholder: 'vous@exemple.com',
      message: 'Message',
      messagePlaceholder: 'Votre message',
      submit: 'Envoyer',
      sending: 'Envoi…',
      success: 'Merci ! Votre message a bien été envoyé.',
      error: "Une erreur est survenue. Réessayez ou écrivez-moi directement par email.",
      or: 'Ou directement :',
    },
    footer: 'Construit avec Astro et mon design system.',
    experiences: [
      {
        role: 'Développeur Backend — Alternance',
        org: 'La Poste',
        place: 'Issy-les-Moulineaux',
        period: 'Sept. 2024 – Sept. 2027',
        points: [
          "Conception et déploiement de modules Kafka pour le traitement de données à haut débit entre systèmes d'entreprise (Spring Boot, Java 21).",
          "Implémentation de solutions de messagerie scalables en production, avec optimisation des performances et de la fiabilité.",
          "Collaboration avec les équipes de développement pour garantir l'intégration et le respect des standards d'architecture.",
        ],
        tags: sharedTags.laposte1,
      },
      {
        role: "Ingénieur Automatisation de Tests — Alternance",
        org: 'La Poste',
        place: 'Issy-les-Moulineaux',
        period: 'Sept. 2023 – Sept. 2024',
        points: [
          "Développement et maintenance de frameworks de tests automatisés (Python, Robot Framework) pour des applications d'entreprise.",
          "Tests automatisés de systèmes de messagerie Kafka : fiabilité et intégrité des données.",
          "Création et exécution de suites de tests complètes validant fonctionnalités et performances.",
        ],
        tags: sharedTags.laposte2,
      },
      {
        role: 'Développeur PowerApps — Stage',
        org: 'La Poste',
        place: 'Issy-les-Moulineaux',
        period: 'Avr. 2023 – Juil. 2023',
        points: [
          "Développement d'applications métier répondant à des besoins de processus et contribution aux initiatives de transformation numérique.",
        ],
        tags: sharedTags.laposte3,
      },
    ],
    education: [
      {
        title: "ESIEA — École d'ingénieurs (spécialisation Génie Logiciel)",
        period: 'Sept. 2024 – Sept. 2027 (prévu) · Paris',
        desc: "Cursus ingénieur niveau master, Sciences et Technologies du Numérique.",
      },
      {
        title: 'BUT Informatique — IUT de Montreuil',
        period: 'Sept. 2021 – Juin 2024 · Montreuil',
        desc: 'Licence en informatique (Bachelor of Science).',
      },
      {
        title: 'Baccalauréat STI2D (SIN) — Lycée La Martinière Monplaisir',
        period: 'Juin 2021 · Lyon',
        desc: "Systèmes d'Information et Numérique.",
      },
    ],
    skills: [
      {
        group: 'Langages',
        items: ['Java 21', 'Python', 'JavaScript', 'SQL', 'Bash', 'PHP', 'HTML', 'CSS'],
      },
      {
        group: 'Frameworks & Outils',
        items: ['Spring Boot', 'Angular', 'Symfony', 'Vue.js', 'Bootstrap', 'Kafka', 'Jenkins', 'GitHub Actions', 'SonarQube'],
      },
      {
        group: 'Bases de données',
        items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'],
      },
      {
        group: 'Langues',
        items: ['Français (natif)', 'Anglais (B2)', 'Allemand (B1)'],
      },
    ],
    projects: [
      {
        title: 'Design System piloté par tokens',
        description:
          "Design system framework-agnostique piloté par des design tokens W3C DTCG : pipeline de build pur compilant les tokens en CSS/JSON/JS, serveur MCP en lecture seule et documentation vivante. Ce portfolio en est une application.",
        tags: sharedTags.ds,
        href: 'https://github.com/LiberiBg',
      },
      {
        title: 'Modules de messagerie Kafka',
        description:
          "Modules de traitement de données à haut débit en production chez La Poste, bâtis sur Kafka et Spring Boot avec un fort accent sur la fiabilité et l'observabilité.",
        tags: sharedTags.kafka,
        href: null,
      },
      {
        title: 'Homelab & auto-hébergement',
        description:
          "Projets d'homeserver et d'administration système : services auto-hébergés, automatisation et apprentissage par la pratique. Terrain de jeu pour l'infra et les ops.",
        tags: sharedTags.homelab,
        href: null,
      },
    ],
  },

  en: {
    htmlLang: 'en',
    title: 'Mathéo Nguyen — Backend Developer',
    description:
      'Portfolio of Mathéo Nguyen, backend developer specialized in enterprise messaging systems and microservices architecture.',
    nav: {
      about: 'About',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Menu',
      themeToggle: 'Toggle light/dark theme',
      langLabel: 'Language',
    },
    skip: 'Skip to content',
    hero: {
      title: 'Mathéo Nguyen',
      subtitle:
        'Backend developer — enterprise messaging systems & microservices architecture. I build reliable, high-throughput Kafka services at La Poste while pursuing my engineering degree at ESIEA.',
      ctaContact: 'Get in touch',
      ctaProjects: 'View projects',
    },
    about: {
      title: 'About',
      lead: 'Backend engineer passionate about enterprise messaging systems and microservices architecture. I currently develop production Kafka solutions at La Poste while completing my engineering degree at ESIEA.',
    },
    educationSection: { title: 'Education' },
    experienceSection: { title: 'Experience' },
    skillsSection: { title: 'Skills' },
    projectsSection: { title: 'Projects', repoLink: 'View repository →' },
    contact: {
      title: 'Contact',
      lead: 'A project, an apprenticeship opportunity, or just want to chat? Reach out through this form.',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      message: 'Message',
      messagePlaceholder: 'Your message',
      submit: 'Send',
      sending: 'Sending…',
      success: 'Thanks! Your message has been sent.',
      error: 'Something went wrong. Please try again or email me directly.',
      or: 'Or directly:',
    },
    footer: 'Built with Astro and my own design system.',
    experiences: [
      {
        role: 'Backend Application Developer — Apprenticeship',
        org: 'La Poste',
        place: 'Issy-les-Moulineaux, France',
        period: 'Sep 2024 – Sep 2027',
        points: [
          'Designed and deployed Kafka modules for high-throughput data processing across enterprise systems (Spring Boot, Java 21).',
          'Implemented scalable messaging solutions in production, optimizing for performance and reliability.',
          'Collaborated with development teams to ensure integration and adherence to architecture standards.',
        ],
        tags: sharedTags.laposte1,
      },
      {
        role: 'Test Automation Engineer — Apprenticeship',
        org: 'La Poste',
        place: 'Issy-les-Moulineaux, France',
        period: 'Sep 2023 – Sep 2024',
        points: [
          'Developed and maintained automated test frameworks (Python, Robot Framework) for enterprise applications.',
          'Automated testing of Kafka messaging systems, ensuring reliability and data integrity.',
          'Created and executed comprehensive test suites validating functionality and performance.',
        ],
        tags: sharedTags.laposte2,
      },
      {
        role: 'PowerApps Developer — Internship',
        org: 'La Poste',
        place: 'Issy-les-Moulineaux, France',
        period: 'Apr 2023 – Jul 2023',
        points: [
          'Developed business applications addressing process requirements and contributing to digital transformation initiatives.',
        ],
        tags: sharedTags.laposte3,
      },
    ],
    education: [
      {
        title: 'ESIEA — Graduate School of Engineering (Software Engineering)',
        period: 'Sep 2024 – Sep 2027 (expected) · Paris',
        desc: "Master's-level engineering program in Digital Sciences and Technologies.",
      },
      {
        title: 'BSc in Computer Science (BUT Informatique) — IUT de Montreuil',
        period: 'Sep 2021 – Jun 2024 · Montreuil',
        desc: 'Bachelor of Science in Computer Science.',
      },
      {
        title: 'French Baccalaureate STI2D (SIN) — Lycée La Martinière Monplaisir',
        period: 'Jun 2021 · Lyon',
        desc: 'Information Systems and Digital Technologies.',
      },
    ],
    skills: [
      {
        group: 'Languages',
        items: ['Java 21', 'Python', 'JavaScript', 'SQL', 'Bash', 'PHP', 'HTML', 'CSS'],
      },
      {
        group: 'Frameworks & Tools',
        items: ['Spring Boot', 'Angular', 'Symfony', 'Vue.js', 'Bootstrap', 'Kafka', 'Jenkins', 'GitHub Actions', 'SonarQube'],
      },
      {
        group: 'Databases',
        items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'],
      },
      {
        group: 'Spoken languages',
        items: ['French (native)', 'English (B2)', 'German (B1)'],
      },
    ],
    projects: [
      {
        title: 'Token-driven Design System',
        description:
          'A framework-agnostic design system driven by W3C DTCG design tokens: a pure build pipeline compiling tokens to CSS/JSON/JS, a read-only MCP server, and living documentation. This portfolio is an application of it.',
        tags: sharedTags.ds,
        href: 'https://github.com/LiberiBg',
      },
      {
        title: 'Kafka Messaging Modules',
        description:
          'High-throughput data-processing modules running in production at La Poste, built on Kafka and Spring Boot with a strong focus on reliability and observability.',
        tags: sharedTags.kafka,
        href: null,
      },
      {
        title: 'Homelab & self-hosting',
        description:
          'Homeserver and system administration projects: self-hosted services, automation, and hands-on learning. A playground for infra and ops.',
        tags: sharedTags.homelab,
        href: null,
      },
    ],
  },
};

// Identifiant Formspree partagé par les deux langues.
// Endpoint : https://formspree.io/f/myeeygbg
export const FORMSPREE_ID = 'myeeygbg';
