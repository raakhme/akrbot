import dotenv from 'dotenv';
import { getEnvFile } from './getEnvFile';

const defaultEnvFilePriority = [
  '.env.local',
  '.env',
  '.env.development',
  '.env.production',
];

export function envi<Env extends NodeJS.ProcessEnv>(
  priority = defaultEnvFilePriority
): Env {
  const envFile = getEnvFile(priority);

  return {
    ...process.env,
    ...dotenv.parse(envFile),
  } as Env;
}
