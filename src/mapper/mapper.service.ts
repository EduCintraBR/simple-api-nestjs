import { Injectable } from '@nestjs/common';
import { MappingProfile } from './mapping-profile.interface';

@Injectable()
export class MapperService {
  private profiles: MappingProfile[] = [];

  /**
   * Registra um novo perfil de mapeamento no serviço
   * @param profile 
   */
  registerProfile(profile: MappingProfile) {
    this.profiles.push(profile);
  }

  /**
   * Localiza e utiliza o perfil adequado para mapear a instância "source"
   * @param source Instância da entidade
   * @param sourceType A classe da entidade
   * @param destinationType A classe do DTO
   * @returns 
   */
  map<S, D>(
    source: S,
    sourceType: new (...args: any[]) => S,
    destinationType: new (...args: any[]) => D,
  ): D {
    const profile = this.profiles.find(
      (p) =>
        p.sourceType === sourceType &&
        p.destinationType === destinationType,
    );
  
    if (!profile) {
      throw new Error(
        `Nenhum profile de mapeamento registrado para origem ${sourceType.name} e destino ${destinationType.name}`,
      );
    }
  
    return profile.map(source) as D;
  }  
}