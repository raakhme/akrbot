import {
  AdTargetType,
  AdCity,
  AdDealType,
  AdDuration,
  AdSortType,
  AdAuthorType,
  AdPlacementType,
} from '@akrbot/types';
import * as adapters from '../adapters';

export interface ScraperFilters {
  /**
   * Длительность
   */
  durationType?: AdDuration;
  /**
   * Город
   */
  city: AdCity;
  /**
   * Тип объекта объявления
   */
  targetType: AdTargetType;
  /**
   * Тип сделки (продам, сдам)
   */
  dealType: AdDealType;
  /**
   * Сортировка по признаку
   * Default: date
   */
  sortBy?: AdSortType;
  /**
   * Тип автора объявления
   * Default: owner
   */
  authorType?: AdAuthorType;
  placementType?: AdPlacementType;
}

export type ScrapperAdapterName = keyof typeof adapters;
