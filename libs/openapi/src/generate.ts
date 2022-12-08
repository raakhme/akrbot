import { exec } from 'child_process';

export async function generatePaths(options: { swaggerAddress: string }) {
  const { swaggerAddress } = options;
  return new Promise<string>((resolve, reject) => {
    exec(
      `npx openapi-typescript ${swaggerAddress} --output libs/openapi/assets/generated.ts`,
      (err, stdout, stderr) => {
        if (err || stderr) {
          return reject(err || stderr);
        }
        return resolve(stdout);
      }
    );
  });
}
