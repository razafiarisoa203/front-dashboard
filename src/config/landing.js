import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineAcademicCap,
  HiOutlineArrowPath,
  HiOutlineBeaker,
  HiOutlineBolt,
  HiOutlineBuildingLibrary,
  HiOutlineChartBarSquare,
  HiOutlineCircleStack,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCloudArrowDown,
  HiOutlineCog6Tooth,
  HiOutlineCpuChip,
  HiOutlineDocumentArrowDown,
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineFingerPrint,
  HiOutlineGlobeAlt,
  HiOutlineLightBulb,
  HiOutlineMap,
  HiOutlineMapPin,
  HiOutlinePresentationChartLine,
  HiOutlineRectangleStack,
  HiOutlineServerStack,
  HiOutlineSignal,
  HiOutlineSquare3Stack3D,
  HiOutlineSun,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'

export const site = {
  appName: 'GeoInfra Toliara',
  tagline: 'Tableau de bord cartographique des infrastructures urbaines',
  academicYear: '2025 – 2026',
  institution: 'Nom de l’établissement',
  faculty: 'Faculté / École',
  department: 'Département de Géographie et Systèmes d’Information',
  supervisor: 'Nom de l’encadrant',
  author: 'Nom de l’étudiant',
  email: 'contact@exemple.mg',
  version: 'Prototype v0.1',
}

export const hero = {
  eyebrow: 'Mémoire de fin d’études · Toliara I, Madagascar',
  title: 'Conception et optimisation d’un tableau de bord cartographique',
  subtitle: 'Faciliter la prise de décision sur les infrastructures urbaines',
  description:
    'Un tableau de bord WebGIS qui centralise, cartographie et rend lisible l’état des infrastructures de Toliara I — réseau d’eau, assainissement, voirie, énergie et espaces publics — afin d’éclairer le choix et la priorisation des interventions urbaines.',
  primaryCta: { label: 'Accéder au tableau de bord', href: '#tableau-de-bord' },
  secondaryCta: { label: 'Voir la méthodologie', href: '#methodologie' },
  highlights: [
    {
      label: 'Périmètre d’étude',
      value: 'Toliara I',
      description: 'Atsimo-Andrefana, Madagascar',
      icon: HiOutlineMapPin,
    },
    {
      label: 'Sources de données',
      value: 'SIG et terrain',
      description: 'Données ouvertes, levés GPS, documents administratifs',
      icon: HiOutlineCloudArrowDown,
    },
    {
      label: 'Socle technique',
      value: 'React et WebGIS',
      description: 'Interface web et rendu cartographique interactif',
      icon: HiOutlineCpuChip,
    },
    {
      label: 'État d’avancement',
      value: 'En cours',
      description: 'Prototype fonctionnel en construction',
      icon: HiOutlinePresentationChartLine,
    },
  ],
}

export const context = {
  id: 'contexte',
  eyebrow: 'Contexte de l’étude',
  title: 'Des infrastructures sous tension dans un territoire aride',
  description:
    'Toliara I concentre une urbanisation rapide et des contraintes climatiques sévères. La raréfaction de la ressource en eau, l’étalement urbain et la faiblesse des réseaux enterrés rendent la gestion du territoire difficile sans une vision cartographique partagée.',
  items: [
    {
      title: 'Rareté de la ressource en eau',
      description:
        'L’aridité du climat et la baisse des nappes obligent la ville à organiser une ressource limitée, souvent par pompages et forages dispersés.',
      icon: HiOutlineBeaker,
    },
    {
      title: 'Assainissement et drainage',
      description:
        'Faible taux de raccordement à un réseau collectif et drainage des eaux de pluie mal organisé, avec des risques en saison cyclonique.',
      icon: HiOutlineSun,
    },
    {
      title: 'Voirie et mobilité',
      description:
        'Voirie dégradée, pistes non bitumées et accès difficultosés dans les quartiers périphériques et les zones d’habitat spontané.',
      icon: HiOutlineWrenchScrewdriver,
    },
    {
      title: 'Énergie et réseaux',
      description:
        'Réseau électrique et de télécommunication à couvrir progressivement, à articuler avec le tracé des autres réseaux.',
      icon: HiOutlineBolt,
    },
    {
      title: 'Extension urbaine non maîtrisée',
      description:
        'L’urbanisation progresse plus vite que la planification, ce qui complique la programmation des réseaux et la gestion du foncier.',
      icon: HiOutlineRectangleStack,
    },
    {
      title: 'Littoral et risques',
      description:
        'Un littoral exposé à l’érosion et aux remontées marines, à croiser avec les zones d’habitat et les équipements stratégiques.',
      icon: HiOutlineGlobeAlt,
    },
  ],
}

export const objectives = {
  id: 'objectifs',
  eyebrow: 'Problématique et objectifs',
  question:
    'Comment un tableau de bord cartographique peut-il améliorer la prise de décision sur les infrastructures urbaines à Toliara I ?',
  items: [
    {
      title: 'Centraliser les données',
      description:
        'Réunir dans une base unique les informations d’infrastructure dispersées entre services administratifs, opérateurs et levés de terrain.',
      icon: HiOutlineCircleStack,
    },
    {
      title: 'Construire une base cartographique',
      description:
        'Produire une base de données géoréférencée et normalisée, interrogeable couche par couche dans un SIG.',
      icon: HiOutlineMap,
    },
    {
      title: 'Rendre l’information lisible',
      description:
        'Restituer les données sous forme d’indicateurs et de cartes lisibles par des décideurs, sans compétence technique.',
      icon: HiOutlineEye,
    },
    {
      title: 'Optimiser la priorisation',
      description:
        'Aider à arbitrer les interventions en comparant les zones selon leur niveau de service et leur population desservie.',
      icon: HiOutlineClipboardDocumentCheck,
    },
  ],
}

export const dashboard = {
  id: 'tableau-de-bord',
  eyebrow: 'Le livrable',
  title: 'Un tableau de bord cartographique',
  description:
    'L’application web centralise l’information, la rend visuelle et permet de filtrer, comparer et exporter les données d’infrastructure par zone et par réseau.',
  features: [
    {
      title: 'Carte interactive multi-couches',
      description:
        'Affichage superposable des réseaux d’eau, d’assainissement, de voirie et d’équipements, avec activation sélective des couches.',
      icon: HiOutlineSquare3Stack3D,
    },
    {
      title: 'Filtres par infrastructure',
      description:
        'Restreindre l’analyse à un réseau ou à un type d’équipement pour isoler les zones à traiter.',
      icon: HiOutlineAdjustmentsHorizontal,
    },
    {
      title: 'Indicateurs de couverture',
      description:
        'Mesurer le taux de service et la population desservie par réseau, calculé zone par zone.',
      icon: HiOutlineChartBarSquare,
    },
    {
      title: 'Détection des points critiques',
      description:
        'Mettre en évidence les secteurs cumulant faible couverture, forte population et risque exposé.',
      icon: HiOutlineSignal,
    },
    {
      title: 'Comparaison temporelle',
      description:
        'Confronter plusieurs campagnes de levés pour mesurer l’évolution du réseau et des zones desservies.',
      icon: HiOutlineArrowPath,
    },
    {
      title: 'Exports et rapports',
      description:
        'Extraire les données filtrées au format CSV et produire une synthèse imprimable pour les réunions de programmation.',
      icon: HiOutlineDocumentArrowDown,
    },
  ],
}

export const layers = {
  id: 'couches',
  eyebrow: 'Base cartographique',
  title: 'Les couches mobilisées',
  description:
    'Chaque couche correspond à un réseau ou à un zonage suivi séparément, puis superposable pour une lecture croisée.',
  items: [
    { name: 'Réseau d’eau potable', color: '#0ea5e9' },
    { name: 'Réseau d’assainissement', color: '#6366f1' },
    { name: 'Voirie et pistes', color: '#f59e0b' },
    { name: 'Zones d’habitat', color: '#10b981' },
    { name: 'Équipements et bâtiments publics', color: '#ec4899' },
    { name: 'Zones à risque', color: '#ef4444' },
  ],
  note: 'Tracés normalisés sur le référentiel projeté local, puis convertis pour l’affichage web.',
}

export const indicators = {
  id: 'indicateurs',
  eyebrow: 'Aide à la décision',
  title: 'Les indicateurs restitués',
  description:
    'Chaque indicateur est calculé par zone d’analyse à partir des couches, ce qui permet de comparer les territoires entre eux.',
  items: [
    'Taux de couverture en eau potable',
    'Taux de raccordement à l’assainissement',
    'Densité et état de la voirie',
    'Population desservie par réseau',
    'Part des zones exposées à un risque',
    'Densité des équipements publics',
  ],
}

export const methodology = {
  id: 'methodologie',
  eyebrow: 'Démarche',
  title: 'De la donnée brute à la carte',
  description:
    'Le travail suit une chaîne continue : documenter, relever, structurer dans un SIG, analyser, puis restituer dans l’application web.',
  steps: [
    {
      title: 'Revue documentaire',
      description:
        'Collecte des sources existantes : documents administratifs, plans d’urbanisme, données ouvertes et travaux antérieurs.',
      icon: HiOutlineBuildingLibrary,
    },
    {
      title: 'Levés de terrain',
      description:
        'Relevés GPS des équipements et des tracés, complétés par des entretiens auprès des acteurs locaux et des habitants.',
      icon: HiOutlineFingerPrint,
    },
    {
      title: 'Traitement SIG',
      description:
        'Numérisation, nettoyage topologique, projection dans le référentiel local et export vers des formats web.',
      icon: HiOutlineCog6Tooth,
    },
    {
      title: 'Analyse spatiale',
      description:
        'Calcul des indicateurs par zone, détection des écarts de couverture et construction des scénarios de priorisation.',
      icon: HiOutlineLightBulb,
    },
    {
      title: 'Développement web',
      description:
        'Conception de l’interface, de la carte interactive et des vues de restitution à destination des décideurs.',
      icon: HiOutlineCpuChip,
    },
  ],
}

export const stack = {
  groups: [
    {
      title: 'Systèmes d’information géographique',
      icon: HiOutlineMap,
      items: ['QGIS', 'PostgreSQL / PostGIS', 'GeoJSON', 'Shapefile (SHP)'],
    },
    {
      title: 'Données et sources',
      icon: HiOutlineCloudArrowDown,
      items: [
        'OpenStreetMap (OSM)',
        'Open data Madagascar',
        'Levés de terrain (GPS)',
        'Documents administratifs',
      ],
    },
    {
      title: 'Interface web',
      icon: HiOutlineCpuChip,
      items: ['React', 'Vite', 'TailwindCSS', 'React Router', 'Recharts'],
    },
    {
      title: 'Services et déploiement',
      icon: HiOutlineServerStack,
      items: ['API REST', 'Node.js', 'Git', 'Hébergement web'],
    },
  ],
}

export const scope = {
  id: 'perimetre',
  eyebrow: 'Périmètre',
  title: 'Toliara I, commune urbaine du littoral',
  description:
    'La zone d’étude correspond au périmètre urbain de Toliara I, délimité pour permettre une comparaison des quartiers entre eux.',
  items: [
    'Délimitation administrative de la commune urbaine',
    'Zones urbaines denses et zones périphériques',
    'Front de mer et zones exposées',
    'Zones d’habitat spontané à documenter',
    'Points de service : forages, bornes, stations de pompage',
  ],
}

export const contact = {
  id: 'contact',
  title: 'Un prototype en cours de construction',
  description:
    'Le tableau de bord est en phase de développement. Les jeux de données définitifs et les démonstrations seront intégrés au fur et à mesure des validations sur le terrain.',
  items: [
    { label: 'Auteur', value: site.author, icon: HiOutlineUsers },
    { label: 'Encadrement', value: site.supervisor, icon: HiOutlineBuildingLibrary },
    { label: 'Établissement', value: site.institution, icon: HiOutlineAcademicCap },
    { label: 'Contact', value: site.email, icon: HiOutlineEnvelope },
  ],
}

export const sectionNav = [
  { href: '#contexte', label: 'Contexte' },
  { href: '#objectifs', label: 'Objectifs' },
  { href: '#tableau-de-bord', label: 'Tableau de bord' },
  { href: '#couches', label: 'Couches' },
  { href: '#indicateurs', label: 'Indicateurs' },
  { href: '#methodologie', label: 'Méthodologie' },
  { href: '#perimetre', label: 'Périmètre' },
]
