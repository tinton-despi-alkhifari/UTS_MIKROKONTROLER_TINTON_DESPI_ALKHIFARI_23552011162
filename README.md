* Kesimpulan

Sistem Smart Parking berhasil dibuat menggunakan ESP32 dan sensor ultrasonik untuk mendeteksi kondisi parkir secara otomatis berdasarkan jarak kendaraan.
Penggunaan 4 LED sebagai indikator memudahkan pengguna mengetahui status parkir secara langsung (kosong, mendekat, terisi, penuh).
Implementasi MQTT memungkinkan monitoring dan controlling secara real-time antara ESP32 dan website.
Integrasi HTTP API (MockAPI) berhasil digunakan untuk menyimpan data sehingga dapat dilakukan pencatatan atau histori.
Dashboard web mampu menampilkan data secara interaktif, responsif, dan informatif, termasuk histori monitoring.
Sistem mendukung komunikasi dua arah, yaitu:
ESP32 → Web (monitoring data)
Web → ESP32 (kontrol LED)
