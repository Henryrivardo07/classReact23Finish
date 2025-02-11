import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '@/services/todoServices';

export const useGetTodos = (page: number, limit: number) => {
  return useQuery({
    // 🔑 Query key unik berdasarkan halaman dan limit, agar cache terkelola dengan baik
    queryKey: ['todos', page, limit],

    // 📌 Fungsi untuk mengambil daftar todos berdasarkan halaman dan jumlah data per halaman
    queryFn: () => fetchTodos(page, limit),

    // 🔄 Menjaga data sebelumnya tetap ada agar transisi paginasi terasa lebih smooth
    keepPreviousData: true,
  });
};
/*

Penjelasan:
useQuery

Hook dari react-query yang digunakan untuk mengambil data dari API.
queryKey: ['todos', page, limit]

Membuat cache berdasarkan kombinasi todos, page, dan limit.
Ini memastikan setiap halaman memiliki cache sendiri, sehingga ketika user berpindah halaman, data tidak perlu di-fetch ulang jika sudah ada di cache.
queryFn: () => fetchTodos(page, limit)

Menggunakan fungsi fetchTodos untuk mengambil daftar todo dari API sesuai page dan limit.
keepPreviousData: true

Saat paginasi, data dari halaman sebelumnya tetap ada di UI sampai data baru diambil.
Ini mencegah flickering atau tampilan kosong saat berpindah halaman.
Dengan kode ini, kita bisa melakukan paginasi pada daftar todo dengan pengalaman pengguna yang lebih halus. 🚀
*/
