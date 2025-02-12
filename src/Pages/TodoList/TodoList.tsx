import { useGetTodos } from '@/hooks/useGetTodos';
import { useAddTodo } from '@/hooks/useAddTodo';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { useState } from 'react';
import styles from './TodoList.module.scss';

// ✅ Komponen utama TodoList
const TodoList = () => {
  const [page, setPage] = useState(1); // 🔄 State untuk mengatur halaman paginasi

  // 🛠️ Menggunakan custom hooks untuk mengambil, menambah, mengupdate, dan menghapus todo
  const { data, isLoading } = useGetTodos(page, 10); // Fetch todos per halaman (limit 10)
  const addTodoMutation = useAddTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  // 📝 Handler untuk menambahkan todo
  const handleAddTodo = () => {
    const title = prompt('Enter todo title:'); // 🔹 Ambil input dari user
    if (title) {
      addTodoMutation.mutate(title); // 🔄 Mutasi untuk menambahkan todo baru
    }
  };

  // ✏️ Handler untuk mengedit todo
  const handleEditTodo = (
    id: string,
    oldTitle: string,
    completed: boolean,
    date?: string
  ) => {
    const newTitle = prompt('Edit todo title:', oldTitle); // Prompt tetap hanya untuk title
    if (newTitle !== null) {
      updateTodoMutation.mutate({ id, title: newTitle, completed, date }); // Pastikan date dikirim
    }
  };

  // ✅ Handler untuk toggle status todo (completed / uncompleted)
  const handleToggleTodo = (id: string, title: string, completed: boolean) => {
    updateTodoMutation.mutate({ id, title, completed: !completed }); // 🔄 Ubah status `completed`
  };

  // ❌ Handler untuk menghapus todo
  const handleDeleteTodo = (id: string) => {
    if (confirm('Are you sure?')) {
      deleteTodoMutation.mutate(id); // 🔄 Mutasi untuk hapus todo
    }
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>

      {/* ➕ Tombol untuk menambahkan todo */}
      <button className={styles.addTodoButton} onClick={handleAddTodo}>
        + Add Todo
      </button>

      {/* ⏳ Loading state saat data masih di-fetch */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* 🔄 Render daftar todo */}
          {data?.todos.map((todo) => (
            <li key={todo.id}>
              {/* 📝 Teks todo yang bisa diklik untuk toggle status completed */}
              <span
                className={`${styles.todoText} ${
                  todo.completed ? styles.completed : '' // Tambahkan class jika todo sudah selesai
                }`}
                onClick={() =>
                  handleToggleTodo(todo.id, todo.title, todo.completed)
                }
              >
                {todo.title}
              </span>

              {/* ✏️ Tombol untuk edit todo */}
              <button
                className={styles.updateButton}
                onClick={() =>
                  handleEditTodo(todo.id, todo.title, todo.completed, todo.date)
                }
              >
                ✏️
              </button>

              {/* ❌ Tombol untuk menghapus todo */}
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 🔄 Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TodoList;

/*
📌 Penjelasan Tiap Bagian:
State & Hooks:

useState(page) untuk menyimpan halaman saat ini.
Menggunakan custom hooks (useGetTodos, useAddTodo, useUpdateTodo, useDeleteTodo) untuk manajemen data.
Handlers:

handleAddTodo: Mengambil input dari prompt() dan menambahkannya dengan useAddTodo.
handleEditTodo: Mengedit title todo yang sudah ada.
handleToggleTodo: Mengubah status completed dari todo.
handleDeleteTodo: Menghapus todo setelah konfirmasi.
UI & Interaksi:

isLoading: Jika masih loading, tampilkan Loading....
Daftar todo (map dari data.todos).
Pagination dengan tombol Prev & Next.
🚀 Kelebihan Implementasi Ini:
✅ Menggunakan React Query → Manajemen state lebih efisien.
✅ Optimistic UI → Perubahan terasa instan di UI.
✅ SCSS Module → Styling lebih modular & terpisah.
✅ Pagination → Bisa navigasi antar halaman todo.

🔥 Dengan struktur ini, Todo App jadi lebih efisien, interaktif, dan scalable!
*/
