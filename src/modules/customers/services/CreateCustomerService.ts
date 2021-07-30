import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);
    return customer;
  }
}

export default CreateCustomerService;
