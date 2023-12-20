import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}

  async verifyToken(token: string) {
    try {
      const verified = await this.jwt.verify(token);
      return verified;
    } catch (error) {
      // Handle the error, you can log it or throw a more specific exception if needed
      throw new Error('Invalid token');
    }
  }
}
