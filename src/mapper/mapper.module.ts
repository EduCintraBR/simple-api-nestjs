import { Module, OnModuleInit } from '@nestjs/common';
import { UserMappingProfile } from 'src/mapper/profiles/user-mapping.profile';
import { MapperService } from './mapper.service';

@Module({
  providers: [
    MapperService,
    UserMappingProfile,
  ],
  exports: [MapperService],
})
export class MapperModule implements OnModuleInit {
  constructor(
    private readonly mapperService: MapperService,
    private readonly userMappingProfile: UserMappingProfile,
  ) {}

  onModuleInit() {
    // Registrar cada perfil no MapperService
    this.mapperService.registerProfile(this.userMappingProfile);
  }
}