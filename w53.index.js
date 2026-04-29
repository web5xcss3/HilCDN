// =====================================================
// APP COMPONENTS (CORRIGIDO)
// =====================================================

// HEADER
function Header() {
    return `
    <header class="euro-header">
        <div class="grid">
            <figure class="euro-header-logo">
                <a href="#"><img src="https://cdn.jsdelivr.net/gh/web5xcss3/icons/eurodance_logo.svg" alt="Eurodance Logo"></a>
            </figure>
            <nav class="euro-header-nav">
                <ul>
                    ${NavItem("home","home","Home")}
                    ${NavItem("artists","artist","Artistas")}
                    ${NavItem("podcasts","album","Podcasts")}
                    ${NavItem("videos","videocam","Vídeos")}
                    ${NavItem("radio","equalizer","Radio")}
                    ${SearchButton()}
                    ${ThemeButton()}
                </ul>
            </nav>
        </div>
    </header>
    `;
}

function NavItem(tab, icon, label) {
    return `
    <li class="header-nav-items">
        <a href="#" data-tab="${tab}">
            <i class="icon material-symbols-outlined">${icon}</i>
            <span class="header-nav-items-label">${label}</span>
        </a>
    </li>
    `;
}

function SearchButton() {
    return `
    <li class="header-nav-items">
        <a href="#" id="openSearch">
            <i class="icon material-symbols-outlined">search</i>
            <span class="header-nav-items-label">Busca</span>
        </a>
    </li>
    `;
}

function ThemeButton() {
    return `
    <li class="header-nav-items">
        <a href="#" id="toggleThemeBtn">
            <i class="icon material-symbols-outlined" id="themeIcon">dark_mode</i>
            <span class="header-nav-items-label">Tema</span>
        </a>
    </li>
    `;
}

// SEARCH
function SearchBox() {
    return `
    <div class="euro-search" id="searchBox">
        <form class="grid" id="searchForm">
            <fieldset class="euro-search-content">
                <input type="search" class="euro-search-field" id="searchInput" placeholder="Digite o que deseja buscar..." required>
                <i class="euro-search-close-button material-symbols-outlined" id="closeSearch">cancel_presentation</i>
            </fieldset>
        </form>
    </div>
    `;
}

// CONTENT
function Content() {
    return `
    <main class="euro-content">
        <section id="home" class="tab-content active">
            <div id="homeArtists"></div>
            <div id="homePodcasts"></div>
        </section>
        <section id="artists" class="tab-content">
            <div id="artistsGrid"></div>
        </section>
        <section id="videos" class="tab-content">
            <div id="videosGrid"></div>
        </section>
        <section id="podcasts" class="tab-content">
            <div id="podcastsGrid"></div>
        </section>
        <section id="radio" class="tab-content">
            <h2 class="euro-title euro-title medium section-title">Rádio</h2>
        </section>
        <section id="search" class="tab-content">
            <div id="searchResults"></div>
        </section>
    </main>
    `;
}

// PLAYER
function Player() {
    return `
    <div id="player-bar" class="euro-player">
        <div class="grid">
            <div class="euro-player-info">
                <div class="euro-player-info-photo" id="playerImage"></div>
                <div class="euro-player-info-desc">
                    <h2 class="euro-title euro-player-info-desc-title" id="playerTitle">Player</h2>
                </div>
                <nav class="euro-player-nav">
                    <ul>
                        <li class="euro-player-nav-item icon-arrow-down material-symbols-outlined" id="togglePlayer">arrow_downward_alt</li>
                    </ul>
                </nav>
            </div>
            <div class="euro-player-embed" id="playerEmbed"></div>
        </div>
    </div>
    `;
}

// FOOTER
function Footer() {
    return `
    <footer class="euro-footer">
        <div class="grid">
            <div class="euro-footer-copyright euro-title">
                © 2001/2026 - Eurodance.com.br
            </div>
            <div class="euro-footer-we-love">
                <span class="euro-title euro-footer-we-love-title">Nós amamos:</span>
				<span class="euro-footer-we-love-items"><a href="http://www.lastfm.com.br/" target="_blank" class="icon fa-brands fa-lastfm"></a></span>
				<span class="euro-footer-we-love-items"><a href="http://soundcloud.com/" target="_blank" class="icon fa-brands fa-soundcloud"></a></span>
				<span class="euro-footer-we-love-items"><a href="http://www.youtube.com/" target="_blank" class="icon fa-brands fa-youtube"></a></span>
            </div>
        </div>
    </footer>
    `;
}

// ROOT APP
function App() {
    return `
        ${Header()}
        ${SearchBox()}
        ${Content()}
        ${Player()}
        ${Footer()}
    `;
}

// =====================================================
// 🎨 THEME SYSTEM (SUPER ROBUSTO)
// =====================================================

function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    
    // Limpa classes antigas
    document.body.classList.remove('theme-dark', 'theme-light');
    
    // Aplica tema salvo
    document.body.classList.add(`theme-${saved}`);
    
    // Sincroniza ícone
    updateThemeIcon();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    
    // Remove light se dark estiver ativo
    if (isDark) {
        document.body.classList.remove('theme-light');
    } else {
        document.body.classList.add('theme-light');
    }
    
    // Salva preferência
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Atualiza ícone
    updateThemeIcon();
}

function updateThemeIcon() {
    const $icon = $('#themeIcon');
    if ($icon.length) {
        $icon.text(document.body.classList.contains('theme-dark') ? 'light_mode' : 'dark_mode');
    }
}

// =====================================================
// 🎯 EVENTOS CENTRALIZADOS (SPA SAFE)
// =====================================================

function bindAppEvents() {
    // 🔸 Unbind primeiro (evita duplicações)
    $(document).off('click', '#toggleThemeBtn, #openSearch, #closeSearch, #togglePlayer, [data-tab]');
    
    // 🔸 Theme toggle
    $(document).on('click', '#toggleThemeBtn', function(e) {
        e.preventDefault();
        toggleTheme();
    });
    
    // 🔸 Search
    $(document).on('click', '#openSearch', function(e) {
        e.preventDefault();
        $('#searchBox').addClass('opened');
        $('#searchInput').focus();
    });
    
    $(document).on('click', '#closeSearch', function(e) {
        e.preventDefault();
        $('#searchBox').removeClass('opened');
        $('#searchInput').val('');
    });
    
    // 🔸 Player toggle
    $(document).on('click', '#togglePlayer', function(e) {
        e.preventDefault();
        $('#player-bar').toggleClass('showmore');
    });
    
    // 🔸 Tabs
    $(document).on('click', '[data-tab]', function(e) {
        e.preventDefault();
        const tab = $(this).data('tab');
        switchTab(tab);
    });
}

// =====================================================
// 🚀 INIT GLOBAL (ÚNICO E CENTRALIZADO)
// =====================================================

$(document).ready(function() {
    console.log('🚀 Eurodance App - Component System Inicializando...');
    
    // 1. Injeta app completo
    $("#app").html(App());
    
    // 2. Theme system
    initTheme();
    
    // 3. Bind eventos app
    bindAppEvents();
    
    // 4. Carrega conteúdo (suas funções existentes)
    if (typeof initTabs === 'function') initTabs();
    if (typeof initSearch === 'function') initSearch();
    if (typeof loadHome === 'function') loadHome();
    
    console.log('✅ App inicializado com sucesso!');
});

// =====================================================
// 🔄 EXPORTA FUNÇÕES PÚBLICAS
// =====================================================
window.App = App;
window.toggleTheme = toggleTheme;
window.initTheme = initTheme;
window.bindAppEvents = bindAppEvents;
