import { bot } from './bot';
import crons from './crons';
import db from './db';

async function run() {
  await bot.launch();
  await crons.start();
  console.log('Commercial bot is started');

  bot.start((ctx) => {
    const chatId = ctx.chat.id;
    console.log({ chatId });
    const chatsIdsDB = db.get('chatsIds');

    const chatsIds = chatsIdsDB.value();
    if (!chatsIds.includes(chatId)) {
      chatsIds.push(chatId);
      chatsIdsDB.set(chatsIds);
      db.save();
    }
  });
}

run();

process.once('SIGINT', () => {
  bot.stop('SIGINT');
  console.log('SIGINT');
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  console.log('SIGINT');
});
