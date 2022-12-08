import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import envConfig from './env';

class ConfigService {
  constructor(private readonly env: typeof envConfig) {}

  public getDbPort() {
    return this.env.postgres.port;
  }

  public isProduction() {
    return !envConfig.flags.isDev;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.env.postgres.host,
      port: this.env.postgres.port,
      username: this.env.postgres.user,
      password: this.env.postgres.password,
      database: this.env.postgres.database,

      entities: ['src/**/*.entity.{ts,js}'],

      migrationsTableName: 'migration',

      synchronize: !this.isProduction(),

      migrations: ['src/migration/*.ts'],

      autoLoadEntities: true,

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(envConfig);
export { configService };
