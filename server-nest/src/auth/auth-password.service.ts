import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    const hashed = await hash(password, 10);

    if (hashed) return hashed;
  }

  async comparePassword(password: string, hashed: string) {
    const match = await compare(password, hashed);

    if (!match) return 'this password is not match';

    return 'this password is match';
  }
}
