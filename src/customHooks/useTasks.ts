import { useEffect, useState } from 'react';
import { initDB } from '../services/db';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loadTasks,
  addTask as addTaskThunk,
  editTask,
  removeTask,
} from '../store/tasksSlice';
import { Task } from '../services/db';

export const useTasks = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(
    state => state.tasks.items
  ) as Task[];

  const [pendingCompleted, setPendingCompleted] = useState<number[]>([]);

  useEffect(() => {
    const initialize = async () => {
      await initDB();
      dispatch(loadTasks());
    };

    initialize();
  }, [dispatch]);

  useEffect(() => {
    setPendingCompleted(
      tasks
        .filter(task => task.completed === 1)
        .map(task => task.id)
    );
  }, [tasks]);

  const addTask = async (title: string) => {
    await dispatch(addTaskThunk(title)).unwrap();
  };

  const updateTask = async (id: number, title: string) => {
    await dispatch(editTask({ id, title })).unwrap();
  };

  const deleteTask = async (id: number) => {
    await dispatch(removeTask(id)).unwrap();
  };

  const toggleTask = (id: number) => {
    setPendingCompleted(prev =>
      prev.includes(id)
        ? prev.filter(taskId => taskId !== id)
        : [...prev, id]
    );
  };

  return {
    tasks,
    pendingCompleted,
    setPendingCompleted,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};