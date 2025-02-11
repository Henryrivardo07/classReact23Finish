import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/services/todoServices';

export const useDeleteTodo = () => {
  // ✅ Mengakses instance QueryClient untuk mengelola cache React Query
  const queryClient = useQueryClient();

  return useMutation({
    // ✅ Fungsi utama untuk menghapus todo berdasarkan ID
    mutationFn: deleteTodo,

    // ✅ Optimistic UI: Jalankan sebelum request dikirim ke server
    onMutate: async ({ id }) => {
      // ❌ Batalkan semua query `todos` yang sedang berjalan agar tidak terjadi konflik data
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // ✅ Simpan data sebelumnya agar bisa digunakan untuk rollback jika terjadi error
      const previousTodos = queryClient.getQueryData(['todos']);

      // ✅ Optimistically update state dengan menghapus todo dari cache sebelum server merespons
      queryClient.setQueryData(['todos'], (old: any) => ({
        ...old,
        todos: (old?.todos || []).filter((todo: any) => todo.id !== id), // 🗑️ Hapus todo dengan ID yang sesuai
      }));

      // ✅ Return previousTodos untuk rollback jika mutasi gagal
      return { previousTodos };
    },

    // ❌ Rollback perubahan jika mutasi gagal
    onError: (_err, _todo, context) => {
      if (context?.previousTodos) {
        // 🔄 Kembalikan data lama jika ada error
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },

    // ✅ Setelah mutasi berhasil/gagal, refresh data dari server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
/*
Penjelasan:
Optimistic UI

Sebelum request dikirim ke server, todo langsung dihapus dari cache, sehingga UI terasa lebih cepat.
Jika berhasil, UI tetap seperti itu. Jika gagal, data akan dikembalikan.
Rollback jika error

Jika request gagal, todo yang dihapus akan dikembalikan ke kondisi sebelumnya.
Refresh data setelah mutasi

Setelah mutasi selesai (berhasil/gagal), cache todos di-refresh untuk memastikan data tetap sinkron dengan server.
Kode ini memastikan UI tetap responsif dan sinkron dengan server meskipun terjadi error. 🚀

*/
