import { useEffect } from 'react';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '@/services/todoServices';

const TestAPI = () => {
  useEffect(() => {
    const testAPI = async () => {
      console.log(await fetchTodos()); // Get Todos
      console.log(await addTodo('Belajar Optimistic UI')); // Add Todo
      console.log(await updateTodo('todo_id', true)); // Update Todo
      console.log(await deleteTodo('todo_id')); // Delete Todo
    };

    testAPI();
  }, []);

  return <div>Check Console for API Test</div>;
};

export default TestAPI;
