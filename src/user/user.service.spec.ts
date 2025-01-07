import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaServiceMock } from "../testing/prisma-service.mock";
import { MapperMock } from "../testing/mapper.mock";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Role } from "../enums/role.enum";
import { userListMock } from "../testing/user-list.mock";
import { PrismaService } from "../prisma/prisma.service";
import { MapperService } from "../mapper/mapper.service";

describe('UserService', () => {
    let userService: UserService;
    let prismaService: PrismaService;
    let mapperService: MapperService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                PrismaServiceMock,
                MapperMock
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        prismaService = module.get<PrismaService>(PrismaService);
        mapperService = module.get<MapperService>(MapperService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('Create', () => {
        
        it('deve criar um novo usuário com sucesso', async () => {
            const data: CreateUserDTO = {
                email: 'eduardo.cintra@gmail.com',
                name: 'Eduardo Cintra',
                password: '$2b$10$t7EWWtW.ql.BsFWlD4NdtOUoOB0hJEUin3UYvKCxmc5ezHVdrn0su',
                role: Role.ADMIN
            };

            // Simulando que NÃO existe um usuário com esse email
            (prismaService.user.findFirst as jest.Mock).mockResolvedValue(null);

            // Simulando retorno do create
            (prismaService.user.create as jest.Mock).mockResolvedValue(userListMock[0]);

            // Act
            const result = await userService.create(data);

            // Assert
            expect(result).toEqual(userListMock[0]);
            expect(prismaService.user.findFirst).toHaveBeenCalledWith({
                where: { email: data.email },
            });
            expect(prismaService.user.create).toHaveBeenCalled();
        });

        it('deve disparar erro se email já existir', async () => {
            const data: CreateUserDTO = {
              email: 'eduardo.cintra@gmail.com',
              name: 'Eduardo Cintra',
              password: 'dummy_password',
              role: Role.ADMIN,
            };
      
            // Simulando que JÁ existe um usuário com esse email
            (prismaService.user.findFirst as jest.Mock).mockResolvedValue(userListMock[0]);
      
            // Act & Assert
            await expect(userService.create(data)).rejects.toThrow(
              'User email already exists',
            );
          });
    });


    describe('findAll', () => {
        it('deve retornar uma lista de usuários devidamente mapeados', async () => {
          // Simulando retorno do findMany
          (prismaService.user.findMany as jest.Mock).mockResolvedValue(userListMock);
    
          // Simulando que o mapper converte UserModel -> UserDto
          // Aqui, só pra simplificar, vamos assumir que map retorna o próprio objeto
          (mapperService.map as jest.Mock).mockImplementation((user) => user);
    
          const result = await userService.findAll();
          expect(result).toEqual(userListMock);
          expect(prismaService.user.findMany).toHaveBeenCalled();
          // Repare que, internamente, ele chama o mapper para cada user
          expect(mapperService.map).toHaveBeenCalledTimes(userListMock.length);
        });
      });
    
      describe('findOne', () => {
        it('deve retornar o usuário mapeado se existir', async () => {
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(userListMock[0]);
          (mapperService.map as jest.Mock).mockImplementation((user) => user);
    
          const result = await userService.findOne(1);
          expect(result).toEqual(userListMock[0]);
          expect(prismaService.user.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
          });
        });
    
        it('deve disparar erro se usuário não encontrado', async () => {
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
    
          await expect(userService.findOne(999)).rejects.toThrowError('User not found');
        });
      });
    
      describe('update', () => {
        it('deve atualizar o usuário se ele existir', async () => {
          // Precisamos simular a existência do usuário
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(userListMock[0]);
    
          // E simular que o update retorna algo (ex: user atualizado)
          const updatedUser = { ...userListMock[0], name: 'Novo nome' };
          (prismaService.user.update as jest.Mock).mockResolvedValue(updatedUser);
    
          const result = await userService.update(1, {
            ...userListMock[0],
            name: 'Novo nome',
          });
          expect(result).toEqual(updatedUser);
          expect(prismaService.user.update).toHaveBeenCalled();
        });
    
        it('deve disparar erro se usuário não existir (update)', async () => {
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
    
          await expect(
            userService.update(999, {
              ...userListMock[0],
              name: 'Novo nome',
            }),
          ).rejects.toThrowError('User not found');
        });
      });
    

      describe('updatePartial', () => {
        it('deve atualizar parcialmente o usuário', async () => {
          // Precisamos simular a existência do usuário
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(userListMock[0]);
    
          const partialData = { name: 'Parcialmente atualizado' };
          const updatedUser = { ...userListMock[0], ...partialData };
          (prismaService.user.update as jest.Mock).mockResolvedValue(updatedUser);
    
          const result = await userService.updatePartial(1, partialData);
          expect(result).toEqual(updatedUser);
          expect(prismaService.user.update).toHaveBeenCalled();
        });
    
        it('deve disparar erro se usuário não existir (updatePartial)', async () => {
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
    
          await expect(
            userService.updatePartial(999, { name: 'Teste' }),
          ).rejects.toThrowError('User not found');
        });
      });
    

      describe('remove', () => {
        it('deve remover o usuário se ele existir', async () => {
          // Precisamos simular a existência do usuário
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(userListMock[0]);
    
          // E simular que o delete foi bem-sucedido
          (prismaService.user.delete as jest.Mock).mockResolvedValue(userListMock[0]);
    
          const result = await userService.remove(1);
          expect(result).toEqual(userListMock[0]);
          expect(prismaService.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    
        it('deve disparar erro se usuário não existir (remove)', async () => {
          (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
    
          await expect(userService.remove(999)).rejects.toThrowError('User not found');
        });
      });
});