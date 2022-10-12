declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      SWAGGER_TITLE: string;
      SWAGGER_DESCRIPTION: string;
      SWAGGER_API_VERSION: string;
    }
  }
}

const env = process.env;

export const config = {
  swagger: {
    title: env.SWAGGER_TITLE,
    description: env.SWAGGER_DESCRIPTION,
    version: env.SWAGGER_API_VERSION,
  },
};
