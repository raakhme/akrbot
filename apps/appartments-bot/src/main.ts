import { bot } from './bot';
import crons from './crons';

async function run() {
  await bot.launch();
  await crons.start();
  console.log('Appartments bot is started');
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
