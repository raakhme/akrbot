import { AdInfo } from '@akrbot/types';
import { withDots } from './formatters';

export interface AdMessageParams {
  tags?: string[];
}

export const getAdMessage = (adInfo: AdInfo, params: AdMessageParams) => {
  return `${adInfo.title}
  📅 ${adInfo.date}
  📍 ${adInfo.address}
  💰 ${adInfo.price} (${adInfo.pricePerM})
  
  ${withDots(adInfo.description, 120)}
  Подробнее на ${adInfo.url}
  ${params.tags?.map((tag) => `#${tag}`).join(' ') ?? ''}`;
};
