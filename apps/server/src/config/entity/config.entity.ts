import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BotConfig } from './botConfig.entity';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => BotConfig, (botConfig) => botConfig.serverConfig)
  bots: BotConfig[];

  @Column({ length: 100 })
  name: string;
}
