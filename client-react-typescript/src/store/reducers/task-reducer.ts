import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  desc: string;
  date: Date;
  status: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },

    putAllTasks: (state, action) => {
      state.tasks.push(...action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        const updatedTasks = [...state.tasks];

        updatedTasks[index] = action.payload;

        state.tasks = updatedTasks;
      }
    },

    deleteTask: (state, action: PayloadAction<Task>) => {
      const tasks = state.tasks.filter((task) => task.id !== action.payload.id);

      state.tasks = tasks;
    },

    filterTasks: (state, action) => {
      state.tasks = action.payload;
    },

    filterByStatus: (state, action: PayloadAction<string>) => {
      const filteredTasks = state.tasks.filter(
        (task) => task.status === action.payload
      );

      return { ...state, tasks: filteredTasks };
    }
  },
});

export const {
  addTask,
  putAllTasks,
  updateTask,
  deleteTask,
  filterTasks,
  filterByStatus,
} = TaskSlice.actions;
export default TaskSlice.reducer;
