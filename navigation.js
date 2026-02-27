// NAVIGATION MODULE v.4.7.3 for gygy-club
(function() {
    "use strict";

    // 1. СТРУКТУРА (HTML)
    const navHTML = `
        <div id="nav-trigger" onclick="toggleNav()">N</div>
        <div id="global-nav" onclick="if(event.target === this) toggleNav()">
            <div class="nav-panel">
                <div class="nav-label">Identity Trace</div>
                <div id="hub-id" style="font-family: 'Share Tech Mono', monospace; font-size: 20px; color: #fff; margin-bottom: 30px;">#SCANNING</div>
                
                <div class="nav-label">Current Node</div>
                <div id="hub-loc" style="color: #fff; font-size: 14px; margin-bottom: 30px;">LOC: UNKNOWN</div>
                
                <div class="nav-label">Language / Язык</div>
                <div class="lang-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 30px;">
                    <div class="lang-btn" style="border: 1px solid rgba(212, 175, 55, 0.3); padding: 8px; font-size: 10px; text-align: center; cursor: pointer; color: #d4af37;" onclick="setLang('ru')">RU</div>
                    <div class="lang-btn" style="border: 1px solid rgba(212, 175, 55, 0.3); padding: 8px; font-size: 10px; text-align: center; cursor: pointer; color: #d4af37;" onclick="setLang('en')">EN</div>
                </div>

                <button class="btn-gold" style="width: 100%; margin-top: auto; background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 12px; cursor: pointer; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;" onclick="copyLink()">INVITE MEMBER</button>
            </div>
        </div>
    `;

    // 2. СТИЛИ (CSS)
    const navStyle = `
        #nav-trigger { position: fixed; top: 30px; right: 30px; width: 45px; height: 45px; border: 1px solid #d4af37; border-radius: 50%; z-index: 2000; display: flex; align-items: center; justify-content: center; cursor: pointer; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); color: #d4af37; font-family: 'Share Tech Mono', monospace; font-size: 20px; transition: 0.5s ease; }
        #nav-trigger:hover { background: #d4af37; color: #000; box-shadow: 0 0 15px rgba(212, 175, 55, 0.5); }
        #global-nav { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1999; opacity: 0; visibility: hidden; transition: 0.5s ease; display: flex; justify-content: flex-end; }
        #global-nav.open { opacity: 1; visibility: visible; }
        .nav-panel { width: 300px; height: 100%; background: rgba(0, 10, 15, 0.9); backdrop-filter: blur(20px); border-left: 1px solid rgba(212, 175, 55, 0.2); padding: 60px 30px; display: flex; flex-direction: column; transform: translateX(100%); transition: 0.5s cubic-bezier(0.1, 0.7, 0.1, 1); }
        #global-nav.open .nav-panel { transform: translateX(0); }
        .nav-label { font-size: 10px; letter-spacing: 2px; opacity: 0.5; text-transform: uppercase; margin-bottom: 10px; color: #d4af37; }
    `;

    // 3. ФУНКЦИИ (Привязаны к window для доступа из HTML)
    window.toggleNav = function() {
        document.getElementById('global-nav').classList.toggle('open');
    };

    window.setLang = function(l) {
        localStorage.setItem('selected_lang', l);
        location.reload(); 
    };

    window.copyLink = function() {
        navigator.clipboard.writeText(window.location.href);
        alert("ID Trace channel copied.");
    };

    // 4. ИНИЦИАЛИЗАЦИЯ
    document.addEventListener('DOMContentLoaded', () => {
        // Внедряем стили
        const styleSheet = document.createElement("style");
        styleSheet.innerText = navStyle;
        document.head.appendChild(styleSheet);

        // Внедряем HTML
        document.body.insertAdjacentHTML('beforeend', navHTML);
        
        // Обновляем ID из памяти (Digital Trace)
        const savedID = localStorage.getItem('trace_id') || '#GUEST';
        const idElement = document.getElementById('hub-id');
        if (idElement) idElement.innerText = savedID;
        
        // Определяем текущую локацию
        const path = window.location.pathname;
        let locName = "ENTRANCE";
        if (path.includes('hall')) locName = "HALL";
        const locElement = document.getElementById('hub-loc');
        if (locElement) locElement.innerText = 'LOC: ' + locName;
    });
})();
