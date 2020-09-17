import { Router } from 'express';
import { personsController } from "./persons.controller";
const router = Router();

router.get('/', personsController.getAll)
router.post('/', personsController.insert)

export const personsRouter = router;