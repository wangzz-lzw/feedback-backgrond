import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../entities';
import Result from 'src/interceptor/result.interceptor';
import { database } from '../db/index';
@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto) {
    try {
      const appData = database.getRepository(Task);
      const taskList = await appData.find();
      const ids = taskList
        .filter((item) => item.status === createTaskDto.status)
        .map((item) => item.index);
      const index = ids.length ? Math.max(...ids) + 1 : 0;
      await appData.save({ ...createTaskDto, index });
      return Result.success({});
    } catch (error) {
      return Result.fail(error);
    }
  }

  async findAll() {
    const result = await database.getRepository(Task).find();
    return Result.success(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }
  async update(updateTaskDto: UpdateTaskDto) {
    try {
      const taskRepository = database.getRepository(Task);

      // 获取源任务
      const sourceTask = await taskRepository.findOne({
        where: {
          status: updateTaskDto.source.droppableId,
          index: updateTaskDto.source.index,
        },
      });

      if (!sourceTask) {
        return Result.fail('Source task not found');
      }

      // 获取目标任务
      const destinationTask = await taskRepository.findOne({
        where: {
          status: updateTaskDto.destination.droppableId,
          index: updateTaskDto.destination.index,
        },
      });

      if (!destinationTask) {
        // 如果目标任务不存在，则将源任务移动到目标位置并更新状态
        await taskRepository.update(
          { taskId: sourceTask.taskId },
          {
            status: updateTaskDto.destination.droppableId,
            index: updateTaskDto.destination.index,
          },
        );
      } else {
        // 如果目标任务存在，则交换位置并更新状态
        const tempStatus = sourceTask.status;
        const tempIndex = sourceTask.index;

        await taskRepository.update(
          { taskId: sourceTask.taskId },
          {
            status: destinationTask.status,
            index: destinationTask.index,
          },
        );

        await taskRepository.update(
          { taskId: destinationTask.taskId },
          {
            status: tempStatus,
            index: tempIndex,
          },
        );
      }

      return Result.success({ sourceTask, destinationTask });
    } catch (error) {
      return Result.fail(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
