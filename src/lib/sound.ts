// High-performance Web Audio + HTML5 Audio Engine for authentic portfolio sound effects
class SoundEngine {
  private isMuted: boolean = false;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmListeners: Set<(playing: boolean) => void> = new Set();
  private isBgmActive: boolean = false;

  // Web Audio Context for ZERO-LATENCY synthesized & decoded audio
  private audioCtx: AudioContext | null = null;
  private isContextUnlocked: boolean = false;

  // 8 Indian Classical / Musical Scale Notes (Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa)
  private readonly scaleNotes: string[] = [
    "/sounds/note_1_Sa.wav",
    "/sounds/note_2_Re.wav",
    "/sounds/note_3_Ga.wav",
    "/sounds/note_4_Ma.wav",
    "/sounds/note_5_Pa.wav",
    "/sounds/note_6_Dha.wav",
    "/sounds/note_7_Ni.wav",
    "/sounds/note_8_Sa.wav",
  ];
  private currentScaleIndex: number = 0;
  private scaleResetTimer: NodeJS.Timeout | null = null;
  private preloadedPool: Map<string, HTMLAudioElement[]> = new Map();
  private lastHoverTime: number = 0;
  private lastSkillHoverTime: number = 0;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mayur_sound_enabled");
        this.isMuted = saved !== null ? saved === "false" : false;
      } catch {
        this.isMuted = false;
      }

      this.preloadScaleNotes();
      this.preloadCommonSounds();
      this.bindUnlockListeners();
    }
  }

  // Bind one-time listeners to unlock AudioContext on first touch / click / pointer
  private bindUnlockListeners() {
    if (typeof window === "undefined") return;

    const unlock = () => {
      this.ensureAudioContext();
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {});
      }
      this.isContextUnlocked = true;

      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("mousedown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });
    window.addEventListener("mousedown", unlock, { passive: true, once: true });
    window.addEventListener("keydown", unlock, { passive: true, once: true });
  }

  private ensureAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch {
          this.audioCtx = null;
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private preloadScaleNotes() {
    if (typeof window === "undefined") return;
    try {
      this.scaleNotes.forEach((path) => {
        const pool: HTMLAudioElement[] = [];
        for (let i = 0; i < 3; i++) {
          const audio = new Audio(path);
          audio.preload = "auto";
          pool.push(audio);
        }
        this.preloadedPool.set(path, pool);
      });
    } catch {
      // Ignore
    }
  }

  private preloadCommonSounds() {
    if (typeof window === "undefined") return;
    const paths = [
      "/sounds/hover.mp3",
      "/sounds/click_general.mp3",
      "/sounds/collapsible_open.mp3",
      "/sounds/click_close.mp3",
      "/sounds/click_sfx.mp3",
      "/sounds/star.mp3",
      "/sounds/froghover.mp3",
    ];
    paths.forEach((p) => {
      try {
        const pool: HTMLAudioElement[] = [];
        for (let i = 0; i < 3; i++) {
          const a = new Audio(p);
          a.preload = "auto";
          pool.push(a);
        }
        this.preloadedPool.set(p, pool);
        this.audioCache.set(p, pool[0]);
      } catch {}
    });
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mayur_sound_enabled", String(!muted));
      } catch {}
    }
    if (muted && this.bgmAudio) {
      this.bgmAudio.pause();
      this.notifyBgm(false);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    if (!this.isMuted) {
      this.playClickSfx();
    }
    return this.isMuted;
  }

  // --- HTML5 Audio Playback ---
  private playSound(path: string, volume: number = 0.5) {
    if (this.isMuted || typeof window === "undefined") return;
    // Route through preloaded multi-channel pool for zero-delay response
    this.playPooledSound(path, volume);
  }

  private playPooledSound(path: string, volume: number = 0.7) {
    if (this.isMuted || typeof window === "undefined") return;
    try {
      const pool = this.preloadedPool.get(path);
      if (pool && pool.length > 0) {
        const audio = pool.find((a) => a.paused || a.ended) || pool[0];
        audio.currentTime = 0;
        audio.volume = Math.min(1, Math.max(0, volume));
        const p = audio.play();
        if (p !== undefined) p.catch(() => {});
      } else {
        const audio = new Audio(path);
        audio.volume = Math.min(1, Math.max(0, volume));
        audio.play().catch(() => {});
      }
    } catch {
      // Ignore
    }
  }

  // --- Public SFX API (Pure Original Audio Files — Zero Synthetic Beeps) ---

  /**
   * Hover sound: Subtle, pleasant acoustic chime from /sounds/hover.mp3
   */
  public playHover() {
    if (this.isMuted || typeof window === "undefined") return;

    const now = Date.now();
    if (now - this.lastHoverTime < 40) return;
    this.lastHoverTime = now;

    this.playPooledSound("/sounds/hover.mp3", 0.45);
  }

  /**
   * Mobile touch feedback: plays subtle hover chime + light haptic vibration
   */
  public playTouchFeedback() {
    this.playHover();
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(6);
      } catch {}
    }
  }

  /**
   * Sequential Musical Scale: Sa -> Re -> Ga -> Ma -> Pa -> Dha -> Ni -> Sa'
   * GUARANTEED: Always plays in ascending forward order, regardless of which button
   * or direction (left-to-right, right-to-left, random) is hovered.
   * Resets back to Sa after 2.5s of inactivity.
   */
  public playSkillHover(_ignoredIndex?: number) {
    if (this.isMuted || typeof window === "undefined") return;

    const now = Date.now();
    if (now - this.lastSkillHoverTime < 50) return;
    this.lastSkillHoverTime = now;

    // Strictly sequential forward progression
    const targetIndex = this.currentScaleIndex;
    this.currentScaleIndex = (this.currentScaleIndex + 1) % this.scaleNotes.length;

    // Play authentic preloaded WAV note instantly
    const path = this.scaleNotes[targetIndex];
    this.playPooledSound(path, 0.75);

    // Micro haptic on mobile touch
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }

    // Auto-reset back to Sa (index 0) after 2.5s of inactivity
    if (this.scaleResetTimer) clearTimeout(this.scaleResetTimer);
    this.scaleResetTimer = setTimeout(() => {
      this.currentScaleIndex = 0;
    }, 2500);
  }

  public playScaleNote(index: number) {
    this.playSkillHover(index);
  }

  public playClick() {
    if (this.isMuted) return;
    this.playSound("/sounds/click_general.mp3", 0.6);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  }

  public playClickClose() {
    if (this.isMuted) return;
    this.playSound("/sounds/click_close.mp3", 0.6);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  }

  public playOpen() {
    if (this.isMuted) return;
    this.playSound("/sounds/collapsible_open.mp3", 0.65);
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
  }

  public playClickSfx() {
    this.playSound("/sounds/click_sfx.mp3", 0.6);
  }

  public playStar() {
    this.playSound("/sounds/star.mp3", 0.45);
  }

  public playFrogHover() {
    this.playSound("/sounds/froghover.mp3", 0.55);
  }

  public playLightMode() {
    this.playSound("/sounds/lightmode.mp3", 0.55);
  }

  public playDarkMode() {
    this.playSound("/sounds/darkmode.mp3", 0.55);
  }

  public playFormSuccess() {
    this.playSound("/sounds/collapsible_open.mp3", 0.7);
  }

  public playFormError() {
    this.playSound("/sounds/click_close.mp3", 0.7);
  }

  public playToggle() {
    this.playClickSfx();
  }

  public playMascotJump() {
    this.playFrogHover();
  }

  public playWindowOpen() {
    this.playOpen();
  }

  public playWindowClose() {
    this.playClickClose();
  }

  public playWindowMinimize() {
    this.playClickClose();
  }

  public playMinimize() {
    this.playClickClose();
  }

  public playWindowRestore() {
    this.playOpen();
  }

  public playWindowFocus() {
    this.playHover();
  }

  // --- Background Music (BGM) Triggered by Frog on Lilypad ---

  public initBgm(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio("/sounds/bgm.mp3");
      this.bgmAudio.loop = true;
      this.bgmAudio.preload = "auto";
      this.bgmAudio.volume = 0.5;
      this.bgmAudio.addEventListener("ended", () => {
        this.isBgmActive = false;
        this.notifyBgm(false);
      });
      this.bgmAudio.addEventListener("pause", () => {
        this.isBgmActive = false;
        this.notifyBgm(false);
      });
      this.bgmAudio.addEventListener("play", () => {
        this.isBgmActive = true;
        this.notifyBgm(true);
      });
      this.bgmAudio.addEventListener("error", (e) => {
        console.warn("BGM Audio Error:", e);
        this.isBgmActive = false;
        this.notifyBgm(false);
      });
    }
    return this.bgmAudio;
  }

  public toggleBgm(): boolean {
    if (typeof window === "undefined") return false;
    const bgm = this.initBgm();
    if (!bgm) return false;

    // If currently playing or marked active, pause it
    if (this.isBgmActive || (!bgm.paused && bgm.currentTime > 0)) {
      try {
        bgm.pause();
      } catch (err) {
        console.warn("BGM pause failed:", err);
      }
      this.isBgmActive = false;
      this.playClickClose();
      this.notifyBgm(false);
      return false;
    } else {
      // Turn on
      if (this.isMuted) {
        this.isMuted = false;
        try {
          localStorage.setItem("mayur_sound_enabled", "true");
        } catch {}
      }
      bgm.volume = 0.5;
      this.isBgmActive = true;
      this.notifyBgm(true);

      const playPromise = bgm.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isBgmActive = true;
            this.notifyBgm(true);
          })
          .catch((err) => {
            console.warn("BGM play promise failed:", err);
            this.isBgmActive = false;
            this.notifyBgm(false);
          });
      }
      return true;
    }
  }

  public isBgmPlaying(): boolean {
    return this.isBgmActive;
  }

  public subscribeBgm(callback: (playing: boolean) => void): () => void {
    this.bgmListeners.add(callback);
    callback(this.isBgmActive);
    return () => {
      this.bgmListeners.delete(callback);
    };
  }

  private notifyBgm(playing: boolean) {
    this.bgmListeners.forEach((cb) => cb(playing));
  }
}

export const sound = new SoundEngine();
