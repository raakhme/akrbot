import { exec } from 'child_process';

export async function generatePaths(options: { swaggerAddress: string }) {
  const { swaggerAddress } = options;
  return new Promise<string>((resolve, reject) => {
    exec(`./script.sh ${swaggerAddress}`, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr);
      }
      return resolve(stdout);
    });
  });
}
