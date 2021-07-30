import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/Products';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('This product name is already registered.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
