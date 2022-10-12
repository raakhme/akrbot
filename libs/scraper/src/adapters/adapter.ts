import { AdSource } from '@akrbot/types';
import { PupEvaluator } from '../puppeter/evaluate';
import { ScraperFilters } from '../types';

export interface ScraperAdapterOptions {
  baseUrl: string;
  source: AdSource;
  waitForSelector?: string;
}

declare global {
  interface Window {
    normalizeUrl: (base: string, concat: string) => string;
  }
}

export abstract class ScraperAdapter {
  public baseUrl: string;
  public source: AdSource;
  public waitSelector: string;

  constructor(params: ScraperAdapterOptions) {
    this.baseUrl = params.baseUrl;
    this.source = params.source;
    this.waitSelector = params.waitForSelector;
  }

  public abstract formatFilters: (filters: ScraperFilters) => string;

  public abstract evaluate: PupEvaluator;
}
