import React, { useState } from 'react';
import { marioAudio } from '../utils/audio';
import { Play, Volume2, Sparkles, BookOpen, ShieldCheck, Mail, Heart, Gamepad2, Cloud, Github } from 'lucide-react';
import { TEACHER_EMAIL } from '../data/questions';

interface StudentRegistrationProps {
  onStartGame: (studentData: {
    name: string;
    studentClass: string;
    studentNumber: string;
    character: 'mario' | 'luigi' | 'toad' | 'peach';
  }) => void;
  onOpenTeacherPortal: () => void;
  onOpenGitHubModal?: () => void;
}

export const StudentRegistration: React.FC<StudentRegistrationProps> = ({
  onStartGame,
  onOpenTeacherPortal,
  onOpenGitHubModal,
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [character, setCharacter] = useState<'mario' | 'luigi' | 'toad' | 'peach'>('mario');
  const [errorMsg, setErrorMsg] = useState('');

  const quickClasses = ['XI IPS 1', 'XI IPS 2', 'XI IPS 3', 'XI F-1', 'XI F-2', 'XI F-3', 'XI F-4', 'XI-A', 'XI-B'];

  const handleTestAudio = () => {
    marioAudio.playCoin();
    setTimeout(() => {
      marioAudio.play1Up();
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Mohon ketik Nama Lengkap Siswa terlebih dahulu!');
      return;
    }
    if (!studentClass.trim()) {
      setErrorMsg('Mohon isi Kelas Siswa secara manual!');
      return;
    }

    setErrorMsg('');
    marioAudio.playPowerup();
    marioAudio.startBGM('overworld');

    onStartGame({
      name: name.trim(),
      studentClass: studentClass.trim(),
      studentNumber: studentNumber.trim(),
      character,
    });
  };

  return (
    <div className="min-h-screen bg-[#5c94fc] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Pixel Clouds */}
      <div className="absolute top-8 left-12 opacity-80 pointer-events-none hidden md:block">
        <div className="w-24 h-8 bg-white rounded-full relative">
          <div className="w-12 h-12 bg-white rounded-full absolute -top-4 left-4" />
          <div className="w-14 h-14 bg-white rounded-full absolute -top-6 left-10" />
        </div>
      </div>
      <div className="absolute top-16 right-16 opacity-80 pointer-events-none hidden md:block">
        <div className="w-28 h-8 bg-white rounded-full relative">
          <div className="w-14 h-14 bg-white rounded-full absolute -top-5 left-6" />
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-slate-900 border-4 border-amber-400 rounded-2xl shadow-2xl p-5 sm:p-8 text-white relative z-10">
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-red-600 border-2 border-red-400 px-3 py-1 rounded-full text-[10px] sm:text-xs font-pixel text-yellow-300 uppercase tracking-wider mb-2 shadow-sm">
            ⭐ SUMATIF AKHIR SEMESTER GANJIL ⭐
          </div>
          <h1 className="text-2xl sm:text-4xl font-pixel text-amber-300 tracking-wide leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            SUPER MARIO
          </h1>
          <h2 className="text-lg sm:text-2xl font-pixel text-red-500 mt-1">
            SOSIOLOGI KELAS XI
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans max-w-lg mx-auto">
            Petualangan Pembelajaran: <strong className="text-amber-200">Kelompok Sosial & Permasalahan Sosial Akibat Pengelompokan Sosial</strong>
          </p>
        </div>

        {/* Form Registration */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-950/80 border-2 border-red-500 text-red-200 rounded-lg text-xs font-pixel animate-shake">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-pixel text-amber-300 mb-1.5">
              1. NAMA LENGKAP SISWA (MANUAL):
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Ahmad Fauzan Pratama"
              className="w-full px-4 py-2.5 bg-slate-800 border-2 border-slate-600 focus:border-amber-400 focus:outline-none rounded-lg text-white font-sans text-sm sm:text-base transition-colors"
            />
          </div>

          {/* Kelas Siswa */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-pixel text-amber-300">
                2. KELAS SISWA (KETIK MANUAL):
              </label>
              <span className="text-[10px] text-slate-400">Pilih opsi cepat atau ketik</span>
            </div>
            <input
              type="text"
              required
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              placeholder="Contoh: XI IPS 2 / XI F-3"
              className="w-full px-4 py-2.5 bg-slate-800 border-2 border-slate-600 focus:border-amber-400 focus:outline-none rounded-lg text-white font-sans text-sm sm:text-base transition-colors"
            />
            {/* Quick Chips for convenience */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickClasses.map((qc) => (
                <button
                  type="button"
                  key={qc}
                  onClick={() => setStudentClass(qc)}
                  className={`text-[10px] font-pixel px-2 py-1 rounded border transition-colors cursor-pointer ${
                    studentClass === qc
                      ? 'bg-amber-400 text-amber-950 border-amber-300 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {qc}
                </button>
              ))}
            </div>
          </div>

          {/* Nomor Absen (Optional) */}
          <div>
            <label className="block text-xs font-pixel text-amber-300 mb-1.5">
              3. NOMOR ABSEN / NIS (OPSIONAL):
            </label>
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder="Contoh: 07 / 20261101"
              className="w-full px-4 py-2 bg-slate-800 border-2 border-slate-600 focus:border-amber-400 focus:outline-none rounded-lg text-white font-sans text-sm transition-colors"
            />
          </div>

          {/* Karakter Pilihan */}
          <div>
            <label className="block text-xs font-pixel text-amber-300 mb-2">
              4. PILIH KARAKTER JAGOAN:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'mario', name: 'MARIO', color: 'border-red-500 bg-red-950/40', icon: '🔴' },
                { id: 'luigi', name: 'LUIGI', color: 'border-green-500 bg-green-950/40', icon: '🟢' },
                { id: 'toad', name: 'TOAD', color: 'border-blue-500 bg-blue-950/40', icon: '🍄' },
                { id: 'peach', name: 'PEACH', color: 'border-pink-500 bg-pink-950/40', icon: '👑' },
              ].map((char) => (
                <button
                  type="button"
                  key={char.id}
                  onClick={() => setCharacter(char.id as any)}
                  className={`p-2.5 rounded-lg border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    character === char.id
                      ? `${char.color} ring-2 ring-amber-400 border-amber-400 scale-102`
                      : 'border-slate-700 bg-slate-800/60 hover:border-slate-500 text-slate-400'
                  }`}
                >
                  <span className="text-xl">{char.icon}</span>
                  <span className="font-pixel text-[10px] text-white font-bold">{char.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Game Rules / Highlights */}
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-2 text-xs font-sans text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATURAN & FITUR UTAMA GAME:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span><strong>10 Nyawa Maksimal</strong> untuk menaklukkan soal</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span><strong>Grafik & SFX 8-Bit</strong> asli Super Mario Bros</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-sm">🔥</span>
                <span><strong>Jamur Senjata Api</strong> untuk menembak monster</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-sm">👑</span>
                <span><strong>Lawan Bos Bowser</strong> di akhir untuk selamatkan Putri!</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>35 Soal AKM 2026</strong> lengkap dengan pembahasan</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Nilai otomatis dikirim ke email guru: <strong className="text-amber-200">{TEACHER_EMAIL}</strong></span>
              </li>
            </ul>
          </div>

          {/* Sound Test & Start Button */}
          <div className="pt-2 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={handleTestAudio}
                className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 font-pixel text-[10px] bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded border border-slate-700 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>TES AUDIO MARIO 🎵</span>
              </button>

              <div className="flex items-center gap-3">
                {onOpenGitHubModal && (
                  <button
                    type="button"
                    onClick={onOpenGitHubModal}
                    className="flex items-center gap-1 text-slate-300 hover:text-orange-300 font-pixel text-[10px] cursor-pointer"
                  >
                    <Cloud className="w-3 h-3 text-orange-400" />
                    <span>Deploy Cloudflare</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenTeacherPortal}
                  className="text-amber-400 hover:underline font-pixel text-[10px] cursor-pointer"
                >
                  Rekap Nilai Guru &rarr;
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="nes-btn w-full py-3.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-pixel text-sm sm:text-base rounded-xl border-4 border-green-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer font-bold transition-transform active:scale-[0.99]"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>MULAI PETUALANGAN MARIO 🚀</span>
            </button>
          </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center text-xs font-pixel text-slate-900 drop-shadow-sm select-none">
        <span>GURU PENGAMPU: URIP SUPANDI, S.Pd • SMA TAHUN 2026</span>
      </div>
    </div>
  );
};
