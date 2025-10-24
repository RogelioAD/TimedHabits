import { RequestHandler } from "express";
import { Habit } from "../models/habit";
import { User } from "../models/user";

export const getAllHHabits: RequestHandler = async (req, res, next) => {
    console.log('this getAllHabits api is being called')
    try {
        let habits = await Habit.findAll();
        res.status(200).json(habits)
    } catch (err) {
        return res.status(404).json({ message: 'There are no habits!' });
    }

}

export const createHabit: RequestHandler = async (req, res, next) => {
    console.log('this createChat api is being called');
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(401).send('User is not authenticated');
    }

    const { id, userId, name, description, goalTimeMinutes, color, isActive, createdAt, updatedAt } = req.body;

    if (!id || !userId || !name || !description || !goalTimeMinutes || !color || !isActive || !createdAt || !updatedAt) {
        return res.status(400).json({ message: 'All information is needed when creating habits' });
    }

    try {
        const newHabit = await Habit.create({
            userId,
            name,
            description,
            goalTimeMinutes,
            color,
            isActive,
            createdAt,
            updatedAt
        });

        res.status(201).json(newHabit);
    } catch (err) {
        console.error('Error creating habit:', err);
        res.status(500).send(err);
    }
};
//start refactoring from this comment last coding sesh 10/23
export const editHabit: RequestHandler = async (req, res, next) => {
    console.log('this editChat api is being called');

    try {
        const user: User | null = await verifyUser(req);
        const { chatId } = req.params;

        if (!user) {
            return res.status(401).send('User is not authenticated');
        }

        const chatFound = await Chat.findByPk(chatId);

        if (!chatFound) {
            return res.status(404).send('Chat not found');
        }

        const updatedFields = req.body;

        await chatFound.update(updatedFields);
        res.status(200).json(chatFound);

    } catch (err) {
        console.error('Error editing chat:', err);
        res.status(500).send(err);
    }
};

export const deleteHabit: RequestHandler = async (req, res, next) => {
    console.log('this deleteChat api is being called');

    try {
        const user: User | null = await verifyUser(req);
        let { chatId } = req.params;

        if (!user) {
            return res.status(401).send('User is not authenticated');
        }

        let chatFound = await Chat.findByPk(chatId);

        if (chatFound) {
            await Chat.destroy({
                where: { chatId: chatId }
            });
            res.status(200).json();
        }
        else {
            res.status(404).json();
        }

    } catch (err) {
        console.error('Error deleting chat:', err);
        res.status(500).send(err);
    }
}

export const getHabitsProgress: RequestHandler = async (req, res, next) => {
    console.log('this getOneChat api is being called')
    let { chatId } = req.params;
    let chat = await Chat.findByPk(chatId);
    res.status(200).json(chat);
}