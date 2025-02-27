import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../entities';
import Result from 'src/interceptor/result.interceptor';
import { database } from '../db/index';
const task = new Task();
@Injectable()
export class TaskService {
  create(createTaskDto: CreateTaskDto) {
    try {
      Object.assign(task, createTaskDto);
      const appData = database.getRepository(Task);
      appData.save(task);
      return Result.success({});
    } catch (error) {
      return Result.fail(error);
    }
  }

  async findAll() {
    const result = await database.getRepository(Task).find();
    console.log(result, 'result');
    return Result.success(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
