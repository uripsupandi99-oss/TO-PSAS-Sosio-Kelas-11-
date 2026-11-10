export interface Question {
  id: number;
  level: 'C3' | 'C4' | 'C5';
  topic: string;
  stimulus: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export const SOCIOLOGY_QUESTIONS: Question[] = [
  {
    id: 1,
    level: 'C3',
    topic: 'Kriteria Dasar Kelompok Sosial',
    stimulus: 'Pada pertengahan tahun 2026, platform media sosial meluncurkan fitur "V-Guild", sebuah ruang virtual tempat ribuan kreator konten independen berkumpul. Meskipun para anggota tidak pernah bertatap muka secara fisik dan tersebar di berbagai wilayah Indonesia, mereka memiliki kesepakatan nilai bersama, pembagian tugas pembuatan konten yang terstruktur, serta interaksi intensif harian melalui forum diskusi terenkripsi. Kelompok ini berhasil menggalang dana sosial nasional hingga miliaran rupiah. Fenomena ini menunjukkan bahwa batasan fisik bukan lagi syarat mutlak pembentukan kelompok sosial di era modern berbasis kecerdasan buatan dan interkonektivitas global.',
    question: 'Berdasarkan stimulus di atas, fenomena "V-Guild" mengaplikasikan kriteria dasar kelompok sosial sosiologis karena...',
    options: [
      { key: 'A', text: 'Memiliki kesamaan domisili geografis antar anggotanya' },
      { key: 'B', text: 'Adanya kesadaran anggota sebagai bagian dari kelompok dan pola interaksi yang teratur' },
      { key: 'C', text: 'Terbentuk akibat adanya tekanan dari pihak luar yang memaksa mereka bersatu' },
      { key: 'D', text: 'Keanggotaannya bersifat terbuka tanpa aturan baku yang mengikat' },
      { key: 'E', text: 'Pembentukannya didasari semata-mata oleh motif ekonomi jangka pendek' }
    ],
    correctKey: 'B',
    explanation: 'Menurut kriteria sosiologis, kelompok sosial terbentuk apabila anggota memiliki kesadaran sebagai bagian dari kelompok, serta terdapat interaksi dan norma yang disepakati bersama. Kelompok virtual "V-Guild" memenuhi kriteria tersebut meskipun tidak bertatap muka langsung.'
  },
  {
    id: 2,
    level: 'C4',
    topic: 'Dasar Pembentukan Kelompok Sosial',
    stimulus: 'Memasuki kuartal ketiga tahun 2026, Perhimpunan Pelajar dan Pekerja Indonesia di Singapura (P3IS) mencatat lonjakan anggota sebesar 40%. Sebagian besar anggota baru adalah insinyur kecerdasan buatan dan peneliti bioteknologi asal Indonesia yang bekerja di kawasan industri sains Changi. Meskipun hidup di tengah budaya kosmopolitan Singapura, mereka secara rutin mengadakan pertemuan mingguan untuk memelihara identitas kebudayaan asal, saling memberikan sokongan finansial, serta membantu penyediaan akomodasi bagi pendatang baru dari tanah air.',
    question: 'Analisis sosiologis yang tepat mengenai dasar pembentukan kelompok P3IS berdasarkan stimulus adalah...',
    options: [
      { key: 'A', text: 'Pembentukan kelompok didasari semata-mata oleh ikatan darah (genealogis) yang sangat kuat' },
      { key: 'B', text: 'Kelompok terbentuk karena kesamaan wilayah asal (geografis) dan kesamaan nasib di perantauan' },
      { key: 'C', text: 'Kelompok terbentuk akibat paksaan dari pemerintah negara penerima untuk melakukan kontrol sosial' },
      { key: 'D', text: 'Kelompok tersebut merupakan bentuk kerumunan sementara yang akan hilang setelah tugas usai' },
      { key: 'E', text: 'Ikatan terbentuk hanya karena dorongan kompetisi ekonomi antarpekerja asing' }
    ],
    correctKey: 'B',
    explanation: 'Dasar pembentukan kelompok P3IS adalah kesamaan asal daerah/geografis (kesamaan ikatan kebudayaan asal) dan kesamaan latar belakang atau kepentingan bersama sebagai perantau di negara luar.'
  },
  {
    id: 3,
    level: 'C5',
    topic: 'Dinamika Perkembangan Kelompok (Teori Tuckman)',
    stimulus: 'Sebuah startup perintis teknologi hijau "EcoTech Nusantara" yang didirikan awal tahun 2026 sempat mengalami krisis internal hebat pada bulan ke-4. Terjadi benturan gagasan keras antara tim pengembang algoritma dan tim pemasaran mengenai alokasi anggaran. Namun pada bulan ke-8, pendiri perusahaan berhasil merumuskan tata kelola tata tertib baru dan pembagian peran yang disepakati bersama, sehingga kinerja tim meningkat pesat dan mampu menarik investor asing. Evaluasi terhadap tahapan perkembangan kelompok ini menunjukkan keberhasilan transisi kelompok.',
    question: 'Berdasarkan teori dinamika kelompok Tuckman, evaluasi yang tepat terhadap posisi perkembangan kelompok EcoTech Nusantara adalah...',
    options: [
      { key: 'A', text: 'Berhasil melewati tahap Storming dan mulai memasuki tahap Norming menuju Performing' },
      { key: 'B', text: 'Masih terjebak pada tahap Forming karena anggota belum saling mengenal sifat pribadi' },
      { key: 'C', text: 'Mengalami kegagalan pada tahap Adjourning sehingga organisasi terancam dibubarkan' },
      { key: 'D', text: 'Berada pada tahap Performing sejak awal pembentukan tanpa melalui konfrontasi internal' },
      { key: 'E', text: 'Mengalami regresi dari tahap Norming kembali menuju tahap Forming' }
    ],
    correctKey: 'A',
    explanation: 'Krisis benturan gagasan dinamakan tahap Storming (badai). Keberhasilan merumuskan norma dan pembagian peran baru menunjukkan pergerakan menuju tahap Norming (penyesuaian norma) yang mendukung produktivitas (Performing).'
  },
  {
    id: 4,
    level: 'C3',
    topic: 'Klasifikasi Kelompok Formal & Informal',
    stimulus: 'Laporan Statistik Ketenagakerjaan 2026 menunjukkan peningkatan jumlah pekerja bebas (gig workers) di Jabodetabek hingga mencapai 35% dari total angkatan kerja. Di lapangan, para pengemudi kurir berbasis aplikasi ini membentuk komunitas-komunitas kecil di area pangkalan rest area. Mereka menyusun jadwal simpan pinjam mandiri, memberikan pertolongan darurat ketika ada anggota yang kecelakaan, serta membagi informasi jalur lalu lintas tercepat secara sukarela tanpa adanya AD/ART tertulis yang resmi dari korporasi aplikasi.',
    question: 'Pengelompokan sosial pada komunitas pengemudi kurir independen tersebut tergolong sebagai...',
    options: [
      { key: 'A', text: 'Kelompok formal karena terikat langsung oleh aturan algoritma korporasi aplikasi' },
      { key: 'B', text: 'Kelompok informal karena tumbuh atas dasar kesadaran kebersamaan dan kekeluargaan tanpa struktur tertulis formal' },
      { key: 'C', text: 'Perilaku massa karena tidak memiliki hubungan emosional sama sekali antaranggota' },
      { key: 'D', text: 'Kelompok referensi negatif karena merugikan efisiensi industri transportasi digital' },
      { key: 'E', text: 'Kelompok statistik yang diciptakan oleh badan pusat statistik tanpa interaksi nyata' }
    ],
    correctKey: 'B',
    explanation: 'Komunitas tersebut terbentuk secara alami atas dasar kesamaan nasib dan kebersamaan tanpa baground aturan formal tertulis formal (AD/ART), sehingga dikategorikan sebagai kelompok informal.'
  },
  {
    id: 5,
    level: 'C4',
    topic: 'Kelompok Sosial vs Perilaku Kolektif (Kerumunan)',
    stimulus: 'Akibat rumor kelangkaan pasokan pangan nasional pada bulan Maret 2026, ratusan warga tiba-tiba berbondong-bondong memadati supermarket di pusat kota Jakarta untuk memborong bahan pokok (panic buying). Warga berebut barang secara spontan, tidak saling mengenal, serta tidak memiliki kesepakatan aturan bersama. Dalam kurun waktu tiga jam, kerumunan tersebut membubarkan diri setelah stok barang habis. Fenomena ini sangat berbeda dengan organisasi koperasi warga pedesaan yang secara rutin mengelola lumbung pangan desa secara terencana dan terstruktur.',
    question: 'Analisis perbedaan mendasar antara fenomena panic buying dan kelompok koperasi pedesaan berdasarkan konteks sosiologis adalah...',
    options: [
      { key: 'A', text: 'Panic buying merupakan kerumunan (perilaku kolektif) yang bersifat sementara dan spontan, sedangkan koperasi adalah kelompok sosial terstruktur' },
      { key: 'B', text: 'Panic buying adalah kelompok sekunder terorganisir, sedangkan koperasi tergolong perilaku kerumunan tidak teratur' },
      { key: 'C', text: 'Kedua fenomena tersebut merupakan bentuk kelompok sosial permanen berbasis kebutuhan ekonomi dasar' },
      { key: 'D', text: 'Koperasi tidak memiliki norma sosial, sedangkan kerumunan panic buying diikat oleh nilai kebudayaan universal' },
      { key: 'E', text: 'Panic buying merupakan bentuk solidaritas organik, sedangkan koperasi merupakan bentuk solidaritas mekanik spontan' }
    ],
    correctKey: 'A',
    explanation: 'Perilaku kolektif (seperti kerumunan panic buying) bersifat spontan, tidak terstruktur, dan sementara. Sementara kelompok sosial (seperti koperasi) memiliki struktur, aturan, dan keberlanjutan interaksi.'
  },
  {
    id: 6,
    level: 'C5',
    topic: 'Kelompok Primer & Pelemahan Fungsi Afeksi',
    stimulus: 'Riset sosiologi keluarga tahun 2026 mengungkapkan bahwa 60% remaja kota besar di Indonesia menghabiskan waktu interaksi harian hingga 7 jam di dalam ruang virtual komunal (metaverse guild) bersama kawan gim global mereka, dibandingkan hanya 30 menit berbincang langsung dengan anggota keluarga di rumah. Akibatnya, ikatan emosional hangat yang dulunya didapatkan dari institusi keluarga kini perlahan bergeser ke komunitas maya. Evaluasi mendalam diperlukan untuk melihat bagaimana peran kelompok primer mengalami transformasi di era serba digital.',
    question: 'Berdasarkan fenomena di atas, evaluasi sosiologis yang paling tepat mengenai pergeseran fungsi kelompok primer adalah...',
    options: [
      { key: 'A', text: 'Kelompok primer keluarga telah punah dan sepenuhnya digantikan oleh kelompok sekunder digital' },
      { key: 'B', text: 'Terjadi pelemahan fungsi afeksi pada kelompok primer tradisional (keluarga) akibat substitusi ikatan emosional oleh kelompok sekunder/virtual' },
      { key: 'C', text: 'Kelompok sekunder virtual secara otomatis berubah menjadi kelompok primer formal menurut hukum perundang-undangan' },
      { key: 'D', text: 'Interaksi virtual sama sekali tidak mampu memberikan kepuasan emosional sehingga remaja mengalami depresi total' },
      { key: 'E', text: 'Institusi keluarga berupaya menghapus kelompok sekunder agar kontrol sosial tetap berada di tangan orang tua' }
    ],
    correctKey: 'B',
    explanation: 'Kelompok primer (keluarga) identik dengan tatap muka dan fungsi afeksi mendalam. Penurunan waktu interaksi langsung menyebabkan pelemahan ikatan afeksi keluarga akibat terdistraksi oleh kelompok komunitas digital (sekunder).'
  },
  {
    id: 7,
    level: 'C3',
    topic: 'In-Group, Out-Group & Etnosentrisme',
    stimulus: 'Dalam turnamen Esports Nasional 2026, kelompok pendukung tim "Garuda Cyber" menunjukkan fanatisme tinggi. Mereka mengenakan atribut seragam, membuat yel-yel kebanggaan, dan menganggap anggota kelompoknya sebagai saudara sejati (in-group). Namun, mereka sering kali menyampaikan narasi provokatif dan stereotip negatif di media sosial terhadap kelompok pendukung tim lawan (out-group). Fenomena perpecahan persepsi sosial ini memicu terjadinya ketegangan antar-komunitas pemuda di berbagai kota besar.',
    question: 'Konsep sosiologi yang paling tepat untuk mengaplikasikan kecenderungan kecintaan berlebihan pada kelompok sendiri disertai pandangan merendahkan kelompok lain adalah...',
    options: [
      { key: 'A', text: 'Altruisme sosial' },
      { key: 'B', text: 'Ethnosentrisme dan kecenderungan In-Group Favoritism yang ekstrem' },
      { key: 'C', text: 'Konformitas positif' },
      { key: 'D', text: 'Pluralisme budaya' },
      { key: 'E', text: 'Amalgamasi sosial' }
    ],
    correctKey: 'B',
    explanation: 'Sikap mengagungkan kelompok sendiri secara berlebihan (in-group) dan memandang rendah/stereotip terhadap kelompok luar (out-group) dinamakan etnosentrisme / in-group favoritism yang berpotensi memicu prasangka.'
  },
  {
    id: 8,
    level: 'C4',
    topic: 'Membership Group & Reference Group',
    stimulus: 'Tren konsumsi pemuda Indonesia tahun 2026 diperhitungkan sangat dipengaruhi oleh gerakan "Minimalist Eco-Living". Banyak mahasiswa yang secara ketat membatasi pembelian pakaian baru dan beralih ke pakaian daur ulang (upcycled fashion). Meskipun para mahasiswa tersebut bukan merupakan anggota resmi dari Asosiasi Aktivis Lingkungan Global, mereka selalu menjadikan standar kepedulian lingkungan asosiasi tersebut sebagai rujukan utama dalam menilai apakah keputusan gaya hidup mereka sudah tepat atau belum.',
    question: 'Berdasarkan narasi di atas, kedudukan Asosiasi Aktivis Lingkungan Global bagi para mahasiswa tersebut adalah sebagai...',
    options: [
      { key: 'A', text: 'Kelompok membership (membership group) karena mereka terdaftar secara administratif' },
      { key: 'B', text: 'Kelompok referensi (reference group) yang menjadi acuan nilai dan pembentuk norma perilaku gaya hidup mereka' },
      { key: 'C', text: 'Kelompok okasional yang terbentuk secara tidak sengaja di pasar swalayan' },
      { key: 'D', text: 'Kelompok kekerabatan yang didasari oleh ikatan pernikahan dan pertalian darah' },
      { key: 'E', text: 'Kelompok sekunder formal yang memiliki wewenang memberikan sanksi hukum formal' }
    ],
    correctKey: 'B',
    explanation: 'Kelompok referensi adalah kelompok yang dijadikan acuan atau rujukan oleh individu untuk membentuk kepribadian dan perilakunya, meskipun individu tersebut bukan bagian dari anggota resmi kelompok tersebut.'
  },
  {
    id: 9,
    level: 'C5',
    topic: 'Kepemimpinan & Dinamika Kelompok',
    stimulus: 'Seorang pimpinan daerah termuda yang dilantik tahun 2026 menerapkan pendekatan kepemimpinan transformasional dalam mengelola konflik lahan perkebunan. Ia membuka ruang dialog digital terbuka, mengundang perwakilan petani, akademisi, dan pengusaha untuk duduk bersama menyusun kesepakatan tata ruang tanpa intimidasi fisik. Dalam kurun waktu 100 hari kerja, konflik komunal yang berlangsung selama 10 tahun berhasil diselesaikan secara damai dan adil.',
    question: 'Evaluasi terhadap efektivitas gaya kepemimpinan pimpinan daerah tersebut dalam dinamika kelompok adalah...',
    options: [
      { key: 'A', text: 'Otokratis, karena mengambil keputusan sepihak demi mempercepat target investasi daerah' },
      { key: 'B', text: 'Transformasional-Demokratis, karena mendorong keterlibatan partisipatif seluruh pemangku kepentingan guna mencapai integrasi sosial' },
      { key: 'C', text: 'Laissez-faire, karena membiarkan masyarakat menyelesaikan konflik tanpa campur tangan pemerintah' },
      { key: 'D', text: 'Transaksional, karena hanya fokus pada pemberian imbalan materi kepada kelompok yang berkonflik' },
      { key: 'E', text: 'Karismatik-Pasif, karena hanya mengandalkan popularitas media sosial tanpa tindakan nyata' }
    ],
    correctKey: 'B',
    explanation: 'Kepemimpinan transformasional yang demokratis mengedepankan dialog partisipatif, kompromi, dan merangkul seluruh pihak untuk memecahkan masalah secara konstruktif demi integrasi kelompok.'
  },
  {
    id: 10,
    level: 'C3',
    topic: 'Birokrasi Rasional Max Weber',
    stimulus: 'Pemerintah Kota Bandung pada tahun 2026 merombak struktur organisasi dinas pelayanan publik menjadi berbasis digital terpadu (Smart Bureaucracy). Seluruh alur perizinan dilakukan melalui algoritma otomatis tanpa tatap muka untuk memangkas birokrasi yang berbelit-belit. Setiap pegawai memiliki uraian tugas (job description) yang amat spesifik dan diukur kinerjanya menggunakan Indikator Kinerja Utama (IKU) berbasis data real-time.',
    question: 'Penerapan sistem birokrasi digital di Pemkot Bandung tersebut mengaplikasikan teori birokrasi rasional-ideal dari Max Weber, yang ditandai oleh...',
    options: [
      { key: 'A', text: 'Pembagian kerja yang jelas, tata kelola impersonalis, serta aturan tertulis yang rasional' },
      { key: 'B', text: 'Hubungan kerja berbasis primordialisme dan rasa kekeluargaan yang fleksibel' },
      { key: 'C', text: 'Pengambilan keputusan mendadak tanpa acuan hukum dasar yang baku' },
      { key: 'D', text: 'Kepemimpinan tunggal mutlak yang tidak dapat dikritik oleh bawahan' },
      { key: 'E', text: 'Perekrutan pegawai yang didasari atas ikatan nepotisme kerabat dekat' }
    ],
    correctKey: 'A',
    explanation: 'Ciri birokrasi rasional Max Weber mencakup pembagian kerja yang spesifik, tata aturan tertulis formal, impresonalitas (profesional tanpa pilih kasih), dan tata kelola yang terukur.'
  },
  {
    id: 11,
    level: 'C4',
    topic: 'Modal Sosial & Jaringan Digital',
    stimulus: 'Jaringan UMKM Kopi Specialty Indonesia tahun 2026 berhasil menembus pasar Eropa berkat pemanfaatan platform blockchain supply chain. Para petani kecil di Kintamani, Gayo, dan Toraja terhubung langsung dengan eksportir serta konsumen mancanegara. Melalui jaringan sosial berbasis digital ini, informasi harga pasar transparan, bantuan modal mikro mengalir cepat, dan transfer teknologi pertanian modern dapat dilakukan tanpa melewati rantai tengkulak yang memeras.',
    question: 'Analisis sosiologis mengenai dampak positif jaringan sosial digital bagi para petani kopi tersebut adalah...',
    options: [
      { key: 'A', text: 'Menghilangkan ikatan sosial antarpetani lokal karena fokus pada pasar ekspor' },
      { key: 'B', text: 'Memperkuat modal sosial (social capital) dan memperluas struktur kesempatan ekonomi petani' },
      { key: 'C', text: 'Mengubah ikatan paguyuban petani menjadi kelompok kerumunan yang tidak stabil' },
      { key: 'D', text: 'Memicu konflik horizontal antarpetani lokal karena persaingan teknologi' },
      { key: 'E', text: 'Mengurangi kemandirian ekonomi masyarakat akibat ketergantungan teknologi' }
    ],
    correctKey: 'B',
    explanation: 'Jaringan sosial yang luas memfasilitasi pembentukan modal sosial (kepercayaan, akses informasi, jaringan kerja sama) yang memperkuat bargaining position dan kesejahteraan ekonomi anggota.'
  },
  {
    id: 12,
    level: 'C5',
    topic: 'Konformitas Kelompok Sebaya (Peer Group)',
    stimulus: 'Survei terhadap pelajar SMA di kota-kota besar tahun 2026 menunjukkan bahwa 45% siswa tergiur menginvestasikan uang saku mereka pada aset kripto berisiko tinggi hanya karena tidak ingin dianggap "ketinggalan zaman" (FOMO) oleh kelompok sebaya mereka. Fenomena konformitas kelompok ini membuat banyak remaja mengalami kerugian finansial serius demi memperoleh pengakuan status sosial dari teman sepermainannya.',
    question: 'Evaluasi sosiologis yang paling tepat terhadap dampak negatif konformitas kelompok sebaya pada kasus di atas adalah...',
    options: [
      { key: 'A', text: 'Konformitas memperkuat kemampuan berpikir kritis siswa dalam menghadapi krisis finansial' },
      { key: 'B', text: 'Tekanan konformitas yang destruktif mengikis rasionalitas individu demi mempertahankan rasa diterima (belongingness) dalam kelompok' },
      { key: 'C', text: 'Konformitas secara otomatis menciptakan integrasi sosial yang kokoh di lingkungan sekolah' },
      { key: 'D', text: 'Tidak ada hubungan antara dorongan konformitas sebaya dengan keputusan finansial individu' },
      { key: 'E', text: 'Konformitas merupakan syarat mutlak agar siswa dapat mencapai prestasi akademik yang tinggi' }
    ],
    correctKey: 'B',
    explanation: 'Konformitas yang berlebihan dapat berdampak negatif ketika individu mengorbankan pertimbangan rasional pribadi demi memenuhi tekanan norma/ekspektasi kelompok agar diterima.'
  },
  {
    id: 13,
    level: 'C3',
    topic: 'Kriteria Masalah Sosial',
    stimulus: 'Penerapan pembelajaran berbasis Artificial Intelligence (AI) di sekolah-sekolah tanah air pada tahun 2026 menghadapi kendala ketimpangan. Sekolah di wilayah perkotaan menikmati fasilitas superkomputer, sementara sekolah di kawasan 3T mengalami keterbatasan listrik dan jaringan internet. Kondisi ini menyebabkan kesenjangan mutu pendidikan yang makin melebar. Masalah ini dikategorikan sebagai masalah sosial karena merugikan banyak pihak dan melanggar prinsip keadilan.',
    question: 'Berdasarkan konsep sosiologi, fenomena kesenjangan fasilitas AI tersebut mengaplikasikan kriteria masalah sosial yaitu...',
    options: [
      { key: 'A', text: 'Kondisi yang dirasakan dan mengganggu banyak orang serta membutuhkan tindakan bersama untuk memperbaikinya' },
      { key: 'B', text: 'Perilaku menyimpang individu yang melanggar hukum pidana negara' },
      { key: 'C', text: 'Kegagalan adaptasi biologis masyarakat terhadap perubahan iklim global' },
      { key: 'D', text: 'Keadaan alami yang tidak dapat diubah oleh kebijakan pemerintah manapun' },
      { key: 'E', text: 'Sengketa pribadi antarindividu mengenai kepemilikan gawai pintar' }
    ],
    correctKey: 'A',
    explanation: 'Masalah sosial didefinisikan sebagai kondisi yang tidak diinginkan, berdampak luas pada masyarakat, merugikan nilai-nilai sosial, serta memerlukan penyelesaian secara kolektif.'
  },
  {
    id: 14,
    level: 'C4',
    topic: 'Konflik Kepentingan & Permasalahan Sosial',
    stimulus: 'Ekspansi proyek pertambangan bahan baku baterai listrik pada tahun 2026 memicu konflik terbuka antara korporasi multinasional dan masyarakat adat setempat. Masyarakat adat merasa ruang hidup dan kelestarian hutan leluhur mereka terancam, sementara korporasi mengatasnamakan proyek strategis nasional untuk transisi energi hijau. Pengelompokan sosial antara kelompok pengusaha dan masyarakat adat memicu eskalasi permasalahan sosial yang kompleks.',
    question: 'Analisis sosiologis mengenai pendorong utama munculnya permasalahan sosial akibat pengelompokan tersebut adalah...',
    options: [
      { key: 'A', text: 'Perbedaan kepentingan materiil dan pertentangan nilai kebudayaan dalam perebutan sumber daya alam' },
      { key: 'B', text: 'Adanya kesamaan tujuan jangka panjang dalam menjaga kelestarian lingkungan hidup' },
      { key: 'C', text: 'Kegagalan komunikasi personal antar-individu tanpa melibatkan institusi kelompok' },
      { key: 'D', text: 'Sifat masyarakat adat yang menolak seluruh bentuk kemajuan teknologi modern' },
      { key: 'E', text: 'Dominasi kelompok mayoritas yang didukung penuh oleh seluruh warga desa' }
    ],
    correctKey: 'A',
    explanation: 'Permasalahan sosial akibat pengelompokan sering kali dipicu oleh pertentangan kepentingan (conflict of interest) dan perbedaan nilai budaya terkait pemanfaatan sumber daya.'
  },
  {
    id: 15,
    level: 'C5',
    topic: 'Ketidakadilan Sosial & Ageism',
    stimulus: 'Sebuah riset tenaga kerja tahun 2026 menemukan bahwa calon pekerja berusia di atas 45 tahun mengalami kesulitan mendapatkan pekerjaan di sektor industri kreatif digital. Mayoritas perusahaan menerapkan batas usia maksimal 35 tahun dalam iklannya dengan asumsi bahwa pekerja senior tidak adaptif terhadap teknologi baru. Evaluasi menunjukkan terjadinya bentuk ketidakadilan sosial berupa stereotip dan marginalisasi usia (ageism).',
    question: 'Evaluasi mendalam mengenai konsekuensi dari ketidakadilan sosial berbasis ageism tersebut bagi struktur sosial adalah...',
    options: [
      { key: 'A', text: 'Meningkatkan efisiensi korporasi tanpa menimbulkan dampak kerugian sosial apapun' },
      { key: 'B', text: 'Menyebabkan pemborosan potensi sumber daya manusia terampil dan menciptakan diskriminasi sistematis' },
      { key: 'C', text: 'Mendorong kelompok lansia untuk mendirikan negara tersendiri yang terpisah' },
      { key: 'D', text: 'Mempercepat proses integrasi sosial antara generasi muda dan generasi tua' },
      { key: 'E', text: 'Menghilangkan angka pengangguran secara signifikan di wilayah perkotaan' }
    ],
    correctKey: 'B',
    explanation: 'Marginalisasi dan stereotip usia (ageism) menutup akses pekerjaan bagi kelompok produktif senior, yang berdampak pada pemborosan potensi SDM serta memperlebar ketidakadilan struktural.'
  },
  {
    id: 16,
    level: 'C3',
    topic: 'Filter Bubble & Penanganan Intoleransi',
    stimulus: 'Memasuki tahun 2026, fenomena "Filter Bubble" di media sosial makin memperparah sikap intoleransi antar-kelompok keagamaan. Algoritma menyajikan konten yang hanya mendukung pandangan kelompoknya sendiri secara berulang-ulang, sehingga pengguna menganggap kelompok luar sebagai pihak yang sesat dan berbahaya. Untuk mengatasi hal ini, Kemenkominfo menggulirkan program Kampanye Moderasi Beragama Digital.',
    question: 'Tindakan yang mengaplikasikan penanganan terhadap intoleransi berbasis media digital tersebut secara efektif adalah...',
    options: [
      { key: 'A', text: 'Memblokir seluruh akses media sosial bagi masyarakat luas' },
      { key: 'B', text: 'Mengembangkan literasi digital kritis dan ruang dialog lintas kelompok untuk memecah dinding prasangka' },
      { key: 'C', text: 'Mengisolasi kelompok minoritas agar tidak berinteraksi dengan kelompok mayoritas' },
      { key: 'D', text: 'Membiarkan algoritma bekerja secara alami tanpa adanya intervensi regulasi sosial' },
      { key: 'E', text: 'Memaksa seluruh kelompok untuk mengadopsi satu keyakinan tunggal yang sama' }
    ],
    correctKey: 'B',
    explanation: 'Mengatasi intoleransi akibat filter bubble memerlukan peningkatan literasi digital kritis dan pembukaan ruang kontak/dialog antar-kelompok (contact hypothesis) guna mengikis prasangka sosial.'
  },
  {
    id: 17,
    level: 'C4',
    topic: 'Penyalahgunaan Wewenang (Nepotisme & Kolusi)',
    stimulus: 'Laporan Lembaga Transparansi Publik 2026 membongkar kasus pengadaan jaringan internet sekolah daerah. Kepala dinas menunjuk perusahaan milik kerabat dekatnya sebagai pemenang tender tunggal tanpa prosedur lelang terbuka. Meskipun kualitas jaringan yang terpasang jauh di bawah standar, proyek tetap disetujui dan anggaran tetap dicairkan secara penuh.',
    question: 'Analisis sosiologis terhadap kasus di atas menunjukkan adanya praktik penyalahgunaan wewenang berupa...',
    options: [
      { key: 'A', text: 'Korupsi finansial murni tanpa keterlibatan jaringan sosial' },
      { key: 'B', text: 'Nepotisme dan kolusi yang memanfaatkan ikatan kekerabatan untuk menguntungkan kelompok tertentu' },
      { key: 'C', text: 'Amalgamasi budaya antara birokrasi dan pihak swasta' },
      { key: 'D', text: 'Konformitas positif dalam mempercepat pembangunan infrastruktur daerah' },
      { key: 'E', text: 'Kesenjangan kultural (cultural lag) dalam penguasaan teknologi internet' }
    ],
    correctKey: 'B',
    explanation: 'Menunjuk perusahaan kerabat tanpa lelang terbuka merupakan bentuk nepotisme (mengutamakan kerabat) dan kolusi (kerjasama rahasia yang merugikan publik/negara).'
  },
  {
    id: 18,
    level: 'C5',
    topic: 'Metode Penelitian Sosial (Rumusan Masalah)',
    stimulus: 'Seorang peneliti muda menyusun rumusan masalah: "Apakah terdapat pengaruh gawai terhadap siswa?". Pembimbing penelitian menilai rumusan tersebut terlalu luas, samar, dan tidak memiliki fokus kualitatif maupun kuantitatif yang jelas untuk mengukur fenomena sosial perundungan siber (cyberbullying) di sekolah pada tahun 2026.',
    question: 'Evaluasi dan perbaikan yang tepat terhadap rumusan masalah penelitian sosiologi tersebut adalah...',
    options: [
      { key: 'A', text: '"Berapa harga gawai termahal yang dimiliki oleh siswa SMA di perkotaan?"' },
      { key: 'B', text: '"Bagaimana pengaruh intensitas penggunaan media sosial terhadap peningkatan kasus perundungan siber di kalangan siswa SMA X tahun 2026?"' },
      { key: 'C', text: '"Mengapa siswa lebih menyukai gawai daripada membaca buku teks pelajaran?"' },
      { key: 'D', text: '"Apakah gawai merupakan satu-satunya penyebab utama kerusakan moral bangsa?"' },
      { key: 'E', text: '"Bagaimana cara melarang penggunaan gawai di seluruh sekolah di Indonesia?"' }
    ],
    correctKey: 'B',
    explanation: 'Rumusan masalah sosiologi yang baik harus spesifik, terukur, memiliki variabel yang jelas (intensitas media sosial & perundungan siber), serta memuat lokus dan waktu penelitian.'
  },
  {
    id: 19,
    level: 'C3',
    topic: 'Metode Pengumpulan Data Kualitatif',
    stimulus: 'Guna mendesain penyelidikan sosiologis tentang adaptasi sosial nelayan tradisional akibat pembangunan pelabuhan peti kemas automatik tahun 2026, peneliti memilih pendekatan kualitatif studi kasus. Peneliti berniat menggali secara mendalam makna perubahan sosial yang dialami nelayan, strategi bertahan hidup, serta pergeseran struktur kepemimpinan lokal.',
    question: 'Teknik pengumpulan data yang paling tepat dihindari atau di-subordinasikan dalam desain kualitatif studi kasus di atas adalah...',
    options: [
      { key: 'A', text: 'Wawancara mendalam dengan tokoh adat nelayan' },
      { key: 'B', text: 'Observasi partisipatif pada kegiatan melaut nelayan' },
      { key: 'C', text: 'Penyebaran kuesioner tertutup skala masif tanpa interaksi langsung' },
      { key: 'D', text: 'Studi dokumen kearsipan sejarah desa nelayan' },
      { key: 'E', text: 'Diskusi Kelompok Terarah (Focus Group Discussion)' }
    ],
    correctKey: 'C',
    explanation: 'Pendekatan kualitatif berfokus pada kedalaman makna kontekstual melalui wawancara dan observasi. Kuesioner tertutup skala masif adalah instrumen utama penelitian kuantitatif generatif.'
  },
  {
    id: 20,
    level: 'C4',
    topic: 'Triangulasi Data Penelitian Sosial',
    stimulus: 'Peneliti sosiologi mengumpulkan data kemiskinan kota tahun 2026. Data survei kuantitatif menunjukkan angka kemiskinan turun 2%, namun data kualitatif hasil wawancara mengungkapkan warga pemukiman kumuh merasa beban hidup makin berat akibat inflasi harga pangan. Peneliti kemudian melakukan triangulasi data untuk menggabungkan kedua temuan tersebut.',
    question: 'Analisis sosiologis mengenai tujuan triangulasi data dalam penelitian permasalahan sosial di atas adalah...',
    options: [
      { key: 'A', text: 'Untuk membuktikan bahwa data kuantitatif selalu lebih benar daripada data kualitatif' },
      { key: 'B', text: 'Menguji kesahihan, keabsahan, dan komplementaritas data dari berbagai sumber dan metode riset' },
      { key: 'C', text: 'Memanipulasi data kualitatif agar sesuai dengan angka statistik pemerintah' },
      { key: 'D', text: 'Mempercepat proses penulisan laporan tanpa perlu mengkonfirmasi ulang hasil analisis' },
      { key: 'E', text: 'Mengabaikan keluhan warga agar laporan penelitian tampak berorientasi positif' }
    ],
    correctKey: 'B',
    explanation: 'Triangulasi data bertujuan untuk mengecek keabsahan/validitas data dan memperoleh pemahaman yang lebih kaya dan utuh dengan menyilangkan berbagai metode dan sumber data.'
  },
  {
    id: 21,
    level: 'C5',
    topic: 'Evaluasi Rekomendasi Solusi Masalah Sosial',
    stimulus: 'Laporan riset pemecahan masalah sampah plastik tahun 2026 merekomendasikan: "Pemerintah daerah wajib menerapkan denda pidana penjara bagi warga yang membuang sampah sembarangan". Namun, rekomendasi ini dikritik oleh tim evaluator sosiologi karena dinilai top-down, represif, dan mengabaikan ketiadaan infrastruktur tempat sampah yang memadai di pemukiman warga.',
    question: 'Evaluasi yang paling konstruktif untuk memperbaiki rekomendasi penelitian sosial tersebut adalah...',
    options: [
      { key: 'A', text: 'Mengganti rekomendasi dengan dorongan pembangunan bank sampah berbasis partisipasi komunitas dan insentif ekonomi lokal' },
      { key: 'B', text: 'Menutup seluruh industri produsen kemasan plastik secara mendadak' },
      { key: 'C', text: 'Menyerahkan seluruh pengelolaan sampah kepada investor asing sepenuhnya' },
      { key: 'D', text: 'Menghapuskan semua bentuk regulasi kebersihan kota agar warga bebas beradaptasi' },
      { key: 'E', text: 'Memindahkan seluruh penduduk perkotaan ke kawasan pedesaan yang lebih luas' }
    ],
    correctKey: 'A',
    explanation: 'Rekomendasi penelitian sosiologis harus bersifat realistis, partisipatif, berbasis akar masalah sosial, serta tidak semata-mata mengandalkan tindakan hukum represif tanpa solusi struktural.'
  },
  {
    id: 22,
    level: 'C3',
    topic: 'Solidaritas Mekanik & Organik (Emile Durkheim)',
    stimulus: 'Desa Mekar Jaya yang tadinya homogen berbasis pertanian tradisional, pada tahun 2026 bertransformasi menjadi kawasan industri manufaktur komponen baterai. Masyarakat kini terbagi ke dalam berbagai profesi spesifik: teknisi mesin, penguji kualitas, spesialis logistik, dan manajer SDM. Hubungan antarwarga kini disatukan oleh rasa saling membutuhkan atas jasa profesional masing-masing.',
    question: 'Berdasarkan teori Emile Durkheim, fenomena perubahan sosial di Desa Mekar Jaya mengaplikasikan konsep...',
    options: [
      { key: 'A', text: 'Solidaritas Mekanik yang berorientasi pada kesamaan tradisi universal' },
      { key: 'B', text: 'Solidaritas Organik yang didasari oleh pembagian kerja spesifik dan ketergantungan fungsional' },
      { key: 'C', text: 'Gemeinschaft of Mind berbasis dorongan keagamaan lokal' },
      { key: 'D', text: 'Anomi sosial akibat hilangnya seluruh aturan nilai dalam masyarakat' },
      { key: 'E', text: 'Alienasi pekerja akibat dominasi pemilik modal atas alat produksi' }
    ],
    correctKey: 'B',
    explanation: 'Solidaritas organik ditandai oleh pembagian kerja yang kompleks, heterogenitas profesi, dan ketergantungan fungsional antar-bagian dalam masyarakat industri modern.'
  },
  {
    id: 23,
    level: 'C4',
    topic: 'Gemeinschaft & Gesellschaft (Ferdinand Tönnies)',
    stimulus: 'Para penghuni Kompleks Hunian Modern "Eco-Smart" tahun 2026 berinteraksi terutama melalui surat elektronik formal dan aplikasi manajemen apartemen. Setiap hubungan antarwarga diatur secara formal berdasarkan ikatan kontrak hukum dan kepentingan rasional pemeliharaan properti bersama. Interaksi tatap muka yang akrab dan berorientasi ikatan batin sangat jarang terjadi.',
    question: 'Analisis Ferdinand Tönnies terhadap bentuk kehidupan sosial penghuni kompleks hunian tersebut tergolong sebagai...',
    options: [
      { key: 'A', text: 'Gemeinschaft by blood (Paguyuban karena ikatan darah)' },
      { key: 'B', text: 'Gemeinschaft of place (Paguyuban karena tempat tinggal bersama)' },
      { key: 'C', text: 'Gesellschaft (Patembayan) yang mengutamakan ikatan pamungkas kontraktual dan rasionalitas' },
      { key: 'D', text: 'Kelompok kerumunan informal sementara' },
      { key: 'E', text: 'Kelompok acuan emosional mutlak' }
    ],
    correctKey: 'C',
    explanation: 'Patembayan (Gesellschaft) adalah bentuk kehidupan publik di mana hubungan bersifat rasional, immanen, kontraktual, berorientasi pamrih/ekonomi, serta berkurang nilai ikatan batinnya.'
  },
  {
    id: 24,
    level: 'C5',
    topic: 'Gaya Kepemimpinan Otokratis dalam Organisasi',
    stimulus: 'Di sebuah perusahaan media digital tahun 2026 yang didominasi pekerja Gen Z, direktur baru mencoba menerapkan kepemimpinan otokratis ketat. Semua keputusan editorial wajib disetujui direktur tanpa ruang diskusi, dan sistem komando satu arah diterapkan. Hasilnya, dalam kurun waktu 3 bulan, tingkat pengunduran diri karyawan mencapai 40% dan produktivitas merosot tajam.',
    question: 'Evaluasi sosiologis yang tepat mengenai kegagalan gaya kepemimpinan otokratis dalam organisasi pekerja muda di era digital adalah...',
    options: [
      { key: 'A', text: 'Kepemimpinan otokratis tidak cocok untuk karakter organisasi pengetahuan (knowledge worker) yang membutuhkan otonomi dan kreativitas' },
      { key: 'B', text: 'Generasi Z sama sekali tidak memiliki kebiasaan disiplin kerja dalam struktur organisasi manapun' },
      { key: 'C', text: 'Gaya otokratis seharusnya diterapkan dengan menambah sanksi fisik yang lebih berat' },
      { key: 'D', text: 'Kegagalan disebabkan karena direktur kurang memanfaatkan sarana kecerdasan buatan' },
      { key: 'E', text: 'Perusahaan seharusnya membubarkan struktur organisasi formal menjadi kelompok informal sepenuhnya' }
    ],
    correctKey: 'A',
    explanation: 'Kepemimpinan otokratis mematikan otonomi dan kreativitas yang sangat dibutuhkan pada organisasi pengetahuan/kreatif modern. Gaya kepemimpinan demokratis atau transformasional lebih efektif.'
  },
  {
    id: 25,
    level: 'C3',
    topic: 'Ketidakadilan Gender & Glass Ceiling Effect',
    stimulus: 'Data Kementerian Tenaga Kerja 2026 memperlihatkan bahwa meskipun jumlah lulusan perempuan di bidang Sains dan Teknologi (STEM) mencapai 52%, hanya 18% dari mereka yang berhasil menduduki posisi pimpinan manajerial tingkat atas di perusahaan teknologi tinggi. Kebanyakan dari mereka tertahan di posisi staf junior (glass ceiling effect).',
    question: 'Fenomena pembatasan karier perempuan di dunia kerja tersebut mengaplikasikan bentuk ketidakadilan sosial berupa...',
    options: [
      { key: 'A', text: 'Stereotip gender dan subordinasi peran perempuan dalam struktur pekerjaan' },
      { key: 'B', text: 'Marginalisasi ekonomi akibat kemerosotan harga pasar modal' },
      { key: 'C', text: 'Dominasi rasial dalam struktur ketenagakerjaan internasional' },
      { key: 'D', text: 'Amalgamasi sosial yang tidak sempurna antar-etnis' },
      { key: 'E', text: 'Ketimpangan pendapatan antar-daerah urban dan rural' }
    ],
    correctKey: 'A',
    explanation: 'Fenomena glass ceiling di mana perempuan sulit naik ke pucuk pimpinan merupakan manifestasi subordinasi gender dan prasangka/stereotip bahwa pimpinan haruslah laki-laki.'
  },
  {
    id: 26,
    level: 'C4',
    topic: 'Diskriminasi Algoritmik (Algorithmic Bias)',
    stimulus: 'Pada tahun 2026, sebuah bank swasta besar meluncurkan sistem penilaian kredit (credit scoring) berbasis algoritma AI. Hasil evaluasi menunjukkan bahwa algoritma tersebut secara sistematis menolak permohonan kredit warga yang tinggal di kode pos pemukiman berpenghasilan rendah, tanpa memprediksi kapasitas pendapatan individu pelamar sesungguhnya.',
    question: 'Analisis sosiologis mengenai dampak penggunaan algoritma AI tersebut terhadap permasalahan sosial adalah...',
    options: [
      { key: 'A', text: 'Membantu menciptakan pemerataan kesejahteraan sosial secara efisien' },
      { key: 'B', text: 'Melanggengkan diskriminasi struktural baru berbasis prasangka spasial digital (algorithmic bias)' },
      { key: 'C', text: 'Menghilangkan seluruh bentuk ketidakadilan sosial dalam pelayanan perbankan' },
      { key: 'D', text: 'Mempercepat inklusi keuangan bagi kelompok marginal di perkotaan' },
      { key: 'E', text: 'Mendorong terciptanya solidaritas mekanik di pemukiman padat penduduk' }
    ],
    correctKey: 'B',
    explanation: 'Bias algoritma yang mereproduksi ketimpangan kelas/spasial merupakan bentuk diskriminasi struktural modern yang memperburuk eksklusi sosial kelompok kurang beruntung.'
  },
  {
    id: 27,
    level: 'C5',
    topic: 'Nepotisme vs Meritokrasi Birokrasi',
    stimulus: 'Sebuah lembaga publik pada tahun 2026 memilih menunjuk kerabat kepala dinas untuk mengisi posisi direktur teknik teknologi informasi, dibanding menguji calon eksternal berkualifikasi sertifikasi internasional. Enam bulan kemudian, sistem pusat data dinas tersebut mengalami kebobolan data parah akibat kesalahan manajemen teknis.',
    question: 'Evaluasi terhadap dampak nepotisme dalam birokrasi pemerintahan berdasarkan kasus di atas adalah...',
    options: [
      { key: 'A', text: 'Nepotisme memperkuat rasa kekeluargaan sehingga kinerja organisasi menjadi lebih ramah' },
      { key: 'B', text: 'Nepotisme merusak meritokrasi dan profesionalisme, yang berdampak pada kegagalan pelayanan dan kerugian publik' },
      { key: 'C', text: 'Nepotisme merupakan cara paling hemat anggaran dalam perekrutan tenaga kerja baru' },
      { key: 'D', text: 'Nepotisme hanya berdampak minor dan tidak memengaruhi kinerja teknis instansi' },
      { key: 'E', text: 'Nepotisme menciptakan dorongan persaingan sehat bagi calon pegawai eksternal' }
    ],
    correctKey: 'B',
    explanation: 'Nepotisme menyingkirkan asas meritokrasi (kemampuan/kualifikasi). Pengangkatan pejabat non-kompeten akibat kekerabatan merusak tata kelola publik dan berujung krisis operasional.'
  },
  {
    id: 28,
    level: 'C3',
    topic: 'Validitas Responden Penelitian Kuantitatif',
    stimulus: 'Tim peneliti SMA menyebarkan instrumen kuesioner daring untuk mengukur tingkat kecanduan gim pada remaja tahun 2026. Guna memastikan bahwa data yang terkumpul benar-benar diisi oleh siswa SMA (bukan orang dewasa atau bot algoritma), peneliti mengaplikasikan fitur verifikasi identitas pelajar dan penyaringan pertanyaan kunci (screener questions).',
    question: 'Langkah penyaringan dan verifikasi yang dilakukan peneliti bertujuan untuk mengaplikasikan prinsip...',
    options: [
      { key: 'A', text: 'Validitas dan keabsahan responden dalam penelitian kuantitatif' },
      { key: 'B', text: 'Etika kerahasiaan identitas peneliti di mata publik' },
      { key: 'C', text: 'Triangulasi data kualitatif berbasis etnografi' },
      { key: 'D', text: 'Pemilihan sampel secara acak tanpa batas (random sampling)' },
      { key: 'E', text: 'Penyusunan draf rekomendasi kebijakan hukum' }
    ],
    correctKey: 'A',
    explanation: 'Memastikan identitas dan kesesuaian responden dengan kriteria populasi sasaran adalah bagian penting dari menjaga validitas dan reliabilitas instrumen pengumpulan data.'
  },
  {
    id: 29,
    level: 'C4',
    topic: 'Interseksi Sosial & Reduksi Konflik',
    stimulus: 'Pemerintah membangun hunian inklusif di IKN Nusantara pada tahun 2026 yang menempatkan warga dari latar belakang suku, agama, dan tingkat ekonomi yang beragam dalam satu kawasan RT/RW. Taman publik dan fasilitas olah raga didesain menjadi ruang pertemuan bersama secara rutin.',
    question: 'Analisis sosiologis mengenai dampak desain hunian inklusif tersebut terhadap potensi konflik antar-kelompok adalah...',
    options: [
      { key: 'A', text: 'Mempercepat terjadinya polarisasi sosial akibat tingginya tingkat frekuensi kontak fisik' },
      { key: 'B', text: 'Mendorong interseksi sosial dan pembauran yang mereduksi ikatan primordialis eksklusif' },
      { key: 'C', text: 'Menyebabkan hilangnya identitas budaya lokal warga pendatang secara mendadak' },
      { key: 'D', text: 'Menumbuhkan prasangka sosial baru akibat perebutan sarana olahraga publik' },
      { key: 'E', text: 'Memaksa masyarakat untuk membentuk kelompok sekunder tertutup' }
    ],
    correctKey: 'B',
    explanation: 'Interseksi sosial (persilangan keanggotaan) melalui ruang publik bersama memicu interaksi intensif antar kelompok heterogen, yang bermanfaat mereduksi sikap etnosentrisme/eksklusivisme.'
  },
  {
    id: 30,
    level: 'C5',
    topic: 'Gerakan Sosial Digital & Slacktivism',
    stimulus: 'Sebuah gerakan sosial digital menggalang tagar kampanye di media sosial tahun 2026 untuk menolak penggusuran hutan kota. Kampanye ini menandatangani 500.000 petisi daring. Namun, ketika diajak melakukan aksi dialog tatap muka dan penanaman pohon bersama di lapangan, hanya 20 orang yang hadir. Evaluasi pengamat sosiologi menilai gerakan ini terjebak pada fenomena slacktivism.',
    question: 'Evaluasi yang paling tepat mengenai keterbatasan gerakan sosial slacktivism di era digital adalah...',
    options: [
      { key: 'A', text: 'Memiliki daya tekan hukum yang sangat mutlak di mata pemerintah daerah' },
      { key: 'B', text: 'Hanya memberikan ilusi partisipasi di dunia maya tanpa komitmen aksi nyata di dunia fisik' },
      { key: 'C', text: 'Sangat efektif dalam merombak kebijakan struktural dalam waktu singkat' },
      { key: 'D', text: 'Berhasil menghapus kesenjangan sosial di kalangan masyarakat akar rumput' },
      { key: 'E', text: 'Menjadikan seluruh anggotanya sebagai pemikir kritis aktif di lapangan' }
    ],
    correctKey: 'B',
    explanation: 'Slacktivism mengacu pada aktivisme media sosial yang berbiaya rendah dan minim risiko (seperti menekan tombol Like atau petisi), namun sering kali kurang memiliki dampak aksi perubahan sosial nyata di lapangan.'
  },
  {
    id: 31,
    level: 'C3',
    topic: 'Diferensiasi Sosial Horizontal',
    stimulus: 'Perkembangan dunia kerja tahun 2026 memunculkan ragam profesi baru seperti Prompt Engineer, Ethical Hacker, dan AI Data Auditor. Masing-masing profesi ini memiliki tingkat keahlian yang setara dalam hierarki kelas pekerja teknologi modern tanpa ada yang dianggap lebih tinggi derajat sosialnya secara mutlak.',
    question: 'Pengelompokan sosial berdasarkan keberagaman profesi modern tersebut mengaplikasikan konsep...',
    options: [
      { key: 'A', text: 'Stratifikasi sosial vertikal berbasis feodalisme' },
      { key: 'B', text: 'Diferensiasi sosial horizontal berbasis pembagian keahlian/profesi' },
      { key: 'C', text: 'Ketimpangan sosial struktural berbasis kasta keturunan' },
      { key: 'D', text: 'Consanguinity kelompok berdasarkan garis keturunan ibu' },
      { key: 'E', text: 'Marginalisasi kelompok minoritas teknokrat' }
    ],
    correctKey: 'B',
    explanation: 'Diferensiasi sosial adalah pembedaan anggota masyarakat secara horizontal (sejajar/setara) berdasarkan profesi, suku, agama, atau gender tanpa adanya tingkatan kelas (hierarki tinggi-rendah).'
  },
  {
    id: 32,
    level: 'C4',
    topic: 'Echo Chamber & Polarisasi Sosial',
    stimulus: 'Jelang Pilkada Serentak 2026, penggunaan bot politik di platform digital menciptakan fenomena ruang gema (echo chamber). Warga masyarakat hanya menerima paparan informasi yang mendukung calon mereka dan terisolasi dari sudut pandang berlawanan. Akibatnya, timbul perdebatan sengit dan permusuhan antar-kelompok warga di dunia nyata.',
    question: 'Analisis sosiologis terhadap mekanisme terbentuknya polarisasi antar-kelompok akibat echo chamber adalah...',
    options: [
      { key: 'A', text: 'Menguatnya ikatan inklusif antar-warga yang berbeda pandangan politik' },
      { key: 'B', text: 'Penurunan empati sosial dan penguatan stereotip negatif terhadap kelompok luar (out-group)' },
      { key: 'C', text: 'Terciptanya konsensus nilai baru yang disepakati oleh seluruh kontestan pilkada' },
      { key: 'D', text: 'Hilangnya kesadaran politik pada sebagian besar warga pemilih' },
      { key: 'E', text: 'Peningkatan taraf ekonomi warga melalui pemanfaatan teknologi jaringan' }
    ],
    correctKey: 'B',
    explanation: 'Ruang gema mendistorsi persepsi sosial, memperkuat bias konfirmasi, dan memicu penajaman batas in-group/out-group, yang menurunkan empati dan memicu intoleransi.'
  },
  {
    id: 33,
    level: 'C3',
    topic: 'Etika Penelitian Sosial (Informed Consent)',
    stimulus: 'Seorang peneliti sosiologi mengumpulkan data percakapan privat dari grup WhatsApp warga desa tanpa meminta izin terlebih dahulu demi meneliti isu prasangka antaretnis pada tahun 2026. Hasil riset dipublikasikan dengan membuka nama asli dan identitas para partisipan.',
    question: 'Berdasarkan etika penelitian sosiologis, tindakan peneliti tersebut melanggar prinsip...',
    options: [
      { key: 'A', text: 'Triangulasi metode riset kuantitatif' },
      { key: 'B', text: 'Persetujuan atas kesadaran (Informed Consent) dan kerahasiaan identitas subjek (Anonymity)' },
      { key: 'C', text: 'Penentuan ukuran sampel berbasis teori deviasi standar' },
      { key: 'D', text: 'Kecepatan publikasi data ilmiah di jurnal bereputasi' },
      { key: 'E', text: 'Penggunaan instrumen teknologi AI dalam analisis data' }
    ],
    correctKey: 'B',
    explanation: 'Etika riset sosiologi mewajibkan peneliti memperoleh persetujuan subjek (informed consent) serta menjaga kerahasiaan identitas personal (anonymity & confidentiality).'
  },
  {
    id: 34,
    level: 'C4',
    topic: 'Kelompok Afinitas & Co-Living Perkotaan',
    stimulus: 'Di megapolitan Jakarta tahun 2026, makin marak tren hunian bersama (co-living) di kalangan profesional muda. Mereka memilih tinggal dalam satu rumah besar dan saling berbagi biaya kehidupan serta aktivitas sosial, meskipun tidak memiliki hubungan kekerabatan darah. Mereka saling merawat saat sakit dan memberikan dukungan psikologis.',
    question: 'Analisis sosiologis terhadap fenomena co-living tersebut mengindikasikan bahwa...',
    options: [
      { key: 'A', text: 'Ikatan keluarga biologis telah hilang total dari peradaban manusia modern' },
      { key: 'B', text: 'Kelompok afinitas gaya hidup memanifestasikan peran ikatan kelompok primer baru pengganti kerabat di perkotaan' },
      { key: 'C', text: 'Pekerja muda mengalami penyimpangan perilaku sosial sekunder yang parah' },
      { key: 'D', text: 'Kehidupan perkotaan memaksa terbentuknya kelompok solidaritas mekanik feodal' },
      { key: 'E', text: 'Hunian bersama merupakan bentuk organisasi birokrasi berorientasi profit murni' }
    ],
    correctKey: 'B',
    explanation: 'Fenomena co-living memperlihatkan bagaimana kelompok afinitas (kesamaan minat/kebutuhan) mengambil alih sebagian fungsi dukungan emosional dan afeksi dari kelompok primer tradisional (keluarga/kerabat).'
  },
  {
    id: 35,
    level: 'C5',
    topic: 'Evaluasi Kebijakan Penanggulangan Ketimpangan',
    stimulus: 'Audit penyaluran Bantuan Sosial Digital tahun 2026 menemukan bahwa 15% bantuan salah sasaran karena data penerima menggunakan basis data lama yang tidak diperbarui. Akibatnya, keluarga miskin baru terdampak PHK industri AI tidak terdata, sementara keluarga mampu tetap menerima transfer tunai.',
    question: 'Evaluasi yang paling tepat untuk memecahkan masalah ketidakadilan penyaluran bantuan sosial tersebut adalah...',
    options: [
      { key: 'A', text: 'Menghentikan seluruh program bantuan sosial secara permanen bagi masyarakat' },
      { key: 'B', text: 'Membangun sistem pemutakhiran data kemiskinan berbasis registrasi sosial ekonomi real-time yang melibatkan verifikasi komunitas lokal' },
      { key: 'C', text: 'Membagikan bantuan sosial secara acak tanpa perlu menggunakan kriteria apapun' },
      { key: 'D', text: 'Diserahkan pengelolaan bantuan kepada instansi swasta tanpa pengawasan pemerintah' },
      { key: 'E', text: 'Mewajibkan seluruh calon penerima bantuan untuk pindah ke ibu kota baru' }
    ],
    correctKey: 'B',
    explanation: 'Untuk menjamin ketepatan sasaran dan mengurangi ketidakadilan, diperlukan integrasi data real-time berbasis partisipasi verifikasi dari komunitas lokal (bottom-up).'
  }
];

export const TEACHER_EMAIL = 'uripsupandi99@admin.sma.belajar.id';
