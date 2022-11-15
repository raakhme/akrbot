import {
  createOrchestrator,
  ScraperFilters,
  ScrapperAdapterName,
} from '@akrbot/scraper';
import cron from 'node-cron';
import { AdBot } from '../types';
import { sendAdMessage } from '../senders';
import StormDB from 'stormdb';
import { AdInfo } from '@akrbot/types';
import { AdMessageParams } from '@akrbot/ads';

export function cronAdsCheckAndMessage(
  cronExpression: string,
  options: {
    filters: ScraperFilters;
    adapters?: ScrapperAdapterName[];
    messageParams: (adInfo: AdInfo) => AdMessageParams;
  },
  bot: AdBot,
  db: StormDB
) {
  const { filters, messageParams, adapters } = options;
  const orc = createOrchestrator({
    filters,
    adapters,
  });
  const task = cron.schedule(cronExpression, async (now) => {
    console.log(now, 'start ads checking');
    const ads = await orc.getAllAds();
    await Promise.all(
      ads.map(async (adInfo) => {
        if (adInfo.status === 'fulfilled') {
          await sendAdMessage({
            adInfo: adInfo.value,
            bot,
            db,
            messageParams: messageParams(adInfo.value),
          });
        }
      })
    );
  });

  return task;
}
