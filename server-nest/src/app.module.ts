import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.confic';
import { AuthModule } from './auth/auth.module';
import { UsersMdules } from './users/users.module';

@Module({ imports: [TypeOrmModule.forRoot(config), AuthModule, UsersMdules] })
export class AppModule {}
