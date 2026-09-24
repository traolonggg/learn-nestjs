import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { TodoService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodoService) {}
  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.todoService.findAll(queryParamsDto);
  }
  @Get(':id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findById(id);
  }
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
