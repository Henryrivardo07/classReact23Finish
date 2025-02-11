import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '@/services/todoServices';

export const useAddTodo = () => {
  // ✅ Mengakses instance QueryClient untuk mengelola cache data
  const queryClient = useQueryClient();

  return useMutation({
    // ✅ Fungsi utama untuk melakukan mutasi (menambah todo)
    mutationFn: addTodo,

    // ✅ Optimistic Update: Jalankan sebelum request dikirim ke server
    onMutate: async ({ title }) => {
      // ❌ Batalkan semua query `todos` yang sedang berjalan untuk menghindari konflik data
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // ✅ Simpan data sebelumnya untuk rollback jika terjadi error
      const previousTodos = queryClient.getQueryData(['todos']);

      // ✅ Optimistically update state dengan menambahkan todo baru ke cache sebelum mendapatkan response dari server
      queryClient.setQueryData(['todos'], (old: any) => ({
        ...old,
        todos: [
          { id: Date.now(), title, completed: false }, // ⏳ ID sementara sebelum mendapatkan ID dari server
          ...(old?.todos || []), // ✅ Hindari error jika `old.todos` undefined
        ],
      }));

      // ✅ Return previousTodos agar bisa digunakan untuk rollback jika terjadi error
      return { previousTodos };
    },

    // ❌ Rollback perubahan jika mutasi gagal
    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },

    // ✅ Setelah mutasi berhasil/gagal, refresh data dari server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
