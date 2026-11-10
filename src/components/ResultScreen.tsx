import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question, TEACHER_EMAIL } from '../data/questions';
import { marioAudio } from '../utils/audio';
import {
  Award,
  CheckCircle2,
  XCircle,
  Mail,
  Printer,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Check,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ResultScreenProps {
  studentName: string;
  studentClass: string;
  studentNumber: string;
  character: string;
  score: number;
  coins: number;
  lives: number;
  timeElapsed: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>;
  questions: Question[];
  onPlayAgain: () => void;
  isPrincessRescued?: boolean;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  studentClass,
  studentNumber,
  character,
  score,
  coins,
  lives,
  timeElapsed,
  userAnswers,
  questions,
  onPlayAgain,
  isPrincessRescued = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [expandedStimulus, setExpandedStimulus] = useState<Record<number, boolean>>({});
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string>('Memproses pengiriman laporan...');

  const totalQuestions = questions.length;
  const correctCount = questions.filter(
    (q) => userAnswers[q.id] === q.correctKey
  ).length;
  const wrongCount = totalQuestions - correctCount;
  const finalPercentage = Math.round((correctCount / totalQuestions) * 100);

  // Time format
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} menit ${s} detik`;
  };

  // Grade classification
  let gradeBadge = {
    title: 'SUPER STAR MARIO',
    rank: 'S',
    color: 'text-amber-400 bg-amber-950/80 border-amber-400',
    desc: 'Luar Biasa! Penguasaan materi Sosiologi sangat komprehensif dan matang!',
  };

  if (finalPercentage < 55) {
    gradeBadge = {
      title: 'MINI MARIO',
      rank: 'D',
      color: 'text-red-400 bg-red-950/80 border-red-500',
      desc: 'Perlu program remedial intensif dan review konsep dasar kelompok sosial.',
    };
  } else if (finalPercentage < 70) {
    gradeBadge = {
      title: 'MUSHROOM MARIO',
      rank: 'C',
      color: 'text-orange-400 bg-orange-950/80 border-orange-500',
      desc: 'Cukup baik, namun perlu penguatan pada analisis kasus dan penalaran AKM.',
    };
  } else if (finalPercentage < 85) {
    gradeBadge = {
      title: 'SUPER MARIO',
      rank: 'B',
      color: 'text-blue-400 bg-blue-950/80 border-blue-400',
      desc: 'Bagus sekali! Pemahaman konsep sudah kuat dan mampu mengevaluasi masalah.',
    };
  } else if (finalPercentage < 95) {
    gradeBadge = {
      title: 'FIRE MARIO',
      rank: 'A',
      color: 'text-emerald-400 bg-emerald-950/80 border-emerald-400',
      desc: 'Sangat Hebat! Menguasai penalaran tingkat tinggi C4 dan C5 dengan presisi.',
    };
  }

  // Cognitive breakdown
  const c3Total = questions.filter((q) => q.level === 'C3').length;
  const c3Correct = questions.filter(
    (q) => q.level === 'C3' && userAnswers[q.id] === q.correctKey
  ).length;

  const c4Total = questions.filter((q) => q.level === 'C4').length;
  const c4Correct = questions.filter(
    (q) => q.level === 'C4' && userAnswers[q.id] === q.correctKey
  ).length;

  const c5Total = questions.filter((q) => q.level === 'C5').length;
  const c5Correct = questions.filter(
    (q) => q.level === 'C5' && userAnswers[q.id] === q.correctKey
  ).length;

  // Topic breakdown
  const topicStats: Record<string, { total: number; correct: number }> = {};
  questions.forEach((q) => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, correct: 0 };
    }
    topicStats[q.topic].total++;
    if (userAnswers[q.id] === q.correctKey) {
      topicStats[q.topic].correct++;
    }
  });

  // Weak topics (where student made mistakes)
  const weakTopics = Object.entries(topicStats)
    .filter(([_, stats]) => stats.correct < stats.total)
    .map(([topic]) => topic);

  // Recommendations generator
  const getRecommendations = () => {
    const list: string[] = [];

    if (finalPercentage >= 85) {
      list.push(
        '🌟 Program Pengayaan (Enrichment): Analisis lanjutan mengenai studi kasus fenomena sosiologi digital kontemporer 2026 (seperti dampak AI & algoritma terhadap stratifikasi pekerjaan).'
      );
      list.push(
        '📚 Rekomendasi Bacaan Lanjutan: Buku Sosiologi Kontemporer bab "Transformasi Relasi Sosial di Era Algoritmik" dan jurnal penelitian sosiologi terakreditasi.'
      );
      list.push(
        '🎯 Proyek Portofolio: Siapkan mini-riset studi kasus tentang kelompok afinitas atau komunitas digital di lingkungan sekolah.'
      );
    } else if (finalPercentage >= 70) {
      list.push(
        '📖 Penguatan Konseptual (Konsolidasi): Pertajam pemahaman perbedaan mendasar antara Solidaritas Organik (Durkheim) vs Solidaritas Mekanik, serta Gemeinschaft vs Gesellschaft (Tönnies).'
      );
      list.push(
        '🔍 Latihan Penalaran AKM: Perbanyak latihan membedakan stimulus berbasis fakta dengan interpretasi sosiologis pada soal level C4 dan C5.'
      );
      if (weakTopics.length > 0) {
        list.push(
          `📌 Materi Perlu Review Mandiri: Pelajari kembali indikator topik: ${weakTopics.slice(0, 3).join(', ')}.`
        );
      }
    } else {
      list.push(
        '⚠️ Program Remedial Terarah: Review kembali bab "Dasar-Dasar Pembentukan Kelompok Sosial" dan "Kriteria Masalah Sosial Menurut Ahli".'
      );
      list.push(
        '📝 Bedah Soal & Glosarium Istilah: Buat catatan ringkas mengenai istilah sosiologi kunci: In-Group/Out-Group, Etnosentrisme, Konformitas, Ageism, Filter Bubble, dan Triangulasi Data.'
      );
      list.push(
        '👥 Konsultasi Pembelajaran: Diskusikan hasil evaluasi kuis ini dengan guru pengampu (Pak Urip Supandi) untuk bimbingan khusus pada topik yang belum tuntas.'
      );
    }

    return list;
  };

  const recommendations = getRecommendations();

  // Automatic Score Submission to server & local storage
  useEffect(() => {
    marioAudio.playStageClear();

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });

    const timestamp = new Date().toLocaleString('id-ID');
    const submissionPayload = {
      studentName,
      studentClass,
      studentNumber,
      character,
      score: finalPercentage,
      correctCount,
      totalQuestions,
      lives,
      timeElapsed,
      timestamp,
      teacherEmail: TEACHER_EMAIL,
    };

    // Save to local storage for teacher recap
    try {
      const existing = JSON.parse(localStorage.getItem('mario_sosiologi_submissions') || '[]');
      existing.unshift(submissionPayload);
      localStorage.setItem('mario_sosiologi_submissions', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    // Attempt POST to backend /api/scores
    fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionPayload),
    })
      .then((res) => {
        if (res.ok) {
          setIsEmailSent(true);
          setEmailStatus(`Laporan nilai otomatis tercatat dan diteruskan ke email guru: ${TEACHER_EMAIL}`);
        } else {
          setIsEmailSent(true);
          setEmailStatus(`Nilai tersimpan dalam database lokal untuk guru: ${TEACHER_EMAIL}`);
        }
      })
      .catch(() => {
        setIsEmailSent(true);
        setEmailStatus(`Nilai tersimpan di browser untuk guru: ${TEACHER_EMAIL}`);
      });
  }, []);

  // Generate Mailto URL for direct 1-click email to teacher
  const emailSubject = encodeURIComponent(
    `[NILAI SOSIOLOGI XI] ${studentName} - Kelas ${studentClass} - Skor: ${finalPercentage}/100`
  );

  const emailBodyText = encodeURIComponent(
`Yth. Bapak Guru Urip Supandi, S.Pd
Guru Pengampu Sosiologi Kelas XI
Alamat Email: ${TEACHER_EMAIL}

Berikut adalah Laporan Resmi Hasil Kuis Interaktif Pembelajaran Sosiologi Semester Ganjil Tahun 2026:

============================================================
BIODATA SISWA:
- Nama Lengkap    : ${studentName}
- Kelas           : ${studentClass}
- Nomor Absen/NIS : ${studentNumber || '-'}
- Waktu Tes       : ${new Date().toLocaleString('id-ID')}
- Karakter Game   : ${character.toUpperCase()}

HASIL PENILAIAN SUMATIF:
- Nilai Akhir     : ${finalPercentage} / 100
- Predikat / Rank : ${gradeBadge.rank} (${gradeBadge.title})
- Jawaban Benar   : ${correctCount} dari ${totalQuestions} soal
- Jawaban Salah   : ${wrongCount} soal
- Sisa Nyawa      : ${lives} / 10 Nyawa
- Misi Putri Peach: ${isPrincessRescued ? 'BERHASIL DISELAMATKAN DARI BOS BOWSER! 👑' : 'Belum selesai'}
- Waktu Tempuh    : ${formatTime(timeElapsed)}

ANALISIS LEVEL KOGNITIF:
- Level C3 (Aplikasi) : ${c3Correct} / ${c3Total} (${Math.round((c3Correct / (c3Total || 1)) * 100)}%)
- Level C4 (Analisis) : ${c4Correct} / ${c4Total} (${Math.round((c4Correct / (c4Total || 1)) * 100)}%)
- Level C5 (Evaluasi) : ${c5Correct} / ${c5Total} (${Math.round((c5Correct / (c5Total || 1)) * 100)}%)

REKOMENDASI PEMBELAJARAN SELANJUTNYA:
${recommendations.map((r, i) => `${i + 1}. ${r.replace(/^[^\w]+/, '')}`).join('\n')}

Laporan ini dibuat otomatis melalui Aplikasi Kuis Interaktif Super Mario Bros Sosiologi XI.
Terima kasih.`
  );

  const mailtoUrl = `mailto:${TEACHER_EMAIL}?subject=${emailSubject}&body=${emailBodyText}`;
  const gmailDirectUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    TEACHER_EMAIL
  )}&su=${emailSubject}&body=${emailBodyText}`;

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    const isCorrect = userAnswers[q.id] === q.correctKey;
    if (filter === 'wrong') return !isCorrect;
    if (filter === 'correct') return isCorrect;
    return true;
  });

  const toggleStimulus = (id: number) => {
    setExpandedStimulus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-6 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-slate-900 border-4 border-amber-400 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden print:border-black">
          {/* Decorative Corner Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[10px] sm:text-xs bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded font-bold">
                  HASIL EVALUASI SUMATIF
                </span>
                <span className="text-slate-400 text-xs">
                  {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-pixel text-yellow-300">
                COURSE CLEAR! 🏁
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
                Pembelajaran Sosiologi XI • Kelompok Sosial & Permasalahan Sosial
              </p>
            </div>

            {/* Student Info Pill */}
            <div className="bg-slate-800/90 border border-slate-700 px-4 py-2.5 rounded-xl text-right">
              <div className="text-xs text-slate-400 font-pixel">SISWA / SISWI:</div>
              <div className="text-base sm:text-lg font-bold text-amber-300">
                {studentName}
              </div>
              <div className="text-xs text-slate-300 font-pixel">
                KELAS: {studentClass} {studentNumber && `• NO: ${studentNumber}`}
              </div>
            </div>
          </div>

          {/* Princess Rescued Banner */}
          {isPrincessRescued && (
            <div className="bg-pink-950/80 border-2 border-pink-400 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 text-pink-200 mt-4 shadow-lg animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👑</span>
                <div>
                  <div className="font-pixel text-xs sm:text-sm text-yellow-300 font-bold">
                    MISI PUTRI PEACH: BERHASIL DISELAMATKAN!
                  </div>
                  <p className="text-xs text-pink-100 font-sans mt-0.5">
                    Bos Monster Bowser berhasil kamu kalahkan berkat penguasaan materi Sosiologi yang hebat!
                  </p>
                </div>
              </div>
              <span className="font-pixel text-[10px] bg-pink-900 text-pink-100 px-2.5 py-1.5 rounded-lg border border-pink-400 shrink-0 font-bold shadow-xs">
                +500 POIN
              </span>
            </div>
          )}

          {/* Score & Rank Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 items-center">
            {/* Main Score Box */}
            <div className="bg-gradient-to-br from-amber-500/20 to-red-500/20 border-2 border-amber-400 p-5 rounded-xl text-center flex flex-col items-center justify-center">
              <span className="text-xs font-pixel text-slate-300">NILAI AKHIR</span>
              <div className="text-5xl sm:text-6xl font-pixel text-amber-300 my-2 font-bold drop-shadow-md">
                {finalPercentage}
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Skala 0 - 100 • Standar AKM 2026
              </div>
            </div>

            {/* Rank Badge */}
            <div className={`border-2 p-5 rounded-xl text-center flex flex-col items-center justify-center ${gradeBadge.color}`}>
              <span className="text-xs font-pixel text-slate-300">PERINGKAT</span>
              <div className="text-4xl sm:text-5xl font-pixel my-2 font-bold">
                RANK {gradeBadge.rank}
              </div>
              <div className="font-pixel text-[11px] font-bold tracking-wider">
                {gradeBadge.title}
              </div>
              <p className="text-[11px] text-slate-300 mt-1 font-sans leading-tight">
                {gradeBadge.desc}
              </p>
            </div>

            {/* Detailed Quick Stats */}
            <div className="space-y-2 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs font-sans">
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Jawaban Benar:
                </span>
                <strong className="text-emerald-400 font-pixel text-xs">{correctCount} Soal</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-400" /> Jawaban Salah:
                </span>
                <strong className="text-red-400 font-pixel text-xs">{wrongCount} Soal</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-400">🍄 Sisa Nyawa:</span>
                <strong className="text-red-300 font-pixel text-xs">{lives} / 10 Nyawa</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-400">🪙 Koin Terkumpul:</span>
                <strong className="text-amber-300 font-pixel text-xs">{coins} KOIN</strong>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">⏱️ Durasi Pengerjaan:</span>
                <strong className="text-sky-300 font-sans text-xs">{formatTime(timeElapsed)}</strong>
              </div>
            </div>
          </div>

          {/* Cognitive Level Breakdown (C3, C4, C5) */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <h3 className="text-xs font-pixel text-amber-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>CAPAIAN LEVEL KOGNITIF (BLOOM TAXONOMY):</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-pixel text-[10px] text-sky-400">LEVEL C3 (APLIKASI)</span>
                  <span className="font-bold">{c3Correct}/{c3Total}</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(c3Correct / (c3Total || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-pixel text-[10px] text-amber-400">LEVEL C4 (ANALISIS)</span>
                  <span className="font-bold">{c4Correct}/{c4Total}</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(c4Correct / (c4Total || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-pixel text-[10px] text-emerald-400">LEVEL C5 (EVALUASI)</span>
                  <span className="font-bold">{c5Correct}/{c5Total}</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(c5Correct / (c5Total || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Rekomendasi Pembelajaran Selanjutnya */}
        <div className="bg-slate-900 border-4 border-emerald-500 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-pixel text-emerald-400">
                REKOMENDASI PEMBELAJARAN SELANJUTNYA
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                Tindak lanjut pedagogis dan rencana belajar mandiri berdasarkan hasil evaluasi kuis
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-slate-800/90 border border-slate-700 p-3.5 rounded-xl text-sm leading-relaxed text-slate-200 flex items-start gap-3"
              >
                <span className="font-pixel text-xs bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded shrink-0 mt-0.5">
                  #{idx + 1}
                </span>
                <p className="font-sans">{rec}</p>
              </div>
            ))}
          </div>

          {weakTopics.length > 0 && (
            <div className="bg-amber-950/40 border border-amber-600/40 p-4 rounded-xl text-xs space-y-2">
              <div className="font-pixel text-[11px] text-amber-300 flex items-center gap-1.5">
                <span>⚠️ INDIKATOR TOPIK YANG MEMERLUKAN PENGUATAN:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {weakTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="bg-amber-900/60 text-amber-200 border border-amber-700 px-2.5 py-1 rounded-md text-[11px]"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section: Otomatisasi Pengiriman Nilai ke Email Guru */}
        <div className="bg-slate-900 border-4 border-blue-500 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-pixel text-blue-400">
                STATUS PENGIRIMAN NILAI KE EMAIL GURU
              </h2>
              <p className="text-xs text-slate-300 font-sans">
                Alamat Email Guru: <strong className="text-blue-300 underline">{TEACHER_EMAIL}</strong>
              </p>
            </div>
          </div>

          {/* Automated Status Box */}
          <div className="bg-blue-950/60 border border-blue-500/60 p-4 rounded-xl text-xs sm:text-sm text-blue-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-300 font-pixel text-xs">
                {emailStatus}
              </p>
              <p className="text-slate-300 text-xs">
                Data nilai, rincian kognitif, dan waktu pengerjaan siswa <strong>{studentName}</strong> ({studentClass}) telah terdaftar dalam sistem evaluasi Sosiologi.
              </p>
            </div>
          </div>

          {/* Direct Email Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href={gmailDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nes-btn py-3 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl border-2 border-red-400 font-pixel text-[11px] flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <ExternalLink className="w-4 h-4" />
              <span>BUKA GMAIL (TERISI OTOMATIS)</span>
            </a>

            <a
              href={mailtoUrl}
              className="nes-btn py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl border-2 border-blue-400 font-pixel text-[11px] flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <Send className="w-4 h-4" />
              <span>KIRIM VIA APLIKASI EMAIL</span>
            </a>
          </div>
        </div>

        {/* Action Buttons: Print & Play Again */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
          <button
            onClick={() => window.print()}
            className="nes-btn px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 rounded-lg font-pixel text-xs flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>CETAK / SIMPAN PDF BUKTI NILAI</span>
          </button>

          <button
            onClick={onPlayAgain}
            className="nes-btn px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 border-2 border-amber-600 rounded-lg font-pixel text-xs flex items-center gap-2 cursor-pointer font-bold shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MAIN ULANG / SISWA LAIN 🔄</span>
          </button>
        </div>

        {/* Section: Review Seluruh Soal & Pembahasan */}
        <div className="bg-slate-900 border-4 border-amber-400 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-pixel text-yellow-300">
                REVIEW SOAL & PEMBAHASAN (35 SOAL)
              </h2>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Kunci jawaban resmi dan penjelasan materi sesuai naskah sumatif sosiologi
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs font-pixel">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-amber-400 text-amber-950 border-amber-400 font-bold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                SEMUA ({totalQuestions})
              </button>
              <button
                onClick={() => setFilter('wrong')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  filter === 'wrong'
                    ? 'bg-red-500 text-white border-red-400 font-bold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                SALAH ({wrongCount})
              </button>
              <button
                onClick={() => setFilter('correct')}
                className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  filter === 'correct'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                BENAR ({correctCount})
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const studentAnswer = userAnswers[q.id];
              const isCorrect = studentAnswer === q.correctKey;
              const isStimulusExpanded = expandedStimulus[q.id];

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-xl border-2 space-y-3 transition-colors ${
                    isCorrect
                      ? 'bg-slate-900/90 border-emerald-500/60'
                      : 'bg-slate-900/90 border-red-500/60'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-xs bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-amber-300 font-bold">
                        SOAL #{q.id}
                      </span>
                      <span className="text-[10px] font-pixel bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        LEVEL {q.level}
                      </span>
                      <span className="text-xs text-slate-300 font-bold hidden sm:inline">
                        {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="font-pixel text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          BENAR (+100)
                        </span>
                      ) : (
                        <span className="font-pixel text-[10px] bg-red-950 text-red-300 border border-red-500 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                          SALAH (-1 NYAWA)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stimulus Toggle */}
                  <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/80 text-xs">
                    <button
                      onClick={() => toggleStimulus(q.id)}
                      className="w-full flex items-center justify-between text-amber-300 hover:text-amber-200 font-pixel text-[10px] cursor-pointer"
                    >
                      <span>📰 STIMULUS LITERASI (KLIK UNTUK {isStimulusExpanded ? 'TUTUP' : 'BACA'})</span>
                      {isStimulusExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isStimulusExpanded && (
                      <p className="mt-2 text-slate-300 font-sans leading-relaxed text-justify pt-2 border-t border-slate-700">
                        {q.stimulus}
                      </p>
                    )}
                  </div>

                  {/* Question */}
                  <p className="text-sm font-semibold text-amber-100 font-sans leading-snug">
                    {q.question}
                  </p>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isCorrect
                          ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200'
                          : 'bg-red-950/50 border-red-600 text-red-200'
                      }`}
                    >
                      <span className="text-[10px] font-pixel block text-slate-400 mb-0.5">
                        JAWABAN ANDA:
                      </span>
                      <span className="font-bold font-pixel">({studentAnswer || '-'})</span>{' '}
                      <span>
                        {q.options.find((o) => o.key === studentAnswer)?.text || 'Tidak terjawab'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg border bg-emerald-950/70 border-emerald-500 text-emerald-100">
                      <span className="text-[10px] font-pixel block text-emerald-400 mb-0.5">
                        KUNCI JAWABAN RESMI:
                      </span>
                      <span className="font-bold font-pixel">({q.correctKey})</span>{' '}
                      <span>{q.options.find((o) => o.key === q.correctKey)?.text}</span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
                    <span className="text-amber-400 font-pixel text-[10px] block mb-1">
                      💡 PENJELASAN SOSIOLOGI:
                    </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs font-pixel text-slate-500 py-4">
          SUPER MARIO BROS SOSIOLOGI XI • TAHUN PELAJARAN 2026
        </div>
      </div>
    </div>
  );
};
