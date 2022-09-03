import StormDB from 'stormdb';
import { Telegraf } from 'telegraf';
import { BotContext } from '@akrbot/bot';
import { CronTask } from '@akrbot/types';

export const initCrons = (
  bot: Telegraf<BotContext>,
  db: StormDB,
  tasks: CronTask[]
) => {
  const cronTasks = tasks.map((fn) => fn(bot, db));

  return {
    start() {
      cronTasks.forEach((cron) => cron.start());
    },
    stop() {
      cronTasks.forEach((cron) => cron.stop());
    },
  };
};
