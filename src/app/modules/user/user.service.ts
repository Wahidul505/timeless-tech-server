import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from './user.interface';
import { User } from './user.model';

const signUp = async (payload: IUser): Promise<string> => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const result = await User.create(payload);

  const userInfo = {
    userId: result?.id,
    userEmail: result?.email,
  };

  const token = await jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  return token;
};

const signIn = async (payload: Partial<IUser>): Promise<string> => {
  const isUserExist = await User.findOne({ email: payload.email }).select(
    '+password'
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  console.log(isUserExist);

  if (isUserExist.password !== payload.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't matched");
  }

  const userInfo = {
    userId: isUserExist?.id,
    userEmail: isUserExist?.email,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  return token;
};

export const UserService = {
  signUp,
  signIn,
};
