import React, { useEffect, useRef, useState, useCallback } from 'react';
import { marioAudio } from '../utils/audio';
import { Flame, Sparkles, Heart, Crown } from 'lucide-react';

interface MarioGameCanvasProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  lives: number;
  score: number;
  character: 'mario' | 'luigi' | 'toad' | 'peach';
  onTriggerQuestion: () => void;
  isQuestionOpen: boolean;
  onLoseLife: () => void;
  comboStreak: number;
  hasWeapon: boolean;
  onObtainWeapon: () => void;
  bowserHp: number;
  onDamageBowser: () => void;
  isPrincessRescued: boolean;
  onRescuePrincess: () => void;
}

interface Goomba {
  x: number;
  y: number;
  vx: number;
  alive: boolean;
  squishedTimer: number;
}

interface Fireball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alive: boolean;
  life: number;
}

interface MushroomItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alive: boolean;
  collected: boolean;
}

interface QuestionBlock {
  x: number;
  y: number;
  hit: boolean;
  bounceY: number;
  questionId: number;
  hasMushroom: boolean;
}

export const MarioGameCanvas: React.FC<MarioGameCanvasProps> = ({
  currentQuestionIndex,
  totalQuestions,
  lives,
  score,
  character,
  onTriggerQuestion,
  isQuestionOpen,
  onLoseLife,
  hasWeapon,
  onObtainWeapon,
  bowserHp,
  onDamageBowser,
  isPrincessRescued,
  onRescuePrincess,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isFinalStage = currentQuestionIndex >= totalQuestions - 1; // Boss Stage at final question
  const isCastleArea = currentQuestionIndex >= 28; // Castle themes for last questions

  // Mario physics & state
  const marioRef = useRef({
    x: 80,
    y: 200,
    vx: 0,
    vy: 0,
    width: 24,
    height: 32,
    isGrounded: true,
    facing: 'right' as 'left' | 'right',
    animFrame: 0,
    invulnerableTimer: 0,
    jumpStrength: -11.5,
  });

  const [keys, setKeys] = useState<{ left: boolean; right: boolean; jump: boolean; shoot: boolean }>({
    left: false,
    right: false,
    jump: false,
    shoot: false,
  });

  const cameraXRef = useRef(0);
  const blocksRef = useRef<QuestionBlock[]>([]);
  const goombasRef = useRef<Goomba[]>([]);
  const mushroomsRef = useRef<MushroomItem[]>([]);
  const fireballsRef = useRef<Fireball[]>([]);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string; text?: string }[]>([]);

  // Bowser Boss state
  const bowserRef = useRef({
    x: 720,
    y: 196,
    vx: -0.6,
    width: 44,
    height: 48,
    facing: 'left' as 'left' | 'right',
    breathTimer: 0,
    jumpTimer: 0,
    vy: 0,
    alive: true,
    fallY: 0,
    flashTimer: 0,
  });

  // Shoot Fireball weapon
  const handleShootFireball = useCallback(() => {
    if (!hasWeapon || isQuestionOpen) return;
    const m = marioRef.current;
    marioAudio.playFireball();

    const dir = m.facing === 'right' ? 1 : -1;
    fireballsRef.current.push({
      x: m.x + (dir === 1 ? m.width + 4 : -8),
      y: m.y + 12,
      vx: dir * 6.5,
      vy: 1.5,
      alive: true,
      life: 75,
    });
  }, [hasWeapon, isQuestionOpen]);

  // Initialize level objects based on current question
  const initLevel = useCallback(() => {
    const blocks: QuestionBlock[] = [];
    const goombas: Goomba[] = [];
    const mushrooms: MushroomItem[] = [];
    fireballsRef.current = [];

    const startX = Math.max(0, currentQuestionIndex * 240);

    // Active Question Block (Contains Question + Powerup Mushroom chance)
    blocks.push({
      x: startX + 220,
      y: 160,
      hit: false,
      bounceY: 0,
      questionId: currentQuestionIndex + 1,
      hasMushroom: true,
    });

    // Decorative brick blocks
    blocks.push({
      x: startX + 196,
      y: 160,
      hit: false,
      bounceY: 0,
      questionId: -1,
      hasMushroom: false,
    });
    blocks.push({
      x: startX + 244,
      y: 160,
      hit: false,
      bounceY: 0,
      questionId: -1,
      hasMushroom: false,
    });

    // Spawn walking mushroom on the ground for early powerup!
    if (!hasWeapon && currentQuestionIndex % 2 === 0) {
      mushrooms.push({
        x: startX + 110,
        y: 224,
        vx: 1.2,
        vy: 0,
        alive: true,
        collected: false,
      });
    }

    // Goombas
    if (!isFinalStage) {
      goombas.push({
        x: startX + 160,
        y: 228,
        vx: -1,
        alive: true,
        squishedTimer: 0,
      });
      goombas.push({
        x: startX + 320,
        y: 228,
        vx: -0.8,
        alive: true,
        squishedTimer: 0,
      });
    } else {
      // Final Boss stage setup
      bowserRef.current.x = startX + 340;
      bowserRef.current.alive = bowserHp > 0;
    }

    blocksRef.current = blocks;
    goombasRef.current = goombas;
    mushroomsRef.current = mushrooms;
  }, [currentQuestionIndex, hasWeapon, isFinalStage, bowserHp]);

  useEffect(() => {
    initLevel();
  }, [initLevel]);

  // Key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isQuestionOpen) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setKeys(k => ({ ...k, left: true }));
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setKeys(k => ({ ...k, right: true }));
      }
      if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        setKeys(k => ({ ...k, jump: true }));
        const m = marioRef.current;
        if (m.isGrounded) {
          m.vy = m.jumpStrength;
          m.isGrounded = false;
          marioAudio.playJump();
        }
      }
      if (e.key === 'f' || e.key === 'F' || e.key === 'b' || e.key === 'B' || e.key === 'Shift') {
        e.preventDefault();
        handleShootFireball();
      }
      if (e.key === 'Enter') {
        onTriggerQuestion();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setKeys(k => ({ ...k, left: false }));
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setKeys(k => ({ ...k, right: false }));
      }
      if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') {
        setKeys(k => ({ ...k, jump: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isQuestionOpen, onTriggerQuestion, handleShootFireball]);

  // Switch BGM for Castle / Final Boss Stage
  useEffect(() => {
    if (isCastleArea || isFinalStage) {
      marioAudio.startBGM('castle');
    } else {
      marioAudio.startBGM('overworld');
    }
  }, [isCastleArea, isFinalStage]);

  // Main 60 FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    const groundY = 228;

    const loop = () => {
      tick++;
      const m = marioRef.current;
      const bowser = bowserRef.current;

      if (!isQuestionOpen) {
        // --- 1. Mario Movement & Physics ---
        const speed = 3.4;
        if (keys.left) {
          m.vx = -speed;
          m.facing = 'left';
          if (tick % 6 === 0) m.animFrame = (m.animFrame + 1) % 3;
        } else if (keys.right) {
          m.vx = speed;
          m.facing = 'right';
          if (tick % 6 === 0) m.animFrame = (m.animFrame + 1) % 3;
        } else {
          m.vx = 0;
          m.animFrame = 0;
        }

        m.vy += 0.58;
        if (m.vy > 10) m.vy = 10;

        m.x += m.vx;
        m.y += m.vy;

        if (m.y >= groundY) {
          m.y = groundY;
          m.vy = 0;
          m.isGrounded = true;
        }

        // --- 2. Block Hit & Powerup Mushroom Spawn ---
        blocksRef.current.forEach((block) => {
          const bw = 24;
          const bh = 24;
          const by = block.y - block.bounceY;

          // Mario hits block from below
          if (
            m.vy < 0 &&
            m.x + m.width > block.x + 2 &&
            m.x < block.x + bw - 2 &&
            m.y <= by + bh &&
            m.y - m.vy >= by + bh - 6
          ) {
            m.vy = 1;
            block.bounceY = 8;
            if (block.questionId > 0 && !block.hit) {
              block.hit = true;
              marioAudio.playCoin();

              // Spawn floating Powerup Mushroom!
              if (block.hasMushroom && !hasWeapon) {
                mushroomsRef.current.push({
                  x: block.x + 4,
                  y: block.y - 20,
                  vx: 1.5,
                  vy: -3,
                  alive: true,
                  collected: false,
                });
                marioAudio.playPowerup();
              }

              // Question prompt
              setTimeout(() => {
                onTriggerQuestion();
              }, 120);
            } else {
              marioAudio.playBlockHit();
            }
          }

          // Land on top of block
          if (
            m.vy > 0 &&
            m.x + m.width > block.x + 2 &&
            m.x < block.x + bw - 2 &&
            m.y + m.height >= by &&
            m.y + m.height - m.vy <= by + 8
          ) {
            m.y = by - m.height;
            m.vy = 0;
            m.isGrounded = true;
          }

          if (block.bounceY > 0) {
            block.bounceY = Math.max(0, block.bounceY - 1.2);
          }
        });

        // --- 3. Powerup Mushroom Physics & Collection ---
        mushroomsRef.current.forEach((mush) => {
          if (!mush.alive || mush.collected) return;
          mush.vy += 0.4;
          mush.x += mush.vx;
          mush.y += mush.vy;

          if (mush.y >= groundY + 12) {
            mush.y = groundY + 12;
            mush.vy = 0;
          }

          // Check Mario touch Mushroom
          const mw = 20;
          const mh = 20;
          if (
            m.x + m.width > mush.x &&
            m.x < mush.x + mw &&
            m.y + m.height > mush.y &&
            m.y < mush.y + mh
          ) {
            mush.collected = true;
            mush.alive = false;
            marioAudio.playPowerup();
            onObtainWeapon();
            particlesRef.current.push({
              x: m.x,
              y: m.y - 20,
              vx: 0,
              vy: -2,
              life: 35,
              color: '#facc15',
              text: 'SENJATA API AKTIF! 🔥',
            });
          }
        });

        // --- 4. Fireballs Physics & Collisions ---
        fireballsRef.current.forEach((fb) => {
          if (!fb.alive) return;
          fb.life--;
          if (fb.life <= 0) {
            fb.alive = false;
            return;
          }

          fb.x += fb.vx;
          fb.y += fb.vy;
          fb.vy += 0.45; // gravity bounce

          if (fb.y >= groundY + 20) {
            fb.y = groundY + 20;
            fb.vy = -4.5; // bounce up!
          }

          // Collision with Goombas
          goombasRef.current.forEach((g) => {
            if (!g.alive) return;
            if (
              fb.x + 8 > g.x &&
              fb.x - 8 < g.x + 20 &&
              fb.y + 8 > g.y &&
              fb.y - 8 < g.y + 20
            ) {
              fb.alive = false;
              g.alive = false;
              marioAudio.playStomp();
              particlesRef.current.push({
                x: g.x,
                y: g.y - 10,
                vx: 0,
                vy: -2,
                life: 25,
                color: '#f97316',
                text: 'MONSTER KALAH! 🔥',
              });
            }
          });

          // Collision with Bowser Boss!
          if (isFinalStage && bowser.alive) {
            if (
              fb.x + 8 > bowser.x &&
              fb.x - 8 < bowser.x + bowser.width &&
              fb.y + 8 > bowser.y &&
              fb.y - 8 < bowser.y + bowser.height
            ) {
              fb.alive = false;
              bowser.flashTimer = 15;
              marioAudio.playBossHit();
              onDamageBowser();
              particlesRef.current.push({
                x: bowser.x + 10,
                y: bowser.y - 10,
                vx: 0,
                vy: -2,
                life: 30,
                color: '#ef4444',
                text: 'HIT BOS! -1 HP',
              });
            }
          }
        });

        // --- 5. Goombas Logic ---
        goombasRef.current.forEach((g) => {
          if (!g.alive) {
            g.squishedTimer++;
            return;
          }
          g.x += g.vx;
          const currentStageX = currentQuestionIndex * 240;
          if (g.x < currentStageX + 40 || g.x > currentStageX + 460) {
            g.vx *= -1;
          }

          // Mario vs Goomba
          if (
            m.x + m.width > g.x &&
            m.x < g.x + 20 &&
            m.y + m.height > g.y &&
            m.y < g.y + 20
          ) {
            if (m.vy > 0 && m.y + m.height - m.vy <= g.y + 10) {
              g.alive = false;
              m.vy = -7;
              marioAudio.playStomp();
            } else if (m.invulnerableTimer === 0) {
              m.invulnerableTimer = 60;
              m.vy = -5;
              m.vx = m.facing === 'right' ? -4 : 4;
              marioAudio.playHurt();
              onLoseLife();
            }
          }
        });

        // --- 6. Final Boss (Bowser) AI & Battle ---
        if (isFinalStage && bowser.alive) {
          if (bowserHp <= 0) {
            bowser.alive = false;
            marioAudio.playBowserFall();
          } else {
            // Patrol back and forth on castle bridge
            bowser.x += bowser.vx;
            const startX = currentQuestionIndex * 240;
            if (bowser.x < startX + 280 || bowser.x > startX + 420) {
              bowser.vx *= -1;
              bowser.facing = bowser.vx < 0 ? 'left' : 'right';
            }

            // Jump occasionally
            bowser.jumpTimer++;
            if (bowser.jumpTimer > 110) {
              bowser.vy = -6;
              bowser.jumpTimer = 0;
            }
            bowser.y += bowser.vy;
            bowser.vy += 0.35;
            if (bowser.y >= groundY - 16) {
              bowser.y = groundY - 16;
              bowser.vy = 0;
            }

            // Breath fire breath occasionally
            bowser.breathTimer++;
            if (bowser.breathTimer % 120 === 0) {
              marioAudio.playBowserFire();
              // Spawn fiery breath projectile toward Mario
              fireballsRef.current.push({
                x: bowser.x - 10,
                y: bowser.y + 16,
                vx: -4,
                vy: 0.5,
                alive: true,
                life: 90,
              });
            }

            // Bowser touches Mario
            if (
              m.x + m.width > bowser.x &&
              m.x < bowser.x + bowser.width &&
              m.y + m.height > bowser.y &&
              m.y < bowser.y + bowser.height
            ) {
              if (m.invulnerableTimer === 0) {
                m.invulnerableTimer = 60;
                m.vy = -6;
                m.vx = -6;
                marioAudio.playHurt();
                onLoseLife();
              }
            }
          }
        }

        // Bowser Falling into Lava Animation
        if (isFinalStage && !bowser.alive && bowser.fallY < 120) {
          bowser.fallY += 3;
        }

        // --- 7. Princess Peach Rescue Collision ---
        if (isFinalStage && (!bowser.alive || bowserHp <= 0) && !isPrincessRescued) {
          const princessX = currentQuestionIndex * 240 + 460;
          if (m.x + m.width >= princessX) {
            onRescuePrincess();
            marioAudio.playPrincessRescue();
          }
        }

        if (m.invulnerableTimer > 0) m.invulnerableTimer--;
        if (bowser.flashTimer > 0) bowser.flashTimer--;
      }

      // Camera position
      const targetCamX = m.x - 240;
      cameraXRef.current += (targetCamX - cameraXRef.current) * 0.1;
      const camX = cameraXRef.current;

      // --- RENDERING ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isCastleArea || isFinalStage) {
        // --- CASTLE BOWSER DUNGEON SCENE ---
        ctx.fillStyle = '#0f172a'; // dark fortress
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Brick wall backdrop
        drawCastleBackground(ctx, camX);

        // Red Bubbling Lava at bottom
        drawLavaPit(ctx, groundY + 32, tick);

        // Stone Castle Bridge
        const startX = currentQuestionIndex * 240;
        drawStoneBridge(ctx, startX - 200, groundY + 32, 700, camX);
      } else {
        // --- OVERWORLD DAYLIGHT SCENE ---
        ctx.fillStyle = '#5c94fc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = -1; i < 6; i++) {
          const cloudX = (i * 260) - (camX * 0.3) % 260;
          drawCloud(ctx, cloudX, 40);
        }
        for (let i = -1; i < 6; i++) {
          const hillX = (i * 320) - (camX * 0.6) % 320;
          drawHill(ctx, hillX, groundY + 32);
          drawBush(ctx, hillX + 180, groundY + 32);
        }

        // Ground tiles
        const groundTileSize = 16;
        const startTile = Math.floor(camX / groundTileSize) - 1;
        const endTile = startTile + Math.ceil(canvas.width / groundTileSize) + 2;
        for (let tx = startTile; tx < endTile; tx++) {
          const screenX = tx * groundTileSize - camX;
          drawGroundBlock(ctx, screenX, groundY + 32);
          drawUndergroundSoil(ctx, screenX, groundY + 48);
        }

        // Green Pipe
        const pipeX = (currentQuestionIndex * 240 + 380) - camX;
        drawPipe(ctx, pipeX, groundY + 32, 48);
      }

      // Blocks
      blocksRef.current.forEach((b) => {
        const bx = b.x - camX;
        const by = b.y - b.bounceY;
        if (b.questionId > 0) {
          drawQuestionBlock(ctx, bx, by, b.hit, tick, b.questionId);
        } else {
          drawBrickBlock(ctx, bx, by);
        }
      });

      // Powerup Mushrooms
      mushroomsRef.current.forEach((mush) => {
        if (!mush.alive) return;
        drawMushroomSprite(ctx, mush.x - camX, mush.y);
      });

      // Fireballs
      fireballsRef.current.forEach((fb) => {
        if (!fb.alive) return;
        drawFireballSprite(ctx, fb.x - camX, fb.y, tick);
      });

      // Goombas
      goombasRef.current.forEach((g) => {
        if (!g.alive && g.squishedTimer > 30) return;
        drawGoomba(ctx, g.x - camX, g.y + 12, g.alive, tick);
      });

      // Bowser Boss
      if (isFinalStage) {
        const bx = bowser.x - camX;
        const by = bowser.y + bowser.fallY;
        drawBowser(ctx, bx, by, bowser.facing, bowser.flashTimer > 0, tick, bowserHp);
      }

      // Princess Peach Waiting / Rescued
      if (isFinalStage) {
        const px = (currentQuestionIndex * 240 + 460) - camX;
        drawPrincessPeach(ctx, px, groundY - 2, isPrincessRescued, tick);
      }

      // Floating Particles / Damage numbers
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.fillText(p.text || '+100', p.x - camX, p.y);
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // Mario Character
      const mx = m.x - camX;
      const my = m.y;
      const isBlinking = m.invulnerableTimer > 0 && Math.floor(m.invulnerableTimer / 4) % 2 === 0;

      if (!isBlinking) {
        drawMarioCharacter(
          ctx,
          mx,
          my,
          m.facing,
          m.isGrounded,
          m.vx !== 0,
          m.animFrame,
          character,
          hasWeapon
        );
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [
    isQuestionOpen,
    currentQuestionIndex,
    totalQuestions,
    character,
    keys,
    hasWeapon,
    bowserHp,
    isFinalStage,
    isCastleArea,
    isPrincessRescued,
    onLoseLife,
    onTriggerQuestion,
    onObtainWeapon,
    onDamageBowser,
    onRescuePrincess,
  ]);

  // Touch handlers
  const handleTouchStart = (action: 'left' | 'right' | 'jump') => {
    if (isQuestionOpen) return;
    if (action === 'left') setKeys(k => ({ ...k, left: true }));
    if (action === 'right') setKeys(k => ({ ...k, right: true }));
    if (action === 'jump') {
      const m = marioRef.current;
      if (m.isGrounded) {
        m.vy = m.jumpStrength;
        m.isGrounded = false;
        marioAudio.playJump();
      }
    }
  };

  const handleTouchEnd = (action: 'left' | 'right' | 'jump') => {
    if (action === 'left') setKeys(k => ({ ...k, left: false }));
    if (action === 'right') setKeys(k => ({ ...k, right: false }));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-slate-900 select-none">
      {/* Top Banner when in Boss Stage */}
      {isFinalStage && (
        <div className="bg-red-950 border-b-2 border-red-500 px-3 py-1 flex items-center justify-between text-xs font-pixel text-red-200">
          <div className="flex items-center gap-2">
            <span className="text-red-400 animate-pulse font-bold">⚠️ BOSS BATTLE: RAJA KOOPA (BOWSER)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">HP BOS:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-xs border border-red-700 ${
                    i < bowserHp ? 'bg-red-500 shadow-xs shadow-red-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Canvas Viewport */}
      <div className="relative aspect-[16/9] w-full max-h-[380px] bg-[#5c94fc]">
        <canvas
          ref={canvasRef}
          width={640}
          height={320}
          className="w-full h-full pixelated block"
        />

        {/* Weapon Badge Indicator */}
        {hasWeapon && (
          <div className="absolute top-3 left-3 bg-red-950/80 border-2 border-amber-400 text-amber-300 font-pixel text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg animate-pulse">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>SENJATA API AKTIF! (TEKAN [F] / TEMBAK)</span>
          </div>
        )}

        {/* Quick Question Action Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={onTriggerQuestion}
            className="nes-btn bg-amber-400 hover:bg-amber-300 text-amber-950 font-pixel text-[10px] md:text-xs px-3 py-2 rounded border-2 border-amber-600 flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse"
          >
            <span>[?] SOAL #{currentQuestionIndex + 1}</span>
          </button>
        </div>

        {/* Princess Rescued Banner Overlay */}
        {isPrincessRescued && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 duration-200">
            <div className="bg-pink-950/90 border-4 border-pink-400 rounded-2xl p-4 sm:p-6 max-w-md shadow-2xl space-y-3">
              <div className="flex items-center justify-center gap-2 text-2xl text-pink-300">
                <Crown className="w-8 h-8 text-amber-300 fill-amber-300" />
                <span className="font-pixel text-lg sm:text-xl text-yellow-300">PUTRI DISELAMATKAN!</span>
              </div>
              <p className="text-xs sm:text-sm text-pink-100 font-sans leading-relaxed">
                "Terima kasih telah mengalahkan Bowser! Pengetahuanmu tentang Sosiologi Kelompok Sosial sungguh luar biasa!"
              </p>
              <div className="font-pixel text-xs text-amber-300">
                ⭐ SEMUA SOAL SELESAI ⭐
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar with Shoot Weapon Button */}
      <div className="bg-slate-900 p-2.5 border-t-2 border-slate-700 flex items-center justify-between gap-2">
        {/* D-Pad Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={() => handleTouchEnd('left')}
            onTouchStart={() => handleTouchStart('left')}
            onTouchEnd={() => handleTouchEnd('left')}
            className="nes-btn w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-pixel text-lg rounded border-2 border-slate-600 flex items-center justify-center cursor-pointer select-none"
            aria-label="Kiri"
          >
            ◀
          </button>
          <button
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={() => handleTouchEnd('right')}
            onTouchStart={() => handleTouchStart('right')}
            onTouchEnd={() => handleTouchEnd('right')}
            className="nes-btn w-11 h-11 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-pixel text-lg rounded border-2 border-slate-600 flex items-center justify-center cursor-pointer select-none"
            aria-label="Kanan"
          >
            ▶
          </button>
        </div>

        {/* Center Guide / Controls Info */}
        <div className="hidden sm:flex flex-col items-center text-center">
          <span className="font-pixel text-[9px] text-amber-300">
            {hasWeapon ? '🔥 SENJATA API AKTIF: Tekan [F] / Tombol Api' : '🍄 Sundul balok [?] untuk dapatkan Jamur Senjata'}
          </span>
          <span className="text-[10px] text-slate-400">
            {isFinalStage ? 'Kalahkan Bowser untuk menyelamatkan Putri!' : 'Injak atau tembak monster untuk poin bonus'}
          </span>
        </div>

        {/* Action Buttons: Jump, Shoot Fireball, Open Question */}
        <div className="flex items-center gap-2">
          {/* FIRE WEAPON BUTTON */}
          <button
            onClick={handleShootFireball}
            disabled={!hasWeapon}
            className={`nes-btn px-3 h-11 rounded font-pixel text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all ${
              hasWeapon
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-amber-300 shadow-md active:scale-95 animate-pulse'
                : 'bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 cursor-not-allowed'
            }`}
            title={hasWeapon ? 'Tembak Senjata Api (Key F)' : 'Dapatkan Jamur dahulu untuk aktifkan senjata'}
          >
            <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>TEMBAK 🔥</span>
          </button>

          {/* Jump Button */}
          <button
            onMouseDown={() => handleTouchStart('jump')}
            onTouchStart={() => handleTouchStart('jump')}
            className="nes-btn w-14 h-11 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-pixel text-xs rounded border-2 border-red-400 flex items-center justify-center cursor-pointer font-bold select-none"
            aria-label="Lompat"
          >
            A (LOMPAT)
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SPRITE & LEVEL DRAWING HELPERS ---

function drawMarioCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facing: 'left' | 'right',
  isGrounded: boolean,
  isRunning: boolean,
  frame: number,
  character: string,
  hasWeapon: boolean
) {
  ctx.save();
  ctx.translate(x + 12, y + 16);
  if (facing === 'left') {
    ctx.scale(-1, 1);
  }

  // Fire Mario white & red suit when equipped with weapon!
  let capColor = '#e11d48';
  let suitColor = '#2563eb';
  let skinColor = '#fed7aa';

  if (hasWeapon) {
    capColor = '#ffffff'; // White cap (Fire Mario)
    suitColor = '#dc2626'; // Red overalls
  } else if (character === 'luigi') {
    capColor = '#16a34a';
    suitColor = '#2563eb';
  } else if (character === 'toad') {
    capColor = '#ffffff';
    suitColor = '#dc2626';
  } else if (character === 'peach') {
    capColor = '#f472b6';
    suitColor = '#ec4899';
  }

  // Glowing weapon aura
  if (hasWeapon) {
    ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // 1. Hat / Cap
  ctx.fillStyle = capColor;
  ctx.fillRect(-8, -16, 16, 6);
  ctx.fillRect(-10, -12, 4, 3);

  // 2. Face / Head
  ctx.fillStyle = skinColor;
  ctx.fillRect(-6, -10, 12, 8);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(2, -8, 2, 4);

  // Mustache & Hair
  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, -4, 8, 3);
  ctx.fillRect(-8, -10, 3, 6);

  // 3. Shirt & Overalls Body
  ctx.fillStyle = hasWeapon ? '#dc2626' : capColor;
  ctx.fillRect(-6, -2, 12, 8);
  ctx.fillStyle = suitColor;
  ctx.fillRect(-5, 0, 10, 10);

  // Buttons
  ctx.fillStyle = '#facc15';
  ctx.fillRect(-3, 1, 2, 2);
  ctx.fillRect(1, 1, 2, 2);

  // 4. Arms & Gloves
  ctx.fillStyle = '#ffffff';
  if (!isGrounded) {
    ctx.fillRect(-10, -8, 4, 3);
    ctx.fillRect(6, -8, 4, 3);
  } else {
    ctx.fillRect(facing === 'right' ? 5 : -9, 2, 4, 4);
  }

  // 5. Shoes
  ctx.fillStyle = '#78350f';
  if (!isGrounded) {
    ctx.fillRect(-9, 10, 6, 4);
    ctx.fillRect(3, 10, 6, 4);
  } else if (isRunning && frame === 1) {
    ctx.fillRect(-8, 10, 6, 4);
    ctx.fillRect(2, 8, 6, 4);
  } else if (isRunning && frame === 2) {
    ctx.fillRect(-6, 8, 6, 4);
    ctx.fillRect(4, 10, 6, 4);
  } else {
    ctx.fillRect(-7, 10, 6, 4);
    ctx.fillRect(1, 10, 6, 4);
  }

  ctx.restore();
}

function drawMushroomSprite(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Super Mushroom cap (Red with white spots)
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(x + 2, y, 16, 12);
  ctx.fillRect(x, y + 4, 20, 8);

  // White spots
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 4, y + 2, 4, 4);
  ctx.fillRect(x + 12, y + 2, 4, 4);
  ctx.fillRect(x + 8, y + 6, 4, 4);

  // Stem & Eyes
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(x + 4, y + 10, 12, 8);
  ctx.fillStyle = '#000000';
  ctx.fillRect(x + 6, y + 12, 2, 4);
  ctx.fillRect(x + 12, y + 12, 2, 4);
}

function drawFireballSprite(ctx: CanvasRenderingContext2D, x: number, y: number, tick: number) {
  const isAlt = Math.floor(tick / 4) % 2 === 0;
  // Glowing outer flame
  ctx.fillStyle = isAlt ? '#f97316' : '#ef4444';
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fill();

  // Yellow core
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawBowser(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facing: 'left' | 'right',
  isFlashing: boolean,
  tick: number,
  hp: number
) {
  ctx.save();
  ctx.translate(x + 22, y + 24);
  if (facing === 'right') {
    ctx.scale(-1, 1);
  }

  if (isFlashing) {
    ctx.fillStyle = '#ffffff'; // hit flash
  }

  // 1. Spiked Green Shell on Back
  ctx.fillStyle = isFlashing ? '#ffffff' : '#15803d';
  ctx.fillRect(-22, -18, 20, 36);
  // Spikes
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-26, -14, 6, 5);
  ctx.fillRect(-26, -2, 6, 5);
  ctx.fillRect(-26, 10, 6, 5);

  // 2. Orange Body & Belly
  ctx.fillStyle = isFlashing ? '#ffffff' : '#ea580c';
  ctx.fillRect(-6, -14, 26, 32);
  // Yellow segmented belly
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(0, -6, 18, 24);

  // 3. Fierce Head, Horns & Red Hair
  ctx.fillStyle = isFlashing ? '#ffffff' : '#ea580c';
  ctx.fillRect(6, -24, 20, 18);
  // Horns
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(6, -30, 5, 8);
  ctx.fillRect(16, -30, 5, 8);
  // Red flame hair
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(2, -26, 8, 10);
  ctx.fillRect(8, -32, 6, 8);

  // Eyes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(14, -18, 6, 6);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(16, -16, 3, 3);

  // Jaws & Teeth
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(12, -10, 16, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(16, -6, 3, 4);
  ctx.fillRect(22, -6, 3, 4);

  // 4. Claws & Feet
  ctx.fillStyle = '#c2410c';
  const step = Math.floor(tick / 8) % 2;
  if (step === 0) {
    ctx.fillRect(-12, 18, 14, 8);
    ctx.fillRect(8, 16, 14, 8);
  } else {
    ctx.fillRect(-12, 16, 14, 8);
    ctx.fillRect(8, 18, 14, 8);
  }

  // Claws
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-14, 22, 4, 4);
  ctx.fillRect(20, 22, 4, 4);

  ctx.restore();

  // Overhead HP Bar for Bowser
  if (hp > 0) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x - 6, y - 24, 56, 8);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x - 5, y - 23, (hp / 5) * 54, 6);
  }
}

function drawPrincessPeach(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  isRescued: boolean,
  tick: number
) {
  // Golden Crown
  ctx.fillStyle = '#facc15';
  ctx.fillRect(x + 4, y - 28, 12, 5);
  ctx.fillRect(x + 3, y - 31, 3, 4);
  ctx.fillRect(x + 9, y - 32, 3, 5);
  ctx.fillRect(x + 14, y - 31, 3, 4);

  // Blonde Hair
  ctx.fillStyle = '#fde047';
  ctx.fillRect(x + 2, y - 23, 16, 12);

  // Face
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(x + 4, y - 20, 12, 8);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 10, y - 18, 2, 3); // eye

  // Pink Gown
  ctx.fillStyle = '#f472b6';
  ctx.fillRect(x + 2, y - 10, 16, 24);
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(x, y + 6, 20, 8);

  // Floating celebration hearts if rescued!
  if (isRescued) {
    const heartY = y - 36 - ((tick * 1.2) % 20);
    ctx.fillStyle = '#f43f5e';
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillText('♥', x + 5, heartY);
  }
}

function drawCastleBackground(ctx: CanvasRenderingContext2D, camX: number) {
  // Dark Castle Wall with Brick Grid
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = '#334155';
  for (let r = 0; r < 12; r++) {
    const rowY = r * 24;
    const offset = (r % 2) * 24;
    for (let c = -1; c < 18; c++) {
      const colX = (c * 48 + offset) - (camX * 0.4) % 48;
      ctx.strokeRect(colX, rowY, 48, 24);
    }
  }

  // Hanging Iron Chains
  ctx.fillStyle = '#64748b';
  for (let i = 0; i < 4; i++) {
    const chainX = (i * 160 + 80) - (camX * 0.4) % 160;
    ctx.fillRect(chainX, 0, 4, 70);
  }
}

function drawLavaPit(ctx: CanvasRenderingContext2D, groundY: number, tick: number) {
  // Bubbling molten lava below the bridge
  const isWave = Math.floor(tick / 8) % 2 === 0;
  ctx.fillStyle = isWave ? '#ef4444' : '#dc2626';
  ctx.fillRect(0, groundY + 16, ctx.canvas.width, 100);

  ctx.fillStyle = '#f97316';
  ctx.fillRect(0, groundY + 16, ctx.canvas.width, 4);

  // Yellow lava bubble spots
  ctx.fillStyle = '#fef08a';
  for (let i = 0; i < 8; i++) {
    const bubbleX = (i * 80 + (tick * 1.5)) % ctx.canvas.width;
    ctx.fillRect(bubbleX, groundY + 22, 6, 4);
  }
}

function drawStoneBridge(
  ctx: CanvasRenderingContext2D,
  startX: number,
  groundY: number,
  width: number,
  camX: number
) {
  const bx = startX - camX;
  ctx.fillStyle = '#475569';
  ctx.fillRect(bx, groundY, width, 16);

  ctx.fillStyle = '#64748b';
  ctx.fillRect(bx, groundY, width, 3);
}

function drawQuestionBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hit: boolean,
  tick: number,
  qId: number
) {
  const size = 24;
  if (hit) {
    ctx.fillStyle = '#92400e';
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(x + 2, y + 2, 2, 2);
    ctx.fillRect(x + size - 4, y + 2, 2, 2);
    ctx.fillRect(x + 2, y + size - 4, 2, 2);
    ctx.fillRect(x + size - 4, y + size - 4, 2, 2);
    return;
  }

  const isBright = Math.floor(tick / 15) % 2 === 0;
  ctx.fillStyle = isBright ? '#f59e0b' : '#d97706';
  ctx.fillRect(x, y, size, size);

  ctx.fillStyle = '#fde68a';
  ctx.fillRect(x, y, size, 2);
  ctx.fillRect(x, y, 2, size);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, y + size - 2, size, 2);
  ctx.fillRect(x + size - 2, y, 2, size);

  // '?'
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 8, y + 5, 8, 3);
  ctx.fillRect(x + 13, y + 8, 3, 4);
  ctx.fillRect(x + 10, y + 12, 4, 3);
  ctx.fillRect(x + 10, y + 17, 3, 3);

  ctx.fillStyle = '#0f172a';
  ctx.font = '8px "Press Start 2P", monospace';
  ctx.fillText(`Q${qId}`, x + 3, y - 4);
}

function drawBrickBlock(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const size = 24;
  ctx.fillStyle = '#b45309';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, y + 7, size, 2);
  ctx.fillRect(x, y + 15, size, 2);
  ctx.fillRect(x + 11, y, 2, 7);
  ctx.fillRect(x + 5, y + 7, 2, 8);
  ctx.fillRect(x + 17, y + 7, 2, 8);
  ctx.fillRect(x + 11, y + 15, 2, 9);
}

function drawGoomba(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  alive: boolean,
  tick: number
) {
  if (!alive) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, y + 12, 22, 6);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(x + 4, y + 10, 14, 4);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x + 6, y + 12, 3, 2);
    ctx.fillRect(x + 13, y + 12, 3, 2);
    return;
  }

  ctx.fillStyle = '#854d0e';
  ctx.fillRect(x + 2, y, 16, 12);
  ctx.fillRect(x, y + 4, 20, 8);

  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(x + 4, y + 10, 12, 6);

  ctx.fillStyle = '#000000';
  ctx.fillRect(x + 4, y + 3, 4, 2);
  ctx.fillRect(x + 12, y + 3, 4, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 5, y + 5, 3, 5);
  ctx.fillRect(x + 12, y + 5, 3, 5);
  ctx.fillStyle = '#000000';
  ctx.fillRect(x + 6, y + 6, 2, 4);
  ctx.fillRect(x + 12, y + 6, 2, 4);

  ctx.fillStyle = '#451a03';
  const step = Math.floor(tick / 10) % 2;
  if (step === 0) {
    ctx.fillRect(x, y + 15, 7, 4);
    ctx.fillRect(x + 13, y + 15, 7, 4);
  } else {
    ctx.fillRect(x + 2, y + 15, 7, 4);
    ctx.fillRect(x + 11, y + 15, 7, 4);
  }
}

function drawPipe(ctx: CanvasRenderingContext2D, x: number, groundY: number, height: number) {
  const topY = groundY - height;
  const pipeW = 34;

  ctx.fillStyle = '#15803d';
  ctx.fillRect(x - 2, topY, pipeW + 4, 16);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(x, topY + 2, pipeW, 12);
  ctx.fillStyle = '#86efac';
  ctx.fillRect(x + 4, topY + 2, 4, 12);

  ctx.fillStyle = '#15803d';
  ctx.fillRect(x + 2, topY + 16, pipeW - 4, height - 16);
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(x + 4, topY + 16, pipeW - 8, height - 16);
  ctx.fillStyle = '#86efac';
  ctx.fillRect(x + 6, topY + 16, 4, height - 16);
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 14, 0, Math.PI * 2);
  ctx.arc(x + 15, y - 6, 18, 0, Math.PI * 2);
  ctx.arc(x + 35, y, 14, 0, Math.PI * 2);
  ctx.fill();
}

function drawHill(ctx: CanvasRenderingContext2D, x: number, groundY: number) {
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(x, groundY, 40, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(x, groundY, 36, Math.PI, 0);
  ctx.fill();
}

function drawBush(ctx: CanvasRenderingContext2D, x: number, groundY: number) {
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.arc(x, groundY, 12, Math.PI, 0);
  ctx.arc(x + 12, groundY, 16, Math.PI, 0);
  ctx.arc(x + 24, groundY, 12, Math.PI, 0);
  ctx.fill();
}

function drawGroundBlock(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#d97706';
  ctx.fillRect(x, y, 16, 16);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(x + 1, y + 1, 14, 14);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, y + 15, 16, 1);
  ctx.fillRect(x + 15, y, 1, 16);
}

function drawUndergroundSoil(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#92400e';
  ctx.fillRect(x, y, 16, 60);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x + 2, y + 4, 4, 4);
  ctx.fillRect(x + 10, y + 12, 4, 4);
  ctx.fillRect(x + 4, y + 24, 4, 4);
}
