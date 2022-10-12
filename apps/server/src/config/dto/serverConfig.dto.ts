import { ApiProperty } from '@nestjs/swagger';
import { BotConfigDto, CreateBotConfigDto } from './botConfig.dto';

export class ServerConfigDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;

  @ApiProperty({ type: [BotConfigDto] })
  bots: Array<BotConfigDto>;
}

export class InitConfigDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [CreateBotConfigDto] })
  bots: CreateBotConfigDto[];
}
