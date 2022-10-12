import puppeteer from 'puppeteer';
import { avitoAdapter, cianAdapter } from '../adapters';
import { ScraperAdapter } from '../adapters/adapter';
import { ScraperFilters } from '../types';
import * as utils from './utils';

const adapters: Record<string, ScraperAdapter> = { avitoAdapter, cianAdapter };

export async function compute(
  filters: ScraperFilters,
  adapts: (keyof typeof adapters)[]
) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  });

  try {
    const results = await Promise.all(
      adapts.map(async (adapterName) => {
        const adapter = adapters[adapterName];
        try {
          const page = await browser.newPage();

          await page.setDefaultNavigationTimeout(0);
          await page.setDefaultTimeout(0);
          await page.setViewport({ width: 1920, height: 1080 });
          await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
          );
          const parseUrl = `${adapter.baseUrl}${adapter.formatFilters(
            filters
          )}`;
          console.log(
            `Parsing source ${adapter.source}. Parsing URL: ${parseUrl}`
          );
          await page.goto(parseUrl);
          if (adapter.waitSelector) {
            await page.waitForSelector(adapter.waitSelector, {
              timeout: 60000,
            });
          }
          await page.screenshot({ path: `dist/${adapter.source}.png` });
          await page.exposeFunction('normalizeUrl', (...args: string[]) =>
            utils.normalizeUrl(...args)
          );
          const result = await page.evaluate(adapter.evaluate, adapter.baseUrl);

          return result;
        } catch (e) {
          console.error(`Parsing warning:`, e, 'Source:', adapter.source);
          return null;
        }
      })
    );

    await browser.close();
    console.log({ results });
    return results.filter(Boolean);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
