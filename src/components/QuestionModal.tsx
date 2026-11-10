import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../data/questions';
import { marioAudio } from '../utils/audio';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, Lightbulb, Heart, Shield } from 'lucide-react';

interface QuestionModalProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  lives: number; // max 10
  onAnswer: (selectedKey: 'A' | 'B' | 'C' | 'D' | 'E', isCorrect: boolean) => void;
  onClose: () => void;
  onNext: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  currentIndex,
  totalQuestions,
  lives,
  onAnswer,
  onNext,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isSubmitted) return;
    setSelectedAnswer(key);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedAnswer === question.correctKey;

    if (isCorrect) {
      marioAudio.playCoin();
      // Confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#22c55e', '#38bdf8', '#ef4444'],
      });
    } else {
      marioAudio.playHurt();
    }

    onAnswer(selectedAnswer, isCorrect);
  };

  const isCorrectAnswer = selectedAnswer === question.correctKey;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-slate-900 border-4 border-amber-400 rounded-xl shadow-2xl overflow-hidden text-white">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 px-4 py-2.5 flex items-center justify-between border-b-2 border-amber-400 select-none">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs bg-amber-400 text-amber-950 px-2.5 py-1 rounded shadow-xs font-bold">
              [?] SOAL {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="bg-red-950/70 text-amber-200 text-[10px] font-pixel px-2 py-0.5 rounded border border-amber-400/30">
              LEVEL {question.level}
            </span>
          </div>

          <div className="flex items-center gap-2 font-pixel text-[10px] text-amber-100">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400 inline" />
              <span>{lives}/10 NYAWA</span>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Topic Badge */}
          <div className="flex items-center gap-2 text-xs text-amber-300">
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold uppercase tracking-wider">{question.topic}</span>
          </div>

          {/* AKM Stimulus Box */}
          <div className="bg-slate-800/90 border-2 border-slate-700 rounded-lg p-3.5 sm:p-4 text-slate-100 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-amber-400 font-pixel text-[10px]">
              <span className="bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                📰 STIMULUS LITERASI (BERITA TERKINI 2026 - AKM)
              </span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-sans text-justify">
              {question.stimulus}
            </p>
          </div>

          {/* Question Text */}
          <div className="bg-amber-950/30 border-l-4 border-amber-400 p-3 rounded-r-lg">
            <p className="font-semibold text-sm sm:text-base text-amber-200 leading-snug">
              {question.question}
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5 pt-1">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.key;
              const isOptionCorrect = option.key === question.correctKey;

              let btnStyle = 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-500';

              if (!isSubmitted && isSelected) {
                btnStyle = 'bg-amber-900/60 border-amber-400 text-amber-100 ring-2 ring-amber-400/50';
              } else if (isSubmitted) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-red-950/80 border-red-500 text-red-100 ring-2 ring-red-500';
                } else {
                  btnStyle = 'bg-slate-800/50 border-slate-800 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={option.key}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(option.key)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-lg border-2 transition-all flex items-start gap-3 cursor-pointer select-none ${btnStyle} ${
                    !isSubmitted ? 'active:scale-[0.99]' : ''
                  }`}
                >
                  <span
                    className={`font-pixel text-xs sm:text-sm px-2.5 py-1 rounded shrink-0 font-bold ${
                      isSelected
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {option.key}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">
                    {option.text}
                  </span>
                  {isSubmitted && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Section */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-xl border-2 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                isCorrectAnswer
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                  : 'bg-red-950/60 border-red-500 text-red-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrectAnswer ? (
                  <>
                    <span className="text-xl">🌟</span>
                    <span className="font-pixel text-xs sm:text-sm text-emerald-300 font-bold">
                      SUPER! JAWABAN BENAR! (+100 KOIN & SKOR)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">👾</span>
                    <div className="flex flex-col">
                      <span className="font-pixel text-xs sm:text-sm text-red-300 font-bold">
                        OOPS! MARIO TERKENA MONSTER! (NYAWA -1)
                      </span>
                      <span className="text-[11px] text-red-300">
                        Kunci Jawaban yang Tepat: <strong className="text-amber-300 font-pixel">({question.correctKey})</strong>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Sosiologi Penjelasan */}
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 text-xs sm:text-sm leading-relaxed text-slate-200">
                <div className="flex items-center gap-1.5 text-amber-400 font-pixel text-[10px] mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>PEMBAHASAN SOSIOLOGI:</span>
                </div>
                <p>{question.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-4 py-3 border-t-2 border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-pixel hidden sm:block">
            {!isSubmitted
              ? 'Pilih jawaban lalu tekan tombol [KIRIM JAWABAN]'
              : isCorrectAnswer
              ? 'Luar biasa! Lanjutkan petualangan ke rintangan berikutnya.'
              : 'Pelajari penjelasan di atas untuk penguatan materi!'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isSubmitted ? (
              <button
                disabled={!selectedAnswer}
                onClick={handleSubmitAnswer}
                className={`nes-btn w-full sm:w-auto px-6 py-2.5 rounded font-pixel text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  selectedAnswer
                    ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-amber-500 shadow-md'
                    : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-60'
                }`}
              >
                <span>KIRIM JAWABAN 🍄</span>
              </button>
            ) : (
              <button
                onClick={onNext}
                className="nes-btn w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-600 rounded font-pixel text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{currentIndex + 1 >= totalQuestions ? 'SELESAI & LIHAT NILAI 🏁' : 'LANJUT PETUALANGAN ⏩'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
