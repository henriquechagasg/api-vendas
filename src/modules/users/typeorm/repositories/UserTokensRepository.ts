import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserToken';

@EntityRepository(UserTokens)
class UserTokensRepository extends Repository<UserTokens> {
  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }

  public async findByUserId(user_id: string): Promise<UserTokens | undefined> {
    const userToken = await this.findOne({
      where: {
        user_id,
      },
    });

    return userToken;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }
}

export default UserTokensRepository;
