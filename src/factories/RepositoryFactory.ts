import { Db } from 'mongodb';

export const createRepository = <T>(
  t: new (...args: any[]) => T,
  database: Db,
  collectionName: string
) => {
  return new t(database, collectionName);
};