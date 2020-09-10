import { Router } from 'express';
import { personsRouter } from "../services/persons/persons.routes";
import { usersRouter } from "../services/users/users.routes";

const router = Router();

router.use('/persons', personsRouter);
router.use('/users', usersRouter);

export const apiRouter = router;