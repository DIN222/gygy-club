
/* MODULE: GY-GY Music Core 
   VERSION: 4.1.0 (Emotional Dynamics) 
   LOGIC: Velocity Layers + Real-time Bi-Quad Filtering
*/

const GY_MUSIC = {
    // ... (загрузка сэмплов из v4.0.0) ...

    playWithEnergy(energy = 0.5) {
        const t = this.ctx.currentTime;
        
        // Создаем динамический фильтр (как в FL Studio)
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        // Если энергия низкая (0.1), звук будет глухим (500Hz)
        // Если высокая (1.0), звук будет ярким (5000Hz)
        filter.frequency.value = 500 + (energy * 4500); 
        filter.connect(this.ctx.destination);

        // Марков выбирает инструмент, но ГРОМКОСТЬ зависит от энергии
        const volume = 0.2 + (energy * 0.8);
        
        if (Math.random() < energy) {
            this.triggerSample('kick', t, volume, filter);
        }
        
        if (energy > 0.8) {
            // Если энергия зашкаливает, добавляем "грязный" рок-слой
            this.triggerSample('rock_guitar', t, volume, filter);
        }
    },

    triggerSample(name, time, vol, target) {
        const source = this.ctx.createBufferSource();
        source.buffer = this.buffers[name];
        const gain = this.ctx.createGain();
        gain.gain.value = vol;
        source.connect(gain);
        gain.connect(target); // Подключаем к фильтру, а не сразу в колонки
        source.start(time);
    }
};
