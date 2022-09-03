import { Telegraf } from 'telegraf';

import { BotContext as Context } from './types';

type BotSignal = (bot: Telegraf<Context>) => void;

export interface CreateBotOptions {
  token: string;
  env?: 'development' | 'production';
  signals?: Partial<Record<NodeJS.Signals, BotSignal>>;
}

export function createBot<BotContext extends Context>(
  options: CreateBotOptions
) {
  const { token, env, signals } = options;

  const bot = new Telegraf<BotContext>(token, { handlerTimeout: 1000 });

  if (env === 'development') bot.use(Telegraf.log());

  // Enable graceful stop
  process.once('SIGINT', (signal) => {
    bot.stop('SIGINT');
  });

  process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
  });

  if (typeof signals === 'object') {
    const signalsKeys = Object.keys(signals) as NodeJS.Signals[];

    signalsKeys.forEach((signal) => {
      const cb = signals[signal];
      if (cb) {
        process.once(signal, () => cb(bot as any));
      }
    });
  }

  return bot;
}
