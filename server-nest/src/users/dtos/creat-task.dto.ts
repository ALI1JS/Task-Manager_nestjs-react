import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  ownerID?: number;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  catogery: string;

  status?: string;
}
