import { api } from './api';

// ✅ Fetch Todos (Mengambil daftar todos dari backend dengan paginasi)
export const fetchTodos = async (page = 1, limit = 10) => {
  // Mengirim permintaan GET ke endpoint `/todos` dengan query parameter page, limit, dan order
  const response = await api.get(
    `/todos?page=${page}&limit=${limit}&order=dsc` // Mengambil todos dengan urutan descending (terbaru di atas)
  );
  return response.data; // Mengembalikan data todos yang didapat dari server
};

// ✅ Add Todo (Menambahkan todo baru ke server)
// export const addTodo = async (title: string) => {
//   // Mengirim permintaan POST ke endpoint `/todos` dengan data title dan status completed default false
//   const response = await api.post('/todos', { title, completed: false });
//   return response.data; // Mengembalikan data todo yang baru dibuat dari server
// };

// simulasi kalo gagal
export const addTodo = async (title: string) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.log('⛔ Simulasi error: Gagal menambahkan todo');
      reject(new Error('Failed to add todo'));
    }, 1000); // Simulasi error setelah 1 detik
  });
};

// ✅ Update Todo (Memperbarui todo berdasarkan ID, bisa mengubah title dan status completed)
export const updateTodo = async (
  id: string, // ID todo yang akan diperbarui
  data: { title: string; completed: boolean; date?: string } // Data yang diperbarui, opsional bisa menyertakan date
) => {
  // Format data sebelum dikirim ke backend
  const formattedData = {
    ...data,
    completed: Boolean(data.completed), // Pastikan nilai completed selalu boolean
    date: data.date ? new Date(data.date).toISOString() : undefined, // Pastikan date diformat ke ISO 8601 jika ada
  };

  console.log('Sending Update Request:', formattedData); // Debugging: Menampilkan data yang dikirim di console

  // Mengirim permintaan PUT ke endpoint `/todos/:id` dengan data yang telah diformat
  const response = await api.put(`/todos/${id}`, formattedData);
  return response.data; // Mengembalikan data todo yang telah diperbarui dari server
};

// ✅ Delete Todo (Menghapus todo berdasarkan ID)
export const deleteTodo = async (id: string) => {
  // Mengirim permintaan DELETE ke endpoint `/todos/:id`
  const response = await api.delete(`/todos/${id}`);
  return response.data; // Mengembalikan respons dari server setelah todo dihapus
};
