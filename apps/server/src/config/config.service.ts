import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotConfig } from './entity/botConfig.entity';
import { Config } from './entity/config.entity';
import { CreateBotConfigDto, UpdateBotConfigDto } from './dto/botConfig.dto';
import { InitConfigDto, ServerConfigDto } from './dto/serverConfig.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
    @InjectRepository(BotConfig)
    private botConfigRepository: Repository<BotConfig>
  ) {}

  async getConfig(): Promise<ServerConfigDto | null> {
    const result = await this.configRepository.findOne({
      relations: { bots: true },
    });
    if (result?.id) {
      return {
        name: result.name,
        bots: result.bots,
        id: result.id,
      };
    }
    return null;
  }

  async initConfig(initConfig: InitConfigDto): Promise<ServerConfigDto['id']> {
    const config = this.configRepository.create();
    config.name = initConfig.name;
    const botsConfigs = this.botConfigRepository.create(initConfig.bots);
    config.bots = botsConfigs;

    await this.configRepository.save(config);

    return config.id;
  }

  async addBot(addBot: CreateBotConfigDto) {
    const bot = this.botConfigRepository.create();
    bot.name = addBot.name;
    bot.token = addBot.token;
    return await this.botConfigRepository.save(bot);
  }

  async updateBot(updateBot: UpdateBotConfigDto) {
    const bot = await this.botConfigRepository.findOneBy({ id: updateBot.id });
    bot.name = updateBot.name;
    bot.token = updateBot.token;

    return await this.botConfigRepository.save(bot);
  }
}
