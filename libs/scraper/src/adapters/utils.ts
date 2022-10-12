import { ScraperFilters } from '../types';

type Keys = keyof ScraperFilters;

export type ParamsMapper = Partial<{
  [keyP in Keys]: {
    key: string;
    value: Record<ScraperFilters[keyP], number | string>;
  };
}>;

export function getQueryStringByFilters(
  paramsMapper: ParamsMapper,
  params: ScraperFilters
) {
  const queryStringObject = Object.keys(paramsMapper).reduce((acc, key) => {
    const paramValue = params[key];
    return {
      ...acc,
      [paramsMapper[key].key]: paramsMapper[key].value[paramValue],
    };
  }, {});

  const queryString = new URLSearchParams(queryStringObject);

  return queryString.toString();
}
