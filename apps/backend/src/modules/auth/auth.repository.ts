import type { Model } from 'mongoose';
import type {
  IUserDocument,
  IAuthRepository,
  RegisterDto,
} from './auth.types.js';

export function createAuthRepository(
  userModel: Model<IUserDocument>,
): IAuthRepository {
  const findByEmail = async (email: string): Promise<IUserDocument | null> => {
    return userModel.findOne({ email: email.toLowerCase() });
  };

  const findById = async (id: string): Promise<IUserDocument | null> => {
    return userModel.findById(id);
  };

  const create = async (data: RegisterDto & { password: string }): Promise<IUserDocument> => {
    return userModel.create({
      ...data,
      email: data.email.toLowerCase(),
    });
  };

  const saveRefreshToken = async (id: string, token: string): Promise<void> => {
    await userModel.findByIdAndUpdate(id, { refreshToken: token });
  };

  const clearRefreshToken = async (id: string): Promise<void> => {
    await userModel.findByIdAndUpdate(id, { $unset: { refreshToken: 1 } });
  };

  const setActive = async (id: string, isActive: boolean): Promise<void> => {
    await userModel.findByIdAndUpdate(id, { isActive });
  };

  return {
    findByEmail,
    findById,
    create,
    saveRefreshToken,
    clearRefreshToken,
    setActive,
  };
}
