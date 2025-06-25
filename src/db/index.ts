import { DataSource } from 'typeorm';
import * as entities from '../entities/index';
export const database = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'feedback',
  synchronize: true,
  logging: false,
  entities: Object.values(entities),
  subscribers: [],
  migrations: [],
});
export const createConnectDataBase = () => {
  return new Promise((resolve, reject) => {
    try {
      database
        .initialize()
        .then(() => {
          console.log('数据库初始化成功');
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
