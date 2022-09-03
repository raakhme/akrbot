import path from 'path';
import { readFileSync } from 'fs-extra';

export function getEnvFile(envFilePriority: string[]): Buffer {
  let buffer: Buffer | null = null;
  for (const envFileName of envFilePriority) {
    try {
      console.log(path.resolve(__dirname, envFileName));
      const file = readFileSync(path.resolve(__dirname, envFileName));
      if (Buffer.isBuffer(file)) {
        buffer = file;
        break;
      }
      // eslint-disable-next-line
    } catch (e) {}
  }

  if (!buffer) throw new Error('.env file does not exists');

  return buffer;
}
