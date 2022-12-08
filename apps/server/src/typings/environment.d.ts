declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      // APPLICATION OPTIONS
      APPLICATION_PORT: string;
      APPLICATION_ROOT: string;
      APPLICATION_HOST: string;

      // SWAGGER OPTIONS
      SWAGGER_ROOT: string;
      SWAGGER_VERSION: string;

      // POSTGRES OPTIONS
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
    }
  }
}

export {};
