import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTodos } from '@/services/todoServices';

export const useGetInfiniteTodos = () => {
  return useInfiniteQuery({
    // 🔑 Gunakan queryKey 'todos' untuk mengelola cache query
    queryKey: ['todos'],

    // 📌 Fungsi untuk mengambil data dengan parameter `pageParam` yang default-nya 1
    queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam, 10),

    // 🔄 Menentukan halaman berikutnya berdasarkan `hasNextPage`
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
};

/*

Penjelasan:
useInfiniteQuery

Menggunakan react-query untuk melakukan paginasi secara otomatis saat user scroll ke bawah.
queryKey: ['todos']

Menentukan query key agar React Query tahu cache mana yang digunakan untuk request ini.
queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam, 10)

Fungsi yang dipanggil untuk mengambil daftar todos dari API.
Default pageParam = 1 agar query pertama selalu dimulai dari halaman pertama.
Menggunakan fetchTodos(pageParam, 10) untuk mengambil 10 data per halaman.
getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined

Menentukan apakah masih ada halaman selanjutnya berdasarkan hasNextPage.
Jika masih ada halaman berikutnya (hasNextPage === true), maka akan mengembalikan nextPage.
Jika tidak, maka akan mengembalikan undefined, sehingga paginasi berhenti.
Dengan kode ini, paginasi berjalan otomatis, dan user bisa mendapatkan lebih banyak todos saat melakukan scroll ke bawah. 🚀
*/
