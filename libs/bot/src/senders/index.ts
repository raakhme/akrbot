import { AdInfo, DBState } from '@akrbot/types';
import StormDB from 'stormdb';
import { Context, Telegraf } from 'telegraf';
import { getAdMessage, AdMessageParams } from '@akrbot/ads';
import { BotContext } from '../types';
import { InputMediaPhoto } from 'telegraf/typings/core/types/typegram';

interface Params {
  adInfo: AdInfo | null;
  db: StormDB;
  bot: Telegraf<BotContext>;
  messageParams: AdMessageParams;
}

export const sendAdMessage = async ({
  adInfo,
  db,
  bot,
  messageParams,
}: Params) => {
  const adsIdsDB = db.get('adsIds');
  const chatsIdsDB = db.get('chatsIds');

  const adsIds: DBState['adsIds'] = adsIdsDB.value();
  const chatsIds: DBState['chatsIds'] = chatsIdsDB.value();

  if (adInfo) {
    const { id } = adInfo;

    if (!adsIds.includes(id)) {
      adsIds.push(id);

      const mediaGroup = adInfo.previewsUrls.slice(0, 5).map(
        (url, index) =>
          ({
            type: 'photo',
            media: url,
            parse_mode: 'HTML',
            caption:
              index === 0 ? getAdMessage(adInfo, messageParams) : undefined,
          } as InputMediaPhoto)
      );

      console.log({ adInfo });

      Promise.all(
        chatsIds
          .map(async (chatId) => {
            try {
              // Проверяем что пользователь подписан на бота и незаблокировал его
              const response = await bot.telegram.sendChatAction(
                chatId,
                'typing'
              );
              if (response && mediaGroup.length > 0) {
                return bot.telegram.sendMediaGroup(
                  chatId,
                  mediaGroup as InputMediaPhoto[]
                );
              } else if (response && !mediaGroup.length) {
                return bot.telegram.sendMessage(
                  chatId,
                  getAdMessage(adInfo, messageParams),
                  { parse_mode: 'HTML' }
                );
              }
              return null;
            } catch (err) {
              return null;
            }
          })
          .filter(Boolean)
      )
        .then(() => {
          adsIdsDB.set(adsIds);
          db.save();
          console.log(`Ad sended to ${chatsIds.length} subscribers`);
        })
        .catch((err) => {
          console.error(`Ad not sended. Error: `, err);
        });
    }
  }
};
