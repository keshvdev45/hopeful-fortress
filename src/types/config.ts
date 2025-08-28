export type Language = 'en' | 'hi';

export interface SiteTheme {
  primary: string;
  accent: string;
  fonts: {
    heading: string;
    body: string;
  };
}

export interface HeroVariant {
  headline: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface DonationTier {
  amount: number;
  label: string;
  recurring: boolean;
  impact: string;
}

export interface Program {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  stats: {
    beneficiaries: number;
    locations: number;
    metric: string;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rsvp: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface ImpactStat {
  label: string;
  value: number;
  unit: string;
}

export interface SiteConfig {
  site: {
    name: string;
    tagline: string;
    defaultLanguage: Language;
    languages: Language[];
    theme: SiteTheme;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  hero: {
    variant: string;
    variants: Record<string, HeroVariant>;
    heroImage: string;
    alt: string;
  };
  donation: {
    currency: string;
    tiers: DonationTier[];
    stripeCheckout: {
      enabled: boolean;
      serverEndpoint: string;
    };
  };
  programs: Program[];
  events: Event[];
  team: TeamMember[];
  impact: {
    totalBeneficiaries: number;
    villagesReached: number;
    programsActive: number;
    volunteersActive: number;
    stats: ImpactStat[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
  privacy: {
    dataRetentionYears: number;
    contactEmail: string;
  };
}