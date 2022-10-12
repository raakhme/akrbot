import { avitoAdapter, cianAdapter } from './adapters';
import { compute } from './puppeter/compute';
import { ScraperFilters } from './types';

const adapters = { avitoAdapter, cianAdapter };

type Adapters = (keyof typeof adapters)[];

interface ScraperOrchestratorOptions {
  filters: ScraperFilters;
  adapters?: Adapters;
}

class ScraperOrchestrator {
  filters: ScraperFilters;
  adapters: Adapters;

  constructor(filters: ScraperFilters, adapters: Adapters = []) {
    this.filters = {
      ...filters,
    };
    this.adapters =
      adapters.length > 0 ? adapters : ['avitoAdapter', 'cianAdapter'];
  }

  async getAllAds() {
    const results = await compute(this.filters, this.adapters);
    return results;
  }
}

export function createOrchestrator(
  options: ScraperOrchestratorOptions
): ScraperOrchestrator {
  const instance = new ScraperOrchestrator(options.filters, options.adapters);

  return instance;
}
