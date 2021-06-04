import { Router } from 'express';

import { createTodo, deleteTodo, getAllTodos, getTodoByID, updateTodo } from '../controllers/TodoController';

const router = Router();

router.get('/todos', getAllTodos);

router.post('/todos', createTodo);

router.delete('/todos/:id', deleteTodo);

router.put('/todos/:id', updateTodo);

router.get('/todos/:id', getTodoByID);

export { router as TodoRoute };
