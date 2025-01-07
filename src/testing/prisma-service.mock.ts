import { PrismaService } from "../prisma/prisma.service";

export const PrismaServiceMock = {
    provide: PrismaService,
    useValue: {
        user: {
            // Todos os métodos que o UserService chama precisam estar aqui
            findFirst: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
    }
}