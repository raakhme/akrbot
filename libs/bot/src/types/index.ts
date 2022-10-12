import { Telegraf } from 'telegraf';
import { BotContext } from './context';

export * from './context';

export type AdBot = Telegraf<BotContext>;
