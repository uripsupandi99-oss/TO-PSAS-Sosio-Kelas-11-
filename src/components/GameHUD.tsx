import React from 'react';
import { Volume2, VolumeX, ShieldAlert, Award, User, BookOpen, Cloud } from 'lucide-react';

interface GameHUDProps {
  studentName: string;
  studentClass: string;
  score: number;
  coins: number;
  lives: number; // max 10
  currentQuestionIndex: number;
  totalQuestions: number;
  timeElapsed: number; // in seconds
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTeacherPortal: () => void;
  character: string;
  hasWeapon?: boolean;
  onOpenGitHubModal?: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  studentName,
  studentClass,
  score,
  coins,
  lives,
  currentQuestionIndex,
  totalQuestions,
  timeElapsed,
  isMuted,
  onToggleMute,
  onOpenTeacherPortal,
  character,
  hasWeapon = false,
  onOpenGitHubModal,
}) => {
  // Format elapsed time (MM:SS)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // World Calculation (e.g., 35 questions divided into 7 worlds, 5 questions each: World 1-1 up to World 7-5)
  const worldNum = Math.floor(currentQuestionIndex / 5) + 1;
  const subWorldNum = (currentQuestionIndex % 5) + 1;

  const characterName = character.toUpperCase();

  return (
    <header className="w-full bg-black border-b-4 border-amber-400 text-white select-none shadow-lg">
      {/* Top Banner: Student & Class info */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center justify-between text-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <User className="w-3.5 h-3.5" />
            <span className="font-pixel text-[10px]">{studentName || 'SISWA'}</span>
          </div>
          <span className="text-slate-400">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="font-pixel text-[9px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              KELAS: {studentClass || 'XI'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="flex items-center gap-1 text-[10px] font-pixel text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 cursor-pointer transition-colors"
            title={isMuted ? 'Nyalakan Suara Game' : 'Matikan Suara Game'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isMuted ? 'MUTE' : 'AUDIO ON'}</span>
          </button>

          <button
            onClick={onOpenTeacherPortal}
            className="flex items-center gap-1 text-[10px] font-pixel text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-2.5 py-1 rounded border border-amber-700/60 cursor-pointer transition-colors"
            title="Rekap Nilai Guru (Pak Urip Supandi)"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">PANEL GURU</span>
          </button>

          {onOpenGitHubModal && (
            <button
              onClick={onOpenGitHubModal}
              className="flex items-center gap-1 text-[10px] font-pixel text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 cursor-pointer transition-colors"
              title="Hubungkan ke GitHub & Cloudflare Pages"
            >
              <Cloud className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden md:inline">GITHUB & CLOUDFLARE</span>
            </button>
          )}
        </div>
      </div>

      {/* NES HUD Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-pixel text-[10px] md:text-xs">
        {/* 1. Character & Score */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span className={`${hasWeapon ? 'text-orange-400 animate-pulse' : 'text-red-500'} font-bold tracking-wider`}>
              {hasWeapon ? `🔥 FIRE ${characterName}` : characterName}
            </span>
          </div>
          <span className="text-yellow-300 text-sm md:text-base font-bold">
            {score.toString().padStart(6, '0')}
          </span>
        </div>

        {/* 2. Coins */}
        <div className="flex flex-col items-center">
          <span className="text-slate-400">KOIN</span>
          <div className="flex items-center gap-1 text-amber-400 text-sm md:text-base font-bold">
            <span className="animate-spin inline-block text-amber-300">🪙</span>
            <span>x{coins.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* 3. World & Level */}
        <div className="flex flex-col items-center">
          <span className="text-slate-400">WORLD</span>
          <span className="text-emerald-400 text-sm md:text-base font-bold">
            {worldNum}-{subWorldNum}
          </span>
          <span className="text-[8px] text-slate-400">
            SOAL {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>

        {/* 4. Time */}
        <div className="flex flex-col items-center">
          <span className="text-slate-400">WAKTU</span>
          <span className="text-sky-300 text-sm md:text-base font-bold">
            {formatTime(timeElapsed)}
          </span>
        </div>

        {/* 5. Lives (Max 10) */}
        <div className="col-span-2 sm:col-span-1 flex flex-col items-center bg-slate-900/80 py-1 px-2 rounded border border-slate-800">
          <div className="flex items-center gap-1 text-[9px] text-red-400 font-bold">
            <span>NYAWA (MAX 10)</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-base text-red-500">🍄</span>
            <span className="text-sm md:text-base font-bold text-red-400">
              x{lives}
            </span>
            <span className="text-[9px] text-slate-500">/10</span>
          </div>
          {/* Hearts / Pills visual indicator */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-xs inline-block transition-colors ${
                  i < lives ? 'bg-red-500 shadow-xs shadow-red-500' : 'bg-slate-700 opacity-40'
                }`}
                title={`Nyawa ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
