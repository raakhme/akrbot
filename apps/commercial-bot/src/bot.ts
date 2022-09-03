import { createBot } from '@akrbot/bot';
import env from './env';

export const bot = createBot({
  token: env.BOT_TOKEN,
  env: env.NODE_ENV,
});
