import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import * as Mock from 'mockjs';
import Result from 'src/interceptor/result.interceptor';
import { Feedback } from 'src/entities';
import { database } from '../db';

@Injectable()
export class FeedbackService {
  db = Mock.mock({
    'data|10': [
      {
        'id|+1': 1,
        title: '@ctitle(10, 20)',
        createTime: '@datetime',
        'status|0-1': 1,
        'unread|0-100': 1,
        note: '@cparagraph',
      },
    ],
  });
  async create(createFeedbackDto: CreateFeedbackDto) {
    const appData = database.getRepository(Feedback);
    appData.save(createFeedbackDto);
    return Result.success({});
  }

  findAll(type: number) {
    const result = this.db.data.filter((item) => item.status === +type);
    return Result.success(result);
  }

  findOne(id: number) {
    return Mock.mock({
      feedback: {
        'id|+1': id,
        title: '@ctitle(10, 20)',
        createTime: '@datetime',
        'status|0-1': 1,
        'unread|0-100': 1,
        note: '@cparagraph',
      },
    });
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
