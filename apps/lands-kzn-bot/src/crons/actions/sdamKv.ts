import { AdBot, cronAdsCheckAndMessage } from '@akrbot/bot';
import StormDB from 'stormdb';

const run = (bot: AdBot, db: StormDB) =>
  cronAdsCheckAndMessage(
    '*/60 * * * * *',
    {
      filters: {
        targetType: 'lands',
        dealType: 'sell',
        sortBy: 'date',
        authorType: 'owner',
        placementType: 'argicultural',
        city: 'kazan',
      },
      adapters: ['avitoAdapter'],
      messageParams(adInfo) {
        return {
          tags: [
            'снять',
            'сельхоз_назначения',
            'от_собственника',
            adInfo.source,
          ],
        };
      },
    },
    bot,
    db
  );

export default run;
