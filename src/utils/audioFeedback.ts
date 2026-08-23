/**
 * Premium Web Audio API notification sounds for FINNA pitch evaluation.
 * Synthesizes crisp, clear, confident "ding" & harmonic chime notifications
 * modeled after premium modern AI assistants with zero external audio assets.
 */

class SoundEffectsEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem('finna_sound_enabled');
      if (saved !== null) {
        this.isMuted = saved === 'false';
      }
    } catch {
      // Ignore storage error
    }

    // Attempt to unlock audio on first user gesture
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
    }
  }

  public getSoundEnabled(): boolean {
    return !this.isMuted;
  }

  public toggleSound(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('finna_sound_enabled', String(!this.isMuted));
    } catch {
      // Ignore storage errors
    }
    if (!this.isMuted) {
      this.playDing([880, 1760], 0.25, 0.12, 'clear');
    }
    return !this.isMuted;
  }

  public setSoundEnabled(enabled: boolean) {
    this.isMuted = !enabled;
    try {
      localStorage.setItem('finna_sound_enabled', String(enabled));
    } catch {
      // Ignore
    }
  }

  private getAudioContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  /**
   * Generates a crystalline, rich "ding" chime using a fundamental frequency + harmonic overtone
   * with ultra-fast attack and smooth exponential decay.
   */
  private playDing(
    frequencies: number[],
    decayDuration: number = 0.4,
    volume: number = 0.14,
    character: 'soft' | 'clear' | 'premium' | 'triumph' = 'clear'
  ) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      frequencies.forEach((fundamental, index) => {
        const stagger = index * 0.04;
        const noteStart = now + stagger;

        // Primary fundamental oscillator (pure, warm body)
        const oscMain = ctx.createOscillator();
        const gainMain = ctx.createGain();

        oscMain.type = 'sine';
        oscMain.frequency.setValueAtTime(fundamental, noteStart);

        // Harmonic shimmer oscillator (crystal sparkle overtone)
        const oscHarmonic = ctx.createOscillator();
        const gainHarmonic = ctx.createGain();

        // 2x or 2.76x chime partial gives bell-like resonance
        const harmonicFactor = character === 'triumph' ? 2.0 : 2.76;
        oscHarmonic.type = character === 'soft' ? 'sine' : 'triangle';
        oscHarmonic.frequency.setValueAtTime(fundamental * harmonicFactor, noteStart);

        // Envelope
        const mainVol = volume * (character === 'triumph' ? 1.2 : 1.0);
        const harmonicVol = volume * (character === 'soft' ? 0.15 : 0.25);

        // Fast attack (5ms) to prevent clipping click
        gainMain.gain.setValueAtTime(0.0001, noteStart);
        gainMain.gain.exponentialRampToValueAtTime(mainVol, noteStart + 0.005);
        gainMain.gain.exponentialRampToValueAtTime(0.0001, noteStart + decayDuration);

        gainHarmonic.gain.setValueAtTime(0.0001, noteStart);
        gainHarmonic.gain.exponentialRampToValueAtTime(harmonicVol, noteStart + 0.005);
        gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, noteStart + decayDuration * 0.7);

        // Master connect
        oscMain.connect(gainMain);
        oscHarmonic.connect(gainHarmonic);

        gainMain.connect(ctx.destination);
        gainHarmonic.connect(ctx.destination);

        oscMain.start(noteStart);
        oscMain.stop(noteStart + decayDuration);

        oscHarmonic.start(noteStart);
        oscHarmonic.stop(noteStart + decayDuration * 0.7);
      });
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * 1. Video Selected → Soft confirmation ding (G5 note with crystal overtone)
   */
  public playVideoSelected() {
    this.playDing([783.99], 0.35, 0.12, 'soft');
  }

  /**
   * 2. Upload / Demo Preparation Completed → Clear confirmation ding (E5 -> B5 dual chime)
   */
  public playUploadCompleted() {
    this.playDing([659.25, 987.77], 0.45, 0.14, 'clear');
  }

  /**
   * 3. Analysis Started → Subtle processing chime (A4 -> E5)
   */
  public playAnalysisStarted() {
    this.playDing([554.37, 830.61], 0.35, 0.11, 'clear');
  }

  /**
   * 4. Pitch Analysis Completed → Premium notification ding (F#5 -> C#6 crisp chime)
   */
  public playPitchAnalysisCompleted() {
    this.playDing([739.99, 1108.73], 0.5, 0.15, 'premium');
  }

  /**
   * 5. Body Language Analysis Completed → Premium notification ding (G#5 -> D#6 chime)
   */
  public playBodyLanguageCompleted() {
    this.playDing([830.61, 1244.51], 0.5, 0.15, 'premium');
  }

  /**
   * 6. Report Generation Started → Subtle transition ding
   */
  public playReportGenerationStarted() {
    this.playDing([659.25, 880.0], 0.4, 0.12, 'clear');
  }

  /**
   * 7. Report Generation Completed → Strongest and most satisfying success ding
   * Multi-voice modern AI triumph chime chord (C5 + G5 + E6 + C7) with rich decay
   */
  public playReportGenerated() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Lush C-Major 9th chime sequence: C5, G5, C6, E6
      const chord = [
        { freq: 523.25, time: 0.0, dur: 0.8, vol: 0.16 }, // C5
        { freq: 783.99, time: 0.05, dur: 0.9, vol: 0.17 }, // G5
        { freq: 1046.5, time: 0.10, dur: 1.0, vol: 0.19 }, // C6
        { freq: 1318.51, time: 0.15, dur: 1.2, vol: 0.22 }, // E6
      ];

      chord.forEach((n) => {
        const osc = ctx.createOscillator();
        const oscOvertone = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, now + n.time);

        oscOvertone.type = 'triangle';
        oscOvertone.frequency.setValueAtTime(n.freq * 2, now + n.time);

        gain.gain.setValueAtTime(0.0001, now + n.time);
        gain.gain.exponentialRampToValueAtTime(n.vol, now + n.time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

        osc.connect(gain);
        oscOvertone.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur);
        oscOvertone.start(now + n.time);
        oscOvertone.stop(now + n.time + n.dur);
      });
    } catch {
      // Ignore
    }
  }
}

export const finnaAudio = new SoundEffectsEngine();
