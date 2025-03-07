import { CreateRegistryDto } from './createdto';

export class UpdateRegistryDto extends CreateRegistryDto {
  constructor(partial: Partial<CreateRegistryDto>) {
    super();
    Object.assign(this, partial);
  }
}
