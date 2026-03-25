import type { CallToAction } from "./cta";

export interface SanityBlock {
  _key: string;
  _type: "block";
  children: Array<unknown>;
  markDefs: Array<unknown>;
  style: string;
}

export interface SanityFontAwesomeIcon {
  iconStyle: string;
  iconName: string;
}

export interface SanityCallToAction {
  key: string;
  _type: "menuItem";
  label: string;
  url: string;
  icon: SanityFontAwesomeIcon;
}

export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface SanitySlug {
  _type: string;
  current: string;
}

export interface SanitySEO {
  common: SanityCommonSEO;
  twitter: SanityTwitterSEO;
  openGraph: SanityOpenGraphSEO;
}

export interface SanityCommonSEO {
  _type: string;
  author?: string;
  canonicalURL?: string;
  description?: string;
  keywords?: string[];
  title?: string;
  type?: string;
}

export interface SanityTwitterSEO {
  _type: string;
  twitterCard?: string;
  twitterDescription?: string;
  twitterImage?: SanityImage;
  twitterTitle?: string;
  twitterUrl?: string;
}

export interface SanityOpenGraphSEO {
  _type: string;
  ogDescription?: string;
  ogImage?: SanityImage;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
}

export interface SanityColor {
  alpha: number;
  hex: string;
  rgb: {
    _type: string;
    a: number;
    r: number;
    g: number;
    b: number;
  };
  hsv: {
    _type: string;
    a: number;
    h: number;
    s: number;
    v: number;
  };
  hsl: {
    _type: string;
    a: number;
    h: number;
    s: number;
    l: number;
  };
}

export interface WrestlingSiteSettings {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  alternateLogo?: SanityImage;
  favicon?: SanityImage;
  logo?: SanityImage;
  menuItems?: SanityCallToAction[];
  seo?: SanitySEO;
  socialNetworkItems?: SanityCallToAction[];
  title?: string;
  description?: string;
}

export interface WrestlingHomePage {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  seo: SanitySEO;
  pageTitle?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroContent?: SanityBlock[];
  heroBackgroundImage?: SanityImage;
  accolades?: WrestlingAccolade[];
}

export interface WrestlingAboutPage {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  seo: SanitySEO;
  pageTitle?: string;
  title?: string;
  subtitle?: string;
  content?: SanityBlock[];
  gallery?: SanityImage[];
  featuredImage?: SanityImage;
}

export interface WrestlingMatchesPage {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  seo: SanitySEO;
  title?: string;
  content?: SanityBlock[];
  pageTitle?: string;
}

export interface WrestlingMatch {
  slug: SanitySlug;
  matchTitle: string;
  matchDate: string;
  matchDescription: SanityBlock[];
  matchImages?: SanityImage[];
}

export interface WrestlingGalleryPage {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  seo: SanitySEO;
  pageTitle?: string;
  title?: string;
  content?: SanityBlock[];
  galleryImages?: SanityImage[];
}

export interface WrestlingEventsPage {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  seo: SanitySEO;
  pageTitle?: string;
  title?: string;
  content?: SanityBlock[];
  upcomingEvents?: WrestlingEvent[];
}

export interface WrestlingEvent {
  eventTitle: string;
  eventStartDate: string;
  eventEndDate?: string;
  eventLocation?: string;
  eventUrl?: string;
  eventDescription: SanityBlock[];
}

export interface Side {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  title?: string;
  subtitle?: string;
  content?: SanityBlock[];
  image?: SanityImage;
  backgroundImage?: SanityImage;
  route: CallToAction;
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
}

export interface RootSiteSettings {
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _originalId?: string;
  id: string;
  rev: string;
  _type: string;
  seo: SanitySEO;
  title?: string;
  subtitle?: string;
  content?: SanityBlock[];
  image?: SanityImage;
  route?: CallToAction;
}

export interface WrestlingAccolade {
  _type: string;
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  description: string;
  year: number;
  link: string;
  author: string;
}
