/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { OrdersService } from '../Orders/order.service';
import { OrdersRepository } from '../Orders/orders.repository';
import { CreateOrderDto } from '../Orders/createOrder.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('OrdersService - test de funcionalidades del servicio de ordenes', () => {
    let service: OrdersService;
    let mockRepo: OrdersRepository;

    beforeEach(() => {
        mockRepo = {
        addOrder: async (dto) => ({
            orderId: 'order-123',
            detailId: 'detail-456',
            total: 100,
            products: ['Producto A', 'Producto B'],
        }),
        getOrder: async (id) => ({
            id,
            user: { id: 'user-1' },
            orderDetail: { id: 'detail-456', price: 100 },
        }),
        } as any;

        service = new OrdersService(mockRepo);
    });

    it('debería crear una orden correctamente', async () => {
        const dto: CreateOrderDto = {
            userId: 'user-1',
            products: [{ id: 'prod-1' }, { id: 'prod-2' }],
        };

        const result = await service.addOrder(dto);

        expect(result).toEqual({
            orderId: 'order-123',
            detailId: 'detail-456',
            total: 100,
            products: ['Producto A', 'Producto B'],
        });
    });

    it('debería lanzar error si repo.addOrder falla', async () => {
        mockRepo.addOrder = async () => {
        throw new Error('Fallo interno');
        };

        await expect(service.addOrder({ userId: 'x', products: [] }))
        .rejects
        .toThrow(InternalServerErrorException);
    });

    it('debería devolver una orden por id', async () => {
        const result = await service.getOrder('order-123');
        expect(result).not.toBeNull();
        if (result) {
            expect(result.id).toBe('order-123');
            expect(result.user.id).toBe('user-1');
        }
    });
});
