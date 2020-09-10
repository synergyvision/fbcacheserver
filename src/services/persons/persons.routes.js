import { Router } from 'express';
import { personsController } from "./persons.controller";
const router = Router();

router.get('/', personsController.getAll)

export const personsRouter = router;