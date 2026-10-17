import { PhotoAsset, PropertyListing, ServicePackage, AddOnItem, SanitySchemaDefinition } from '../types';

export const HERO_TWILIGHT_IMG = '/src/assets/images/hero_luxury_estate_twilight_1792249547182.jpg';
export const LIVING_ROOM_IMG = '/src/assets/images/interior_modern_living_room_1792249546981.jpg';
export const KITCHEN_IMG = '/src/assets/images/luxury_kitchen_chef_island_1792249549432.jpg';
export const EXTERIOR_DAYTIME_IMG = '/src/assets/images/exterior_daytime_luxury_home_1792249548813.jpg';
export const VACANT_ROOM_IMG = '/src/assets/images/vacant_room_before_staging_1792250208792.jpg';
export const STAGED_ROOM_IMG = '/src/assets/images/virtual_staged_living_room_1792250209120.jpg';

export const AVATAR_MARCUS = '/src/assets/images/avatar_agent_marcus_1792250812964.jpg';
export const AVATAR_ELENA = '/src/assets/images/avatar_agent_elena_1792250813399.jpg';
export const AVATAR_DAVID = '/src/assets/images/avatar_agent_david_1792250813560.jpg';

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  brokerage: string;
  location: string;
  avatar: string;
  quote: string;
  serviceUsed: string;
  measurableOutcome: string;
  listingAddress: string;
}

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Managing Broker',
    brokerage: 'Kentwood Real Estate',
    location: 'Cherry Creek, Denver Metro, CO',
    avatar: AVATAR_MARCUS,
    quote:
      'The virtual day-to-dusk twilight conversion on our Cherry Hills listing generated 4 private showings in the first 48 hours. The window pulls and natural warm interior balance were indistinguishable from an on-site dusk shoot, at a fraction of the scheduling hassle.',
    serviceUsed: 'Virtual Day-to-Dusk & Ground Stills',
    measurableOutcome: '4 Showings in 48 Hours',
    listingAddress: '4800 S University Blvd ($4.25M)'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Senior Associate Broker',
    brokerage: 'Compass Denver',
    location: 'Wash Park, Denver Metro, CO',
    avatar: AVATAR_ELENA,
    quote:
      'We had a vacant modern Denver residence sitting cold on REcolorado for 5 weeks. Casa View 360 delivered crisp ground stills with zero window blowout, and virtually staged the living and primary bedrooms. The home went under contract in 8 days at 99% of list price.',
    serviceUsed: 'Virtual Staging + Ground Stills',
    measurableOutcome: 'Under Contract in 8 Days',
    listingAddress: '1050 S Gaylord St ($2.45M)'
  },
  {
    id: 'test-3',
    name: 'David Thorne',
    role: 'Team Lead & Founder',
    brokerage: 'LIV Sotheby’s International Realty',
    location: 'Denver & Boulder Metro, CO',
    avatar: AVATAR_DAVID,
    quote:
      'Having both an unbranded REcolorado MLS link and a branded single property website delivered within 24 hours makes our team look unbeatable in listing pitches. Sellers are blown away when their custom Casa View 360 website goes live the morning after the shoot.',
    serviceUsed: 'Single Property Websites & On-Site Twilight',
    measurableOutcome: '100% Listing Presentation Win Rate',
    listingAddress: '1601 Wewatta St, Penthouse ($3.6M)'
  }
];

export const INITIAL_PHOTOS: PhotoAsset[] = [
  {
    id: 'ph-01',
    url: HERO_TWILIGHT_IMG,
    title: 'On-Site Blue Hour Exterior Twilight',
    category: 'twilight',
    propertyTitle: 'Cherry Hills Village Architectural Manor',
    location: 'Cherry Hills Village, Denver Metro',
    exif: {
      camera: 'Sony Alpha 7R V',
      lens: 'FE 16-35mm F2.8 GM II (Ground Tripod)',
      aperture: 'f/8.0',
      shutter: '3.2 sec',
      iso: 64,
      bracketCount: 5,
      lightingType: 'On-Site Blue Hour'
    },
    featured: true,
    aspectRatio: '16:9'
  },
  {
    id: 'ph-02',
    url: LIVING_ROOM_IMG,
    title: 'Double-Height Great Room Interior',
    category: 'interior',
    propertyTitle: 'LoDo Skyline Penthouse',
    location: 'LoDo, Denver, CO',
    exif: {
      camera: 'Nikon Z8',
      lens: 'NIKKOR Z 14-24mm f/2.8 S (Ground Tripod)',
      aperture: 'f/7.1',
      shutter: '1/15 sec',
      iso: 100,
      bracketCount: 4,
      lightingType: 'Ambient + Flash HDR'
    },
    featured: true,
    aspectRatio: '4:3'
  },
  {
    id: 'ph-03',
    url: STAGED_ROOM_IMG,
    title: 'Virtually Staged Designer Living Room',
    category: 'virtual-staging',
    propertyTitle: 'Wash Park Modern Residence',
    location: 'Washington Park, Denver, CO',
    exif: {
      camera: 'Canon EOS R5',
      lens: 'RF 15-35mm F2.8 L (Ground Tripod)',
      aperture: 'f/8.0',
      shutter: '1/30 sec',
      iso: 100,
      bracketCount: 3,
      lightingType: 'Virtual Staging Blend'
    },
    featured: true,
    aspectRatio: '4:3'
  },
  {
    id: 'ph-04',
    url: KITCHEN_IMG,
    title: 'Custom Chef Kitchen Ground Still',
    category: 'interior',
    propertyTitle: 'Hilltop Architectural Residence',
    location: 'Hilltop, Denver, CO',
    exif: {
      camera: 'Sony Alpha 7R V',
      lens: 'FE 24-70mm F2.8 GM II',
      aperture: 'f/8.0',
      shutter: '1/8 sec',
      iso: 100,
      bracketCount: 3,
      lightingType: 'Ambient + Flash HDR'
    },
    featured: true,
    aspectRatio: '4:3'
  },
  {
    id: 'ph-05',
    url: EXTERIOR_DAYTIME_IMG,
    title: 'Ground-Level Architectural Exterior Stills',
    category: 'exterior',
    propertyTitle: 'Bow Mar Lakeside Modernist Residence',
    location: 'Bow Mar, Denver Metro, CO',
    exif: {
      camera: 'Canon EOS R5',
      lens: 'RF 15-35mm F2.8 L (Eye-Level 5ft)',
      aperture: 'f/9.0',
      shutter: '1/200 sec',
      iso: 100,
      bracketCount: 3,
      lightingType: 'Ambient + Flash HDR'
    },
    featured: true,
    aspectRatio: '16:9'
  }
];

export const INITIAL_PROPERTIES: PropertyListing[] = [
  {
    _id: 'prop-001',
    _type: 'property',
    title: 'Cherry Hills Village Manor',
    slug: 'cherry-hills-village-manor',
    address: '4800 S University Blvd',
    city: 'Cherry Hills Village, CO',
    listPrice: 4250000,
    squareFeet: 6400,
    bedrooms: 5,
    bathrooms: 6,
    heroImage: HERO_TWILIGHT_IMG,
    gallery: [INITIAL_PHOTOS[0], INITIAL_PHOTOS[4]],
    category: 'twilight',
    twilightType: 'on-site',
    hasVirtualStaging: false,
    hasSinglePropertyWebsite: true,
    singlePropertyWebsiteUrl: 'https://4800university.casaview360.com',
    featured: true,
    status: 'published',
    photographerNotes: 'On-site blue hour twilight shoot captured over 35 minutes against Front Range backdrop. Window pull balanced with interior warm lighting.',
    clientName: 'Kentwood Real Estate',
    mlsNumber: 'RECOLORADO-9912041'
  },
  {
    _id: 'prop-002',
    _type: 'property',
    title: 'LoDo Skyline Penthouse at 16th St',
    slug: 'lodo-skyline-penthouse',
    address: '1601 Wewatta St, Suite 1200',
    city: 'Denver, CO',
    listPrice: 3600000,
    squareFeet: 3800,
    bedrooms: 3,
    bathrooms: 4,
    heroImage: LIVING_ROOM_IMG,
    gallery: [INITIAL_PHOTOS[1]],
    category: 'ground-stills',
    twilightType: 'none',
    hasVirtualStaging: false,
    hasSinglePropertyWebsite: true,
    singlePropertyWebsiteUrl: 'https://1601wewatta.casaview360.com',
    featured: true,
    status: 'published',
    photographerNotes: 'Basic interior and exterior ground photos. Clean window exposure pull to preserve views of Downtown Denver and Rocky Mountain peaks.',
    clientName: 'LIV Sotheby’s International Realty',
    mlsNumber: 'RECOLORADO-8823104'
  },
  {
    _id: 'prop-003',
    _type: 'property',
    title: 'Wash Park Modern Contemporary',
    slug: 'wash-park-modern',
    address: '1050 S Gaylord St',
    city: 'Denver, CO',
    listPrice: 2450000,
    squareFeet: 4200,
    bedrooms: 4,
    bathrooms: 5,
    heroImage: STAGED_ROOM_IMG,
    gallery: [INITIAL_PHOTOS[2], INITIAL_PHOTOS[3]],
    category: 'staged',
    twilightType: 'virtual',
    hasVirtualStaging: true,
    hasSinglePropertyWebsite: true,
    singlePropertyWebsiteUrl: 'https://1050gaylord.casaview360.com',
    featured: true,
    status: 'published',
    photographerNotes: 'Vacant historic-expansion property virtually staged with contemporary organic neutral furniture. Virtual day-to-dusk conversion included.',
    clientName: 'Compass Denver',
    mlsNumber: 'RECOLORADO-7719208'
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-ground-stills',
    name: 'Basic Ground Photo Stills',
    tagline: 'High-dynamic bracketed interior and exterior ground photography with true window pulls and natural Colorado light fidelity.',
    basePrice: 245,
    maxSqFt: 2500,
    photoCount: '25–35 Ground Stills',
    turnaroundHours: 24,
    features: [
      'Interior & exterior eye-level ground photography',
      'Multi-bracket HDR flash + ambient blending',
      'True window exposure pull (no whiteout or mountain glare)',
      'Blue sky replacement on overcast Denver days',
      'REcolorado & MLS compliant (2048px) + High-res print files',
      'Guaranteed 24-hour turnaround across Denver Metro'
    ]
  },
  {
    id: 'pkg-twilight-website',
    name: 'Ground Stills + Virtual Twilight & Website',
    tagline: 'Complete Denver listing launch: Ground stills + 2 Virtual Day-to-Dusk photos + Dedicated Single Property Website.',
    basePrice: 385,
    maxSqFt: 3500,
    photoCount: '35–45 Ground Stills + 2 Virtual Dusk',
    turnaroundHours: 24,
    recommended: true,
    features: [
      'Everything in Basic Ground Photo Stills',
      '2 Virtual Day-to-Dusk twilight exterior conversions',
      'Custom Single Property Website (unbranded MLS + branded)',
      'Lead capture form & direct Denver agent contact box',
      'Interactive photo gallery and property spec sheet',
      'Fast 24-hour delivery queue'
    ]
  },
  {
    id: 'pkg-complete-marketing',
    name: 'The Signature Marketing Suite',
    tagline: 'Ground stills + On-Site Twilight session + Virtual Staging for vacant rooms + Single Property Website.',
    basePrice: 565,
    maxSqFt: 4500,
    photoCount: '45+ Ground Stills + Staging + Twilight',
    turnaroundHours: 24,
    features: [
      'Everything in Ground Stills package',
      'Dedicated On-Site Physical Twilight session at Front Range dusk',
      '2 Virtually Staged vacant rooms (designer modern furniture)',
      'Premium Single Property Website with custom slug',
      'Unbranded virtual tour link for REcolorado MLS compliance',
      'Social media optimized 4:5 and 9:16 crop pack'
    ]
  }
];

export const ADD_ON_ITEMS: AddOnItem[] = [
  {
    id: 'addon-virtual-dusk',
    name: 'Virtual Day-to-Dusk Twilight',
    description: 'Digitally convert daytime exterior photos into warm-window twilight photographs.',
    price: 45,
    unit: 'per photo',
    iconName: 'Moon'
  },
  {
    id: 'addon-onsite-twilight',
    name: 'On-Site Twilight Photography Session',
    description: 'Physical dusk photo session capturing natural Rocky Mountain golden hour and blue hour lights.',
    price: 165,
    unit: 'flat rate',
    iconName: 'SunMedium'
  },
  {
    id: 'addon-virtual-staging',
    name: 'Virtual Staging',
    description: 'Digitally furnish vacant rooms with high-end designer sofas, tables, rugs, and decor.',
    price: 45,
    unit: 'per room',
    iconName: 'Sofa'
  },
  {
    id: 'addon-single-property-site',
    name: 'Dedicated Single Property Website',
    description: 'Standalone unbranded REcolorado MLS link + branded marketing website with lead capture.',
    price: 85,
    unit: 'flat rate',
    iconName: 'Globe'
  },
  {
    id: 'addon-rush',
    name: '12-Hour Rush Editing & Delivery',
    description: 'Guaranteed delivery by 9:00 AM next morning for urgent weekend Denver MLS listings.',
    price: 95,
    unit: 'flat rate',
    iconName: 'Clock'
  }
];

export const SANITY_SCHEMAS: SanitySchemaDefinition[] = [
  {
    name: 'property',
    title: 'Denver Property Listing Shoot',
    type: 'document',
    fields: [
      { name: 'title', title: 'Property Title', type: 'string', description: 'Address or listing headline' },
      { name: 'slug', title: 'Slug', type: 'slug', description: 'URL slug for single property website' },
      { name: 'address', title: 'Street Address', type: 'string' },
      { name: 'city', title: 'Denver Metro City & Suburb', type: 'string' },
      { name: 'listPrice', title: 'Listing Price (USD)', type: 'number' },
      { name: 'squareFeet', title: 'Square Footage', type: 'number' },
      { name: 'bedrooms', title: 'Bedrooms', type: 'number' },
      { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
      { name: 'heroImage', title: 'Primary Hero Photo', type: 'image', options: { hotspot: true } },
      { name: 'groundPhotos', title: 'Ground Photos (Interior/Exterior)', type: 'array' },
      { name: 'twilightType', title: 'Twilight Type (virtual, on-site, none)', type: 'string' },
      { name: 'hasVirtualStaging', title: 'Virtual Staging Applied', type: 'boolean' },
      { name: 'singlePropertyWebsiteUrl', title: 'Single Property Website URL', type: 'url' },
      { name: 'photographerNotes', title: 'Technical Retouching Notes', type: 'text' }
    ]
  },
  {
    name: 'singlePropertyWebsite',
    title: 'Single Property Website',
    type: 'document',
    fields: [
      { name: 'domainSlug', title: 'Custom Subdomain / Slug', type: 'string' },
      { name: 'propertyRef', title: 'Linked Property Shoot', type: 'reference' },
      { name: 'agentName', title: 'Listing Agent Name', type: 'string' },
      { name: 'agentPhone', title: 'Listing Agent Phone', type: 'string' },
      { name: 'unbrandedMlsUrl', title: 'Unbranded REcolorado MLS Link', type: 'url' },
      { name: 'isLive', title: 'Website Live on GitHub Pages', type: 'boolean' }
    ]
  },
  {
    name: 'servicePackage',
    title: 'Photography Rate Package',
    type: 'document',
    fields: [
      { name: 'name', title: 'Package Name', type: 'string' },
      { name: 'tagline', title: 'Tagline', type: 'string' },
      { name: 'basePrice', title: 'Base Price (USD)', type: 'number' },
      { name: 'turnaroundHours', title: 'Turnaround Hours', type: 'number' },
      { name: 'features', title: 'Included Features', type: 'array' }
    ]
  }
];

export const SAMPLE_GROQ_QUERIES = [
  {
    id: 'query-1',
    label: 'All Active Denver Property Shoots',
    groq: `*[_type == "property" && status == "published"] | order(listPrice desc) {
  _id,
  title,
  address,
  city,
  listPrice,
  squareFeet,
  twilightType,
  hasVirtualStaging,
  singlePropertyWebsiteUrl
}`
  },
  {
    id: 'query-2',
    label: 'Denver Metro Virtual Staging & Twilight',
    groq: `*[_type == "property" && (hasVirtualStaging == true || twilightType in ["virtual", "on-site"])] {
  title,
  slug,
  twilightType,
  hasVirtualStaging,
  "heroPhoto": heroImage
}`
  },
  {
    id: 'query-3',
    label: 'Active Single Property Websites',
    groq: `*[_type == "singlePropertyWebsite" && isLive == true] {
  domainSlug,
  agentName,
  unbrandedMlsUrl,
  "property": propertyRef->{ title, address, listPrice }
}`
  }
];

export const GITHUB_DEPLOY_WORKFLOW_YML = `name: Deploy Casa View 360 to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Application with Sanity Configuration
        env:
          VITE_SANITY_PROJECT_ID: \${{ secrets.SANITY_PROJECT_ID || 'casaview360' }}
          VITE_SANITY_DATASET: \${{ secrets.SANITY_DATASET || 'production' }}
          VITE_SANITY_API_VERSION: '2026-03-01'
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

export const SANITY_CONFIG_TS = `import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Casa View 360 Denver Real Estate CMS',

  projectId: process.env.VITE_SANITY_PROJECT_ID || 'casaview360',
  dataset: process.env.VITE_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
`;
