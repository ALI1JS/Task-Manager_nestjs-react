import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'alijs',
  database: 'Tasks',
  type: 'postgres',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
