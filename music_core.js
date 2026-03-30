/* GY-GY MUSIC CORE v1.0 
   Универсальный модуль генерации звука.
   Подключается к любому блоку через: <script src="music_core.js"></script>
*/

const GY_MUSIC = {
    ctx: null,
    isPlaying: false,
    tempo: 120,
    
    // Инициализация (нужна после первого клика гостя по правилам браузеров)
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    // ГЕНЕРАТОР РОК-ВАЙБА (Тот самый запрос про 1000 песен)
    playRock(seed = "1234") {
        this.init();
        const t = this.ctx.currentTime;
        // Используем цифры Магического Ключа (seed) для вариаций ритма
        const shift = parseInt(seed[0]) / 10; 
        
        this.createKick(t);
        this.createSnare(t + 0.5 + shift);
        this.createPowerChord(440, t); // "Рык" гитары (ля-мажор)
    },

    // СИНТЕЗАТОРЫ (Чистая математика звука)
    createKick(t) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.5);
        gain.gain.setValueAtTime(1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(t); osc.stop(t + 0.5);
    },

    createPowerChord(freq, t) {
        // Дисторшн-эффект через наслоение "пилы"
        [freq, freq*1.5, freq*2].forEach(f => {
            const o = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            o.type = 'sawtooth';
            o.frequency.value = f;
            g.gain.setValueAtTime(0.05, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 1);
            o.connect(g); g.connect(this.ctx.destination);
            o.start(t); o.stop(t + 1);
        });
    },

    createSnare(t) {
        // Белый шум для эффекта барабана
        const bufferSize = this.ctx.sampleRate * 0.1;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass'; filter.frequency.value = 1000;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        noise.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
        noise.start(t);
    }
};
