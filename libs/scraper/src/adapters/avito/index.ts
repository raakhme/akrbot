import { AdInfo } from '@akrbot/types';
import { ScraperFilters } from '../../types';
import { ScraperAdapter } from '../adapter';

import {
  MapDealType,
  MapDuration,
  MapTargetType,
  ParamsMapper,
} from './filters';

export class AvitoAdapter extends ScraperAdapter {
  constructor() {
    super({
      source: 'avito',
      baseUrl: 'https://www.avito.ru/',
    });
  }

  public evaluate = (baseUrl: string) => {
    function fireEvent(elem, eventName) {
      if (elem) {
        const evObj = document.createEvent('Events');
        evObj.initEvent(eventName, true, false);
        elem.dispatchEvent(evObj);
      }
    }
    const item = document.querySelector(
      'div[class^=items-items] div[data-marker=item]'
    );
    const description = item?.querySelector('div[class^=iva-item-description]');
    const url = item?.querySelector('a[itemprop=url]');
    const price = item?.querySelector('div[class^=price-price]');
    const pricePerM = price?.nextSibling;
    const title = item?.querySelector('h3[itemprop=name]');
    const address = item?.querySelector('div[data-marker=item-address]');
    const date = item?.querySelector('p[data-marker=item-date]');

    const id = item?.getAttribute('id');

    fireEvent(item, 'mouseover');
    const sliderPhotos = item?.querySelectorAll(
      'img[class^=photo-slider-image]'
    );

    const previewsUrls = sliderPhotos
      ? Array.from(sliderPhotos).map((elem) => {
          const srcset = elem.getAttribute('srcset');
          const array = srcset.split(',');
          const lastElement = array.slice(-1)[0];
          const final = lastElement.split(' ');
          return final[0];
        })
      : [];

    const normalizedUrl = (baseUrl + url?.getAttribute('href')).replace(
      /([^:]\/)\/+/g,
      '$1'
    );

    return id
      ? ({
          id,
          date: date?.textContent,
          title: title?.textContent,
          address: address?.textContent,
          description: description?.textContent,
          pricePerM: pricePerM?.textContent,
          price: price?.textContent,
          url: normalizedUrl,
          previewsUrls,
          source: 'avito',
        } as AdInfo)
      : null;
  };

  formatFilters = (filters: ScraperFilters) => {
    const params = {
      authorType: filters.authorType || 'owner',
      sortBy: filters.sortBy || 'date',
    };

    const rental = filters.durationType
      ? `/${MapDuration[filters.durationType]}`
      : '';

    const queryStringObject = Object.keys(ParamsMapper).reduce((acc, key) => {
      const paramValue = params[key];
      return {
        ...acc,
        [ParamsMapper[key].key]: ParamsMapper[key].value[paramValue],
      };
    }, {});

    const queryString = new URLSearchParams(queryStringObject);

    const agricultural =
      filters.placementType === 'argicultural' ? '/selhoznaznacheniya/' : '';

    return `${filters.city}/${MapTargetType[filters.targetType]}/${
      MapDealType[filters.dealType]
    }${agricultural}${rental}?${queryString.toString()}`;
  };
}

export default new AvitoAdapter();
