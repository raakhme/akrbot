import { bot } from './bot';
import crons from './crons';
import {} from '@akrbot/scraper';

async function run() {
  await bot.launch();
  await crons.start();
  console.log('Commercial bot is started');
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
