import { forwardRef, Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
@Module({
  controllers: [RegistryController],
  providers: [RegistryService, UsersService],
  imports: [forwardRef(() => UsersModule)],
})
export class RegistryModule {}
