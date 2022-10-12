import path from 'path';
import StormDB from 'stormdb';

export interface DBState {
  chatsIds: number[];
  adsIds: string[];
}

const defaultDBState: DBState = {
  chatsIds: [],
  adsIds: [],
};

export const initDB = () => {
  const adapter = new StormDB.localFileEngine('db-kzn.stormdb');
  const db = new StormDB(adapter);

  db.default(defaultDBState);

  return db;
};

export default initDB();