import { AdTargetType, AdDealType, AdDuration } from '@akrbot/types';

export const MapTargetType: Record<AdTargetType, string> = {
  appartments: 'kvartiry',
  commerce: 'kommercheskaya_nedvizhimost',
  lands: 'zemelnye_uchastki',
};

export const MapDealType: Record<AdDealType, string> = {
  sell: 'prodam',
  rent: 'sdam',
};

export const MapDuration: Record<AdDuration, string> = {
  daily: 'posutochno',
  long: 'na_dlitelnyy_srok',
};

export const ParamsMapper = {
  authorType: {
    key: 'user',
    value: {
      owner: 1,
      company: 2,
    },
  },
  sortBy: {
    key: 's',
    value: {
      date: 104,
      cheaper: 1,
      expensive: 2,
    },
  },
};
