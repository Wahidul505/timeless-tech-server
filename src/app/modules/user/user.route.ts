import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

export const UserRoutes = router;
