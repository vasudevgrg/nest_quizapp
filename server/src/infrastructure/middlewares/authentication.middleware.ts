import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { dataSource } from 'ormconfig';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class authenticateUserMiddleware implements NestMiddleware {
 async use(req: Request, res: Response, next: NextFunction) {
    const user_id = req.cookies['user_id'];
    const user = await dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id= :id', { id: user_id })
      .getOne();

    if (user) {
      next();
    } else {
      return res
        .status(401)
        .send({ message: 'unauthorized User. Login Again' });
    }
  }
}
