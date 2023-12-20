import {
  Body,
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Query,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateDto } from './dtos/creat-task.dto';

@Controller('/v1/users/')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Post('create/task')
  async create(
    @Body() createData: CreateDto,
    @Headers('Authorization') token: string,
  ) {
    return this.userServices.createTask(createData, token);
  }

  @Patch('update/task/:id')
  async update(
    @Body() updataData,
    @Param('id', ParseIntPipe) id,
    @Headers('Authorization') token,
  ) {
    return this.userServices.updateTask(id, updataData, token);
  }

  @Delete('delete/task/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Headers('Authorization') token,
  ) {
    console.log(id, token);
    return this.userServices.deleteTask(id, token);
  }

  @Get('all/tasks')
  async findAll(@Headers('Authorization') token) {
    return this.userServices.getAllTasks(token);
  }

  @Get('task/:id')
  async findOne(
    @Param('id', ParseIntPipe) id,
    @Headers('Authorization') token,
  ) {
    return this.userServices.getOneTask(id, token);
  }

  @Get('tasks/')
  async findByCatogery(
    @Query('catogery') query,
    @Headers('Authorization') token,
  ) {
    return await this.userServices.getByCatogery(query, token);
  }
}
