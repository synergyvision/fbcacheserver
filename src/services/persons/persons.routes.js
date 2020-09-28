import { Router } from 'express';
import { personsController } from "./persons.controller";
const router = Router();

router.get('/', personsController.getAll)
router.post('/', personsController.insert)
router.post('/:id', personsController.insertWithID)
router.put('/:id', personsController.update)
router.delete('/:id', personsController.delete)

export const personsRouter = router;