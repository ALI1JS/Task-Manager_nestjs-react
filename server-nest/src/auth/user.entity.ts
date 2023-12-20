import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  linkedinUrl: string;

  @Column({ nullable: true, default: null })
  avatar: string;
}
