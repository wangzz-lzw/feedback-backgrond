import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { database } from '../db';
@Injectable()
export class UsersService {
  constructor() {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const appData = database.getRepository(User);
    const user = appData.create(createUserDto);
    return await appData.save(user);
  }

  async findAll(): Promise<User[]> {
    const appData = database.getRepository(User);
    return await appData.find();
  }

  async findOne(id: number): Promise<User> {
    const appData = database.getRepository(User);
    const user = await appData.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findOneByName(name: string, flag: boolean = false): Promise<User> {
    const appData = database.getRepository(User);
    const user = await appData.findOneBy({ username: name });
    if (!user && !flag) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const appData = database.getRepository(User);
    const user = await this.findOne(id); // 复用查找逻辑
    appData.merge(user, updateUserDto);
    return await appData.save(user);
  }

  async remove(id: number): Promise<void> {
    const appData = database.getRepository(User);
    const result = await appData.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
