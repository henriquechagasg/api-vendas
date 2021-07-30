import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/Products';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
