import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
