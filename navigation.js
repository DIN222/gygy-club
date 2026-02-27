// NAVIGATION MODULE v.4.7.3 | Global Edition (Google Translate)
(function() {
    "use strict";

    // 1. СТРУКТУРА (HTML)
    const navHTML = `
        <div id="nav-trigger" onclick="toggleNav()">N</div>
        <div id="global-nav" onclick="if(event.target === this) toggleNav()">
            <div class="nav-panel">
                <div class="nav-label">Identity Trace</div>
                <div id="hub-id" style="font-family: 'Share Tech Mono', monospace; font-size: 18px; color: #fff; margin-bottom: 30px;">#SCANNING</div>
                
                <div class="nav-label">Current Node</div>
                <div id="hub-loc" style="color: #fff; font-size: 14px; margin-bottom: 30px;">LOC: UNKNOWN</div>
                
                <div class="nav-label">Language / Перевод</div>
                <div id="google_translate_element" style="margin-bottom: 30px;"></div>

                <button class="btn-gold" style="width: 100%; margin-top: auto; background: transparent; border: 1px solid #d4af37; color: #d4af37; padding: 12px; cursor: pointer; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;" onclick="copyLink()">INVITE MEMBER</button>
            </div>
        </div>
    `;

    // 2. СТИЛИ (CSS)
    const navStyle = `
        #nav-trigger { position: fixed; top: 30px; right: 30px; width: 45px; height: 45px; border: 1px solid #d4af37; border-radius: 50%; z-index: 2000; display: flex; align-items: center; justify-content: center; cursor: pointer; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); color: #d4af37; font-family: 'Share Tech Mono', monospace; font-size: 20px; transition: 0.5s; }
        #global-nav { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1999; opacity: 0; visibility: hidden; transition: 0.6s; display: flex; justify-content: flex-end; }
        #global-nav.open { opacity: 1; visibility: visible; }
        .nav-panel { width: 300px; height: 100%; background: rgba(0, 10, 15, 0.95); backdrop-filter: blur(25px); border-left: 1px solid rgba(212, 175, 55, 0.2); padding: 60px 30px; display: flex; flex-direction: column; transform: translateX(100%); transition: 0.6s cubic-bezier(0.1, 0.7, 0.1, 1); }
        #global-nav.open .nav-panel { transform: translateX(0); }
        .nav-label { font-size: 10px; letter-spacing: 2px; opacity: 0.5; text-transform: uppercase; margin-bottom: 10px; color: #d4af37; }
        
        /* Фикс Google Translate: скрываем фрейм и настраиваем выпадающий список */
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-te-gadget-simple { background-color: transparent !important; border: 1px solid rgba(212, 175, 55, 0.3) !important; padding: 8px !important; border-radius: 4px !important; }
        .goog-te-gadget-simple a { color: #d4af37 !important; font-size: 12px !important; text-decoration: none !important; }
    `;

    // 3. ГЛОБАЛЬНЫЕ ФУНКЦИИ
    window.toggleNav = function() {
        document.getElementById('global-nav').classList.toggle('open');
    };

    window.copyLink = function() {
        navigator.clipboard.writeText(window.location.href);
        alert("Invite link copied.");
    };

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'ru',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    // 4. ИНИЦИАЛИЗАЦИЯ
    document.addEventListener('DOMContentLoaded', () => {
        // Добавляем стили
        const styleSheet = document.createElement("style");
        styleSheet.innerText = navStyle;
        document.head.appendChild(styleSheet);

        // Добавляем HTML
        document.body.insertAdjacentHTML('beforeend', navHTML);
        
        // Загружаем скрипт Google
        const gtScript = document.createElement('script');
        gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(gtScript);

        // Обновляем данные (ID и Локация)
        const savedID = localStorage.getItem('trace_id') || '#GUEST';
        document.getElementById('hub-id').innerText = savedID;
        
        const path = window.location.pathname;
        const locName = path.includes('hall') ? 'HALL' : 'ENTRANCE';
        document.getElementById('hub-loc').innerText = 'LOC: ' + locName;
    });
})();
