// game.js - Core Engine per Matemagica (Tabelline e Calcoli)

// Definizione della scala dei livelli dell'Avventura
const ADVENTURE_LEVELS = [
    {
        id: 1,
        name: "I Primi Passi",
        icon: "🌱",
        desc: "Tabelline dell'1, 2 e 10",
        type: "tables",
        tables: [1, 2, 10],
        ops: ['×'],
        questionsCount: 10,
        timePerQuestion: 14
    },
    {
        id: 2,
        name: "Il Bosco dei Salti",
        icon: "🌲",
        desc: "Tabelline del 3, 4 e 5",
        type: "tables",
        tables: [3, 4, 5],
        ops: ['×'],
        questionsCount: 12,
        timePerQuestion: 12
    },
    {
        id: 3,
        name: "La Scalata Rocciosa",
        icon: "🧗",
        desc: "Tabelline del 6 e 7 (le più toste!)",
        type: "tables",
        tables: [6, 7],
        ops: ['×'],
        questionsCount: 12,
        timePerQuestion: 12
    },
    {
        id: 4,
        name: "La Fortezza dei Campioni",
        icon: "🏰",
        desc: "Tabelline dell'8 e 9",
        type: "tables",
        tables: [8, 9],
        ops: ['×'],
        questionsCount: 12,
        timePerQuestion: 12
    },
    {
        id: 5,
        name: "Il Regno del Dodici",
        icon: "👑",
        desc: "Tabelline dell'11 e 12 + ripasso completo",
        type: "tables",
        tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        ops: ['×'],
        questionsCount: 15,
        timePerQuestion: 10
    },
    {
        id: 6,
        name: "Fiume delle Somme",
        icon: "🌊",
        desc: "Addizioni veloci a mente fino a 100",
        type: "mental",
        ops: ['+'],
        maxNum: 100,
        questionsCount: 12,
        timePerQuestion: 12
    },
    {
        id: 7,
        name: "Labirinto delle Differenze",
        icon: "🧩",
        desc: "Sottrazioni mentali con prestiti",
        type: "mental",
        ops: ['-'],
        maxNum: 100,
        questionsCount: 12,
        timePerQuestion: 12
    },
    {
        id: 8,
        name: "Isola della Divisione",
        icon: "🏝️",
        desc: "Divisioni esatte (l'inverso della tabellina)",
        type: "division",
        tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        ops: ['÷'],
        questionsCount: 14,
        timePerQuestion: 12
    },
    {
        id: 9,
        name: "Gran Boss Elementare",
        icon: "🐉",
        desc: "Sfida con tutte e 4 le operazioni (+, -, ×, ÷)",
        type: "boss",
        ops: ['+', '-', '×', '÷'],
        questionsCount: 16,
        timePerQuestion: 10
    },
    // ===== LEGA DEI GRANDI MAGHI: CALCOLI COMPLESSI & TRUCCHI =====
    {
        id: 10,
        name: "L'Arte dell'Undici",
        icon: "⚡",
        desc: "Moltiplica numeri a due cifre per 11 con il trucco delle cifre aperte!",
        type: "trick_11",
        questionsCount: 10,
        timePerQuestion: 16
    },
    {
        id: 11,
        name: "Il Tempio dei Quadrati",
        icon: "🔥",
        desc: "Quadrati dei numeri che terminano per 5 (35², 75², 95²...)",
        type: "trick_square5",
        questionsCount: 10,
        timePerQuestion: 16
    },
    {
        id: 12,
        name: "La Galassia Vedica",
        icon: "🪐",
        desc: "Metodo Vedico: moltiplicazioni fulminee attorno a Base 100",
        type: "trick_base100",
        questionsCount: 10,
        timePerQuestion: 18
    },
    {
        id: 13,
        name: "Scomponi e Conquista",
        icon: "⚖️",
        desc: "Raddoppia e Dimezza: calcoli impossibili resi elementari",
        type: "trick_double_halve",
        questionsCount: 10,
        timePerQuestion: 15
    },
    {
        id: 14,
        name: "L'Alchimia dei Prodotti",
        icon: "💎",
        desc: "Prodotti notevoli: (a+b)(a-b) = a² - b² simmetrici attorno al tondo",
        type: "trick_diff_squares",
        questionsCount: 10,
        timePerQuestion: 18
    },
    {
        id: 15,
        name: "Gran Boss Matematico AAA",
        icon: "👑",
        desc: "La Sfida Suprema per veri ingegneri con tutti i trucchi mentali!",
        type: "trick_boss",
        questionsCount: 15,
        timePerQuestion: 16
    }
];

const TROPHIES = [
    { id: 'primo_passo', name: 'Primo Passo', icon: '🐣', desc: 'Completa il primo livello con successo' },
    { id: 'cecchino', name: 'Cecchino 100%', icon: '🎯', desc: 'Finisci un livello senza commettere nessun errore' },
    { id: 'fulmine', name: 'Lampo di Genio', icon: '⚡', desc: 'Rispondi correttamente in meno di 2 secondi' },
    { id: 'combo_5', name: 'Combo Master', icon: '🔥', desc: 'Raggiungi una serie di 5 risposte corrette di fila' },
    { id: 'studioso', name: 'Occhio Attento', icon: '💡', desc: 'Consulta l\'aiuto didattico o un trucco magico' },
    { id: 'campione_tabelline', name: 'Mago delle Tabelline', icon: '🧙‍♂️', desc: 'Completa i primi 5 livelli dell\'avventura' },
    { id: 'mago_11', name: 'Mago dell\'11', icon: '⚡', desc: 'Risolvi un calcolo per 11 a due cifre' },
    { id: 're_quadrati', name: 'Re dei Quadrati', icon: '🔥', desc: 'Calcola un quadrato terminante per 5 a mente' },
    { id: 'mente_vedica', name: 'Mente Vedica', icon: '🪐', desc: 'Risolvi un calcolo vicino a 100 col metodo vedico' },
    { id: 'ingegnere_capo', name: 'Ingegnere Supremo', icon: '🎓', desc: 'Completa tutti i 15 livelli dell\'Avventura' },
    { id: 'gran_maestro', name: 'Gran Maestro', icon: '👑', desc: 'Ottieni 3 stelle in tutti i livelli' },
    { id: 'maratona_50', name: 'Cento di Questi Calcoli', icon: '🏅', desc: 'Risolvi oltre 50 calcoli totali con successo' }
];

const AVATARS = ['🚀', '🧙‍♂️', '🦊', '🤖', '⭐', '🦖', '🦄', '🐱'];

class GameManager {
    constructor() {
        this.saveData = this.loadSaveData();
        this.currentMode = null; // 'adventure', 'gym', 'speedrun'
        this.currentLevelConfig = null;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.currentQuestion = null;
        
        this.userAnswer = '';
        this.score = 0;
        this.combo = 0;
        this.maxComboThisRun = 0;
        this.lives = 3;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.mistakes = [];
        
        this.timer = null;
        this.timeLeft = 0;
        this.maxTime = 12;
        this.questionStartTime = 0;
        this.gymSelectedTables = [2, 3, 5];
        this.gymOperation = '×';
        this.gymDuration = 10;
        this.visualHelpUsed = 0;

        this.initDOM();
        this.bindEvents();
        this.updateHeaderStats();
        this.renderLevelsMap();
    }

    loadSaveData() {
        const defaultData = {
            stars: {}, // { levelId: starsCount }
            highScores: {}, // { levelId: score }
            unlockedLevel: 1,
            totalSolved: 0,
            trophies: [],
            avatarIndex: 0
        };
        try {
            const raw = localStorage.getItem('matemagica_save');
            if (raw) {
                return Object.assign(defaultData, JSON.parse(raw));
            }
        } catch (e) {
            console.warn('Errore lettura localStorage', e);
        }
        return defaultData;
    }

    saveGame() {
        try {
            localStorage.setItem('matemagica_save', JSON.stringify(this.saveData));
        } catch (e) {
            console.warn('Errore salvataggio localStorage', e);
        }
    }

    unlockTrophy(trophyId) {
        if (!this.saveData.trophies.includes(trophyId)) {
            this.saveData.trophies.push(trophyId);
            this.saveGame();
            const t = TROPHIES.find(x => x.id === trophyId);
            if (t) {
                this.showToastNotification(`🏆 Trofeo Sbloccato: ${t.name}! ${t.icon}`);
                if (window.soundEngine) window.soundEngine.playVictory();
            }
        }
    }

    initDOM() {
        this.screens = {
            home: document.getElementById('screen-home'),
            academy: document.getElementById('screen-academy'),
            levels: document.getElementById('screen-levels'),
            gym: document.getElementById('screen-gym'),
            gameplay: document.getElementById('screen-gameplay'),
            results: document.getElementById('screen-results')
        };
        this.modalTrophies = document.getElementById('modal-trophies');
        this.modalVisualHelp = document.getElementById('modal-visual-help');
        this.modalShare = document.getElementById('modal-share');
        this.btnToggleTheme = document.getElementById('btn-toggle-theme');
        this.initTheme();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('matemagica_theme') || 'dark';
        this.applyTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        localStorage.setItem('matemagica_theme', newTheme);
        if (window.soundEngine) window.soundEngine.playClick();
        this.showToastNotification(newTheme === 'dark' ? 'Tema Scuro Attivato 🌙' : 'Tema Chiaro Attivato ☀️');
    }

    applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            if (this.btnToggleTheme) this.btnToggleTheme.textContent = '🌙';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            if (this.btnToggleTheme) this.btnToggleTheme.textContent = '☀️';
        }
    }

    bindEvents() {
        // Navigazione Menu
        const btnModeAcademy = document.getElementById('btn-mode-academy');
        if (btnModeAcademy) {
            btnModeAcademy.addEventListener('click', () => {
                window.soundEngine.playWhoosh();
                this.showScreen('academy');
            });
        }

        const btnBackAcademy = document.getElementById('btn-back-academy');
        if (btnBackAcademy) {
            btnBackAcademy.addEventListener('click', () => {
                window.soundEngine.playClick();
                this.showScreen('home');
            });
        }

        const btnToggleFullscreen = document.getElementById('btn-toggle-fullscreen');
        if (btnToggleFullscreen) {
            btnToggleFullscreen.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        document.getElementById('btn-mode-adventure').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showScreen('levels');
        });

        document.getElementById('btn-mode-gym').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showScreen('gym');
        });

        document.getElementById('btn-mode-challenge').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.startSpeedrunMode();
        });

        document.getElementById('btn-back-levels').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showScreen('home');
        });

        document.getElementById('btn-back-gym').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showScreen('home');
        });

        // Tasto Home Logo
        document.getElementById('header-logo').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.showScreen('home');
        });

        // Suono Toggle
        const btnSound = document.getElementById('btn-toggle-sound');
        btnSound.addEventListener('click', () => {
            const enabled = window.soundEngine.toggle();
            btnSound.textContent = enabled ? '🔊' : '🔇';
        });

        // Modal Trofei
        document.getElementById('btn-view-trophies').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.renderTrophiesModal();
            this.modalTrophies.classList.add('active');
        });

        document.getElementById('btn-close-trophies').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.modalTrophies.classList.remove('active');
        });

        // Tasto Reset Dati
        document.getElementById('btn-reset-progress').addEventListener('click', () => {
            if (confirm('Vuoi davvero azzerare tutti i progressi, le stelle e i trofei?')) {
                localStorage.removeItem('matemagica_save');
                this.saveData = this.loadSaveData();
                this.updateHeaderStats();
                this.renderLevelsMap();
                this.renderTrophiesModal();
                this.showToastNotification('Progressi azzerati con successo! 🔄');
            }
        });

        // Avatar switcher
        const avatarDisplay = document.getElementById('user-avatar-display');
        avatarDisplay.addEventListener('click', () => {
            this.saveData.avatarIndex = (this.saveData.avatarIndex + 1) % AVATARS.length;
            avatarDisplay.textContent = AVATARS[this.saveData.avatarIndex];
            this.saveGame();
            window.soundEngine.playClick();
        });
        avatarDisplay.textContent = AVATARS[this.saveData.avatarIndex || 0];

        // Aiuto Visivo
        document.getElementById('btn-open-help').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.openVisualHelp();
        });

        document.getElementById('btn-close-help').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.modalVisualHelp.classList.remove('active');
        });

        // Theme Toggle (☀️ / 🌙)
        if (this.btnToggleTheme) {
            this.btnToggleTheme.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Modale Pubblicazione / Condivisione Online (🌐)
        const btnOpenShare = document.getElementById('btn-open-share');
        if (btnOpenShare) {
            btnOpenShare.addEventListener('click', () => {
                window.soundEngine.playClick();
                if (this.modalShare) this.modalShare.classList.add('active');
            });
        }

        const btnCloseShare = document.getElementById('btn-close-share');
        if (btnCloseShare) {
            btnCloseShare.addEventListener('click', () => {
                window.soundEngine.playClick();
                if (this.modalShare) this.modalShare.classList.remove('active');
            });
        }

        // Chiusura modali cliccando all'esterno sull'overlay
        [this.modalShare, this.modalTrophies, this.modalVisualHelp].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        window.soundEngine.playClick();
                    }
                });
            }
        });

        // Tastierino a Schermo (Tablet Touch)
        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const val = btn.getAttribute('data-val');
                this.handleInput(val);
            });
        });

        // Supporto Tastiera Fisica se presente
        window.addEventListener('keydown', (e) => {
            if (!this.screens.gameplay.classList.contains('active')) return;
            if (e.key >= '0' && e.key <= '9') {
                this.handleInput(e.key);
            } else if (e.key === 'Backspace') {
                this.handleInput('back');
            } else if (e.key === 'Enter') {
                this.handleInput('enter');
            } else if (e.key === 'Escape') {
                this.modalVisualHelp.classList.remove('active');
            }
        });

        // Palestra: selezione tabelline 1-12
        this.renderGymTableButtons();
        
        // Palestra opzioni operazione
        document.querySelectorAll('.btn-gym-op').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-gym-op').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.gymOperation = btn.getAttribute('data-op');
                window.soundEngine.playClick();
            });
        });

        // Palestra opzioni durata
        document.querySelectorAll('.btn-gym-dur').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-gym-dur').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.gymDuration = parseInt(btn.getAttribute('data-dur'));
                window.soundEngine.playClick();
            });
        });

        // Avvio Palestra
        document.getElementById('btn-start-gym-workout').addEventListener('click', () => {
            window.soundEngine.playClick();
            this.startGymMode();
        });

        // Risultati: Rigioca e Continua
        document.getElementById('btn-res-retry').addEventListener('click', () => {
            window.soundEngine.playClick();
            if (this.currentMode === 'adventure') {
                this.startAdventureLevel(this.currentLevelConfig.id);
            } else if (this.currentMode === 'gym') {
                this.startGymMode();
            } else {
                this.startSpeedrunMode();
            }
        });

        document.getElementById('btn-res-next').addEventListener('click', () => {
            window.soundEngine.playClick();
            if (this.currentMode === 'adventure') {
                const nextId = this.currentLevelConfig.id + 1;
                if (nextId <= ADVENTURE_LEVELS.length) {
                    this.startAdventureLevel(nextId);
                } else {
                    this.showScreen('levels');
                }
            } else {
                this.showScreen('home');
            }
        });

        // Setup Accademia dei Trucchi & Simulatori AAA
        this.setupAcademyFilters();
        this.setupAcademySimulators();
        this.setupTrickTrainButtons();
    }

    toggleFullscreen() {
        window.soundEngine.playClick();
        const btn = document.getElementById('btn-toggle-fullscreen');
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                if (btn) btn.textContent = '🗗';
                this.showToastNotification('Modalità Schermo Intero Attivata ⛶');
            }).catch(err => {
                console.warn('Errore richiesta fullscreen', err);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    if (btn) btn.textContent = '⛶';
                });
            }
        }
    }

    showScreen(screenName) {
        clearInterval(this.timer);
        Object.values(this.screens).forEach(s => s && s.classList.remove('active'));
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
        if (screenName === 'levels') {
            this.renderLevelsMap();
        } else if (screenName === 'academy') {
            this.runAllSimulatorsDefault();
        }
        this.updateHeaderStats();
    }

    updateHeaderStats() {
        let totalStars = 0;
        Object.values(this.saveData.stars).forEach(s => totalStars += s);
        document.getElementById('header-stars-count').textContent = totalStars;
        document.getElementById('home-stat-stars').textContent = totalStars;
        document.getElementById('home-stat-solved').textContent = this.saveData.totalSolved;
        document.getElementById('home-stat-trophies').textContent = this.saveData.trophies.length;
    }

    renderLevelsMap() {
        const container = document.getElementById('levels-grid-container');
        container.innerHTML = '';

        ADVENTURE_LEVELS.forEach(lvl => {
            const isUnlocked = lvl.id <= this.saveData.unlockedLevel;
            const stars = this.saveData.stars[lvl.id] || 0;
            const highScore = this.saveData.highScores[lvl.id] || null;

            // Sezione Lega dei Maghi per livelli 10-15
            if (lvl.id === 10) {
                const divider = document.createElement('div');
                divider.style.gridColumn = '1 / -1';
                divider.style.textAlign = 'center';
                divider.style.margin = '28px 0 10px';
                divider.style.padding = '14px 20px';
                divider.style.background = 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)';
                divider.style.color = '#fbbf24';
                divider.style.borderRadius = '18px';
                divider.style.fontWeight = '900';
                divider.style.fontSize = '1.15rem';
                divider.style.boxShadow = '0 8px 20px rgba(30, 27, 75, 0.35)';
                divider.style.border = '2px solid rgba(251, 191, 36, 0.4)';
                divider.innerHTML = `👑 LEGA DEI GRANDI MAGHI — CALCOLI COMPLESSI & TRUCCHI MENTALI ⚡`;
                container.appendChild(divider);
            }

            const card = document.createElement('div');
            card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'} ${lvl.id >= 10 ? 'grand-master' : ''}`;

            let starsHtml = '';
            for (let i = 1; i <= 3; i++) {
                starsHtml += `<span class="${i <= stars ? 'star-filled' : ''}">★</span>`;
            }

            card.innerHTML = `
                <div class="level-num-badge">${lvl.id}</div>
                <div class="level-icon">${isUnlocked ? lvl.icon : '🔒'}</div>
                <h3 class="level-name">${lvl.name}</h3>
                <p class="level-desc">${lvl.desc}</p>
                <div class="level-stars">${starsHtml}</div>
                ${highScore ? `<div class="level-record">Record: ${highScore} pt</div>` : ''}
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    window.soundEngine.playClick();
                    this.startAdventureLevel(lvl.id);
                });
            }

            container.appendChild(card);
        });
    }

    renderGymTableButtons() {
        const grid = document.getElementById('tables-grid-selector');
        grid.innerHTML = '';

        for (let i = 1; i <= 12; i++) {
            const btn = document.createElement('button');
            const isSelected = this.gymSelectedTables.includes(i);
            btn.className = `table-toggle-btn ${isSelected ? 'selected' : ''}`;
            btn.innerHTML = `<span>×${i}</span><span class="tab-sub">del ${i}</span>`;

            btn.addEventListener('click', () => {
                window.soundEngine.playClick();
                if (this.gymSelectedTables.includes(i)) {
                    if (this.gymSelectedTables.length > 1) {
                        this.gymSelectedTables = this.gymSelectedTables.filter(x => x !== i);
                        btn.classList.remove('selected');
                    }
                } else {
                    this.gymSelectedTables.push(i);
                    btn.classList.add('selected');
                }
            });
            grid.appendChild(btn);
        }
    }

    renderTrophiesModal() {
        const grid = document.getElementById('trophies-modal-grid');
        grid.innerHTML = '';
        TROPHIES.forEach(t => {
            const isUnlocked = this.saveData.trophies.includes(t.id);
            const card = document.createElement('div');
            card.className = `trophy-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            card.innerHTML = `
                <div class="trophy-ico">${t.icon}</div>
                <div class="trophy-name">${t.name}</div>
                <div class="trophy-desc">${t.desc}</div>
            `;
            grid.appendChild(card);
        });
    }

    // ================= GENERATORE DOMANDE =================
    generateQuestionsForLevel(lvl) {
        const questions = [];
        for (let i = 0; i < lvl.questionsCount; i++) {
            let q = null;
            if (lvl.type === 'tables') {
                const table = lvl.tables[Math.floor(Math.random() * lvl.tables.length)];
                const multiplier = Math.floor(Math.random() * 10) + 1; // 1 to 10
                q = {
                    num1: table,
                    num2: multiplier,
                    op: '×',
                    answer: table * multiplier,
                    visualType: 'grid'
                };
            } else if (lvl.type === 'division') {
                const divisor = lvl.tables[Math.floor(Math.random() * lvl.tables.length)];
                const quotient = Math.floor(Math.random() * 10) + 1;
                const dividend = divisor * quotient;
                q = {
                    num1: dividend,
                    num2: divisor,
                    op: '÷',
                    answer: quotient,
                    visualType: 'division'
                };
            } else if (lvl.type === 'mental') {
                if (lvl.ops.includes('+')) {
                    const a = Math.floor(Math.random() * 50) + 10;
                    const b = Math.floor(Math.random() * 40) + 5;
                    q = { num1: a, num2: b, op: '+', answer: a + b };
                } else {
                    const a = Math.floor(Math.random() * 60) + 20;
                    const b = Math.floor(Math.random() * (a - 5)) + 5;
                    q = { num1: a, num2: b, op: '-', answer: a - b };
                }
            } else if (lvl.type === 'boss') {
                const op = lvl.ops[Math.floor(Math.random() * lvl.ops.length)];
                if (op === '×') {
                    const a = Math.floor(Math.random() * 12) + 1;
                    const b = Math.floor(Math.random() * 12) + 1;
                    q = { num1: a, num2: b, op: '×', answer: a * b };
                } else if (op === '÷') {
                    const b = Math.floor(Math.random() * 9) + 2;
                    const ans = Math.floor(Math.random() * 10) + 1;
                    q = { num1: b * ans, num2: b, op: '÷', answer: ans };
                } else if (op === '+') {
                    const a = Math.floor(Math.random() * 60) + 15;
                    const b = Math.floor(Math.random() * 35) + 10;
                    q = { num1: a, num2: b, op: '+', answer: a + b };
                } else {
                    const a = Math.floor(Math.random() * 80) + 20;
                    const b = Math.floor(Math.random() * (a - 10)) + 5;
                    q = { num1: a, num2: b, op: '-', answer: a - b };
                }
            } else if (lvl.type === 'trick_11') {
                q = this.generateTrickQuestion11();
            } else if (lvl.type === 'trick_square5') {
                q = this.generateTrickQuestionSquare5();
            } else if (lvl.type === 'trick_base100') {
                q = this.generateTrickQuestionBase100();
            } else if (lvl.type === 'trick_double_halve') {
                q = this.generateTrickQuestionDoubleHalve();
            } else if (lvl.type === 'trick_diff_squares') {
                q = this.generateTrickQuestionDiffSquares();
            } else if (lvl.type === 'trick_boss') {
                q = this.generateTrickQuestionBoss();
            }
            questions.push(q);
        }
        return questions;
    }

    // ===== GENERATORI DI CALCOLI COMPLESSI & TRUCCHI ALGEBRICI =====
    generateTrickQuestion11() {
        const A = Math.floor(Math.random() * 75) + 12; // 12 a 86
        const t = Math.floor(A / 10);
        const u = A % 10;
        const s = t + u;
        const ans = A * 11;

        const steps = [
            `Separa le cifre esterne di ${A}: <strong>[${t}] ... [${u}]</strong>`,
            `Calcola la somma centrale: ${t} + ${u} = <strong>${s}</strong>`
        ];
        if (s >= 10) {
            steps.push(`Poiché la somma è ${s}, riporta 1 sulla decina: (${t} + 1 = <strong>${t + 1}</strong>)`);
        }
        return {
            num1: A,
            num2: 11,
            op: '×',
            answer: ans,
            trickType: '11',
            trickInfo: {
                title: `Moltiplicazione per 11: ${A} × 11`,
                formula: `(10a + b) × 11 = 100a + 10(a + b) + b`,
                steps: steps,
                conclusion: `Risultato: <strong>${A} × 11 = ${ans}</strong> ⚡`
            }
        };
    }

    generateTrickQuestionSquare5() {
        const options = [15, 25, 35, 45, 55, 65, 75, 85, 95];
        const N = options[Math.floor(Math.random() * options.length)];
        const t = Math.floor(N / 10);
        const next = t + 1;
        const prod = t * next;
        const ans = N * N;

        return {
            num1: N,
            num2: N,
            op: '×',
            answer: ans,
            trickType: 'square5',
            trickInfo: {
                title: `Quadrato con finale 5: ${N}²`,
                formula: `(10n + 5)² = 100n(n + 1) + 25`,
                steps: [
                    `Prendi la decina prima del 5: <strong>${t}</strong>`,
                    `Moltiplica per il successivo: ${t} × (${t} + 1) = ${t} × ${next} = <strong>${prod}</strong>`,
                    `Accoda sempre il numero <strong>25</strong> al risultato!`
                ],
                conclusion: `Risultato: <strong>${N}² = ${ans}</strong> 🔥`
            }
        };
    }

    generateTrickQuestionBase100() {
        const pairs = [
            [96, 94], [97, 93], [98, 95], [96, 97], [99, 94], [98, 92], [97, 96],
            [104, 106], [103, 107], [105, 104], [102, 108], [103, 105]
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const A = pair[0];
        const B = pair[1];
        const ans = A * B;

        if (A < 100 && B < 100) {
            const d1 = 100 - A;
            const d2 = 100 - B;
            const p1 = A - d2;
            const p2 = d1 * d2;
            const p2Str = p2 < 10 ? '0' + p2 : '' + p2;
            return {
                num1: A,
                num2: B,
                op: '×',
                answer: ans,
                trickType: 'base100',
                trickInfo: {
                    title: `Metodo Vedico Base 100: ${A} × ${B}`,
                    formula: `(100 - a)(100 - b) = 100(100 - a - b) + ab`,
                    steps: [
                        `Scarti da 100: a = <strong>-${d1}</strong>, b = <strong>-${d2}</strong>`,
                        `Prima parte (sottrazione a croce): ${A} - ${d2} = <strong>${p1}</strong>`,
                        `Seconda parte (prodotto scarti): ${d1} × ${d2} = <strong>${p2Str}</strong>`
                    ],
                    conclusion: `Unisci le due parti: <strong>${A} × ${B} = ${ans}</strong> 🪐`
                }
            };
        } else {
            const e1 = A - 100;
            const e2 = B - 100;
            const p1 = A + e2;
            const p2 = e1 * e2;
            const p2Str = p2 < 10 ? '0' + p2 : '' + p2;
            return {
                num1: A,
                num2: B,
                op: '×',
                answer: ans,
                trickType: 'base100',
                trickInfo: {
                    title: `Metodo Vedico Base 100: ${A} × ${B}`,
                    formula: `(100 + a)(100 + b) = 100(100 + a + b) + ab`,
                    steps: [
                        `Eccedenze da 100: a = <strong>+${e1}</strong>, b = <strong>+${e2}</strong>`,
                        `Prima parte (somma a croce): ${A} + ${e2} = <strong>${p1}</strong>`,
                        `Seconda parte (prodotto eccedenze): ${e1} × ${e2} = <strong>${p2Str}</strong>`
                    ],
                    conclusion: `Unisci le due parti: <strong>${A} × ${B} = ${ans}</strong> 🪐`
                }
            };
        }
    }

    generateTrickQuestionDoubleHalve() {
        const pairs = [
            [24, 15], [18, 25], [16, 35], [28, 15], [14, 25], [18, 35], [32, 15], [24, 25], [12, 45], [36, 15]
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const A = pair[0];
        const B = pair[1];
        const halfA = A / 2;
        const doubleB = B * 2;
        const ans = A * B;

        return {
            num1: A,
            num2: B,
            op: '×',
            answer: ans,
            trickType: 'double_halve',
            trickInfo: {
                title: `Raddoppia e Dimezza: ${A} × ${B}`,
                formula: `A × B = (A / 2) × (2B)`,
                steps: [
                    `Dimezza il numero pari: ${A} ÷ 2 = <strong>${halfA}</strong>`,
                    `Raddoppia il numero col 5: ${B} × 2 = <strong>${doubleB}</strong>`,
                    `Nuovo calcolo facilissimo: ${halfA} × ${doubleB} = <strong>${ans}</strong>`
                ],
                conclusion: `Risultato: <strong>${A} × ${B} = ${ans}</strong> ⚖️`
            }
        };
    }

    generateTrickQuestionDiffSquares() {
        const centers = [30, 40, 50, 60, 70, 80];
        const diffs = [1, 2, 3, 4];
        const C = centers[Math.floor(Math.random() * centers.length)];
        const D = diffs[Math.floor(Math.random() * diffs.length)];
        const A = C - D;
        const B = C + D;
        const ans = C * C - D * D;

        return {
            num1: A,
            num2: B,
            op: '×',
            answer: ans,
            trickType: 'diff_squares',
            trickInfo: {
                title: `Prodotto Notevole a² - b²: ${A} × ${B}`,
                formula: `(c - d)(c + d) = c² - d²`,
                steps: [
                    `Trova il tondo centrale: <strong>c = ${C}</strong> (distanza <strong>d = ${D}</strong>)`,
                    `Fai il quadrato del centro: ${C}² = <strong>${C * C}</strong>`,
                    `Sottrai il quadrato della distanza: ${C * C} - ${D}² = ${C * C} - ${D * D} = <strong>${ans}</strong>`
                ],
                conclusion: `Risultato: <strong>${A} × ${B} = ${ans}</strong> 💎`
            }
        };
    }

    generateTrickQuestionNine() {
        const N = Math.floor(Math.random() * 65) + 15;
        const ans = N * 99;
        return {
            num1: N,
            num2: 99,
            op: '×',
            answer: ans,
            trickType: 'nine',
            trickInfo: {
                title: `Regola del 99: ${N} × 99`,
                formula: `N × (100 - 1) = 100N - N`,
                steps: [
                    `Aggiungi due zeri: ${N} × 100 = <strong>${N * 100}</strong>`,
                    `Sottrai ${N} una volta: ${N * 100} - ${N} = <strong>${ans}</strong>`
                ],
                conclusion: `Risultato: <strong>${N} × 99 = ${ans}</strong> 🪄`
            }
        };
    }

    generateTrickQuestionPercent() {
        const pairs = [[16, 25], [12, 50], [28, 25], [18, 50], [32, 25], [24, 50], [44, 25], [14, 50]];
        const p = pairs[Math.floor(Math.random() * pairs.length)];
        const X = p[0];
        const Y = p[1];
        const ans = (X * Y) / 100;
        const calcExplanation = Y === 25 ? `Il 25% corrisponde a un quarto (÷ 4): ${X} ÷ 4 = <strong>${ans}</strong>` : `Il 50% corrisponde alla metà (÷ 2): ${X} ÷ 2 = <strong>${ans}</strong>`;

        return {
            num1: `${X}%`,
            num2: Y,
            op: 'di',
            answer: ans,
            trickType: 'percent',
            trickInfo: {
                title: `Percentuali Inverse: ${X}% di ${Y}`,
                formula: `(X × Y) / 100 = (Y × X) / 100`,
                steps: [
                    `Scambia i due numeri: <strong>${X}% di ${Y} = ${Y}% di ${X}</strong>`,
                    calcExplanation
                ],
                conclusion: `Risultato: <strong>${X}% di ${Y} = ${ans}</strong> 🎯`
            }
        };
    }

    generateTrickQuestionDiv5_25() {
        const isDiv5 = Math.random() > 0.5;
        if (isDiv5) {
            const mult = Math.floor(Math.random() * 35) + 6; // 6 a 40
            const N = mult * 5;
            const ans = mult;
            return {
                num1: N,
                num2: 5,
                op: '÷',
                answer: ans,
                trickType: 'div5_25',
                trickInfo: {
                    title: `Divisione Rapida: ${N} ÷ 5`,
                    formula: `N ÷ 5 = (2N) ÷ 10`,
                    steps: [
                        `Raddoppia il numero: ${N} × 2 = <strong>${N * 2}</strong>`,
                        `Dividi per 10 (togli lo zero): ${N * 2} ÷ 10 = <strong>${ans}</strong>`
                    ],
                    conclusion: `Risultato: <strong>${N} ÷ 5 = ${ans}</strong> ⚡`
                }
            };
        } else {
            const mult = Math.floor(Math.random() * 25) + 4;
            const N = mult * 25;
            const ans = mult;
            return {
                num1: N,
                num2: 25,
                op: '÷',
                answer: ans,
                trickType: 'div5_25',
                trickInfo: {
                    title: `Divisione Rapida: ${N} ÷ 25`,
                    formula: `N ÷ 25 = (4N) ÷ 100`,
                    steps: [
                        `Quadruplica il numero: ${N} × 4 = <strong>${N * 4}</strong>`,
                        `Dividi per 100 (togli due zeri): ${N * 4} ÷ 100 = <strong>${ans}</strong>`
                    ],
                    conclusion: `Risultato: <strong>${N} ÷ 25 = ${ans}</strong> ⚡`
                }
            };
        }
    }

    generateTrickQuestionBoss() {
        const generators = [
            () => this.generateTrickQuestion11(),
            () => this.generateTrickQuestionSquare5(),
            () => this.generateTrickQuestionBase100(),
            () => this.generateTrickQuestionDoubleHalve(),
            () => this.generateTrickQuestionDiffSquares(),
            () => this.generateTrickQuestionNine(),
            () => this.generateTrickQuestionPercent(),
            () => this.generateTrickQuestionDiv5_25()
        ];
        const fn = generators[Math.floor(Math.random() * generators.length)];
        return fn();
    }

    startTrickTraining(trickType) {
        this.currentMode = 'trick_training';
        this.questions = [];
        for (let i = 0; i < 10; i++) {
            let q = null;
            if (trickType === '11') q = this.generateTrickQuestion11();
            else if (trickType === 'square5') q = this.generateTrickQuestionSquare5();
            else if (trickType === 'base100') q = this.generateTrickQuestionBase100();
            else if (trickType === 'double_halve') q = this.generateTrickQuestionDoubleHalve();
            else if (trickType === 'diff_squares') q = this.generateTrickQuestionDiffSquares();
            else if (trickType === 'nine') q = this.generateTrickQuestionNine();
            else if (trickType === 'percent') q = this.generateTrickQuestionPercent();
            else if (trickType === 'div5_25') q = this.generateTrickQuestionDiv5_25();
            else q = this.generateTrickQuestion11();
            this.questions.push(q);
        }
        this.currentLevelConfig = { id: 0, name: 'Allenamento Trucco Mentale', questionsCount: 10 };
        this.startRun(0, 999); // Senza ansia da tempo, con vite illimitate!
    }

    startAdventureLevel(levelId) {
        const lvl = ADVENTURE_LEVELS.find(x => x.id === levelId);
        if (!lvl) return;
        this.currentMode = 'adventure';
        this.currentLevelConfig = lvl;
        this.questions = this.generateQuestionsForLevel(lvl);
        this.startRun(lvl.timePerQuestion || 12, 3);
    }

    startGymMode() {
        this.currentMode = 'gym';
        const questionsCount = this.gymDuration;
        this.questions = [];
        for (let i = 0; i < questionsCount; i++) {
            const table = this.gymSelectedTables[Math.floor(Math.random() * this.gymSelectedTables.length)];
            const mult = Math.floor(Math.random() * 10) + 1;
            if (this.gymOperation === '÷') {
                this.questions.push({
                    num1: table * mult,
                    num2: table,
                    op: '÷',
                    answer: mult,
                    visualType: 'division'
                });
            } else if (this.gymOperation === 'mix') {
                if (Math.random() > 0.5) {
                    this.questions.push({ num1: table, num2: mult, op: '×', answer: table * mult });
                } else {
                    this.questions.push({ num1: table * mult, num2: table, op: '÷', answer: mult });
                }
            } else {
                this.questions.push({ num1: table, num2: mult, op: '×', answer: table * mult });
            }
        }
        this.currentLevelConfig = { id: 0, name: 'Palestra Libera', questionsCount: questionsCount };
        this.startRun(0, 999); // In palestra: nessun timer ansiogeno, vite illimitate!
    }

    startSpeedrunMode() {
        this.currentMode = 'speedrun';
        this.questions = [];
        for (let i = 0; i < 25; i++) {
            const a = Math.floor(Math.random() * 10) + 2;
            const b = Math.floor(Math.random() * 10) + 1;
            this.questions.push({ num1: a, num2: b, op: '×', answer: a * b });
        }
        this.currentLevelConfig = { id: 99, name: 'Sfida a Tempo Boss', questionsCount: 20 };
        this.startRun(7, 3); // 7 secondi al colpo!
    }

    startRun(timePerQ, initialLives) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.combo = 0;
        this.maxComboThisRun = 0;
        this.lives = initialLives;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.mistakes = [];
        this.maxTime = timePerQ;
        
        this.updateHUD();
        this.showScreen('gameplay');
        this.loadNextQuestion();
    }

    updateHUD() {
        // Cuori
        const heartsContainer = document.getElementById('hud-lives-container');
        if (this.lives > 10) {
            // Modalità infinita / palestra
            heartsContainer.innerHTML = '<span>♾️ Allenamento</span>';
        } else {
            let h = '';
            for (let i = 0; i < 3; i++) {
                h += `<span class="heart-life ${i < this.lives ? '' : 'lost'}">❤️</span>`;
            }
            heartsContainer.innerHTML = h;
        }

        // Domanda contatore
        const total = this.questions.length;
        document.getElementById('hud-counter-text').textContent = `${this.currentQuestionIndex + 1} / ${total}`;

        // Punteggio
        document.getElementById('hud-score-val').textContent = this.score;

        // Combo badge
        const comboBadge = document.getElementById('hud-combo-tag');
        if (this.combo >= 2) {
            comboBadge.style.display = 'inline-flex';
            comboBadge.textContent = `🔥 x${this.combo} COMBO!`;
        } else {
            comboBadge.style.display = 'none';
        }
    }

    loadNextQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.finishRun(true);
            return;
        }

        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.userAnswer = '';
        this.updateInputDisplay();

        // Render equazione
        document.getElementById('eq-num1').textContent = this.currentQuestion.num1;
        document.getElementById('eq-op').textContent = this.currentQuestion.op;
        document.getElementById('eq-num2').textContent = this.currentQuestion.num2;

        // Aggiorna etichetta tasto aiuto (Pallini vs Trucco)
        const helpLabel = document.getElementById('help-btn-label');
        if (helpLabel) {
            helpLabel.textContent = this.currentQuestion.trickInfo ? '💡 Mostra Trucco Rapido' : '💡 Mostra Aiuto a Pallini';
        }

        this.updateHUD();

        // Timer
        clearInterval(this.timer);
        const timerContainer = document.getElementById('game-timer-bar');
        const timerFill = document.getElementById('timer-fill-bar');

        if (this.maxTime > 0) {
            timerContainer.style.display = 'block';
            this.timeLeft = this.maxTime;
            this.questionStartTime = Date.now();
            this.updateTimerBar();

            let lastSec = Math.ceil(this.timeLeft);
            this.timer = setInterval(() => {
                this.timeLeft -= 0.1;
                this.updateTimerBar();

                // Ticking sonoro quando il tempo stringe (ultimi 3 secondi)
                const curSec = Math.ceil(this.timeLeft);
                if (curSec <= 3 && curSec > 0 && curSec !== lastSec) {
                    lastSec = curSec;
                    window.soundEngine.playTick();
                }

                if (this.timeLeft <= 0) {
                    clearInterval(this.timer);
                    this.handleTimeout();
                }
            }, 100);
        } else {
            timerContainer.style.display = 'none';
        }
    }

    updateTimerBar() {
        const fill = document.getElementById('timer-fill-bar');
        const pct = Math.max(0, (this.timeLeft / this.maxTime) * 100);
        fill.style.width = `${pct}%`;

        fill.className = 'timer-fill';
        if (pct < 28) {
            fill.classList.add('danger');
        } else if (pct < 55) {
            fill.classList.add('warning');
        }
    }

    handleInput(val) {
        if (val === 'clear') {
            this.userAnswer = '';
            window.soundEngine.playClick();
        } else if (val === 'back') {
            this.userAnswer = this.userAnswer.slice(0, -1);
            window.soundEngine.playClick();
        } else if (val === 'enter') {
            if (this.userAnswer.length > 0) {
                this.submitAnswer();
            }
        } else {
            if (this.userAnswer.length < 5) {
                this.userAnswer += val;
                window.soundEngine.playClick();
            }
        }
        this.updateInputDisplay();
    }

    updateInputDisplay() {
        const box = document.getElementById('input-answer-box');
        if (this.userAnswer === '') {
            box.textContent = '';
            box.classList.add('placeholder');
        } else {
            box.textContent = this.userAnswer;
            box.classList.remove('placeholder');
        }
    }

    submitAnswer() {
        clearInterval(this.timer);
        const ans = parseInt(this.userAnswer, 10);
        const isCorrect = (ans === this.currentQuestion.answer);
        const answerTime = (Date.now() - this.questionStartTime) / 1000;

        if (isCorrect) {
            this.correctCount++;
            this.combo++;
            if (this.combo > this.maxComboThisRun) this.maxComboThisRun = this.combo;

            // Punti: base 100 + bonus combo + bonus velocità
            let pts = 100 * Math.min(this.combo, 4);
            if (this.maxTime > 0 && answerTime < 3) {
                pts += 50; // Bonus fulmine
            }
            this.score += pts;

            // Effetti Visivi AAA: Floating XP & Speed Bonus
            this.spawnFloatingScore(`+${pts} XP! 🔥`);
            if (this.maxTime > 0 && answerTime < 3) {
                this.spawnFloatingScore(`⚡ SPEED BONUS! +50`, true);
            }

            this.saveData.totalSolved++;
            if (this.saveData.totalSolved >= 50) {
                this.unlockTrophy('maratona_50');
            }

            if (answerTime < 2.0 && this.maxTime > 0) {
                this.unlockTrophy('fulmine');
            }
            if (this.combo >= 5) {
                this.unlockTrophy('combo_5');
            }

            // Suoni & Trofei per Trucchi Mentali
            if (this.currentQuestion.trickInfo) {
                window.soundEngine.playTrickSuccess();
                if (this.currentQuestion.trickType === '11') this.unlockTrophy('mago_11');
                if (this.currentQuestion.trickType === 'square5') this.unlockTrophy('re_quadrati');
                if (this.currentQuestion.trickType === 'base100') this.unlockTrophy('mente_vedica');
            } else if (this.combo > 1) {
                window.soundEngine.playCombo(this.combo);
            } else {
                window.soundEngine.playCorrect();
            }

            window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 25);
            this.triggerFeedback(true);
        } else {
            this.combo = 0;
            this.wrongCount++;
            this.mistakes.push({
                eq: `${this.currentQuestion.num1} ${this.currentQuestion.op} ${this.currentQuestion.num2}`,
                correct: this.currentQuestion.answer,
                user: isNaN(ans) ? 'N/D' : ans
            });

            if (this.lives <= 10) {
                this.lives--;
            }
            window.soundEngine.playWrong();
            this.triggerFeedback(false);

            if (this.lives <= 0) {
                setTimeout(() => {
                    this.finishRun(false);
                }, 600);
                return;
            }
        }

        setTimeout(() => {
            this.currentQuestionIndex++;
            this.loadNextQuestion();
        }, 450);
    }

    handleTimeout() {
        this.submitAnswer(); // Invia risposta vuota (considerata errore)
    }

    spawnFloatingScore(text, isBonus = false) {
        const container = document.getElementById('floating-score-container');
        if (!container) return;
        const el = document.createElement('div');
        el.className = 'floating-score-item';
        el.textContent = text;
        if (isBonus) {
            el.style.color = '#34d399';
        }
        container.appendChild(el);
        setTimeout(() => {
            el.remove();
        }, 1100);
    }

    triggerFeedback(isCorrect) {
        const flash = document.getElementById('feedback-flash');
        flash.className = `feedback-flash ${isCorrect ? 'correct' : 'wrong'}`;
        flash.textContent = isCorrect ? '⭐ BRAVO!' : '❌ OPS!';
        setTimeout(() => {
            flash.className = 'feedback-flash';
        }, 400);
    }

    openVisualHelp() {
        this.visualHelpUsed++;
        if (this.visualHelpUsed >= 3) {
            this.unlockTrophy('studioso');
        }

        const q = this.currentQuestion;
        const modal = this.modalVisualHelp;
        const title = document.getElementById('help-modal-title');
        const desc = document.getElementById('help-modal-desc');
        const grid = document.getElementById('help-modal-grid');
        const trickView = document.getElementById('help-modal-trick-view');
        const badge = document.getElementById('help-modal-badge');

        if (q.trickInfo) {
            // Visualizzazione Step-by-Step per Trucchi di Calcolo Mentale
            if (grid) grid.style.display = 'none';
            if (trickView) {
                trickView.style.display = 'block';
                let stepsHtml = '';
                if (q.trickInfo.formula) {
                    stepsHtml += `<div class="trick-help-formula-box">${q.trickInfo.formula}</div>`;
                }
                if (q.trickInfo.steps && q.trickInfo.steps.length > 0) {
                    q.trickInfo.steps.forEach((step, idx) => {
                        stepsHtml += `
                            <div class="trick-help-step-row">
                                <div class="trick-step-circle">${idx + 1}</div>
                                <div class="trick-step-content">${step}</div>
                            </div>
                        `;
                    });
                }
                if (q.trickInfo.conclusion) {
                    stepsHtml += `<div class="trick-help-conclusion">${q.trickInfo.conclusion}</div>`;
                }
                trickView.innerHTML = stepsHtml;
            }
            if (badge) badge.textContent = '🧠 TRUCCO DEL CALCOLO RAPIDO';
            title.textContent = q.trickInfo.title || `Come calcolare ${q.num1} ${q.op} ${q.num2}`;
            desc.textContent = 'Ecco come calcolarlo a mente in pochissimi secondi senza carta né penna!';
        } else {
            // Visualizzazione Classica a Pallini (Dot Grid)
            if (trickView) trickView.style.display = 'none';
            if (grid) grid.style.display = 'inline-grid';
            if (badge) badge.textContent = '💡 AIUTO VISIVO A PALLINI';

            if (q.op === '×') {
                title.textContent = `Visualizza: ${q.num1} × ${q.num2}`;
                desc.textContent = `Pensa alla moltiplicazione come una scatola con ${q.num1} righe e ${q.num2} palline per riga. Contale tutte!`;
                
                const rows = Math.min(q.num1, 12);
                const cols = Math.min(q.num2, 12);
                grid.style.gridTemplateColumns = `repeat(${cols}, 22px)`;
                grid.innerHTML = '';
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const dot = document.createElement('span');
                        dot.className = 'visual-dot';
                        grid.appendChild(dot);
                    }
                }
            } else if (q.op === '÷') {
                title.textContent = `Visualizza: ${q.num1} ÷ ${q.num2}`;
                desc.textContent = `Hai ${q.num1} palline da dividere in gruppi da ${q.num2}. Quanti gruppi riesci a formare?`;
                grid.style.gridTemplateColumns = `repeat(${q.num2}, 22px)`;
                grid.innerHTML = '';
                const total = Math.min(q.num1, 50);
                for (let i = 0; i < total; i++) {
                    const dot = document.createElement('span');
                    dot.className = 'visual-dot';
                    grid.appendChild(dot);
                }
            } else {
                title.textContent = `Visualizza: ${q.num1} ${q.op} ${q.num2}`;
                desc.textContent = `Calcolo: ${q.num1} ${q.op} ${q.num2} = ${q.answer}`;
                grid.innerHTML = '';
            }
        }

        modal.classList.add('active');
    }

    finishRun(won) {
        clearInterval(this.timer);
        this.showScreen('results');

        const totalQ = this.questions.length;
        const accuracy = Math.round((this.correctCount / totalQ) * 100);

        document.getElementById('res-score').textContent = this.score;
        document.getElementById('res-accuracy').textContent = `${accuracy}%`;
        document.getElementById('res-combo').textContent = `x${this.maxComboThisRun}`;

        const mistakesBox = document.getElementById('res-mistakes-box');
        const mistakesList = document.getElementById('res-mistakes-list');
        mistakesList.innerHTML = '';

        if (this.mistakes.length > 0) {
            mistakesBox.style.display = 'block';
            this.mistakes.forEach(m => {
                const tag = document.createElement('span');
                tag.className = 'mistake-tag';
                tag.textContent = `${m.eq} = ${m.correct}`;
                mistakesList.appendChild(tag);
            });
        } else {
            mistakesBox.style.display = 'none';
        }

        // Calcolo Stelle (1, 2 o 3 stelle)
        let stars = 0;
        if (won) {
            if (accuracy === 100) {
                stars = 3;
            } else if (accuracy >= 80) {
                stars = 2;
            } else {
                stars = 1;
            }
        }

        // Animazione Stelle
        const starEls = [
            document.getElementById('res-star-1'),
            document.getElementById('res-star-2'),
            document.getElementById('res-star-3')
        ];
        starEls.forEach(el => el.classList.remove('achieved'));

        if (won) {
            document.getElementById('res-title').textContent = stars === 3 ? '🎉 PERFETTO! MAGICO!' : '👏 OTTIMO LAVORO!';
            document.getElementById('res-subtitle').textContent = `Hai superato la sfida con successo!`;
            window.soundEngine.playVictory();
            window.confetti.rain(3000);

            for (let i = 0; i < stars; i++) {
                setTimeout(() => {
                    starEls[i].classList.add('achieved');
                    window.soundEngine.playStar();
                }, 400 + i * 350);
            }

            // Salvataggio Livello e sblocco successivo
            if (this.currentMode === 'adventure') {
                const lvlId = this.currentLevelConfig.id;
                const prevStars = this.saveData.stars[lvlId] || 0;
                if (stars > prevStars) {
                    this.saveData.stars[lvlId] = stars;
                }
                const prevScore = this.saveData.highScores[lvlId] || 0;
                if (this.score > prevScore) {
                    this.saveData.highScores[lvlId] = this.score;
                }

                if (lvlId >= this.saveData.unlockedLevel && lvlId < ADVENTURE_LEVELS.length) {
                    this.saveData.unlockedLevel = lvlId + 1;
                }

                // Trofeo primo passo
                if (lvlId === 1) this.unlockTrophy('primo_passo');
                if (lvlId >= 5) this.unlockTrophy('campione_tabelline');
                if (accuracy === 100) this.unlockTrophy('cecchino');

                // Trofeo Ingegnere Supremo se finisce il livello 15
                if (lvlId >= 15) this.unlockTrophy('ingegnere_capo');

                // Controlla se tutti i livelli hanno 3 stelle
                let allThreeStars = true;
                for (let k = 1; k <= ADVENTURE_LEVELS.length; k++) {
                    if ((this.saveData.stars[k] || 0) < 3) {
                        allThreeStars = false;
                        break;
                    }
                }
                if (allThreeStars) this.unlockTrophy('gran_maestro');
            }
        } else {
            document.getElementById('res-title').textContent = '💪 NON ARRENDERTI!';
            document.getElementById('res-subtitle').textContent = `Riprova, i grandi campioni si allenano con pazienza!`;
            window.soundEngine.playGameOver();
        }

        this.saveGame();
        this.updateHeaderStats();
    }

    // ================= ACCADEMIA DEI TRUCCHI: FILTRI E SIMULATORI =================
    setupAcademyFilters() {
        const filterBtns = document.querySelectorAll('.btn-filter-pill');
        const cards = document.querySelectorAll('.trick-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundEngine.playClick();
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-filter');

                cards.forEach(c => {
                    if (category === 'all' || c.getAttribute('data-category') === category) {
                        c.style.display = 'flex';
                    } else {
                        c.style.display = 'none';
                    }
                });
            });
        });
    }

    setupTrickTrainButtons() {
        document.querySelectorAll('.btn-train-trick').forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundEngine.playWhoosh();
                const trick = btn.getAttribute('data-trick');
                this.startTrickTraining(trick);
            });
        });
    }

    setupAcademySimulators() {
        // 1. Trucco 11
        const btnCalc11 = document.getElementById('btn-calc-11');
        const btnRnd11 = document.getElementById('btn-rnd-11');
        const input11 = document.getElementById('sim-input-11');
        const res11 = document.getElementById('sim-result-11');

        const run11 = () => {
            const val = parseInt(input11.value, 10);
            if (isNaN(val) || val < 10 || val > 99) return;
            const t = Math.floor(val / 10);
            const u = val % 10;
            const s = t + u;
            const ans = val * 11;
            let html = `
                <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Cifre esterne: [<strong>${t}</strong>] ... [<strong>${u}</strong>]</div>
                <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Somma centrale: ${t} + ${u} = <strong>${s}</strong></div>
            `;
            if (s >= 10) {
                html += `<div class="sim-step-item"><span class="sim-step-tag">Riporto</span> Somma ≥ 10: riporta 1 sulla decina (${t} + 1 = <strong>${t + 1}</strong>)</div>`;
            }
            html += `<div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${val} × 11 = ${ans} ⚡</span></div>`;
            res11.innerHTML = html;
        };

        if (btnCalc11) btnCalc11.addEventListener('click', () => { window.soundEngine.playClick(); run11(); });
        if (btnRnd11) btnRnd11.addEventListener('click', () => {
            window.soundEngine.playClick();
            input11.value = Math.floor(Math.random() * 85) + 12;
            run11();
        });

        // 2. Trucco Quadrato del 5
        const btnCalcSq5 = document.getElementById('btn-calc-sq5');
        const btnRndSq5 = document.getElementById('btn-rnd-sq5');
        const inputSq5 = document.getElementById('sim-input-sq5');
        const resSq5 = document.getElementById('sim-result-sq5');

        const runSq5 = () => {
            const val = parseInt(inputSq5.value, 10);
            if (isNaN(val) || val % 10 !== 5) return;
            const t = Math.floor(val / 10);
            const next = t + 1;
            const prod = t * next;
            const ans = val * val;
            resSq5.innerHTML = `
                <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Decina per il suo successivo: ${t} × ${next} = <strong>${prod}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Accoda sempre <strong>25</strong> al risultato</div>
                <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${val}² = ${ans} 🔥</span></div>
            `;
        };

        if (btnCalcSq5) btnCalcSq5.addEventListener('click', () => { window.soundEngine.playClick(); runSq5(); });
        if (btnRndSq5) btnRndSq5.addEventListener('click', () => {
            window.soundEngine.playClick();
            const opts = [15, 25, 35, 45, 55, 65, 75, 85, 95];
            inputSq5.value = opts[Math.floor(Math.random() * opts.length)];
            runSq5();
        });

        // 3. Trucco Base 100
        const btnCalcB100 = document.getElementById('btn-calc-b100');
        const btnRndB100 = document.getElementById('btn-rnd-b100');
        const inputB100A = document.getElementById('sim-input-b100-a');
        const inputB100B = document.getElementById('sim-input-b100-b');
        const resB100 = document.getElementById('sim-result-b100');

        const runB100 = () => {
            const a = parseInt(inputB100A.value, 10);
            const b = parseInt(inputB100B.value, 10);
            if (isNaN(a) || isNaN(b)) return;
            const ans = a * b;

            if (a < 100 && b < 100) {
                const d1 = 100 - a;
                const d2 = 100 - b;
                const p1 = a - d2;
                const p2 = d1 * d2;
                const p2Str = p2 < 10 ? '0' + p2 : '' + p2;
                resB100.innerHTML = `
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Scarti da 100: -${d1} e -${d2}</div>
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Sottrai a croce: ${a} - ${d2} = <strong>${p1}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 3</span> Prodotto scarti: ${d1} × ${d2} = <strong>${p2Str}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${a} × ${b} = ${ans} 🪐</span></div>
                `;
            } else {
                const e1 = a - 100;
                const e2 = b - 100;
                const p1 = a + e2;
                const p2 = e1 * e2;
                const p2Str = p2 < 10 ? '0' + p2 : '' + p2;
                resB100.innerHTML = `
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Eccedenze da 100: +${e1} e +${e2}</div>
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Somma a croce: ${a} + ${e2} = <strong>${p1}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 3</span> Prodotto eccedenze: ${e1} × ${e2} = <strong>${p2Str}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${a} × ${b} = ${ans} 🪐</span></div>
                `;
            }
        };

        if (btnCalcB100) btnCalcB100.addEventListener('click', () => { window.soundEngine.playClick(); runB100(); });
        if (btnRndB100) btnRndB100.addEventListener('click', () => {
            window.soundEngine.playClick();
            const pairs = [[96, 94], [97, 93], [98, 95], [104, 106], [103, 107], [96, 97], [99, 93]];
            const p = pairs[Math.floor(Math.random() * pairs.length)];
            inputB100A.value = p[0];
            inputB100B.value = p[1];
            runB100();
        });

        // 4. Trucco a² - b²
        const btnCalcDiff = document.getElementById('btn-calc-diff');
        const btnRndDiff = document.getElementById('btn-rnd-diff');
        const inputDiffA = document.getElementById('sim-input-diff-a');
        const inputDiffB = document.getElementById('sim-input-diff-b');
        const resDiff = document.getElementById('sim-result-diff');

        const runDiff = () => {
            const a = parseInt(inputDiffA.value, 10);
            const b = parseInt(inputDiffB.value, 10);
            if (isNaN(a) || isNaN(b)) return;
            const c = (a + b) / 2;
            const d = Math.abs(a - c);
            const ans = a * b;
            resDiff.innerHTML = `
                <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Centro tondo <strong>c = ${c}</strong>, distanza <strong>d = ${d}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Calcola ${c}² - ${d}² = <strong>${c*c} - ${d*d}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${a} × ${b} = ${ans} 💎</span></div>
            `;
        };

        if (btnCalcDiff) btnCalcDiff.addEventListener('click', () => { window.soundEngine.playClick(); runDiff(); });
        if (btnRndDiff) btnRndDiff.addEventListener('click', () => {
            window.soundEngine.playClick();
            const pairs = [[38, 42], [49, 51], [27, 33], [76, 84], [58, 62], [19, 21]];
            const p = pairs[Math.floor(Math.random() * pairs.length)];
            inputDiffA.value = p[0];
            inputDiffB.value = p[1];
            runDiff();
        });

        // 5. Trucco Raddoppia e Dimezza
        const btnCalcDh = document.getElementById('btn-calc-dh');
        const btnRndDh = document.getElementById('btn-rnd-dh');
        const inputDhA = document.getElementById('sim-input-dh-a');
        const inputDhB = document.getElementById('sim-input-dh-b');
        const resDh = document.getElementById('sim-result-dh');

        const runDh = () => {
            const a = parseInt(inputDhA.value, 10);
            const b = parseInt(inputDhB.value, 10);
            if (isNaN(a) || isNaN(b)) return;
            const halfA = a / 2;
            const doubleB = b * 2;
            const ans = a * b;
            resDh.innerHTML = `
                <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Dimezza il numero pari: ${a} ÷ 2 = <strong>${halfA}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Raddoppia il secondo: ${b} × 2 = <strong>${doubleB}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag">Passo 3</span> Calcolo facile: ${halfA} × ${doubleB}</div>
                <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${a} × ${b} = ${ans} ⚖️</span></div>
            `;
        };

        if (btnCalcDh) btnCalcDh.addEventListener('click', () => { window.soundEngine.playClick(); runDh(); });
        if (btnRndDh) btnRndDh.addEventListener('click', () => {
            window.soundEngine.playClick();
            const pairs = [[24, 15], [18, 25], [16, 35], [28, 15], [14, 25], [32, 15]];
            const p = pairs[Math.floor(Math.random() * pairs.length)];
            inputDhA.value = p[0];
            inputDhB.value = p[1];
            runDh();
        });

        // 6. Trucco del 99
        const btnCalcNine = document.getElementById('btn-calc-nine');
        const btnRndNine = document.getElementById('btn-rnd-nine');
        const inputNineN = document.getElementById('sim-input-nine-n');
        const resNine = document.getElementById('sim-result-nine');

        const runNine = () => {
            const n = parseInt(inputNineN.value, 10);
            if (isNaN(n)) return;
            const ans = n * 99;
            resNine.innerHTML = `
                <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Moltiplica per 100: ${n} × 100 = <strong>${n * 100}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Sottrai il numero stesso: ${n * 100} - ${n}</div>
                <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${n} × 99 = ${ans} 🪄</span></div>
            `;
        };

        if (btnCalcNine) btnCalcNine.addEventListener('click', () => { window.soundEngine.playClick(); runNine(); });
        if (btnRndNine) btnRndNine.addEventListener('click', () => {
            window.soundEngine.playClick();
            inputNineN.value = Math.floor(Math.random() * 70) + 15;
            runNine();
        });

        // 7. Trucco Percentuali
        const btnCalcPct = document.getElementById('btn-calc-pct');
        const btnRndPct = document.getElementById('btn-rnd-pct');
        const inputPctX = document.getElementById('sim-input-pct-x');
        const inputPctY = document.getElementById('sim-input-pct-y');
        const resPct = document.getElementById('sim-result-pct');

        const runPct = () => {
            const x = parseInt(inputPctX.value, 10);
            const y = parseInt(inputPctY.value, 10);
            if (isNaN(x) || isNaN(y)) return;
            const ans = (x * y) / 100;
            const hint = y === 25 ? `Il 25% di ${x} è ${x} ÷ 4` : (y === 50 ? `Il 50% di ${x} è ${x} ÷ 2` : `${x} × ${y} ÷ 100`);
            resPct.innerHTML = `
                <div class="sim-step-item"><span class="sim-step-tag">Scambio</span> ${x}% di ${y} = <strong>${y}% di ${x}</strong></div>
                <div class="sim-step-item"><span class="sim-step-tag">Calcolo</span> ${hint}</div>
                <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${x}% di ${y} = ${ans} 🎯</span></div>
            `;
        };

        if (btnCalcPct) btnCalcPct.addEventListener('click', () => { window.soundEngine.playClick(); runPct(); });
        if (btnRndPct) btnRndPct.addEventListener('click', () => {
            window.soundEngine.playClick();
            const pairs = [[16, 25], [12, 50], [28, 25], [18, 50], [32, 25], [24, 50], [44, 25]];
            const p = pairs[Math.floor(Math.random() * pairs.length)];
            inputPctX.value = p[0];
            inputPctY.value = p[1];
            runPct();
        });

        // 8. Trucco Divisione per 5 e 25
        const btnCalcDiv = document.getElementById('btn-calc-div');
        const btnRndDiv = document.getElementById('btn-rnd-div');
        const inputDivN = document.getElementById('sim-input-div-n');
        const selectDivD = document.getElementById('sim-select-div-d');
        const resDiv = document.getElementById('sim-result-div');

        const runDiv = () => {
            const n = parseInt(inputDivN.value, 10);
            const d = parseInt(selectDivD.value, 10);
            if (isNaN(n) || isNaN(d)) return;
            const ans = n / d;
            if (d === 5) {
                resDiv.innerHTML = `
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Raddoppia: ${n} × 2 = <strong>${n * 2}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Dividi per 10 (togli lo 0): ${n * 2} ÷ 10 = <strong>${ans}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${n} ÷ 5 = ${ans} ⚡</span></div>
                `;
            } else {
                resDiv.innerHTML = `
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 1</span> Quadruplica: ${n} × 4 = <strong>${n * 4}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag">Passo 2</span> Dividi per 100 (togli due zeri): ${n * 4} ÷ 100 = <strong>${ans}</strong></div>
                    <div class="sim-step-item"><span class="sim-step-tag" style="background:#dcfce7;color:#15803d;">Risultato</span> <span class="sim-step-ans">${n} ÷ 25 = ${ans} ⚡</span></div>
                `;
            }
        };

        if (btnCalcDiv) btnCalcDiv.addEventListener('click', () => { window.soundEngine.playClick(); runDiv(); });
        if (btnRndDiv) btnRndDiv.addEventListener('click', () => {
            window.soundEngine.playClick();
            const d = selectDivD.value === '5' ? 5 : 25;
            const mult = Math.floor(Math.random() * 30) + 5;
            inputDivN.value = mult * d;
            runDiv();
        });

        // Esecuzione iniziale di tutti i simulatori
        this.runSimulators = [run11, runSq5, runB100, runDiff, runDh, runNine, runPct, runDiv];
        this.runAllSimulatorsDefault();
    }

    runAllSimulatorsDefault() {
        if (this.runSimulators) {
            this.runSimulators.forEach(fn => fn());
        }
    }

    showToastNotification(text) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#1e1b4b';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '999px';
        toast.style.fontWeight = '800';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        toast.style.zIndex = '99999';
        toast.style.fontSize = '1.05rem';
        toast.style.animation = 'fadeIn 0.3s ease-out';
        toast.textContent = text;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3200);
    }
}

// Inizializzazione al caricamento
window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameManager();
});
