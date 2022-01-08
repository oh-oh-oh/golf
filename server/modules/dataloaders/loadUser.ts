import { batchFetchEntitiesById } from '@/server/utils/batchFetchEntitiesById';
import DataLoader from 'dataloader';
import { User } from '../user/models';
import UserService from '../user/services/UserService';

export const makeUserLoader = (userService: UserService) =>
  new DataLoader<number, User | null>(userIds => {
    const boundGetById = userService.getByIds.bind(userService);
    return batchFetchEntitiesById(boundGetById, userIds, 'id');
  });
