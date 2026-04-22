// =====================================================
// CONFIG
// =====================================================
	const LASTFM_KEY = '4959ac7ccf2055437d47a70303cc0ee0';
	// const LASTFM_KEY = 'c193438e5e5bcd8687beb1b5ebe89bd3';
	const YOUTUBE_KEY = 'AIzaSyBaGigYcCmqoHVwc0nidjzpEsTO5PHOwy4';

// =====================================================
// INIT
// =====================================================
	$(document).ready(function() {

	    initTabs();
	    initSearch();

	    loadHome();

	});

// =====================================================
// TABS SYSTEM
// =====================================================
	function initTabs() {

	    $(document).on('click', '[data-tab]', function(e) {
	        e.preventDefault();

	        const tab = $(this).data('tab');
	        switchTab(tab);
	    });

	}

	function switchTab(tab) {

	    // esconde tudo
	    $('.tab-content').removeClass('active').hide();

	    // mostra só a atual
	    const $target = $('#' + tab);
	    $target.fadeIn(150).css('opacity', 0).animate({
	        opacity: 1
	    }, 200);

	    // carregar conteúdo (lazy load)
	    if (tab === 'artists' && !$target.data('loaded')) {
	        loadArtists();
	        $target.data('loaded', true);
	    }

	    if (tab === 'videos' && !$target.data('loaded')) {
	        loadVideos();
	        $target.data('loaded', true);
	    }

	    if (tab === 'podcasts' && !$target.data('loaded')) {
	        loadPodcasts();
	        $target.data('loaded', true);
	    }

	}

// =====================================================
// SEARCH
// =====================================================
	function initSearch() {

	    $('#openSearch').on('click', function() {
	        $('#searchBox').addClass('opened');
	        $('#searchInput').focus();
	    });

	    $('#closeSearch').on('click', function() {
	        $('#searchBox').removeClass('opened');
	    });

	    $('#searchForm').on('submit', function(e) {
	        e.preventDefault();

	        const query = $('#searchInput').val();
	        searchArtists(query);
	    });

	}

// =====================================================
// HOME
// =====================================================
	function loadHome() {
	    loadHomeArtists();
	    loadPodcasts();
	}

// =====================================================
// LAST.FM (ARTISTS) - VERSÃO CORRIGIDA 2024
// =====================================================

function loadHomeArtists() {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=eurodance&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {
            renderArtists(data.topartists.artist.slice(0, 8), '#homeArtists');
        })
        .catch(err => {
            console.error('Erro Last.fm:', err);
        });
}

function loadArtists() {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=eurodance&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {
            renderArtists(data.topartists.artist, '#artistsGrid');
        })
        .catch(err => {
            console.error('Erro Last.fm:', err);
        });
}

function searchMusicByArtist(name) {
    alert('🎧 Aqui você pode integrar SoundCloud depois para: ' + name);
}

function renderArtists(list, target) {
    const html = `
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Artistas</h2>

                <ul class="euro-list-data">
                    ${list.map(a => {
                        const name = a.name;
                        const slug = name.toLowerCase().replace(/\s+/g, '-');
                        // ✅ CORRIGIDO: Nova estrutura Last.fm 2024
                        const img = getArtistImage(a.image);

                        return `
                            <li class="euro-list-data-item">
                                <a href="#" class="artist-link" data-artist="${slug}">
                                    <div class="euro-list-data-photo"
                                         style="background-image: url('${img}')">
                                    </div>
                                </a>

                                <div class="euro-list-data-desc">
                                    <h2 class="euro-title small">
                                        <a href="#" class="artist-link" data-artist="${slug}">
                                            ${name}
                                        </a>
                                    </h2>

                                    <nav class="euro-list-data-options">
                                        <ul>
                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon artist-music material-symbols-outlined" data-artist="${slug}" title="Músicas">album</a>
                                            </li>
                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon artist-videos material-symbols-outlined" data-artist="${slug}" title="Vídeos">videocam</a>
                                            </li>
                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon artist-info material-symbols-outlined" data-artist="${slug}" title="Detalhes">article</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        </div>
    `;

    $(target).html(html);

    // ✅ EVENTOS DELEGADOS (melhor performance)
    bindArtistActions();
}

// 🔧 FUNÇÃO CRÍTICA: Extrai imagem correta do Last.fm
function getArtistImage(images) {
    if (!images || !Array.isArray(images)) return 'public/images/defaults/no_image.png';
    
    // ✅ Prioridades: mega -> extralarge -> large -> medium
    const sizes = ['mega', 'extralarge', 'large', 'medium'];
    
    for (let size of sizes) {
        const img = images.find(i => i.size === size);
        if (img && img['#text']) return img['#text'];
    }
    
    // Fallback para qualquer imagem disponível
    for (let img of images) {
        if (img['#text']) return img['#text'];
    }
    
    return 'public/images/defaults/no_image.png';
}

function loadArtistDetails(slug) {
    const artistName = slug.replace(/-/g, ' ');

    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {
            const artist = data.artist;

            const name = artist.name;
            // ✅ CORRIGIDO: Usa getArtistImage
            const image = getArtistImage(artist.image);
            const bio = artist.bio?.content || artist.bio?.summary || '';

            const html = `
                <!-- HEADER -->
                <header class="euro-artists-header">
                    <div class="grid">
                        <a href="#">
                            <div class="euro-artists-header-photo"
                                style="background-image: url('${image}')">
                            </div>
                        </a>

                        <div class="euro-artists-header-desc">
                            <h2 class="euro-title medium">${name}</h2>

                            <nav class="euro-artists-header-options">
                                <ul>
                                    <li class="euro-artists-header-options-item">
                                        <a href="#" class="icon artist-music material-symbols-outlined" data-artist="${slug}" title="Músicas">album</a>
                                    </li>
                                    <li class="euro-artists-header-options-item">
                                        <a href="#" class="icon artist-videos material-symbols-outlined" data-artist="${slug}" title="Vídeos">videocam</a>
                                    </li>
                                    <li class="euro-artists-header-options-item">
                                        <a href="#" class="icon artist-info material-symbols-outlined" data-artist="${slug}" title="Detalhes">article</a>
                                    </li>
                                    <li class="euro-artists-header-options-item">
                                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" class="icon fa-brands fa-facebook" target="_blank"></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

                <!-- BIO -->
                <section class="euro-artists-bio">
                    <div class="grid">
                        <p>${formatBio(bio)}</p>
                    </div>
                </section>

                <!-- RELATED -->
                <section id="relatedArtists"></section>
            `;

            $('#searchResults').html(html);
            switchTab('search');

            // carregar similares
            loadSimilarArtists(artist.similar?.artist || []);

            // eventos
            bindArtistActions();

        })
        .catch(err => {
            console.error('Erro detalhes artista:', err);
        });
}

function formatBio(text) {
    if (!text) return '';

    return text
        .replace(/<a.*?>.*?<\/a>/g, '') // remove links
        .replace(/\n/g, '<br>');
}

function loadSimilarArtists(list) {
    if (!list || list.length === 0) return;

    const html = `
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Artistas Relacionados</h2>

                <ul class="euro-list-data">
                    ${list.slice(0, 4).map(a => {
                        const slug = a.name.toLowerCase().replace(/\s+/g, '-');
                        // ✅ CORRIGIDO: Usa getArtistImage
                        const img = getArtistImage(a.image);

                        return `
                            <li class="euro-list-data-item">
                                <a href="#" class="artist-link" data-artist="${slug}">
                                    <div class="euro-list-data-photo"
                                        style="background-image: url('${img}')">
                                    </div>
                                </a>

                                <div class="euro-list-data-desc">
                                    <h2 class="euro-title small">
                                        <a href="#" class="artist-link" data-artist="${slug}">
                                            ${a.name}
                                        </a>
                                    </h2>

                                    <nav class="euro-list-data-options">
                                        <ul>
                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon artist-music material-symbols-outlined" data-artist="${slug}">album</a>
                                            </li>
                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon artist-videos material-symbols-outlined" data-artist="${slug}">videocam</a>
                                            </li>
                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon artist-info material-symbols-outlined" data-artist="${slug}">article</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        </div>
    `;

    $('#relatedArtists').html(html);
    bindArtistActions();
}

function bindArtistActions() {
    // ✅ EVENTOS DELEGADOS (funciona em elementos dinâmicos)
    $(document).off('click', '.artist-link, .artist-music, .artist-videos, .artist-info')
        .on('click', '.artist-link', function(e) {
            e.preventDefault();
            loadArtistDetails($(this).data('artist'));
        })
        .on('click', '.artist-music', function(e) {
            e.preventDefault();
            searchMusicByArtist($(this).data('artist'));
        })
        .on('click', '.artist-videos, .artist-info', function(e) {
            e.preventDefault();
            // Placeholder para futuras funcionalidades
            alert('Funcionalidade em desenvolvimento');
        });
}

// 🔄 Inicialização automática
$(document).ready(function() {
    loadHomeArtists();
    loadArtists();
});

// =====================================================
// 🎬 YOUTUBE (VIDEOS) - VERSÃO COMPLETA SPA READY
// =====================================================

// 🔹 Carregar vídeos (HOME / TAB)
function loadVideos() {

    fetch(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=eurodance&type=video&maxResults=12&key=${YOUTUBE_KEY}`)
        .then(res => res.json())
        .then(data => {

            if (!data.items) {
                console.warn('Nenhum vídeo encontrado');
                return;
            }

            renderVideos(data.items);

        })
        .catch(err => {
            console.error('Erro YouTube:', err);
        });

}

// 🔍 Buscar vídeos por artista
function searchVideosByArtist(name) {

    const query = name.replace(/-/g, ' ');

    fetch(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${query}&type=video&maxResults=12&key=${YOUTUBE_KEY}`)
        .then(res => res.json())
        .then(data => {

            renderVideos(data.items || []);
            switchTab('videos');

        })
        .catch(err => {
            console.error('Erro busca vídeos:', err);
        });

}

// 🎨 Renderizar vídeos
function renderVideos(videos) {

    // filtra só vídeos válidos
    const validVideos = videos.filter(v => v.id && v.id.videoId);

    if (validVideos.length === 0) {
        $('#videosGrid').html('<p>Nenhum vídeo disponível</p>');
        return;
    }

    const html = validVideos.map(v => {

        const id = v.id.videoId;
        const thumb = v.snippet?.thumbnails?.medium?.url || '';
        const title = v.snippet?.title || 'Sem título';

        return `
            <div class="card video-card" data-id="${id}">
                <img src="${thumb}" />
                <h4>${title}</h4>
            </div>
        `;
    }).join('');

    $('#videosGrid').html(html);
}

// ▶️ Player YouTube
function openPlayerYoutube(videoId) {

    if (!videoId) return;

    const embed = `
        <iframe width="100%" height="315"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
    `;

    $('#playerEmbed').html(embed);
    $('#playerTitle').text('YouTube Player');
    $('#player-bar').addClass('opened');
}

// =====================================================
// ⚡ EVENTO SPA (CLICK NOS VIDEOS)
// =====================================================

$(document).on('click', '.video-card', function() {
    const id = $(this).data('id');
    openPlayerYoutube(id);
});

// =====================================================
// MIXCLOUD (PODCASTS) - VERSÃO ROBUSTA 2024 (SEM DATA)
// =====================================================

// Lista de proxies confiáveis (prioridade alta -> baixa)
const PROXY_URLS = [
    'https://corsproxy.io/?',                    // ✅ Mais confiável
    'https://api.allorigins.win/raw?url=',       // ✅ Bom fallback
    'https://thingproxy.freeboard.io/fetch/',    // ✅ Backup
    'https://api.codetabs.com/v1/proxy/?quest=', // ✅ Último recurso
];

function loadPodcasts() {
    const user = 'Play90Music';
	// const user = 'djadriano';
    const mixcloudUrl = `https://api.mixcloud.com/${user}/cloudcasts/?limit=20`;
    
    console.log('🔄 Iniciando carregamento de podcasts...');
    
    tryNextProxy(0, mixcloudUrl);
}

function tryNextProxy(proxyIndex, mixcloudUrl) {
    if (proxyIndex >= PROXY_URLS.length) {
        console.error('❌ Todos os proxies falharam');
        showFallbackPodcasts();
        return;
    }
    
    const proxyUrl = PROXY_URLS[proxyIndex];
    console.log(`🔄 Tentando proxy ${proxyIndex + 1}/${PROXY_URLS.length}:`, proxyUrl);
    
    fetch(proxyUrl + encodeURIComponent(mixcloudUrl), {
        cache: 'no-cache'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.text();
    })
    .then(data => {
        const json = JSON.parse(data);
        console.log('✅ Podcasts carregados com sucesso!', json.data?.length || 0);
        
        // Cache local por 1 hora
        cachePodcasts(json);
        renderPodcasts(json.data || []);
    })
    .catch(err => {
        console.error(`❌ Proxy ${proxyIndex + 1} falhou:`, err.message);
        
        // Tenta próximo proxy após delay
        setTimeout(() => {
            tryNextProxy(proxyIndex + 1, mixcloudUrl);
        }, 300);
    });
}

function cachePodcasts(json) {
    const cacheKey = 'mixcloud_podcasts_cache';
    const cacheData = {
        data: json.data || [],
        timestamp: Date.now(),
        expires: Date.now() + (60 * 60 * 1000) // 1 hora
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
}

function getCachedPodcasts() {
    const cacheKey = 'mixcloud_podcasts_cache';
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        const cacheData = JSON.parse(cached);
        if (Date.now() < cacheData.expires && cacheData.data.length > 0) {
            console.log('📦 Usando cache local');
            return cacheData.data;
        }
    }
    return null;
}

function renderPodcasts(list) {
    if (!list || list.length === 0) {
        showFallbackPodcasts();
        return;
    }

    const html = `
        <div class="euro-artists-mixes modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">
                    Podcasts
                </h2>

                <ul class="euro-list-data">
                    ${list.slice(0, 12).map((p, index) => {
                        const img = p.pictures?.medium || 
                                   p.pictures?.sizes?.['320x320'] || 
                                   'public/images/defaults/no_image.png';
                        const plays = p.play_count || p.stats?.plays || 0;
                        const likes = p.favorite_count || p.stats?.likes || 0;

                        return `
                            <li class="euro-list-data-item align-top podcast-item-${index}">
                                <div class="euro-list-data-photo podcast-click"
                                     data-url="${p.url}"
                                     data-name="${p.name || ''}"
                                     data-img="${img}"
                                     style="background-image: url('${img}')">
                                </div>

                                <div class="euro-list-data-desc">
                                    <h2 class="euro-title small podcast-title">${p.name || 'Sem título'}</h2>

                                    <nav class="euro-list-data-options">
                                        <ul>
                                            <li class="euro-list-data-options-item">
                                                <i class="icon material-symbols-outlined">play_arrow</i>
                                                <b class="euro-list-data-options-item-counter">${plays.toLocaleString()}</b>
                                            </li>
                                            <li class="euro-list-data-options-item">
                                                <i class="material-symbols-outlined">favorite</i>
                                                <b class="euro-list-data-options-item-counter">${likes.toLocaleString()}</b>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        </div>
    `;

    // Renderiza em HOME e na aba podcasts
    $('#homePodcasts, #podcastsGrid').html(html);

    // EVENTO PLAYER DELEGADO (mais eficiente)
    $(document).off('click', '.podcast-click').on('click', '.podcast-click', function() {
        const url = $(this).data('url');
        const name = $(this).data('name') || $(this).closest('.podcast-item').find('.podcast-title').text().trim();
        const img = $(this).data('img');
        
        openPlayerMixcloud(url, {
            name: name,
            pictures: { medium: img }
        });
    });
}

function showFallbackPodcasts() {
    const cached = getCachedPodcasts();
    
    if (cached && cached.length > 0) {
        console.log('📦 Renderizando do cache');
        renderPodcasts(cached);
        return;
    }
    
    const fallbackHtml = `
        <div class="euro-artists-mixes modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">
                    Podcasts
                </h2>
                <div style="padding: 3rem; text-align: center; color: #888; font-size: 1.1rem;">
                    🔄 Carregando podcasts...<br>
                    <small>Conexão instável - tente novamente em alguns segundos</small>
                    <button class="btn-retry" onclick="loadPodcasts()" style="margin-top: 1rem; padding: 0.5rem 2rem;">
                        🔄 Tentar Novamente
                    </button>
                </div>
            </div>
        </div>
    `;
    
    $('#homePodcasts, #podcastsGrid').html(fallbackHtml);
}

// PLAYER MIXCLOUD ROBUSTO
function openPlayerMixcloud(url, data = {}) {
    console.log('🎵 Abrindo player:', url);
    
    // Cache primeiro
    const cacheKey = 'mixcloud_player_' + url.split('/').pop();
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        try {
            const json = JSON.parse(cached);
            renderPlayer(json, data);
            return;
        } catch(e) {
            console.warn('Cache inválido, recarregando...');
        }
    }
    
    // Tenta múltiplos endpoints OEmbed
    const oembedUrls = [
        `https://www.mixcloud.com/oembed/?format=json&url=${encodeURIComponent(url)}`,
        `https://api.mixcloud.com/${url.split('/').pop()}/#oembed`
    ];
    
    tryOembedProxy(0, oembedUrls[0], data, cacheKey);
}

function tryOembedProxy(index, oembedUrl, data, cacheKey) {
    const proxyUrls = [
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy/?quest=',
        'https://api.allorigins.win/raw?url='
    ];
    
    if (index >= proxyUrls.length) {
        renderIframeFallback(data);
        return;
    }
    
    fetch(proxyUrls[index] + encodeURIComponent(oembedUrl))
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    })
    .then(json => {
        // Cache por 24h
        localStorage.setItem(cacheKey, JSON.stringify(json));
        renderPlayer(json, data);
    })
    .catch(err => {
        console.error(`Oembed proxy ${index + 1} falhou:`, err);
        tryOembedProxy(index + 1, oembedUrl, data, cacheKey);
    });
}

function renderPlayer(json, data) {
    let embed = json.html || '';
    
    // Correções essenciais
    embed = embed.replace(/src="\/\//g, 'src="https://');
    embed = embed.replace(/width="100\%"/, 'width="100%"');
    embed = embed.replace(/height="450"/, 'height="400"');
    
    $('#playerEmbed').html(embed);
    $('#playerTitle').text(data.name || json.title || 'Podcast');
    
    const img = data.pictures?.medium || 
                json.thumbnail_url || 
                json.thumbnail_url_with_play_button ||
                'public/images/defaults/no_image.png';
    
    $('#playerImage').css('background-image', `url('${img}')`);
    $('#player-bar').addClass('opened');
    
    console.log('✅ Player renderizado!');
}

function renderIframeFallback(data) {
    const iframe = `
        <iframe width="100%" 
                height="400" 
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(data.url || '')}"
                frameborder="0" 
                allowfullscreen>
        </iframe>
    `;
    
    $('#playerEmbed').html(iframe);
    $('#playerTitle').text(data.name || 'Podcast');
    $('#playerImage').css('background-image', `url('${data.pictures?.medium || 'public/images/defaults/no_image.png'}')`);
    $('#player-bar').addClass('opened');
    
    console.log('Fallback iframe renderizado');
}

// Inicialização automática + botão retry global
$(document).ready(function() {
    // Tenta cache primeiro
    const cached = getCachedPodcasts();
    if (cached) {
        renderPodcasts(cached);
    } else {
        loadPodcasts();
    }
    
    // Auto-reload a cada 30min
    setInterval(() => {
        if (!$('#player-bar').hasClass('opened')) {
            loadPodcasts();
        }
    }, 30 * 60 * 1000);
});

// Função pública para reload manual
window.reloadPodcasts = loadPodcasts;

// =====================================================
// SEARCH
// =====================================================
	function searchArtists(query) {

	    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${LASTFM_KEY}&format=json`)
	        .then(res => res.json())
	        .then(data => {

	            const list = data.results.artistmatches.artist;
	            renderArtists(list, '#searchResults');

	            switchTab('search');

	        });

	}

// =====================================================
// PLAYER TOGGLE
// =====================================================
	$(document).on('click', '#togglePlayer', function(e) {
		e.preventDefault();
		$('#player-bar').toggleClass('showmore');
	});
