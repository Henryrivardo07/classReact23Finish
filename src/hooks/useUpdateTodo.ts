import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/services/todoServices';

// 🛠️ Custom Hook untuk mengupdate Todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient(); // 🔄 Instance Query Client untuk mengelola cache

  return useMutation({
    // ✅ Fungsi untuk melakukan update ke API
    mutationFn: ({
      id,
      title,
      completed,
      date,
    }: {
      id: string;
      title: string;
      completed: boolean;
      date?: string;
    }) =>
      updateTodo(id, {
        title: title.trim(), // 🔍 Pastikan tidak ada spasi berlebih di title
        completed: Boolean(completed), // ✅ Konversi nilai `completed` ke boolean
        date: date ? new Date(date).toISOString() : undefined, // 🕒 Format tanggal ke ISO 8601 jika tersedia
      }),

    // 🔄 Optimistic UI: Memperbarui UI sebelum request selesai
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] }); // 🚫 Batalkan query aktif untuk menghindari konflik

      const previousTodos = queryClient.getQueryData(['todos']); // 📌 Simpan data sebelumnya untuk rollback jika error

      // 🔄 Update data secara optimis di cache
      queryClient.setQueryData(['todos'], (old: any) => ({
        ...old,
        todos: old.todos.map(
          (todo: any) =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo // ✅ Update todo yang sesuai ID
        ),
      }));

      return { previousTodos }; // 🛑 Simpan snapshot data lama untuk rollback
    },

    // ❌ Rollback jika terjadi error
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos); // 🔄 Kembalikan data lama jika gagal update
      }
    },

    // ✅ Setelah sukses atau error, invalidasi query agar data fresh
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

/*
📌 Penjelasan Tiap Bagian:
useMutation

Hook dari TanStack Query yang digunakan untuk melakukan perubahan data (PUT, POST, DELETE).
mutationFn memanggil updateTodo dengan parameter yang sudah diproses.
onMutate (Optimistic UI)

Membatalkan query aktif → menghindari race condition.
Menyimpan snapshot data lama → digunakan jika request gagal.
Mengupdate cache secara optimis → UI langsung berubah tanpa menunggu server.
onError

Jika request gagal, rollback ke data sebelumnya.
onSettled

Memastikan cache di-refresh setelah sukses/gagal.
🚀 Kelebihan Implementasi Ini
✅ Optimistic UI → Perubahan terasa instan bagi user.
✅ Handling Error → Rollback jika request gagal.
✅ Data Selalu Fresh → invalidateQueries memastikan data terbaru di-refresh.

Ini bisa langsung dipakai buat fitur update todo yang responsif dan cepat! 🔥
*/
