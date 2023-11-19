import { AdBot, cronAdsCheckAndMessage } from '@akrbot/bot';
import StormDB from 'stormdb';

const run = (bot: AdBot, db: StormDB) =>
  cronAdsCheckAndMessage(
    '*/60 * * * * *',
    {
      adapters: ['avitoAdapter'],
      filters: {
        targetType: 'commerce',
        dealType: 'rent',
        sortBy: 'date',
        authorType: 'owner',
        city: 'kazan',
      },
      messageParams(adInfo) {
        return {
          tags: ['снять', 'коммерция', 'от_собственника', adInfo.source],
        };
      },
    },
    bot,
    db
  );

export default run;
