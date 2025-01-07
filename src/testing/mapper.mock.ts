import { MapperService } from "../mapper/mapper.service";

export const MapperMock = {
    provide: MapperService,
    useValue: { 
        map: jest.fn() 
    }
}