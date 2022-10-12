import { AdInfo } from '@akrbot/types';
import { ScraperFilters } from '../../types';
import { ScraperAdapter } from '../adapter';
import { getQueryStringByFilters } from '../utils';
import { paramsMapper } from './filters';

export class CianAdapter extends ScraperAdapter {
  constructor() {
    super({
      source: 'cian',
      baseUrl: 'https://cian.ru/cat.php',
      waitForSelector: 'div#frontend-serp',
    });
  }

  public evaluate = () => {
    const item = document.querySelector('article[data-name="CardComponent"]');

    const urlElem = item?.querySelector('div[data-name="LinkArea"] a');

    const dateElems = item?.querySelectorAll('div[data-name="TimeLabel"] span');
    const addressElems = item?.querySelectorAll('a[data-name="GeoLabel"]');
    const descriptionElem = item?.querySelector(
      'div[data-name="Description"] p'
    );
    const priceElem = item?.querySelector('span[data-mark="MainPrice"] span');
    const titleElem = item?.querySelector('span[data-mark="OfferTitle"] span');
    const sliderPhotos = item?.querySelectorAll('div[data-name="Gallery"] img');
    const previewsUrls = sliderPhotos
      ? Array.from(sliderPhotos).map((elem) => elem.getAttribute('src'))
      : [];

    const url = urlElem?.getAttribute('href');
    const id = url.split('/').slice(-2)[0];
    const address = Array.from(addressElems)
      .map((elem) => elem.textContent)
      .join(', ');
    const description = descriptionElem?.textContent;
    const date = Array.from(dateElems)
      .map((elem) => elem.textContent)
      .join(', ');
    const price = priceElem?.textContent;
    const title = titleElem?.textContent;

    return id
      ? ({
          id,
          url,
          date,
          description,
          address,
          price,
          title,
          previewsUrls,
          pricePerM: '',
          source: 'cian',
        } as AdInfo)
      : null;
  };

  formatFilters = (filters: ScraperFilters) => {
    return `?${getQueryStringByFilters(paramsMapper, filters)}`;
  };
}

export default new CianAdapter();
