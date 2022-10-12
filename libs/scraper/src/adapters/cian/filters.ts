import { ParamsMapper } from '../utils';

export const paramsMapper: ParamsMapper = {
  city: {
    key: 'region',
    value: {
      kazan: 4777,
      krasnodar: 4820,
      chelyabinsk: 5048,
      ekaterinburg: 4743,
    },
  },
  durationType: {
    key: 'type',
    value: {
      long: 4,
      daily: 0,
    },
  },
  dealType: {
    key: 'deal_type',
    value: {
      rent: 'rent',
      sell: 'sell',
    },
  },
  targetType: {
    key: 'offer_type',
    value: {
      appartments: 'flat',
      commerce: null,
      lands: null,
    },
  },
  authorType: {
    key: 'is_by_homeowner',
    value: {
      owner: 1,
      company: 0,
    },
  },
  sortBy: {
    key: 'sort',
    value: {
      date: 'creation_date_desc',
      expensive: null,
      cheaper: null,
    },
  },
};
