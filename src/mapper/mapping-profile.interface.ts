export interface MappingProfile<S = any, D = any> {
    // Classe (ou construtor) da entidade de origem
    sourceType: new (...args: any[]) => S;
  
    // Classe (ou construtor) do DTO de destino
    destinationType: new (...args: any[]) => D;
  
    // Método que recebe a instância de S (entidade) e devolve a instância de D (DTO)
    map(source: S): D;
}  