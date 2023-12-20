import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks.entity';
import { TokenService } from './token-verify.service';
@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
})
export class UsersMdules {}
