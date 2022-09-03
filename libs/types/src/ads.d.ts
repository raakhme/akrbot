export interface AdInfo {
  date: string;
  address: string;
  id: string;
  description: string;
  price: string;
  url: string;
  title: string;
  previewsUrls: string[];
  pricePerM: string;
  source: 'avito' | 'cian';
}
