import { Router } from "express";
import { getAllHHabits, createHabit, editHabit, deleteHabit, getHabitsProgress}

const router = Router();

//get all users habits
router.get('/', getAllHHabits);

//create a new habit
router.post('/', createHabit);

//update a habit
router.put('/:id', editHabit);

//delate a habit
router.delete('/:id', deleteHabit);

//get progress stat for habit
router.get('/:id/progress', getHabitsProgress);

export default router;