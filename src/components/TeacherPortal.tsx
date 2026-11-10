import React, { useState, useEffect } from 'react';
import { TEACHER_EMAIL } from '../data/questions';
import { X, Search, Download, Trash2, Users, Award, BookOpen, RefreshCw } from 'lucide-react';

interface Submission {
  studentName: string;
  studentClass: string;
  studentNumber: string;
  character: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  lives: number;
  timeElapsed: number;
  timestamp: string;
}

interface TeacherPortalProps {
  onClose: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ onClose }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Load submissions from localStorage and server API
  const loadSubmissions = async () => {
    setLoading(true);
    let localData: Submission[] = [];
    try {
      localData = JSON.parse(localStorage.getItem('mario_sosiologi_submissions') || '[]');
    } catch (e) {
      console.error(e);
    }

    try {
      const res = await fetch('/api/scores');
      if (res.ok) {
        const serverData = await res.json();
        if (Array.isArray(serverData) && serverData.length > 0) {
          // Merge unique by studentName + timestamp
          const map = new Map<string, Submission>();
          [...serverData, ...localData].forEach((item) => {
            map.set(`${item.studentName}-${item.timestamp}`, item);
          });
          setSubmissions(Array.from(map.values()));
          setLoading(false);
          return;
        }
      }
    } catch {
      // Backend not reached, fall back to localData
    }

    setSubmissions(localData);
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Filter classes
  const classes = Array.from(new Set(submissions.map((s) => s.studentClass).filter(Boolean)));

  const filtered = submissions.filter((s) => {
    const matchClass = selectedClass === 'all' || s.studentClass === selectedClass;
    const matchSearch =
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSearch;
  });

  // Stats
  const totalStudents = filtered.length;
  const avgScore = totalStudents > 0
    ? Math.round(filtered.reduce((acc, curr) => acc + curr.score, 0) / totalStudents)
    : 0;
  const highestScore = totalStudents > 0
    ? Math.max(...filtered.map((s) => s.score))
    : 0;
  const passRate = totalStudents > 0
    ? Math.round((filtered.filter((s) => s.score >= 75).length / totalStudents) * 100)
    : 0;

  // Export to CSV
  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    const headers = [
      'No',
      'Nama Siswa',
      'Kelas',
      'No Absen',
      'Nilai (0-100)',
      'Benar',
      'Total Soal',
      'Sisa Nyawa',
      'Waktu Tes',
    ];
    const rows = filtered.map((s, idx) => [
      idx + 1,
      `"${s.studentName}"`,
      `"${s.studentClass}"`,
      `"${s.studentNumber || '-'}"`,
      s.score,
      s.correctCount,
      s.totalQuestions,
      s.lives,
      `"${s.timestamp}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Sosiologi_XI_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = () => {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat rekapan nilai siswa di browser ini?')) {
      localStorage.removeItem('mario_sosiologi_submissions');
      setSubmissions([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border-4 border-amber-400 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b-2 border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-pixel text-yellow-300">
                PANEL GURU • REKAPITULASI NILAI SISWA
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Guru Pengampu: <strong className="text-slate-200">Urip Supandi, S.Pd</strong> ({TEACHER_EMAIL})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Stats Bar */}
        <div className="bg-slate-800/80 p-4 border-b border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-sans">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block text-[11px] mb-0.5">Total Siswa Menjawab</span>
            <strong className="text-amber-300 font-pixel text-base">{totalStudents} Siswa</strong>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block text-[11px] mb-0.5">Rata-Rata Nilai</span>
            <strong className="text-sky-400 font-pixel text-base">{avgScore} / 100</strong>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block text-[11px] mb-0.5">Nilai Tertinggi</span>
            <strong className="text-emerald-400 font-pixel text-base">{highestScore}</strong>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-400 block text-[11px] mb-0.5">Ketuntasan (≥75)</span>
            <strong className="text-amber-400 font-pixel text-base">{passRate}%</strong>
          </div>
        </div>

        {/* Filter & Action Controls */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[240px]">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari nama siswa atau kelas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Class dropdown */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Kelas ({classes.length})</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSubmissions}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer"
              title="Muat Ulang Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleExportCSV}
              disabled={filtered.length === 0}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg font-pixel text-[10px] flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>UNDUH CSV / EXCEL</span>
            </button>

            <button
              onClick={handleClearHistory}
              className="p-2 text-red-400 hover:bg-red-950/60 rounded-lg border border-red-900/60 cursor-pointer"
              title="Bersihkan Data"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-pixel text-xs">
              Memuat data rekapan siswa...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-slate-400 font-pixel text-xs">
                Belum ada siswa yang menyelesaikan kuis pada filter ini.
              </p>
              <p className="text-xs text-slate-500 font-sans">
                Setiap kali siswa menyelesaikan kuis Super Mario, nilainya akan otomatis muncul di sini!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-950 font-pixel text-[9px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5">No</th>
                    <th className="px-3 py-2.5">Nama Siswa</th>
                    <th className="px-3 py-2.5">Kelas</th>
                    <th className="px-3 py-2.5 text-center">Nilai</th>
                    <th className="px-3 py-2.5 text-center">Benar/Total</th>
                    <th className="px-3 py-2.5 text-center">Sisa Nyawa</th>
                    <th className="px-3 py-2.5">Waktu Selesai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filtered.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-2.5 text-slate-500 font-pixel text-[10px]">
                        {idx + 1}
                      </td>
                      <td className="px-3 py-2.5 font-semibold text-slate-200">
                        {item.studentName}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-pixel text-[9px]">
                          {item.studentClass}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <span
                          className={`font-pixel text-xs font-bold px-2 py-0.5 rounded ${
                            item.score >= 85
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                              : item.score >= 75
                              ? 'bg-blue-950 text-blue-400 border border-blue-500/50'
                              : 'bg-red-950 text-red-400 border border-red-500/50'
                          }`}
                        >
                          {item.score}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center text-slate-300 font-sans">
                        {item.correctCount} / {item.totalQuestions}
                      </td>
                      <td className="px-3 py-2.5 text-center text-red-400 font-pixel text-[10px]">
                        🍄 {item.lives}/10
                      </td>
                      <td className="px-3 py-2.5 text-slate-400 text-[11px]">
                        {item.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Sistem Penilaian Sosiologi Semester Ganjil Kelas XI</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
