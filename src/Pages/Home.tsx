import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList/TodoList';
import TestAPI from '@/__test__/test';
import { TodoListAll } from './TodoListAll/TodoListAll';
export const Home: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/allTodos' element={<TodoListAll />} />
        <Route path='/test' element={<TestAPI />} />
      </Routes>
    </Router>
  );
};
