import { initCrons } from '@akrbot/crons';
import { bot } from '../bot';
import db from '../db';

export default initCrons(bot, db, []);
