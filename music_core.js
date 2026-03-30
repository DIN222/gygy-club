/* GY-GY MUSIC CORE v2.0 | MARKOV JAZZ EDITION 🔒 */

const GY_MUSIC = {
    ctx: null,
    isPlaying: false,
    
    // Матрица вероятностей Маркова для джазовой прогрессии II-V-I
    // Состояния: 0 (II ступень), 1 (V ступень), 2 (I ступень)
    markovChain: {
        0: [1, 1, 0],    // После II чаще идет V
        1: [2, 2, 0],    // После V чаще идет I, иногда возврат к II
        2: [0, 2, 1]     // После I можно начать заново или остаться в покое
    },
    currentState: 0,

    // Ноты для аккордов (Частоты в Гц)
    scales: {
        0: [293.66, 349.23, 440.00, 523.25], // Dm7 (II)
        1: [392.00, 493.88, 587.33, 698.46], // G7 (V)
        2: [261.63, 329.63, 392.00, 493.88]  // Cmaj7 (I)
    },

    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    // Главный цикл джазовой импровизации
    playJazzStep() {
        this.init();
        const t = this.ctx.currentTime;
        
        // 1. Выбираем следующий шаг по цепи Маркова
        const choices = this.markovChain[this.currentState];
        this.currentState = choices[Math.floor(Math.random() * choices.length)];
        
        // 2. Генерируем "Свинг" (неровный ритм: длинная-короткая)
        const isSwing = Math.random() > 0.5;
        const duration = isSwing ? 0.6 : 0.3;

        // 3. Играем аккорд (Пианино)
        this.scales[this.currentState].forEach(freq => {
            this.createPianoNote(freq, t, duration * 2);
        });

        // 4. Добавляем "Синкопу" (Случайная высокая нота саксофона "мимо" бита)
        if (Math.random() > 0.4) {
            const highNote = this.scales[this.currentState][Math.floor(Math.random()*4)] * 2;
            this.createSaxNote(highNote, t + 0.2, 0.4);
        }
    },

    createPianoNote(f, t, len) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.1, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + len);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(t); o.stop(t + len);
    },

    createSaxNote(f, t, len) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = f;
        g.gain.setValueAtTime(0.05, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + len);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(t); o.stop(t + len);
    }
};
