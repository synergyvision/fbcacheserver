import { Router } from 'express';
import { usersController } from "./users.controller";
const router = Router();

router.get('/', usersController.getAll);
router.post('/', usersController.insert);
router.post('/:id', usersController.insertWithID);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete)

export const usersRouter = router;