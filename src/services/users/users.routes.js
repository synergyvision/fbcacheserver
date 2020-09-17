import { Router } from 'express';
import { usersController } from "./users.controller";
const router = Router();

router.get('/', usersController.getAll);
router.post('/', usersController.insert);

export const usersRouter = router;