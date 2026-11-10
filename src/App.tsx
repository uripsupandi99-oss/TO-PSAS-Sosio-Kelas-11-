import React, { useState, useEffect, useRef } from 'react';
import { SOCIOLOGY_QUESTIONS, TEACHER_EMAIL } from './data/questions';
import { marioAudio } from './utils/audio';
import { GameHUD } from './components/GameHUD';
import { MarioGameCanvas } from './components/MarioGameCanvas';
import { QuestionModal } from './components/QuestionModal';
import { StudentRegistration } from './components/StudentRegistration';
import { ResultScreen } from './components/ResultScreen';
import { TeacherPortal } from './components/TeacherPortal';
import { GitHubCloudflareModal } from './components/GitHubCloudflareModal';
import { AlertTriangle, RotateCcw, Heart, ArrowRight } from 'lucide-react';

export default function App() {
  // Game Flow States: 'register' | 'playing' | 'game_over' | 'results'
  const [gameState, setGameState] = useState<'register' | 'playing' | 'game_over' | 'results'>('register');

  // Student Profile
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    studentClass: '',
    studentNumber: '',
    character: 'mario' as 'mario' | 'luigi' | 'toad' | 'peach',
  });

  // Gameplay Metrics
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [lives, setLives] = useState<number>(10); // MAX 10 LIVES as requested
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});

  // Weapon & Boss Battle Metrics
  const [hasWeapon, setHasWeapon] = useState<boolean>(false);
  const [bowserHp, setBowserHp] = useState<number>(5);
  const [isPrincessRescued, setIsPrincessRescued] = useState<boolean>(false);

  // Timer
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // Modals & Audio
  const [isQuestionOpen, setIsQuestionOpen] = useState<boolean>(false);
  const [isTeacherPortalOpen, setIsTeacherPortalOpen] = useState<boolean>(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Timer loop when playing
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Start game handler
  const handleStartGame = (data: {
    name: string;
    studentClass: string;
    studentNumber: string;
    character: 'mario' | 'luigi' | 'toad' | 'peach';
  }) => {
    setStudentInfo(data);
    setCurrentQuestionIndex(0);
    setLives(10);
    setScore(0);
    setCoins(0);
    setComboStreak(0);
    setHasWeapon(false);
    setBowserHp(5);
    setIsPrincessRescued(false);
    setUserAnswers({});
    setTimeElapsed(0);
    setGameState('playing');
  };

  // Lose life from monster collision or obstacle
  const handleLoseLife = () => {
    setLives((prev) => {
      const nextLives = Math.max(0, prev - 1);
      if (nextLives === 0) {
        marioAudio.playGameOver();
        setGameState('game_over');
      }
      return nextLives;
    });
    setComboStreak(0);
  };

  // Answer question handler
  const handleAnswerQuestion = (selectedKey: 'A' | 'B' | 'C' | 'D' | 'E', isCorrect: boolean) => {
    const currentQ = SOCIOLOGY_QUESTIONS[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: selectedKey,
    }));

    if (isCorrect) {
      setScore((s) => s + 100);
      setCoins((c) => c + 1);
      const newStreak = comboStreak + 1;
      setComboStreak(newStreak);

      // Auto-award or upgrade fire weapon on good answers!
      if (!hasWeapon) {
        setHasWeapon(true);
      }

      // If in final stages (questions 31-35), correct answers deal damage to Bowser!
      if (currentQuestionIndex >= 30) {
        setBowserHp((hp) => {
          const nextHp = Math.max(0, hp - 1);
          if (nextHp === 0) {
            marioAudio.playBossHit();
            setTimeout(() => marioAudio.playBowserFall(), 300);
          } else {
            marioAudio.playBossHit();
          }
          return nextHp;
        });
      }

      // 3 streak bonus: +1 life (max 10)
      if (newStreak % 3 === 0 && lives < 10) {
        setLives((l) => Math.min(10, l + 1));
        marioAudio.play1Up();
      }
    } else {
      setComboStreak(0);
      setLives((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          setTimeout(() => {
            marioAudio.playGameOver();
            setIsQuestionOpen(false);
            setGameState('game_over');
          }, 800);
        }
        return next;
      });
    }
  };

  // Proceed to next question or end game
  const handleNextQuestion = () => {
    setIsQuestionOpen(false);

    if (currentQuestionIndex + 1 >= SOCIOLOGY_QUESTIONS.length) {
      // Completed all 35 questions!
      // If Bowser still has HP, defeat him now for the climax!
      setBowserHp(0);
      setIsPrincessRescued(true);
      marioAudio.playPrincessRescue();
      setTimeout(() => {
        setGameState('results');
      }, 3500);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Audio mute toggle
  const handleToggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    marioAudio.setMuted(newMute);
  };

  // Revive / Continue from Game Over with 3 lives
  const handleContinueQuiz = () => {
    setLives(3);
    marioAudio.playPowerup();
    marioAudio.startBGM('overworld');
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between">
      {/* 1. Registration Screen */}
      {gameState === 'register' && (
        <StudentRegistration
          onStartGame={handleStartGame}
          onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
          onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        />
      )}

      {/* 2. Main Game Screen */}
      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col justify-between">
          <GameHUD
            studentName={studentInfo.name}
            studentClass={studentInfo.studentClass}
            score={score}
            coins={coins}
            lives={lives}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={SOCIOLOGY_QUESTIONS.length}
            timeElapsed={timeElapsed}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
            onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
            character={studentInfo.character}
            hasWeapon={hasWeapon}
          />

          <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col justify-center items-center gap-4">
            {/* Super Mario Canvas World */}
            <MarioGameCanvas
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={SOCIOLOGY_QUESTIONS.length}
              lives={lives}
              score={score}
              character={studentInfo.character}
              onTriggerQuestion={() => setIsQuestionOpen(true)}
              isQuestionOpen={isQuestionOpen}
              onLoseLife={handleLoseLife}
              comboStreak={comboStreak}
              hasWeapon={hasWeapon}
              onObtainWeapon={() => setHasWeapon(true)}
              bowserHp={bowserHp}
              onDamageBowser={() => {
                setBowserHp((hp) => Math.max(0, hp - 1));
                setScore((s) => s + 50);
              }}
              isPrincessRescued={isPrincessRescued}
              onRescuePrincess={() => {
                setIsPrincessRescued(true);
                setScore((s) => s + 500);
                setTimeout(() => setGameState('results'), 2500);
              }}
            />

            {/* Quick Navigation / Question Selector Bar */}
            <div className="w-full max-w-4xl bg-slate-900 border-2 border-slate-700 rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] text-amber-300">
                    PILIH SOAL CEPAT (1 - {SOCIOLOGY_QUESTIONS.length}):
                  </span>
                  <span className="text-[10px] text-slate-400">
                    (Hijau: Benar • Merah: Salah • Emas: Aktif)
                  </span>
                </div>
                <button
                  onClick={() => setIsQuestionOpen(true)}
                  className="nes-btn px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-pixel text-[10px] rounded border border-amber-500 cursor-pointer font-bold"
                >
                  BUKA SOAL #{currentQuestionIndex + 1} ❓
                </button>
              </div>

              {/* Grid of all 35 question chips */}
              <div className="grid grid-cols-7 sm:grid-cols-12 md:grid-cols-18 gap-1.5 pt-1">
                {SOCIOLOGY_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const answered = userAnswers[q.id];
                  const isCorrect = answered === q.correctKey;

                  let chipStyle = 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500';
                  if (answered) {
                    chipStyle = isCorrect
                      ? 'bg-emerald-900 text-emerald-300 border-emerald-500'
                      : 'bg-red-900 text-red-300 border-red-500';
                  }
                  if (isCurrent) {
                    chipStyle = 'bg-amber-400 text-amber-950 border-amber-300 font-bold ring-2 ring-amber-400/80 scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setIsQuestionOpen(true);
                      }}
                      className={`h-7 rounded border font-pixel text-[9px] flex items-center justify-center transition-all cursor-pointer ${chipStyle}`}
                      title={`Soal #${q.id} (${q.level}) - ${q.topic}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </main>

          {/* Active Question Modal */}
          {isQuestionOpen && (
            <QuestionModal
              question={SOCIOLOGY_QUESTIONS[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={SOCIOLOGY_QUESTIONS.length}
              lives={lives}
              onAnswer={handleAnswerQuestion}
              onClose={() => setIsQuestionOpen(false)}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      )}

      {/* 3. Game Over Screen */}
      {gameState === 'game_over' && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 text-center">
          <div className="max-w-md w-full bg-slate-900 border-4 border-red-600 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="text-4xl sm:text-5xl font-pixel text-red-500 animate-pulse">
              GAME OVER
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Mario telah kehabisan 10 nyawa akibat rintangan monster dan kesalahan jawaban sosiologi.
            </p>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-xs text-left space-y-1.5 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-400">Siswa:</span>
                <strong className="text-white">{studentInfo.name} ({studentInfo.studentClass})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Soal Diselesaikan:</span>
                <strong className="text-amber-400">{Object.keys(userAnswers).length} dari 35 Soal</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Skor Sementara:</span>
                <strong className="text-yellow-300 font-pixel text-xs">{score} Poin</strong>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleContinueQuiz}
                className="nes-btn w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-pixel text-xs rounded-xl border-2 border-emerald-300 flex items-center justify-center gap-2 cursor-pointer font-bold shadow-lg"
              >
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                <span>GUNAKAN 1-UP (+3 NYAWA & LANJUT)</span>
              </button>

              <button
                onClick={() => setGameState('results')}
                className="nes-btn w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-pixel text-xs rounded-xl border-2 border-blue-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>AKHIRI & LIHAT NILAI AKHIR 🏁</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setGameState('register')}
                className="w-full py-2 text-slate-400 hover:text-slate-200 text-xs font-pixel cursor-pointer"
              >
                Mulai Ulang dari Awal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Results & Feedback Screen */}
      {gameState === 'results' && (
        <ResultScreen
          studentName={studentInfo.name}
          studentClass={studentInfo.studentClass}
          studentNumber={studentInfo.studentNumber}
          character={studentInfo.character}
          score={score}
          coins={coins}
          lives={lives}
          timeElapsed={timeElapsed}
          userAnswers={userAnswers}
          questions={SOCIOLOGY_QUESTIONS}
          onPlayAgain={() => {
            marioAudio.stopBGM();
            setGameState('register');
          }}
          isPrincessRescued={isPrincessRescued}
        />
      )}

      {/* Teacher Portal Modal */}
      {isTeacherPortalOpen && (
        <TeacherPortal onClose={() => setIsTeacherPortalOpen(false)} />
      )}

      {/* GitHub & Cloudflare Pages Guide Modal */}
      {isGitHubModalOpen && (
        <GitHubCloudflareModal onClose={() => setIsGitHubModalOpen(false)} />
      )}
    </div>
  );
}
