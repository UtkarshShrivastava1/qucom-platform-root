import type { Router } from 'express';
import { UserModel } from './auth.model.js';
import { createAuthRepository } from './auth.repository.js';
import { authRouter } from './auth.routes.js';
import * as authService from './auth.service.js';
import { eventBus, type IEventBus } from '../../shared/events/eventBus.js';
import type { IAuthRepository, IUserDocument } from './auth.types.js';
import type { Model } from 'mongoose';

export interface AuthModule {
  router: Router;
  repository: IAuthRepository;
  service: typeof authService;
}

export function createAuthModule(
  events: IEventBus = eventBus,
  model: Model<IUserDocument> = UserModel as unknown as Model<IUserDocument>,
): AuthModule {
  const repository = createAuthRepository(model);
  const router = authRouter;

  return { router, repository, service: authService };
}
