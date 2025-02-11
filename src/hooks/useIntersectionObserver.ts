import { useEffect, useRef } from 'react';

// 🛠️ Custom hook untuk mendeteksi apakah sebuah elemen masuk ke dalam viewport
export const useIntersectionObserver = (callback: () => void) => {
  // 🔍 useRef untuk menyimpan referensi elemen yang akan di-observe
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 👀 Buat instance IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // ✅ Jika elemen terlihat di viewport, jalankan callback
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 } // 🎯 Callback dipanggil hanya ketika elemen 100% terlihat
    );

    // 🔗 Mulai mengamati elemen jika ada
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // 🧹 Cleanup: Hentikan observasi saat komponen unmount atau dependency berubah
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [callback]); // 🎯 useEffect akan berjalan ulang jika `callback` berubah

  // 🔄 Kembalikan referensi yang bisa dipasang pada elemen target
  return observerRef;
};

/*
Penjelasan:
useRef<HTMLDivElement | null>(null)

Menyimpan referensi elemen DOM yang akan di-observe oleh IntersectionObserver.
useEffect

Digunakan untuk menjalankan efek samping ketika komponen dipasang atau diperbarui.
new IntersectionObserver((entries) => {...})

Membuat instance IntersectionObserver untuk memantau apakah elemen masuk ke viewport.
entries[0].isIntersecting: Mengecek apakah elemen terlihat sepenuhnya.
threshold: 1.0

Observer hanya akan memanggil callback ketika elemen 100% terlihat.
observer.observe(observerRef.current)

Memulai observasi pada elemen yang disimpan dalam observerRef.
Cleanup di return () => {...}

Menghentikan observasi jika elemen berubah atau hook dibongkar.
Mengembalikan observerRef

Digunakan untuk ditautkan ke elemen yang ingin dipantau.
Fungsi Hook Ini
Digunakan dalam infinite scrolling, lazy loading, atau fitur lain yang bergantung pada tampilan elemen di viewport.
Contoh penggunaannya: bisa ditaruh di elemen div terakhir dalam daftar Todo untuk otomatis memuat lebih banyak item saat user scroll ke bawah. 🚀
*/
