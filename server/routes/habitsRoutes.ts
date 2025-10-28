import { Router } from "express";
import { getAllHHabits, createHabit, editHabit, deleteHabit, getHabitsProgress} from "../controllers/habitsController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

//get all users habits
router.get('/', requireAuth, getAllHHabits);

//create a new habit
router.post('/', requireAuth, createHabit);

//update a habit
router.put('/:id', requireAuth, editHabit);

//delate a habit
router.delete('/:id', requireAuth, deleteHabit);

//get progress stat for habit
router.get('/:id/progress', requireAuth, getHabitsProgress);

export default router;