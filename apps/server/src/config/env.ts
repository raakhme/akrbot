type TypeParse<T> = T extends 'number'
  ? number
  : T extends 'boolean'
  ? boolean
  : T extends 'string'
  ? string
  : unknown;

function parse<T extends 'number' | 'boolean' | 'string'>(
  key: keyof NodeJS.ProcessEnv,
  type: T,
  defaultValue?: TypeParse<T>
) {
  const value = process.env[key];
  const constr = {
    number: parseFloat,
    boolean: Boolean,
    string: (value: string) => value,
  };
  if (typeof value === 'undefined') {
    if (typeof defaultValue === 'undefined')
      throw new Error(
        `Environment variable ${key} is undefined and can't has default value in process.env`
      );
    return defaultValue;
  }
  return constr[type || 'string'](value) as TypeParse<T>;
}

const appRoot = parse('APPLICATION_ROOT', 'string', 'api');
const swaggerRoot = `${appRoot}/${parse('SWAGGER_ROOT', 'string', 'docs')}`;
const appPort = parse('APPLICATION_PORT', 'number', 3333);
const appHost = parse('APPLICATION_HOST', 'string', `http://localhost`);

const envConfig = {
  flags: {
    isDev: parse('NODE_ENV', 'string', 'development') === 'development',
  },
  app: {
    root: appRoot,
    port: appPort,
  },
  swagger: {
    root: swaggerRoot,
    version: parse('SWAGGER_VERSION', 'string', '1.0'),
    url: `${appHost}:${appPort}/${swaggerRoot}`,
    urlJson: `${appHost}:${appPort}/${swaggerRoot}-json`,
  },
  postgres: {
    host: parse('POSTGRES_HOST', 'string', 'localhost'),
    port: parse('POSTGRES_PORT', 'number', 5432),
    user: parse('POSTGRES_USER', 'string'),
    password: parse('POSTGRES_PASSWORD', 'string'),
    database: parse('POSTGRES_DATABASE', 'string'),
  },
};

console.log({ envConfig });

export default envConfig;
