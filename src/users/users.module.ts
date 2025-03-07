import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegistryModule } from '../registry/registry.module';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [RegistryModule],
})
export class UsersModule {}
