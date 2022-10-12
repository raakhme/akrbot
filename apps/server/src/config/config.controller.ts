import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from './config.service';
import {
  BotConfigDto,
  CreateBotConfigDto,
  UpdateBotConfigDto,
} from './dto/botConfig.dto';
import { InitConfigDto, ServerConfigDto } from './dto/serverConfig.dto';

@ApiTags('config')
@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get()
  @ApiOkResponse({ type: ServerConfigDto })
  @ApiNotFoundResponse()
  async getConfig() {
    const config = await this.configService.getConfig();
    if (config) return config;
    throw new HttpException(`Config is not exists`, 404);
  }

  @Post('/init')
  initConfig(@Body() initConfig: InitConfigDto) {
    return this.configService.initConfig(initConfig);
  }

  @Post('/update-bot')
  @ApiOkResponse({ type: BotConfigDto })
  updateBot(@Body() updateBot: UpdateBotConfigDto) {
    return this.configService.updateBot(updateBot);
  }

  @Post('/add-bot')
  @ApiOkResponse({ type: BotConfigDto })
  addBot(@Body() addBot: CreateBotConfigDto) {
    return this.configService.addBot(addBot);
  }
}
