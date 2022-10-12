export type AdSource = 'avito' | 'cian';

export interface AdInfo {
  date: string;
  address: string;
  id: string;
  description: string | undefined;
  price: string;
  url: string;
  title: string;
  previewsUrls: string[];
  pricePerM: string;
  source: AdSource;
}

export type AdCity = 'kazan' | 'krasnodar' | 'ekaterinburg' | 'chelyabinsk';

export type AdDuration = 'daily' | 'long';

export type AdTargetType = 'appartments' | 'commerce' | 'lands';

export type AdDealType = 'sell' | 'rent';

export type AdSortType = 'date' | 'expensive' | 'cheaper';

export type AdAuthorType = 'owner' | 'company';

export type AdPlacementType = 'argicultural';
