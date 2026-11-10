/**
 * Super Mario Bros 8-Bit Web Audio Engine
 * Pure Web Audio API synthesis - no external audio files needed!
 * Authentic NES square, triangle, and noise waveforms.
 */

class MarioAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private bgmInterval: number | null = null;
  private bgmTimeouts: number[] = [];
  private isBgmPlaying: boolean = false;
  private currentBgmTheme: 'overworld' | 'underground' | 'castle' = 'overworld';

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBGM();
    } else if (this.isBgmPlaying) {
      this.startBGM(this.currentBgmTheme);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume(): number {
    return this.volume;
  }

  // --- Sound Effects ---

  /** Classic Mario Jump sound (boing sweep) */
  public playJump() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(0.2 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  /** Classic Super Mario Coin sound (B5 -> E6) */
  public playCoin() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    // B5 (987.77 Hz) to E6 (1318.51 Hz)
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.setValueAtTime(0.25 * this.volume, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  /** Stomp enemy / Goomba squish */
  public playStomp() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /** Bump / Block Hit */
  public playBlockHit() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /** Pipe travel */
  public playPipe() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [140, 100, 80];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + i * 0.1;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.3 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  /** 1-Up Mushroom Sound */
  public play1Up() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // E5, G5, E6, C6, D6, G6
    const freqs = [659.25, 783.99, 1318.51, 1046.50, 1174.66, 1567.98];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + idx * 0.07;

      osc.type = 'square';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.2 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    });
  }

  /** Power Up / Super Mushroom sound */
  public playPowerup() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [
      330, 392, 659, 523, 587, 784,
      440, 523, 880, 698, 784, 1046
    ];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + i * 0.045;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.2 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    });
  }

  /** Fireball weapon shot sound */
  public playFireball() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /** Bowser fire breath sound */
  public playBowserFire() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.4);

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /** Boss Hit / Fireball explodes on Bowser */
  public playBossHit() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.setValueAtTime(280, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.4 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /** Bowser Defeated / Falls into Lava */
  public playBowserFall() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.9);

    gain.gain.setValueAtTime(0.4 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  /** Princess Rescued Fanfare */
  public playPrincessRescue() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // Peaceful, heartwarming 8-bit princess rescue melody
    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.25 }, // C6
      { f: 880.00, d: 0.15 }, // A5
      { f: 1046.50, d: 0.35 }, // C6
      { f: 1174.66, d: 0.2 }, // D6
      { f: 1318.51, d: 0.5 }, // E6
    ];

    let t = ctx.currentTime;
    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.3 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d + 0.04;
    });
  }

  /** Hurt / Lose 1 Life */
  public playHurt() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /** Stage Clear Victory Fanfare */
  public playStageClear() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // G4, C5, E5, G5, C6, E6, G6, E6 ...
    const melody = [
      { f: 392.00, d: 0.12 }, // G4
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.12 }, // C6
      { f: 1318.51, d: 0.12 }, // E6
      { f: 1567.98, d: 0.25 }, // G6
      { f: 1318.51, d: 0.25 }, // E6
      { f: 415.30, d: 0.12 }, // G#4
      { f: 523.25, d: 0.12 }, // C5
      { f: 622.25, d: 0.12 }, // D#5
      { f: 830.61, d: 0.12 }, // G#5
      { f: 1046.50, d: 0.12 }, // C6
      { f: 1244.51, d: 0.12 }, // D#6
      { f: 1661.22, d: 0.25 }, // G#6
      { f: 1244.51, d: 0.25 }, // D#6
      { f: 466.16, d: 0.12 }, // A#4
      { f: 587.33, d: 0.12 }, // D5
      { f: 698.46, d: 0.12 }, // F5
      { f: 932.33, d: 0.12 }, // A#5
      { f: 1174.66, d: 0.12 }, // D6
      { f: 1396.91, d: 0.12 }, // F6
      { f: 1864.66, d: 0.35 }, // A#6
      { f: 1864.66, d: 0.15 },
      { f: 1864.66, d: 0.15 },
      { f: 2093.00, d: 0.55 }, // C7
    ];

    let t = ctx.currentTime;
    melody.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.25 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d + 0.02;
    });
  }

  /** Game Over Fanfare */
  public playGameOver() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    // C5, G4, E4, A4, B4, A4, Ab4, Bb4, Ab4, G4, F4, G4
    const melody = [
      { f: 523.25, d: 0.18 },
      { f: 392.00, d: 0.18 },
      { f: 329.63, d: 0.22 },
      { f: 440.00, d: 0.15 },
      { f: 493.88, d: 0.15 },
      { f: 440.00, d: 0.15 },
      { f: 415.30, d: 0.18 },
      { f: 466.16, d: 0.18 },
      { f: 415.30, d: 0.22 },
      { f: 392.00, d: 0.25 },
      { f: 349.23, d: 0.25 },
      { f: 392.00, d: 0.50 }
    ];

    let t = ctx.currentTime;
    melody.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.3 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d + 0.03;
    });
  }

  // --- Background Music: Super Mario Bros Theme ---

  public startBGM(theme: 'overworld' | 'underground' | 'castle' = 'overworld') {
    this.currentBgmTheme = theme;
    this.isBgmPlaying = true;
    this.stopBGMTimeouts();

    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.playBGMSequence();
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    this.stopBGMTimeouts();
  }

  private stopBGMTimeouts() {
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.bgmTimeouts.forEach(id => window.clearTimeout(id));
    this.bgmTimeouts = [];
  }

  private playBGMSequence() {
    if (!this.isBgmPlaying || this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    if (this.currentBgmTheme === 'castle') {
      // Ominous NES Castle / Dungeon Pattern
      const sixteenth = 0.09;
      const eighth = 0.18;
      const C3 = 130.81;
      const D3 = 146.83;
      const Eb3 = 155.56;
      const F3 = 174.61;
      const Fs3 = 185.00;
      const G3 = 196.00;

      const castlePattern: { f: number; d: number; pause: number }[] = [
        { f: C3 * 2, d: sixteenth, pause: sixteenth },
        { f: Eb3 * 2, d: sixteenth, pause: sixteenth },
        { f: D3 * 2, d: sixteenth, pause: sixteenth },
        { f: C3 * 2, d: sixteenth, pause: sixteenth },
        { f: G3, d: sixteenth, pause: sixteenth },
        { f: Fs3, d: sixteenth, pause: sixteenth },
        { f: F3, d: eighth, pause: eighth },
        { f: C3 * 2, d: sixteenth, pause: sixteenth },
        { f: Eb3 * 2, d: sixteenth, pause: sixteenth },
        { f: D3 * 2, d: sixteenth, pause: sixteenth },
        { f: F3 * 2, d: sixteenth, pause: sixteenth },
        { f: Eb3 * 2, d: sixteenth, pause: sixteenth },
        { f: D3 * 2, d: eighth, pause: eighth },
      ];

      let totalDuration = 0;
      const now = ctx.currentTime + 0.05;

      castlePattern.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + totalDuration);

        const vol = 0.16 * this.volume;
        gain.gain.setValueAtTime(vol, now + totalDuration);
        gain.gain.exponentialRampToValueAtTime(0.001, now + totalDuration + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + totalDuration);
        osc.stop(now + totalDuration + note.d);

        totalDuration += note.d + note.pause;
      });

      const loopTimeout = window.setTimeout(() => {
        if (this.isBgmPlaying && !this.isMuted) {
          this.playBGMSequence();
        }
      }, totalDuration * 1000);

      this.bgmTimeouts.push(loopTimeout);
      return;
    }

    // Iconic Super Mario Overworld Pattern
    // Tempo approx 180-200 BPM -> 1 sixteenth note = ~0.083s, eighth note = ~0.166s
    const eighth = 0.16;
    const sixteenth = 0.08;

    // Melody: Note frequency, duration
    const E5 = 659.25;
    const C5 = 523.25;
    const G5 = 783.99;
    const G4 = 392.00;
    const E4 = 329.63;
    const A4 = 440.00;
    const B4 = 493.88;
    const Bb4 = 466.16;
    const F5 = 698.46;
    const D5 = 587.33;

    // Intro + Theme Phrase
    const pattern: { f: number; d: number; pause: number }[] = [
      // Intro triplet
      { f: E5, d: sixteenth, pause: sixteenth },
      { f: E5, d: sixteenth, pause: eighth },
      { f: E5, d: sixteenth, pause: eighth },
      { f: C5, d: sixteenth, pause: sixteenth },
      { f: E5, d: eighth, pause: eighth },
      { f: G5, d: eighth, pause: eighth * 2 },
      { f: G4, d: eighth, pause: eighth * 2 },

      // Main Theme bar 1-4
      { f: C5, d: eighth, pause: eighth * 1.5 },
      { f: G4, d: eighth, pause: eighth * 1.5 },
      { f: E4, d: eighth, pause: eighth * 1.5 },
      { f: A4, d: eighth, pause: eighth },
      { f: B4, d: eighth, pause: eighth },
      { f: Bb4, d: sixteenth, pause: sixteenth },
      { f: A4, d: eighth, pause: eighth },

      { f: G4, d: eighth * 0.7, pause: eighth * 0.8 },
      { f: E5, d: eighth * 0.7, pause: eighth * 0.8 },
      { f: G5, d: eighth * 0.7, pause: eighth * 0.8 },
      { f: A4 * 2, d: eighth, pause: eighth }, // A5
      { f: F5, d: sixteenth, pause: sixteenth },
      { f: G5, d: eighth, pause: eighth },
      { f: E5, d: eighth, pause: eighth },
      { f: C5, d: sixteenth, pause: sixteenth },
      { f: D5, d: sixteenth, pause: sixteenth },
      { f: B4, d: eighth, pause: eighth * 2 },
    ];

    let totalDuration = 0;
    const now = ctx.currentTime + 0.05;

    pattern.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, now + totalDuration);

      // Snappy chiptune 8-bit envelope
      const vol = 0.12 * this.volume;
      gain.gain.setValueAtTime(vol, now + totalDuration);
      gain.gain.exponentialRampToValueAtTime(0.001, now + totalDuration + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + totalDuration);
      osc.stop(now + totalDuration + note.d);

      totalDuration += note.d + note.pause;
    });

    // Schedule next loop
    const loopTimeout = window.setTimeout(() => {
      if (this.isBgmPlaying && !this.isMuted) {
        this.playBGMSequence();
      }
    }, totalDuration * 1000);

    this.bgmTimeouts.push(loopTimeout);
  }
}

export const marioAudio = new MarioAudioEngine();
