import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  id: {
    translation: {
      // Common terms
      "welcome": "Selamat Datang",
      "login": "Masuk",
      "email": "Email",
      "phone_number": "Nomor Telepon",
      "password": "Kata Sandi",
      "enter_password": "Masukkan kata sandi",
      "remember_me": "Ingat saya",
      "forgot_password": "Lupa kata sandi?",
      "dont_have_account": "Belum punya akun?",
      "register_now": "Daftar sekarang",
      "logout": "Keluar",
      "settings": "Pengaturan",
      "notifications": "Notifikasi",
      "profile": "Profil Saya",
      "language": "Bahasa",
      "font_size": "Ukuran Huruf",
      "normal": "Normal",
      "large": "Besar",
      "extra_large": "Sangat Besar",
      "loading": "Memuat...",
      "chatbot": "Asisten AI",
      "image_request": "Permintaan Gambar",
      "online": "Online",
      "ai_assistant": "Asisten AI",
      "type_your_message": "Ketik pesan Anda...",
      "take_photo": "Ambil Foto",
      "photo_instruction": "Ambil foto area yang terdampak bencana",
      "open_camera": "Buka Kamera",
      "damage_photo": "Foto Kerusakan",
      "location_detected": "Lokasi Terdeteksi",
      "jakarta_location": "Jakarta, Indonesia",
      "describe_needs": "Deskripsikan Kebutuhan Anda",
      "needs_placeholder": "Contoh: Makanan, air minum, obat-obatan, selimut",
      "submit_request": "Kirim Permintaan",
      "request_submitted": "Permintaan Terkirim",
      "drone_dispatched": "Drone sedang dalam perjalanan ke lokasi Anda",
      "estimated_arrival": "Perkiraan tiba",
      "minutes": "menit",
      "items_delivered": "Barang yang dikirim",
      "emergency_supplies": "Persediaan darurat",
      "back": "Kembali",
      
      // Chatbot demo content
      "chatbot_welcome": "Halo! Saya Asisten AI SiagaBencana. Bagaimana saya bisa membantu Anda hari ini?",
      "chatbot_demo_question": "Apa yang harus saya lakukan saat banjir?",
      "chatbot_demo_response": "Saat banjir, pindahkan diri Anda ke tempat yang lebih tinggi, matikan listrik dan gas, hindari berjalan di air yang mengalir, dan simpan dokumen penting Anda. Bantuan sedang dalam perjalanan!",
      
      // App specific terms
      "app_name": "SiagaBencana",
      "app_subtitle": "Sistem Peringatan Dini Indonesia",
      "protect_your_family": "Lindungi Keluarga Anda",
      "login_continue": "Masuk untuk melanjutkan",
      "protecting_communities": "Melindungi masyarakat dengan teknologi drone",
      
      // Home page
      "emergency_alert": "Peringatan Darurat",
      "affected_people": "Warga Terdampak",
      "active_drones": "Drone Aktif",
      "active_disasters": "Bencana Aktif",
      "aid_delivered": "Bantuan Tersalur",
      "recent_disasters": "Bencana Terkini",
      "view_all": "Lihat Semua",
      "stories": "Kisah dari Lapangan",
      "need_help": "Butuh Bantuan?",
      "emergency_team": "Tim siap membantu 24/7",
      "contact_emergency": "Hubungi Darurat",
      
      // Map page
      "real_time_drone_map": "Peta Drone Real-Time",
      "monitoring_drones": "Pantau drone bantuan yang sedang membantu warga",
      "all_active_disasters": "Semua Bencana Aktif",
      
      // Help page
      "help_center": "Pusat Bantuan",
      "emergency_contacts": "Kontak Darurat",
      "call": "Hubungi",
      "safety_guidelines": "Panduan Keselamatan",
      "during_flood": "Saat Banjir",
      "during_earthquake": "Saat Gempa Bumi",
      "during_landslide": "Saat Tanah Longsor",
      "emergency_question": "Darurat?",
      "request_help": "Minta Bantuan Sekarang",
      
      // Navigation
      "home": "Beranda",
      "map": "Peta",
      "help": "Bantuan",
      
      // Flood safety guidelines
      "flood_move_higher": "Pindah ke tempat yang lebih tinggi",
      "flood_turn_off": "Matikan listrik dan gas",
      "flood_avoid_walking": "Hindari berjalan di air mengalir",
      "flood_save_documents": "Simpan dokumen penting",
      
      // Earthquake safety guidelines
      "earthquake_protect_head": "Lindungi kepala, berlindung di bawah meja",
      "earthquake_away_windows": "Jauhi jendela dan benda berat",
      "earthquake_no_elevator": "Jangan gunakan lift",
      "earthquake_open_area": "Keluar ke area terbuka setelah guncangan",
      
      // Landslide safety guidelines
      "landslide_leave_immediately": "Segera tinggalkan area berbahaya",
      "landslide_watch_cracks": "Perhatikan retakan tanah",
      "landslide_listen_unusual": "Dengarkan gemuruh tidak biasa",
      "landslide_dont_return": "Jangan kembali sebelum aman",
      
      // Emergency contacts
      "national_disaster_agency": "Badan Nasional Penanggulangan Bencana",
      "ambulance_medical": "Ambulans & Medis Darurat",
      "fire_department": "Pemadam Kebakaran",
      "police": "Polisi",
      "national_search_rescue": "SAR Nasional"
    }
  },
  jv: {
    translation: {
      // Common terms
      "welcome": "Sugeng Rawuh",
      "login": "Login",
      "email": "Email",
      "phone_number": "Nomer Telpon",
      "password": "Sandi",
      "enter_password": "Lebokna sandi",
      "remember_me": "Elingi kula",
      "forgot_password": "Lali sandi?",
      "dont_have_account": "Durung duwe akun?",
      "register_now": "Daftar saiki",
      "logout": "Metu",
      "settings": "Pengaturan",
      "notifications": "Notifikasi",
      "profile": "Profil Kula",
      "language": "Basa",
      "font_size": "Ukuran Huruf",
      "normal": "Normal",
      "large": "Gedhe",
      "extra_large": "Ambyar Gedhe",
      "loading": "Ngamot...",
      "chatbot": "Asisten AI",
      "image_request": "Panjalukan Gambar",
      "online": "Online",
      "ai_assistant": "Asisten AI",
      "type_your_message": "Ketik pesanmu...",
      "take_photo": "Ambil Foto",
      "photo_instruction": "Ambil foto wilayah sing kena bencana",
      "open_camera": "Bukak Kamera",
      "damage_photo": "Foto Rusak",
      "location_detected": "Lokasi Ketemu",
      "jakarta_location": "Jakarta, Indonesia",
      "describe_needs": "Dhiskripsikne Kebutuhanmu",
      "needs_placeholder": "Conto: Pangan, banyu, obat-obatan, kain panas",
      "submit_request": "Kirim Panjalukan",
      "request_submitted": "Panjalukan Terkirim",
      "drone_dispatched": "Drone lagi dalam perjalanan menyang lokasimu",
      "estimated_arrival": "Perkiraan teka",
      "minutes": "menit",
      "items_delivered": "Barang sing dikirim",
      "emergency_supplies": "Persediaan darurat",
      "back": "Mbalik",
      
      // Chatbot demo content
      "chatbot_welcome": "Halo! Kula Asisten AI SiagaBencana. Kepriye kula bisa mbantu panjenengan?",
      "chatbot_demo_question": "Apa sing kudu kula lakoni nalika banjir?",
      "chatbot_demo_response": "Nalika banjir, pindah menyang panggon sing luwih dhuwur, mateni listrik lan gas, nglindhungi mlaku ing banyu sing mlaku, lan simpen dokumen penting. Bantuan lagi dalam perjalanan!",
      
      // App specific terms
      "app_name": "SiagaBencana",
      "app_subtitle": "Sistem Peringatan Dini Indonesia",
      "protect_your_family": "Lindungi Kulawarga Sampeyan",
      "login_continue": "Login kanggo nerusake",
      "protecting_communities": "Nyuda komunitas nganggo teknologi drone",
      
      // Home page
      "emergency_alert": "Peringatan Darurat",
      "affected_people": "Warga Kena Pengaruh",
      "active_drones": "Drone Aktif",
      "active_disasters": "Musibah Aktif",
      "aid_delivered": "Bantuan Dikirim",
      "recent_disasters": "Musibah Anyar",
      "view_all": "Deleng Kabeh",
      "stories": "Cerita Saka Lapangan",
      "need_help": "Butuh Bantuan?",
      "emergency_team": "Tim siap mbantu 24/7",
      "contact_emergency": "Hubungi Darurat",
      
      // Map page
      "real_time_drone_map": "Peta Drone Real-Time",
      "monitoring_drones": "Ngawasi drone bantuan sing lagi mbantu warga",
      "all_active_disasters": "Kabeh Musibah Aktif",
      
      // Help page
      "help_center": "Pusat Bantuan",
      "emergency_contacts": "Kontak Darurat",
      "call": "Telpon",
      "safety_guidelines": "Panduan Keselamatan",
      "during_flood": "Wayah Banjir",
      "during_earthquake": "Wayah Gempa Bumi",
      "during_landslide": "Wayah Amblesan",
      "emergency_question": "Darurat?",
      "request_help": "Njaluk Bantuan Saiki",
      
      // Navigation
      "home": "Ngarep",
      "map": "Peta",
      "help": "Bantuan",
      
      // Flood safety guidelines
      "flood_move_higher": "Pindah menyang panggon sing luwih dhuwur",
      "flood_turn_off": "Mateni listrik lan gas",
      "flood_avoid_walking": "Njaga mlaku ing banyu sing mlaku",
      "flood_save_documents": "Simpen dokumen penting",
      
      // Earthquake safety guidelines
      "earthquake_protect_head": "Lindungi sirah, mbokong ing ngisor meja",
      "earthquake_away_windows": "Jauhi jendhela lan barang abot",
      "earthquake_no_elevator": "Aja nganggo lift",
      "earthquake_open_area": "Metu menyang panggon sing mbukak sawise guncangan",
      
      // Landslide safety guidelines
      "landslide_leave_immediately": "Segera ninggalake daerah sing mbebahayakan",
      "landslide_watch_cracks": "Awas retakan lemah",
      "landslide_listen_unusual": "Dengar swara gemuruh sing ora biasa",
      "landslide_dont_return": "Aja bali sadurunge aman",
      
      // Emergency contacts
      "national_disaster_agency": "Badan Nasional Penanggulangan Bencana",
      "ambulance_medical": "Ambulans & Medis Darurat",
      "fire_department": "Pemadam Kebakaran",
      "police": "Polisi",
      "national_search_rescue": "SAR Nasional"
    }
  },
  su: {
    translation: {
      // Common terms
      "welcome": "Wilujeng Sumping",
      "login": "Asup",
      "email": "Email",
      "phone_number": "Nomer Telepon",
      "password": "Kecap Sandi",
      "enter_password": "Lebetkeun kecap sandi",
      "remember_me": "Inggat kuring",
      "forgot_password": "Hilap kecap sandi?",
      "dont_have_account": "Can aya akun?",
      "register_now": "Daftar ayeuna",
      "logout": "Kaluar",
      "settings": "Pangaturan",
      "notifications": "Notifikasi",
      "profile": "Profil Kuring",
      "language": "Basa",
      "font_size": "Ukuran Hurup",
      "normal": "Normal",
      "large": "Badag",
      "extra_large": "Pisan Badag",
      "loading": "Ngamuat...",
      "chatbot": "Asisten AI",
      "image_request": "Paménta Gambar",
      "online": "Online",
      "ai_assistant": "Asisten AI",
      "type_your_message": "Ketik pesan anjeun...",
      "take_photo": "Ambil Foto",
      "photo_instruction": "Ambil foto wewengkon nu kana bencana",
      "open_camera": "Buka Kamera",
      "damage_photo": "Foto Rusak",
      "location_detected": "Lokasi Kadéték",
      "jakarta_location": "Jakarta, Indonesia",
      "describe_needs": "Déskripsikeun Kaupilan Anjeun",
      "needs_placeholder": "Conto: Pakan, cai, obat-obatan, bul blanket",
      "submit_request": "Kirim Paménta",
      "request_submitted": "Paménta Dikirim",
      "drone_dispatched": "Drone keur diperjalanan ka lokasi anjeun",
      "estimated_arrival": "Perkiraan sumping",
      "minutes": "menit",
      "items_delivered": "Barang nu dikirim",
      "emergency_supplies": "Persediaan darurat",
      "back": "Balik",
      
      // Chatbot demo content
      "chatbot_welcome": "Halo! Kuring Asisten AI SiagaBencana. Kumaha kuring bisa nulung anjeun ayeuna?",
      "chatbot_demo_question": "Naon nu kudu kuring lakukeun nalika aya banjir?",
      "chatbot_demo_response": "Nalika banjir, pindah ka tempat nu leuwih luhur, matikeun listrik jeung gas, hindari leumpang di cai nu ngalir, sarta simpen dokumen penting. Bantuan keur diperjalanan!",
      
      // App specific terms
      "app_name": "SiagaBencana",
      "app_subtitle": "Sistem Peringatan Dini Indonesia",
      "protect_your_family": "Lindungi Kulawarga Anjeun",
      "login_continue": "Asup pikeun neruskeun",
      "protecting_communities": "Nyuda komunitas nganggo téknologi drone",
      
      // Home page
      "emergency_alert": "Peringatan Darurat",
      "affected_people": "Warga Kena Pengaruh",
      "active_drones": "Drone Aktif",
      "active_disasters": "Musibah Aktif",
      "aid_delivered": "Bantuan Dikirim",
      "recent_disasters": "Musibah Anyar",
      "view_all": "Tingali Kabéh",
      "stories": "Cerita Ti Lapangan",
      "need_help": "Butuh Bantuan?",
      "emergency_team": "Tim siap nulung 24/7",
      "contact_emergency": "Hubungi Darurat",
      
      // Map page
      "real_time_drone_map": "Peta Drone Real-Time",
      "monitoring_drones": "Ngawas drone bantuan nu keur nulung warga",
      "all_active_disasters": "Kabéh Musibah Aktif",
      
      // Help page
      "help_center": "Pusat Bantuan",
      "emergency_contacts": "Kontak Darurat",
      "call": "Telepon",
      "safety_guidelines": "Panduan Kasalamatan",
      "during_flood": "Waktu Banjir",
      "during_earthquake": "Waktu Gempa Bumi",
      "during_landslide": "Waktu Longsor",
      "emergency_question": "Darurat?",
      "request_help": "Paménta Bantuan Ayeuna",
      
      // Navigation
      "home": "Tepas",
      "map": "Peta",
      "help": "Bantuan",
      
      // Flood safety guidelines
      "flood_move_higher": "Pindah nuju panggon sing luwih luhur",
      "flood_turn_off": "Matikeun listrik lan gas",
      "flood_avoid_walking": "Hindari leumpang di cai nu ngalir",
      "flood_save_documents": "Simpen dokumen penting",
      
      // Earthquake safety guidelines
      "earthquake_protect_head": "Lindungi sirah, singgah di handap meja",
      "earthquake_away_windows": "Jauhi jandela lan benda beurat",
      "earthquake_no_elevator": "Ulah make lift",
      "earthquake_open_area": "Kaluar ka wewengkon nu terbuka sanggeus guncangan",
      
      // Landslide safety guidelines
      "landslide_leave_immediately": "Segera ninggalkeun wewengkon nu bahaya",
      "landslide_watch_cracks": "Perhatikeun retakan tanah",
      "landslide_listen_unusual": "Dengar suara gemuruh nu aneh",
      "landslide_dont_return": "Ulah balik samemeh aman",
      
      // Emergency contacts
      "national_disaster_agency": "Badan Nasional Penanggulangan Bencana",
      "ambulance_medical": "Ambulans & Medis Darurat",
      "fire_department": "Pemadam Kebakaran",
      "police": "Polisi",
      "national_search_rescue": "SAR Nasional"
    }
  },
  ban: {
    translation: {
      // Common terms
      "welcome": "Rahajeng Wastu",
      "login": "Manjing",
      "email": "Email",
      "phone_number": "Nomer Telepon",
      "password": "Kata Sandi",
      "enter_password": "Lebetang kata sandi",
      "remember_me": "Ingetin tiang",
      "forgot_password": "Lali sandi?",
      "dont_have_account": "Nenten duwe akun?",
      "register_now": "Daftar sekarang",
      "logout": "Medal",
      "settings": "Pangaturan",
      "notifications": "Notifikasi",
      "profile": "Profil Tiang",
      "language": "Basa",
      "font_size": "Ukuran Hurup",
      "normal": "Normal",
      "large": "Agung",
      "extra_large": "Pisan Agung",
      "loading": "Ngamuat...",
      "chatbot": "Asisten AI",
      "image_request": "Panjalukan Gambar",
      "online": "Online",
      "ai_assistant": "Asisten AI",
      "type_your_message": "Ketik pesan tiang...",
      "take_photo": "Ambil Foto",
      "photo_instruction": "Ambil foto wilayah sing kena bencana",
      "open_camera": "Buka Kamera",
      "damage_photo": "Foto Rusak",
      "location_detected": "Lokasi Ketemu",
      "jakarta_location": "Jakarta, Indonesia",
      "describe_needs": "Dhiskripsikne Kaupilan Tiang",
      "needs_placeholder": "Conto: Pangan, banyu, obat-obatan, kain panas",
      "submit_request": "Kirim Panjalukan",
      "request_submitted": "Panjalukan Terkirim",
      "drone_dispatched": "Drone lagi dalam perjalanan menyang lokasi tiang",
      "estimated_arrival": "Perkiraan teka",
      "minutes": "menit",
      "items_delivered": "Barang sing dikirim",
      "emergency_supplies": "Persediaan darurat",
      "back": "Mbalik",
      
      // Chatbot demo content
      "chatbot_welcome": "Halo! Tiang Asisten AI SiagaBencana. Kepriye tiang bisa nulung ida?",
      "chatbot_demo_question": "Naon sing kudu tiang lakukeun nalika banjir?",
      "chatbot_demo_response": "Nalika banjir, pindah nuju panggon sing luwih dhuwur, mateni listrik lan gas, nglindhungi mlaku ing banyu sing mlaku, lan simpen dokumen penting. Bantuan lagi dalam perjalanan!",
      
      // App specific terms
      "app_name": "SiagaBencana",
      "app_subtitle": "Sistem Peringatan Dini Indonesia",
      "protect_your_family": "Lindungi Kulawarga Ida",
      "login_continue": "Manjing antuk nerusang",
      "protecting_communities": "Nyuda komunitas nganggo teknologi drone",
      
      // Home page
      "emergency_alert": "Peringatan Darurat",
      "affected_people": "Warga Kena Pengaruh",
      "active_drones": "Drone Aktif",
      "active_disasters": "Musibah Aktif",
      "aid_delivered": "Bantuan Dikirim",
      "recent_disasters": "Musibah Anyar",
      "view_all": "Cingak Kabeh",
      "stories": "Cerita Saking Lapangan",
      "need_help": "Butuh Bantuan?",
      "emergency_team": "Tim siap nulung 24/7",
      "contact_emergency": "Hubungi Darurat",
      
      // Map page
      "real_time_drone_map": "Peta Drone Real-Time",
      "monitoring_drones": "Ngawasi drone bantuan sing kepengin nulung warga",
      "all_active_disasters": "Kabeh Musibah Aktif",
      
      // Help page
      "help_center": "Pusat Bantuan",
      "emergency_contacts": "Kontak Darurat",
      "call": "Telepon",
      "safety_guidelines": "Panduan Kaselamatan",
      "during_flood": "Wayah Banjir",
      "during_earthquake": "Wayah Gempa Bumi",
      "during_landslide": "Wayah Amblesan",
      "emergency_question": "Darurat?",
      "request_help": "Nentu Bantuan Sekarang",
      
      // Navigation
      "home": "Umah",
      "map": "Peta",
      "help": "Bantuan",
      
      // Flood safety guidelines
      "flood_move_higher": "Pindah nuju panggon sing luwih dhuwur",
      "flood_turn_off": "Mateni listrik lan gas",
      "flood_avoid_walking": "Njaga mlaku ing banyu sing mlaku",
      "flood_save_documents": "Simpen dokumen penting",
      
      // Earthquake safety guidelines
      "earthquake_protect_head": "Lindungi sirah, singgah ring jero meja",
      "earthquake_away_windows": "Jauhi jandela lan barang abot",
      "earthquake_no_elevator": "Ulah nganggo lift",
      "earthquake_open_area": "Medal nuju wewengkon sing mbukak sawise guncangan",
      
      // Landslide safety guidelines
      "landslide_leave_immediately": "Segera ninggalkeun daerah sing mbebahayakan",
      "landslide_watch_cracks": "Perhatikeun retakan tanah",
      "landslide_listen_unusual": "Dengar swara gemuruh sing ora biasa",
      "landslide_dont_return": "Ulah bali sadurunge aman",
      
      // Emergency contacts
      "national_disaster_agency": "Badan Nasional Penanggulangan Bencana",
      "ambulance_medical": "Ambulans & Medis Darurat",
      "fire_department": "Pemadam Kebakaran",
      "police": "Polisi",
      "national_search_rescue": "SAR Nasional"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "id", // default language
    fallbackLng: "id",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;