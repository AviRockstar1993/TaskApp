import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasks, addTask as dbAddTask, updateTask as dbUpdateTask, toggleTask as dbToggleTask, deleteTask as dbDeleteTask, Task } from '../services/db';

export interface TasksState {
  items: Task[];
  loading: boolean;
  error?: string | null;
}

const initialState: TasksState = { items: [], loading: false, error: null };

export const loadTasks = createAsyncThunk('tasks/load', async () => {
  const tasks = await getTasks();
  return tasks;
});

export const addTask = createAsyncThunk(
  'tasks/add',
  async (title: string, { rejectWithValue }) => {
    try {
      console.log("Thunk Started");

      const id = await dbAddTask(title);

      console.log("Inserted ID:", id);

      const tasks = await getTasks();

      return tasks;
    } catch (e:any) {
      console.error("Thunk Error:", e);
       console.error("Message:", e?.message);
      return rejectWithValue(e);
    }
  }
);

export const editTask = createAsyncThunk('tasks/edit', async ({ id, title }: { id: number; title: string }, { rejectWithValue }) => {
  try {
    console.log("1. Thunk Started");

    await dbUpdateTask(id, title);
    return await getTasks();
  } catch (e) {
    console.error("Thunk Error:", e);
    return rejectWithValue(e);
  }
});

export const toggleTask = createAsyncThunk('tasks/toggle', async ({ id, completed }: { id: number; completed: number }, { rejectWithValue }) => {
  try {
    await dbToggleTask(id, completed);
    return await getTasks();
  } catch (e) {
    console.error("Thunk Error:", e);
    return rejectWithValue(e);
  }
});

export const removeTask = createAsyncThunk('tasks/remove', async (id: number) => {
  await dbDeleteTask(id);
  return await getTasks();
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => { state.loading = true; })
      .addCase(loadTasks.fulfilled, (state, action: PayloadAction<Task[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(loadTasks.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(addTask.pending, (state) => { state.loading = true; })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(addTask.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(editTask.pending, (state) => { state.loading = true; })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(editTask.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(toggleTask.pending, (state) => { state.loading = true; })
      .addCase(toggleTask.fulfilled, (state, action: PayloadAction<Task[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(toggleTask.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(removeTask.pending, (state) => { state.loading = true; })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<Task[]>) => { state.items = action.payload; state.loading = false; })
      .addCase(removeTask.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  }
});

export default tasksSlice.reducer;
