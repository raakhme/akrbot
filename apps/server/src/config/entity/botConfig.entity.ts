import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Config } from './config.entity';

@Entity()
export class BotConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Config, (type) => type.bots)
  serverConfig: Config;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 340 })
  token: string;
}
