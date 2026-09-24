import { TodoPriority } from 'src/enums/todo-priority.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
  @IsOptional()
  @IsEnum(TodoPriority, {
    message: `Priority phai la mot trong ${Object.values(TodoPriority).join(', ')}`,
  })
  priority?: TodoPriority;
}
