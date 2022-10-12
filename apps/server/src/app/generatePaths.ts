import { exec } from 'child_process';
import path from 'path';
import { Logger } from '@nestjs/common';

export async function generatePaths(options: { swaggerAddress: string }) {
  const { swaggerAddress } = options;
  return new Promise<string>((resolve, reject) => {
    Logger.log('Generate swagger types...');
    const scriptPath = path.resolve(__dirname, './assets/script.sh');
    exec(`${scriptPath} ${swaggerAddress}`, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr);
      }
      return resolve(stdout);
    });
  });
}
