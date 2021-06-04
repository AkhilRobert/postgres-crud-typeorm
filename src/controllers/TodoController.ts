import { Request, Response } from 'express';

import { Todo } from '../entity/Todo';

export const getAllTodos = async (req: Request, res: Response) => {
    const todos = await Todo.find();

    res.status(200).json({ message: 'Success', todos });
};

export const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;

    const todo = new Todo();
    todo.title = title;

    await todo.save();

    return res.status(201).json({ message: todo });
};

export const deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await Todo.findOne({ id: parseInt(id) });

    if (todo) {
        return res.status(200).json({ message: 'todo deleted', todo });
    }

    return res.status(404).json({ message: 'todo not found' });
};

export const updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, isCompleted } = req.body;

    const todo = await Todo.findOne({ id: parseInt(id) });

    if (!todo) {
        return res.status(404).json({ message: 'todo not found' });
    }

    todo.title = title || todo.title;
    todo.isCompleted = isCompleted || todo.isCompleted;

    await todo.save();

    return res.status(200).json({ message: 'success', todo });
};

export const getTodoByID = async (req: Request, res: Response) => {
    const id = req.params.id;

    const todo = await Todo.findOne({ id: parseInt(id) });

    if (!todo) {
        return res.status(404).json({ message: 'todo not found' });
    }

    return res.json({ message: 'Success', todo });
};
