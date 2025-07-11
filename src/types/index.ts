export interface Wine {
  id: string;
  name: string;
  producer: string;
  region: string;
  country: string;
  vintage: string;
  grape: string[];
  description: string;
  image: string;
  price?: string; // Only visible to logged-in distributors
  technical: {
    Country?: string;
    Region?: string;
    Appellation?: string;
    ColorStyle?: string;
    Grapes?: string;
    HarvestDate?: string;
    SO2?: string;
    SoilComposition?: string;
    Farming?: string;
    AgeOfVines?: string;
    FiningFiltration?: string;
    Winemaking?: string
  };
}

export interface Country {
  id: string;
  name: string;
  description: string;
  image: string;
  regionCount: number;
}

export interface Region {
  id: string;
  countryId: string;
  countryName: string;
  name: string;
  description: string;
  image: string;
  producerCount: number;
}

export interface Producer {
  id: string;
  name: string;
  regionId: string;
  region: string;
  bannerImage: string;
  cardImage?: string;
  description: string;
  wines: Wine[];
  midia?: string[];
}

export interface Distributor {
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}
