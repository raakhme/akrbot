export interface BotEnvConfig extends NodeJS.ProcessEnv {
  BOT_TOKEN: string;
  NODE_ENV: 'development' | 'production';
}
