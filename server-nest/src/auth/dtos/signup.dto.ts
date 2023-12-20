import { IsAlphanumeric, IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  password: string;

  @IsNotEmpty()
  @IsUrl()
  linkedinUrl: string;

  username?: string;
  avatar?: string;
}
