import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotConfig } from './entity/botConfig.entity';
import { Config } from './entity/config.entity';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Config, BotConfig])],
  providers: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
