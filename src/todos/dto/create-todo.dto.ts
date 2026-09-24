import { TodoPriority } from 'src/enums/todo-priority.enum';
import { TodoStatus } from 'src/enums/todo-status.enum';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1, { message: 'Title khong duoc de trong' })
  title!: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsEnum(TodoStatus, {
    message: `Status phai la mot trong ${Object.values(TodoStatus).join(', ')}`,
  })
  status?: TodoStatus;
  @IsOptional()
  @IsEnum(TodoPriority, {
    message: `Priority phai la mot trong ${Object.values(TodoPriority).join(', ')}`,
  })
  priority?: TodoPriority;
  @IsInt({ message: 'CategoryId phai la 1 so nguyen' })
  @IsOptional()
  categoryId?: number;
  @IsInt({ message: 'UserId phai la so nguyen' })
  userId!: number;
}
