import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthService } from './auth.service';
import { PasswordService } from './auth-password.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from 'src/tokenconstanat';
import { ScrapingService } from './scraping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, ScrapingService],
})
export class AuthModule {}
