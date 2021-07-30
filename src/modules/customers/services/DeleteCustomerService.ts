import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
