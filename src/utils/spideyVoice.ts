/**
 * Spidey Host Bot Voice Engine
 * Guides the user through FINNA with natural speech synthesis (Web Speech API).
 */

class SpideyVoiceEngine {
  private isVoiceEnabled: boolean = true;
  private isSpeaking: boolean = false;
  private listeners: Set<(speaking: boolean, text: string) => void> = new Set();
  private currentSpokenText: string = '';

  constructor() {
    try {
      const saved = localStorage.getItem('finna_voice_enabled');
      if (saved !== null) {
        this.isVoiceEnabled = saved === 'true';
      }
    } catch {
      // Ignore
    }
  }

  public subscribe(cb: (speaking: boolean, text: string) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isSpeaking, this.currentSpokenText));
  }

  public isEnabled(): boolean {
    return this.isVoiceEnabled;
  }

  public getSpeakingState(): { isSpeaking: boolean; text: string } {
    return { isSpeaking: this.isSpeaking, text: this.currentSpokenText };
  }

  public toggleVoice(): boolean {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    try {
      localStorage.setItem('finna_voice_enabled', String(this.isVoiceEnabled));
    } catch {
      // Ignore
    }
    if (!this.isVoiceEnabled) {
      this.stop();
    } else {
      this.speak("Voice guidance enabled! I'm Spidey, your pitch audit host.");
    }
    return this.isVoiceEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.isVoiceEnabled = enabled;
    try {
      localStorage.setItem('finna_voice_enabled', String(enabled));
    } catch {
      // Ignore
    }
    if (!enabled) {
      this.stop();
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentSpokenText = '';
    this.notify();
  }

  public speak(text: string, force: boolean = false) {
    if (!this.isVoiceEnabled && !force) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.02;
      utterance.pitch = 1.1; // Slightly friendly & youthful for Spidey
      utterance.volume = 0.95;

      // Prefer high-quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.currentSpokenText = text;
        this.notify();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentSpokenText = '';
        this.notify();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.currentSpokenText = '';
        this.notify();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      this.notify();
    }
  }

  /**
   * Primary introductory greeting when user enters FINNA
   */
  public speakIntroGreeting() {
    this.speak(
      "Hey friend, I am your host Spidey! Welcome to FINNA. I will guide you through your pitch evaluation, body language audit, and institutional venture scorecard."
    );
  }

  /**
   * Upload view guide: explains process and next steps
   */
  public speakUploadGuide() {
    this.speak(
      "Hey friend, I am your host Spidey! Welcome to the pitch upload page. What is the process? First, we receive your pitch video or text. Second, our multimodal AI evaluates your delivery, body language, slide structure, and venture viability across 17 rubric categories. Third, we generate your complete FINNA Report Card with investor jury sparring. What should you do now? Simply choose or drop your pitch video file, or click 'Try with FINNA Demo Video' to run the evaluation right away!"
    );
  }

  /**
   * Access denied message for Sign In gate
   */
  public speakAccessDenied() {
    this.speak(
      "Sorry, your access is denied by the host. Please get the valid email from the host.",
      true
    );
  }

  /**
   * About Developer voice narration
   */
  public speakAboutDeveloper() {
    this.speak(
      "The developer is Aswin. He is a CSBS student from Rajalakshmi Institute of Technology. He is passionate about FinTech, AI product engineering, and building practical technology systems that create real-world business impact."
    );
  }

  /**
   * Dashboard report guide
   */
  public speakDashboardGuide(startupName: string = 'FINNA') {
    this.speak(
      `Here is the pitch report for ${startupName}. Check your 17-category rubric score, delivery cadence, and jump into the sparring arena to practice with the AI jury!`
    );
  }
}

export const spideyVoice = new SpideyVoiceEngine();
