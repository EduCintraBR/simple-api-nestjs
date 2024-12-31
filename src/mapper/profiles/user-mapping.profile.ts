import { Injectable } from "@nestjs/common";
import { UserDto } from "../../user/dto/user.dto";
import { MappingProfile } from "src/mapper/mapping-profile.interface";
import { UserModel } from "../../user/models/user.model";

@Injectable()
export class UserMappingProfile implements MappingProfile<UserModel, UserDto> {
  sourceType = UserModel;
  destinationType = UserDto;

  map(source: UserModel): UserDto {
    return {
      email: source.email,
      name: source.name,
      password: source.password,
      role: source.role,
    };
  }
}