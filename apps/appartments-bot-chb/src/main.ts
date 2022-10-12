import { createBot } from '@akrbot/bot';
import crons from './crons';
import db from './db';
import env from './env';

async function run() {
  const bot = createBot({
    token: env.BOT_TOKEN,
    env: env.NODE_ENV,
  });
  await bot.launch();

  await crons.start();

  console.log('Chelyabinsk Appartments bot is started');

  bot.start((ctx) => {
    const chatId = ctx.chat.id;
    const chatsIdsDB = db.get('chatsIds');

    const chatsIds = chatsIdsDB.value();
    if (!chatsIds.includes(chatId)) {
      chatsIds.push(chatId);
      chatsIdsDB.set(chatsIds);
      db.save();
    }
  });

  process.once('SIGINT', () => {
    bot.stop('SIGINT');
    crons.stop();
    console.log('SIGINT');
  });
  process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    crons.stop();
    console.log('SIGINT');
  });
}

run();
