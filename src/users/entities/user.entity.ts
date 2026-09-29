import { Exclude, Expose } from 'class-transformer';
import { timeStamp } from 'console';
import { Todo } from 'src/todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export const GROUP_USER_BASIC = 'group_user_basic';
export const GROUP_USER_DETAIL = 'group_user_detail';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_USER_BASIC, GROUP_USER_DETAIL] })
  id!: number;
  @Column()
  @Expose({ groups: [GROUP_USER_BASIC, GROUP_USER_DETAIL] })
  name!: string;
  @OneToMany(() => Todo, (todo) => todo.user)
  todos?: Todo[];
  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  lastActivityAt?: Date;
  @Expose({ groups: [GROUP_USER_DETAIL] })
  @Column({ nullable: true })
  email?: string;
}
