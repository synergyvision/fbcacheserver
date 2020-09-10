import { Router } from 'express';
import { usersController } from "./users.controller";
const router = Router();

router.get('/', usersController.getAll)

export const usersRouter = router;