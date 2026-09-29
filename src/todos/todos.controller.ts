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
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { TodoService } from './todos.service';
import { TodoOwnerShip } from './guard/todo-ownership.guard';
import { TimingInterCeptor } from 'src/common/interceptor/timing-interceptor';
import {
  GROUP_USER_BASIC,
  GROUP_USER_DETAIL,
} from 'src/users/entities/user.entity';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodoService) {}
  @Get()
  @UseInterceptors(TimingInterCeptor)
  @SerializeOptions({ groups: [GROUP_USER_BASIC] })
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.todoService.findAll(queryParamsDto);
  }
  @Get(':id')
  @SerializeOptions({ groups: [GROUP_USER_DETAIL] })
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
  @UseGuards(TodoOwnerShip)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
