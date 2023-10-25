import { UserState } from 'src/user-states/entities/user-state.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => UserState, (userState) => userState.id, {
    eager: true,
  })
  state: UserState;

  @Column()
  role: number;

  @Column({ default: true })
  changePassword: boolean;

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
}
