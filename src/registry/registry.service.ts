import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateRegistryDto } from './dto/createdto';
import { database } from 'src/db';
import { User } from '../entities';
@Injectable()
export class RegistryService {
  constructor(private readonly usersService: UsersService) {}
  async registry(registry: CreateRegistryDto) {
    const appData = database.getRepository(User);
    const users = await this.usersService.findOneByName(
      registry.username,
      true,
    );
    if (users) {
      throw new BadRequestException('用户已存在');
    }
    return await appData.save(registry);
  }
  async resetPassword(body: CreateRegistryDto) {
    const existingUser = await this.usersService.findOneByName(body.username);
    if (!existingUser) {
      throw new NotFoundException('用户不存在');
    }
    const updatedUser = await this.usersService.update(existingUser.id, body);
    return updatedUser;
  }
}
