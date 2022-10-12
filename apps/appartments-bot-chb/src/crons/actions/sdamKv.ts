import { AdBot, cronAdsCheckAndMessage } from '@akrbot/bot';
import StormDB from 'stormdb';

const run = (bot: AdBot, db: StormDB) =>
  cronAdsCheckAndMessage(
    '*/60 * * * * *',
    {
      filters: {
        targetType: 'appartments',
        dealType: 'rent',
        sortBy: 'date',
        authorType: 'owner',
        durationType: 'long',
        city: 'chelyabinsk',
      },
      messageParams(adInfo) {
        return {
          tags: ['снять', 'квартиры', 'от_собственника', adInfo.source],
        };
      },
    },
    bot,
    db
  );

export default run;
