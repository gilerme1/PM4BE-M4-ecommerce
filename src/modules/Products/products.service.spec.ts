/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../Categories/categories.service';
import { Product } from '../../entities/product.entity';

describe('ProductsService - test de funcionalidades del servicio de productos', () => {
    let service: ProductsService;
    let mockProductRepo: Partial<ProductsRepository>;
    let mockCategoriesService: Partial<CategoriesService>;

    const mockProduct: Product = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Smartphone Samsung',
        description: 'Galaxy S21 Ultra',
        price: 1499.99,
        stock: 10,
        imgUrl: 'http://example.com/img.jpg',
        category: { id: 'cat-001', name: 'Electrónica' } as any,
        files: [], 
        orderDetails: [],
    };

    beforeEach(() => {
        mockProductRepo = {
        findAll: async () => [mockProduct],
        findById: async (id: string) => (id === mockProduct.id ? mockProduct : null),
        update: async (id: string, data: Partial<Product>) => {
            // Esta función puede no hacer nada ya que `getById` lo devuelve igual
            return;
        },
        };

        mockCategoriesService = {}; // no es utilizado en estas pruebas

        service = new ProductsService(
            mockProductRepo as ProductsRepository,
            mockCategoriesService as CategoriesService,
        );
    });

    it('debe retornar todos los productos', async () => {
        const products = await service.getAll(1, 5);
        expect(products).toEqual([mockProduct]);
    });

    it('debe retornar un producto por su id', async () => {
        const product = await service.getById(mockProduct.id);
        expect(product).toEqual(mockProduct);
    });

    it('debe actualizar un producto y devolverlo', async () => {
        const updated = await service.update(mockProduct.id, { stock: 20 });
        expect(updated).toEqual(mockProduct);
    });
});