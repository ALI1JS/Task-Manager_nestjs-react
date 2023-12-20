import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './tasks.entity';
import { CreateDto } from './dtos/creat-task.dto';
import { TokenService } from './token-verify.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private tokenService: TokenService,
  ) {}

  async createTask(taskData: CreateDto, token: string) {
    const verified = await this.tokenService.verifyToken(token);
    taskData.ownerID = verified.userID;

    const task = this.taskRepository.create(taskData);

    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, updataData: Partial<TaskEntity>, token: string) {
    const verified = await this.tokenService.verifyToken(token);
    const task = await this.taskRepository.findOne({
      where: { id: id, ownerID: verified.userID },
    });

    if (!task) return { statusCode: 404, message: 'Task not found' };

    this.taskRepository.merge(task, updataData);

    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number, token: string) {
    const verified = await this.tokenService.verifyToken(token);

    const existTask = await this.taskRepository.findOne({
      where: { id: id, ownerID: verified.userID },
    });

    if (!existTask) return { statusCode: 404, message: 'Task not found' };

    this.taskRepository.delete(id);
    return await this.taskRepository.save(existTask);
  }

  async getAllTasks(token: string) {
    const verified = await this.tokenService.verifyToken(token);
    return await this.taskRepository.find({
      where: { ownerID: verified.userID },
    });
  }

  async getOneTask(id: number, token: string) {
    const verified = await this.tokenService.verifyToken(token);
    const existTask = await this.taskRepository.findOne({
      where: { id: id, ownerID: verified.userID },
    });

    if (!existTask) return { statusCode: 404, message: 'Task not found' };

    return existTask;
  }

  async getByCatogery(catogery: string, token: string) {
    const verified = await this.tokenService.verifyToken(token);
    const tasks = await this.taskRepository.find({
      where: { catogery: catogery, ownerID: verified.userID },
    });

    return tasks;
  }
}
