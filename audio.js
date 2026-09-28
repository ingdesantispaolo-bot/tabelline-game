// audio.js - Web Audio API Sound Synthesizer
// Genera suoni ricchi e giocosi direttamente nel browser senza richiedere file esterni MP3/WAV

class SoundEngine {
    constructor() {
        this.ctx = null;
        let saved = null;
        try {
            saved = localStorage.getItem('matemagica_sound_enabled');
        } catch (e) {}
        this.enabled = (saved !== null) ? (saved === 'true') : true;
        this.initialized = false;
    }

    init() {
        if (!this.initialized) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
                this.initialized = true;
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        try {
            localStorage.setItem('matemagica_sound_enabled', this.enabled ? 'true' : 'false');
        } catch (e) {}
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        
        // Due toni armonici ascendenti scintillanti
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            
            const start = now + idx * 0.07;
            osc.frequency.setValueAtTime(freq, start);
            
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.25);
        });
    }

    playWrong() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        // Tono discendente morbido (non fastidioso ma chiaro)
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.25);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.28);
    }

    playCombo(streak) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51]; // C major scale
        const baseIdx = Math.min(streak - 1, scale.length - 3);
        const notesToPlay = streak >= 4 ? [scale[baseIdx], scale[baseIdx + 2], scale[baseIdx + 4] || 1318.51] : [scale[baseIdx], scale[baseIdx + 2]];

        notesToPlay.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = streak >= 5 ? 'triangle' : 'sine';
            const t = now + idx * 0.045;
            osc.frequency.setValueAtTime(freq, t);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.05, t + 0.15);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.2, t + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.22);
        });
    }

    playStar() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    playWhoosh() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    }

    playTrickSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // Accordo scintillante E Major (E5, G#5, B5, E6)
        const chord = [659.25, 830.61, 987.77, 1318.51];
        chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const t = now + idx * 0.05;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.45);
        });
    }

    playTick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
    }

    playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Fanfara trionfale: C4, E4, G4, C5 arpeggio poi accordo tenuto
        const arpeggio = [523.25, 659.25, 783.99, 1046.50];
        arpeggio.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const t = now + i * 0.1;
            osc.frequency.setValueAtTime(f, t);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.35);
        });

        // Tono finale lungo
        const finalOsc = this.ctx.createOscillator();
        const finalGain = this.ctx.createGain();
        finalOsc.type = 'triangle';
        const finalStart = now + 0.45;
        finalOsc.frequency.setValueAtTime(1046.50, finalStart); // C6
        finalGain.gain.setValueAtTime(0.3, finalStart);
        finalGain.gain.exponentialRampToValueAtTime(0.001, finalStart + 0.8);
        finalOsc.connect(finalGain);
        finalGain.connect(this.ctx.destination);
        finalOsc.start(finalStart);
        finalOsc.stop(finalStart + 0.85);
    }

    playGameOver() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [392, 349.23, 329.63, 293.66];
        notes.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const t = now + i * 0.16;
            osc.frequency.setValueAtTime(f, t);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.3);
        });
    }

    playLevelUp() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Fanfara trionfante a 5 toni brillanti: G4, C5, E5, G5, C6 tenuta
        const notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const start = now + idx * 0.08;
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.28, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + (idx === notes.length - 1 ? 0.9 : 0.25));
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + (idx === notes.length - 1 ? 0.95 : 0.3));
        });
    }

    playStreak() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Suono laser / fiamma energetica ascendente
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.24);
    }
}

window.soundEngine = new SoundEngine();
