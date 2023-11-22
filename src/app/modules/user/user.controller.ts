import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.signUp(req.body);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account created!',
    data: result,
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.signIn(req.body);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Sign in',
    data: result,
  });
});

export const UserController = {
  signUp,
  signIn,
};
