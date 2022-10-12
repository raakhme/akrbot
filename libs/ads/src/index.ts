import { AdInfo } from '@akrbot/types';
import { withDots } from './formatters';

export interface AdMessageParams {
  tags?: string[];
}

export const getAdMessage = (adInfo: AdInfo, params: AdMessageParams) => {
  return `<b>${adInfo.title}</b>
📅 ${adInfo.date}
📍 ${adInfo.address}
💰 ${adInfo.price} ${adInfo.pricePerM ? `(${adInfo.pricePerM})` : ''}

${withDots(adInfo.description, 100)}
Подробнее на <a href="${adInfo.url}">${adInfo.url}</a>
${params.tags?.map((tag) => `#${tag}`).join(' ') ?? ''}`;
};
