export interface PhotoAsset {
  id: string;
  url: string;
  title: string;
  category: 'interior' | 'exterior' | 'twilight' | 'virtual-staging';
  propertyTitle: string;
  location: string;
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: number;
    bracketCount: number;
    lightingType: 'Ambient + Flash HDR' | 'On-Site Blue Hour' | 'Virtual Day-to-Dusk' | 'Virtual Staging Blend';
  };
  featured?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export interface PropertyListing {
  _id: string;
  _type: 'property';
  title: string;
  slug: string;
  address: string;
  city: string;
  listPrice: number;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  heroImage: string;
  gallery: PhotoAsset[];
  category: 'ground-stills' | 'twilight' | 'staged';
  twilightType?: 'virtual' | 'on-site' | 'none';
  hasVirtualStaging?: boolean;
  hasSinglePropertyWebsite?: boolean;
  singlePropertyWebsiteUrl?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  photographerNotes?: string;
  clientName?: string;
  mlsNumber?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  maxSqFt: number;
  photoCount: string;
  turnaroundHours: number;
  features: string[];
  recommended?: boolean;
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  iconName: string;
}

export interface BookingSubmission {
  id: string;
  agentName: string;
  agentEmail: string;
  agentPhone: string;
  propertyAddress: string;
  squareFeet: number;
  selectedPackage: ServicePackage;
  selectedAddOns: AddOnItem[];
  shootDate: string;
  preferredTime: string;
  specialInstructions: string;
  totalPrice: number;
  createdAt: string;
}

export interface SanitySchemaDefinition {
  name: string;
  title: string;
  type: string;
  fields: {
    name: string;
    title: string;
    type: string;
    description?: string;
    options?: Record<string, unknown>;
  }[];
}
