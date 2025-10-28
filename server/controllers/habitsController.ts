import { RequestHandler } from "express";
import { Habit } from "../models/habit";
import { User } from "../models/user";
import { verifyUser } from "../middleware/authMiddleware";

export const getAllHHabits: RequestHandler = async (req, res, next) => {
    console.log('this getAllHabits api is being called')
    try {
        const user = await verifyUser(req);
        if (!user) {
            return res.status(401).json({ message: 'User is not authenticated' });
        }
        
        //where:{ userId: user.id } this is looking into User model because user is sourced from verifyUUser which returns user from User model
        let habits = await Habit.findAll({ where: { userId: user.id } });
        res.status(200).json(habits)
    } catch (err) {
        return res.status(404).json({ message: 'There are no habits!' });
    }
}

export const createHabit: RequestHandler = async (req, res, next) => {
    console.log('this createHabit api is being called');
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(401).send('User is not authenticated');
    }

    const { name, description, goalTimeMinutes, color, isActive } = req.body;

    if (!name || !description || !goalTimeMinutes || !color || isActive === undefined) {
        return res.status(400).json({ message: 'All information is needed when creating habits' });
    }

    try {
        const newHabit = await Habit.create({
            userId: user.id, // Use the authenticated user's ID from verifyUser
            name,
            description,
            goalTimeMinutes,
            color,
            isActive
        });

        res.status(201).json(newHabit);
    } catch (err) {
        console.error('Error creating habit:', err);
        res.status(500).send(err);
    }
};

export const editHabit: RequestHandler = async (req, res, next) => {
    console.log('this editHabit api is being called');

    try {
        const user: User | null = await verifyUser(req);
        const { id } = req.params;

        if (!user) {
            return res.status(401).send('User is not authenticated');
        }

        const habitFound = await Habit.findByPk(id);

        if (!habitFound) {
            return res.status(404).send('Habit not found');
        }

        const updatedFields = req.body;

        await habitFound.update(updatedFields);
        res.status(200).json(habitFound);

    } catch (err) {
        console.error('Error editing chat:', err);
        res.status(500).send(err);
    }
};

export const deleteHabit: RequestHandler = async (req, res, next) => {
    console.log('this deleteHabit api is being called');

    try {
        const user: User | null = await verifyUser(req);
        let { id } = req.params;

        if (!user) {
            return res.status(401).send('User is not authenticated');
        }

        let habitFound = await Habit.findByPk(id);

        if (habitFound) {
            await Habit.destroy({
                where: { id: id }
            });
            res.status(200).json();
        }
        else {
            res.status(404).json();
        }

    } catch (err) {
        console.error('Error deleting habit:', err);
        res.status(500).send(err);
    }
}

//TODO: Refactor this api call to do its intended purposes
export const getHabitsProgress: RequestHandler = async (req, res, next) => {
    console.log('this getHabitsProgress api is being called')
    let { id } = req.params;
    let habit = await Habit.findByPk(id);
    res.status(200).json(habit);
}