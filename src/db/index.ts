import { DataSource } from 'typeorm';
import * as entities from '../entities/index';
export const database = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'self',
  password: '123456',
  database: 'nest_demo',
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
