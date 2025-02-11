import { api } from './api';

// ✅ Fetch Todos
export const fetchTodos = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/todos?page=${page}&limit=${limit}&order=dsc`
  );
  return response.data;
};

// ✅ Add Todo
export const addTodo = async (title: string) => {
  const response = await api.post('/todos', { title, completed: false });
  return response.data;
};

// ✅ Update Todo (Support Title & Completed)
// ✅ Update Todo (Pastikan Format Data)
export const updateTodo = async (
  id: string,
  data: { title: string; completed: boolean; date?: string }
) => {
  const formattedData = {
    ...data,
    completed: Boolean(data.completed),
    date: data.date ? new Date(data.date).toISOString() : undefined,
  };

  console.log('Sending Update Request:', formattedData);

  const response = await api.put(`/todos/${id}`, formattedData);
  return response.data;
};

// ✅ Delete Todo
export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
