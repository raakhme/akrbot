import StormDB from 'stormdb';
import cron from 'node-cron';

export type CronTask = (
  bot: Telegraf<BotContext>,
  db: StormDB
) => cron.ScheduledTask;
