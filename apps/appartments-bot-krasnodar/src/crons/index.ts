import { initCrons } from '@akrbot/crons';
import { bot } from '../bot';
import db from '../db';
import actions from './actions';

export default initCrons(bot, db, actions);
