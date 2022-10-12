import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class BotConfigDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;
}

export class CreateBotConfigDto extends PickType(BotConfigDto, [
  'token',
  'name',
] as const) {}

export class UpdateBotConfigDto extends PartialType(CreateBotConfigDto) {
  @ApiProperty()
  id: number;
}
