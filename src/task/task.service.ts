import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../entities';
import Result from 'src/interceptor/result.interceptor';
import { database } from '../db/index';
import type { QueryRunner } from 'typeorm';
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
    const queryRunner = database.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const taskRepository = queryRunner.manager.getRepository(Task);

      // 获取源任务（使用事务内的仓库）
      const sourceTask = await taskRepository.findOne({
        where: {
          status: updateTaskDto.source.droppableId,
          index: updateTaskDto.source.index,
        },
      });

      if (!sourceTask) throw new Error('Source task not found');

      // 判断是否跨列移动
      const isSameColumn =
        sourceTask.status === updateTaskDto.destination.droppableId;

      // 同列移动处理（新增保护逻辑）
      if (isSameColumn) {
        await this.handleSameColumnMove(
          queryRunner,
          sourceTask,
          updateTaskDto.destination.index,
        );
      }
      // 跨列移动处理
      else {
        await this.handleCrossColumnMove(
          queryRunner,
          sourceTask,
          updateTaskDto.destination,
        );
      }

      await queryRunner.commitTransaction();
      return Result.success({});
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return Result.fail(
        error instanceof Error ? error.message : 'Update failed',
      );
    } finally {
      await queryRunner.release();
    }
  }

  // 同列移动处理方法
  private async handleSameColumnMove(
    queryRunner: QueryRunner,
    sourceTask: Task,
    newIndex: number,
  ) {
    const taskRepository = queryRunner.manager.getRepository(Task);

    // 获取同列所有任务（按索引排序）
    const tasks = await taskRepository.find({
      where: { status: sourceTask.status },
      order: { index: 'ASC' },
    });

    // 移除源任务并插入新位置
    const [movedTask] = tasks.splice(sourceTask.index, 1);
    tasks.splice(newIndex, 0, movedTask);

    // 原子化更新所有受影响任务的索引
    const updates = tasks.map((task, index) =>
      taskRepository.update(task.taskId, { index }),
    );
    await Promise.all(updates);
  }

  // 跨列移动处理方法
  private async handleCrossColumnMove(
    queryRunner: QueryRunner,
    sourceTask: Task,
    destination: { droppableId: string; index: number },
  ) {
    const taskRepository = queryRunner.manager.getRepository(Task);

    // 调整目标列索引
    const destTasks = await taskRepository.find({
      where: { status: destination.droppableId },
      order: { index: 'ASC' },
    });

    // 计算有效插入位置
    const validIndex = Math.min(destination.index, destTasks.length);

    // 更新目标列索引
    for (let i = validIndex; i < destTasks.length; i++) {
      await taskRepository.update(destTasks[i].taskId, { index: i + 1 });
    }

    // 更新原任务信息
    await taskRepository.update(sourceTask.taskId, {
      status: destination.droppableId,
      index: validIndex,
    });

    // 维护原列索引
    const originTasks = await taskRepository.find({
      where: { status: sourceTask.status },
      order: { index: 'ASC' },
    });

    for (let i = 0; i < originTasks.length; i++) {
      await taskRepository.update(originTasks[i].taskId, { index: i });
    }
  }
  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
