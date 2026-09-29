import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { Category } from 'src/categories/entities/category.entity';
import { TodoPriority } from 'src/enums/todo-priority.enum';
import { TodoStatus } from 'src/enums/todo-status.enum';
import { User } from 'src/users/entities/user.entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Index(['userId'])
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column({ type: 'text', nullable: true })
  description!: string;
  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.OPEN })
  status!: TodoStatus;
  @Column({ type: 'enum', enum: TodoPriority, nullable: true })
  @Index('idx_todo_priority_high', { where: `"priority= HIGH"` })
  priority!: TodoPriority;
  @Column()
  userId!: number;
  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;
  @Column({ nullable: true })
  categoryId?: number;
  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
