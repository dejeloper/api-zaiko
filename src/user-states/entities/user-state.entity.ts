import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('UserStates')
export class UserState {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  enable: boolean;

  @Column({ default: 'Admin' })
  userCreatedAt?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Column({ default: 'Admin' })
  userUpdateAt?: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt?: Date;

  @OneToMany(() => User, (user) => user.state)
  user: User[];
}
