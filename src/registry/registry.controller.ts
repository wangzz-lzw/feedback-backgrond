import { Body, Controller, Post } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { UsersService } from 'src/users/users.service';
import { CreateRegistryDto } from './dto/createdto';
import Result from 'src/interceptor/result.interceptor';
@Controller('registry')
export class RegistryController {
  constructor(
    private readonly registryService: RegistryService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async registry(@Body() registry: CreateRegistryDto) {
    console.log(this.registryService, 'registryService');
    const result = await this.registryService.registry(registry);
    return Result.success(result);
  }

  @Post('reset')
  async resetPassword(@Body() body: CreateRegistryDto) {
    return Result.success(this.registryService.resetPassword(body));
  }
}
