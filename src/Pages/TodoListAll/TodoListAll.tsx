import { useGetInfiniteTodos } from '@/hooks/useGetInfiniteTodos';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './TodoListAll.module.scss';

// ✅ Komponen untuk menampilkan semua todo dengan infinite scroll
export const TodoListAll = () => {
  // 🔄 Menggunakan infinite query untuk mengambil data todo secara bertahap
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteTodos();

  // 👀 Intersection Observer untuk mendeteksi ketika user scroll ke bawah
  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage) fetchNextPage(); // 🔄 Fetch halaman berikutnya jika masih ada data
  });

  return (
    <div className={styles.container}>
      {/* 🏷️ Judul daftar todo */}
      <h2 className={styles.title}>All Todos</h2>

      {/* 📋 Daftar todo */}
      <div className={styles.todoList}>
        {data?.pages.map((page) =>
          page.todos.map((todo) => (
            <div key={todo.id} className={styles.todoItem}>
              <span className={styles.todoText}>{todo.title}</span>
            </div>
          ))
        )}
      </div>

      {/* 🔍 Observer untuk mendeteksi scroll ke bawah */}
      <div ref={observerRef} className={styles.observer} />

      {/* ⏳ Indikator loading saat mengambil data berikutnya */}
      {isFetchingNextPage && <p className={styles.loading}>Loading more...</p>}
    </div>
  );
};

/*
📌 Penjelasan Tiap Bagian:
React Query & Infinite Scroll

Menggunakan useGetInfiniteTodos() untuk mengambil data secara bertahap.
fetchNextPage() dipanggil ketika user scroll ke bawah.
hasNextPage menentukan apakah masih ada data untuk di-fetch.
Intersection Observer

Menggunakan useIntersectionObserver() untuk mendeteksi ketika user mencapai bagian bawah daftar.
Jika hasNextPage bernilai true, maka fetchNextPage() dipanggil untuk memuat data berikutnya.
UI & Styling

styles.container: Container utama komponen.
styles.todoList: Area daftar todo.
styles.todoItem: Item todo.
styles.observer: Elemen transparan yang berfungsi sebagai trigger untuk infinite scroll.
styles.loading: Menampilkan teks "Loading more..." saat mengambil data tambahan.
🚀 Kelebihan Implementasi Ini
✅ Optimistic UI → Perubahan terasa instan di UI.
✅ Infinite Scrolling → Tidak perlu tombol "Load More".
✅ React Query Caching → Data tersimpan efisien tanpa perlu refetch berulang.
✅ Performance Optimal → Hanya fetch data saat diperlukan.

🔥 Dengan struktur ini, daftar Todo bisa menampilkan semua data tanpa membebani performa aplikasi!
*/
