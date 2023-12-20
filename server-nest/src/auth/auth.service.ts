import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from './auth-password.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';
import { ScrapingService } from './scraping.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
    private passServices: PasswordService,
    private jwtServices: JwtService,
    private scrapingService: ScrapingService,
  ) {}

  async createUser(newUser: SignupDto) {
    try {
      const user = await this.authRepository.findOne({
        where: { email: newUser.email },
      });

      if (user) return { statusCode: 201, message: 'this user already exists' };

      const hashed = await this.passServices.hashPassword(newUser.password);
      newUser.password = hashed;
      this.authRepository.create(newUser);

      const usersaved = await this.authRepository.save(newUser);

      const scrapedData = await this.scrapingService.scraping(
        newUser.linkedinUrl,
      );

      this.updateProfile(usersaved.id, scrapedData);

      return usersaved;
    } catch (err) {
      return err;
    }
  }

  async userLogin(loginData: { email: string; password: string }) {
    try {
      const user = await this.authRepository.findOne({
        where: { email: loginData.email },
      });

      if (!user) throw new NotFoundException('User not found');

      const passMatch = await this.passServices.comparePassword(
        loginData.password,
        user.password,
      );

      if (!passMatch)
        return { statusCode: 404, message: "Password isn't match" };

      const payload = { userID: user.id, username: user.username };
      const access_token = await this.jwtServices.signAsync(payload);

      return { statusCode: 200, message: 'login suscess', access_token };
    } catch (err) {
      throw err;
    }
  }

  async updateProfile(id: number, newData: Partial<SignupDto>) {
    const existUser = await this.authRepository.findOne({ where: { id: id } });

    if (!existUser) throw new NotFoundException('this User  not found');

    this.authRepository.merge(existUser, newData);

    return await this.authRepository.save(existUser);
  }
}
