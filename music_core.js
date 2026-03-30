
/* MODULE: GY-GY Music Core
   VERSION: 3.0.0 (The Multi-Tool Orchestra)
   LOGIC: Hierarchical Markov Chains (Genre + Harmony + Rhythm)
*/

const GY_MUSIC = {
    ctx: null,
    currentGenre: 'JAZZ', // По умолчанию начинаем с джаза

    // МАРКОВСКИЙ ДИСПЕТЧЕР ЖАНРОВ
    genreMatrix: {
        'JAZZ': ['JAZZ', 'JAZZ', 'ROCK'], // В основном джаз, но может "сорваться" в рок
        'ROCK': ['ROCK', 'ROCK', 'JAZZ']  // В основном рок, но может остыть до джаза
    },

    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    // ЕДИНАЯ КНОПКА "СДЕЛАТЬ КРАСИВО"
    playNext(moodSeed = 1) {
        this.init();
        const t = this.ctx.currentTime;

        // 1. Марков решает, какой жанр играть сейчас
        const nextGenres = this.genreMatrix[this.currentGenre];
        this.currentGenre = nextGenres[Math.floor(Math.random() * nextGenres.length)];

        // 2. Раскладываем по полкам
        if (this.currentGenre === 'JAZZ') {
            this.playJazzNode(t);
        } else {
            this.playRockNode(t);
        }
        
        // 3. Всегда добавляем Бас (Фундамент)
        this.createBassLine(t);
    },

    // ПОЛКА ДЖАЗА
    playJazzNode(t) {
        const freq = [261.63, 329.63, 392.00][Math.floor(Math.random()*3)];
        this.synth(freq, t, 0.8, 'triangle'); // Мягкий звук
    },

    // ПОЛКА РОКА
    playRockNode(t) {
        const freq = [110, 164, 220][Math.floor(Math.random()*3)];
        this.synth(freq, t, 0.4, 'sawtooth'); // Грубый звук
    },

    // НИЖНЯЯ ПОЛКА (БАС)
    createBassLine(t) {
        const freq = 55; // Очень низкая Ля
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0.2, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(t); o.stop(t + 0.5);
    },

    synth(f, t, len, type) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0.1, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + len);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(t); o.stop(t + len);
    }
};
