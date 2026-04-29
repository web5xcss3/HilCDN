// =====================================================
// CONFIG
// =====================================================
const LASTFM_KEY = '4959ac7ccf2055437d47a70303cc0ee0';
const API_URL = 'https://eurodance-api.onrender.com/youtube';
const PROXY_URLS = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/',
    'https://api.codetabs.com/v1/proxy/?quest='
];

// =====================================================
// INIT (ÚNICO E CENTRALIZADO)
// =====================================================
$(document).ready(function() {
    console.log('🚀 Eurodance App Inicializando...');
    
    // Remove todos os event handlers antigos
    unbindAllEvents();
    
    // Inicializa sistemas
    initTabs();
    initSearch();
    initPlayer();
    
    // Carrega home (com cache)
    loadHome();
    
    console.log('✅ Inicialização completa!');
});

// =====================================================
// EVENT CLEANUP (EVITA DUPLICAÇÕES)
// =====================================================
function unbindAllEvents() {
    $(document).off('click', '[data-tab], .artist-link, .artist-music, .artist-videos, .artist-info, .video-link, .play-video, .podcast-click, #togglePlayer, #openSearch, #closeSearch');
}

// =====================================================
// TABS SYSTEM (CORRIGIDO)
// =====================================================
function initTabs() {
    $(document).on('click', '[data-tab]', function(e) {
        e.preventDefault();
        const tab = $(this).data('tab');
        switchTab(tab);
    });
}

function switchTab(tab) {
    // Limpa tab ativa
    $('.tab-content').removeClass('active').hide();
    
    // Mostra target com transição suave
    const $target = $('#' + tab);
    $target.show().addClass('active');
    
    // Lazy load
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
// SEARCH SYSTEM (CORRIGIDO)
// =====================================================
function initSearch() {
    $('#openSearch').on('click', function() {
        $('#searchBox').addClass('opened');
        $('#searchInput').focus();
    });

    $('#closeSearch').on('click', function() {
        $('#searchBox').removeClass('opened');
        $('#searchInput').val('');
    });

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        const query = $('#searchInput').val().trim();
        if (query) {
            searchArtists(query);
        }
    });
}

// =====================================================
// HOME SYSTEM (OTIMIZADO)
// =====================================================
function loadHome() {
    loadHomeArtists();
    loadPodcasts(); // Já verifica cache internamente
}

// =====================================================
// LAST.FM ARTISTS (ROBUSTO)
// =====================================================
function loadHomeArtists() {
    fetchLastfm('tag.gettopartists', { tag: 'eurodance' })
        .then(data => renderArtists(data.topartists.artist.slice(0, 8), '#homeArtists'))
        .catch(err => console.error('Erro Home Artists:', err));
}

function loadArtists() {
    fetchLastfm('tag.gettopartists', { tag: 'eurodance' })
        .then(data => renderArtists(data.topartists.artist, '#artistsGrid'))
        .catch(err => console.error('Erro Artists:', err));
}

function searchArtists(query) {
    fetchLastfm('artist.search', { artist: query })
        .then(data => {
            const list = data.results.artistmatches.artist || [];
            renderArtists(list.slice(0, 20), '#searchResults');
            switchTab('search');
        })
        .catch(err => {
            console.error('Erro Search:', err);
            $('#searchResults').html('<h2 class="euro-title medium section-title">Nenhum artista encontrado</h2>');
        });
}

// Wrapper universal Last.fm
function fetchLastfm(method, params = {}) {
    const url = new URLSearchParams({
        method,
        api_key: LASTFM_KEY,
        format: 'json',
        ...params
    });
    
    return fetch(`https://ws.audioscrobbler.com/2.0/?${url}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        });
}

function getArtistImage(images) {
    if (!images || !Array.isArray(images)) {
        return 'public/images/defaults/no_image.png';
    }
    
    const sizes = ['mega', 'extralarge', 'large', 'medium'];
    for (let size of sizes) {
        const img = images.find(i => i.size === size);
        if (img && img['#text']) return img['#text'];
    }
    
    for (let img of images) {
        if (img['#text']) return img['#text'];
    }
    
    return 'public/images/defaults/no_image.png';
}

function renderArtists(list, target) {
    if (!list || list.length === 0) {
        $(target).html('<h2 class="euro-title medium section-title">Nenhum artista encontrado</h2>');
        return;
    }
    
    const html = list.map(a => {
        const name = a.name;
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        const img = getArtistImage(a.image);
        
        return `
            <li class="euro-list-data-item">
                <a href="#" class="artist-link" data-artist="${slug}">
                    <div class="euro-list-data-photo" style="background-image: url('${img}')"></div>
                </a>
                <div class="euro-list-data-desc">
                    <h2 class="euro-title small">
                        <a href="#" class="artist-link" data-artist="${slug}">${name}</a>
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
    }).join('');
    
    const container = `
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Artistas</h2>
                <ul class="euro-list-data">${html}</ul>
            </div>
        </div>
    `;
    
    $(target).html(container);
    bindArtistActions();
}

function loadArtistDetails(slug) {
    const artistName = slug.replace(/-/g, ' ');
    
    fetchLastfm('artist.getinfo', { artist: artistName })
        .then(data => {
            const artist = data.artist;
            const name = artist.name;
            const image = getArtistImage(artist.image);
            const bio = artist.bio?.content || artist.bio?.summary || '';
            
            const html = `
                <header class="euro-artists-header">
                    <div class="grid">
                        <a href="#"><div class="euro-artists-header-photo" style="background-image: url('${image}')"></div></a>
                        <div class="euro-artists-header-desc">
                            <h2 class="euro-title medium">${name}</h2>
                            <nav class="euro-artists-header-options">
                                <ul>
                                    <li class="euro-artists-header-options-item"><a href="#" class="icon artist-music material-symbols-outlined" data-artist="${slug}">album</a></li>
                                    <li class="euro-artists-header-options-item"><a href="#" class="icon artist-videos material-symbols-outlined" data-artist="${slug}">videocam</a></li>
                                    <li class="euro-artists-header-options-item"><a href="#" class="icon artist-info material-symbols-outlined" data-artist="${slug}">article</a></li>
                                    <li class="euro-artists-header-options-item"><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" class="icon fa-brands fa-facebook" target="_blank"></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
                <section class="euro-artists-bio">
                    <div class="grid">
                        <p>${formatBio(bio)}</p>
                    </div>
                </section>
                <section id="relatedArtists"></section>
            `;
            
            $('#searchResults').html(html);
            switchTab('search');
            
            if (artist.similar?.artist) {
                loadSimilarArtists(artist.similar.artist);
            }
            
            bindArtistActions();
        })
        .catch(err => {
            console.error('Erro detalhes:', err);
            alert('Artista não encontrado');
        });
}

function formatBio(text) {
    return text
        .replace(/<a.*?>.*?<\/a>/g, '')
        .replace(/\n/g, '<br>')
        .substring(0, 1000);
}

function loadSimilarArtists(list) {
    if (!list?.length) return;
    
    const html = list.slice(0, 4).map(a => {
        const slug = a.name.toLowerCase().replace(/\s+/g, '-');
        const img = getArtistImage(a.image);
        return `
            <li class="euro-list-data-item">
                <a href="#" class="artist-link" data-artist="${slug}">
                    <div class="euro-list-data-photo" style="background-image: url('${img}')"></div>
                </a>
                <div class="euro-list-data-desc">
                    <h2 class="euro-title small">
                        <a href="#" class="artist-link" data-artist="${slug}">${a.name}</a>
                    </h2>
                    <nav class="euro-list-data-options">
                        <ul>
                            <li class="euro-list-data-options-item"><a href="#" class="icon artist-music material-symbols-outlined" data-artist="${slug}">album</a></li>
                            <li class="euro-list-data-options-item"><a href="#" class="icon artist-videos material-symbols-outlined" data-artist="${slug}">videocam</a></li>
                            <li class="euro-list-data-options-item"><a href="#" class="icon artist-info material-symbols-outlined" data-artist="${slug}">article</a></li>
                        </ul>
                    </nav>
                </div>
            </li>
        `;
    }).join('');
    
    $('#relatedArtists').html(`
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Artistas Relacionados</h2>
                <ul class="euro-list-data">${html}</ul>
            </div>
        </div>
    `);
    bindArtistActions();
}

// =====================================================
// ARTIST ACTIONS (CENTRALIZADO)
// =====================================================
function bindArtistActions() {
    $(document).on('click', '.artist-link', function(e) {
        e.preventDefault();
        loadArtistDetails($(this).data('artist'));
    }).on('click', '.artist-music', function(e) {
        e.preventDefault();
        const name = $(this).data('artist').replace(/-/g, ' ');
        searchTracksByArtist(name);
    }).on('click', '.artist-videos', function(e) {
        e.preventDefault();
        const name = $(this).data('artist').replace(/-/g, ' ');
        searchVideosByArtist(name);
    }).on('click', '.artist-info', function(e) {
        e.preventDefault();
        loadArtistDetails($(this).data('artist'));
    });
}

// =====================================================
// TRACKS (Last.fm)
// =====================================================
function searchTracksByArtist(name) {
    fetchLastfm('artist.gettoptracks', { artist: name, limit: 12 })
        .then(data => {
            const tracks = data.toptracks?.track || [];
            renderTracks(tracks, name);
            switchTab('search');
        })
        .catch(err => {
            console.error(err);
            $('#searchResults').html('<h2 class="euro-title medium section-title">Erro ao carregar músicas</h2>');
        });
}

function renderTracks(tracks, artistName) {
    if (!tracks.length) {
        $('#searchResults').html('<h2 class="euro-title medium section-title">Nenhuma música encontrada</h2>');
        return;
    }
    
    const html = tracks.map(t => {
        const title = t.name;
        const artist = t.artist?.name || artistName;
        return `
            <li class="euro-list-data-item">
                <div class="euro-list-data-photo" style="background-image: url('https://i.ibb.co/39DXFZKM/no-image.png')"></div>
                <div class="euro-list-data-desc">
                    <h2 class="euro-title small">${title}</h2>
                    <p>${artist}</p>
                </div>
            </li>
        `;
    }).join('');
    
    $('#searchResults').html(`
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Músicas de ${artistName}</h2>
                <ul class="euro-list-data">${html}</ul>
            </div>
        </div>
    `);
}

// =====================================================
// YOUTUBE VIDEOS
// =====================================================
function loadVideos() {
    fetch(`${API_URL}?q=eurodance`)
        .then(res => res.json())
        .then(data => renderVideos(data.items || []))
        .catch(err => {
            console.error('Erro Videos:', err);
            $('#videosGrid').html('<h2 class="euro-title medium section-title">Erro ao carregar vídeos</h2>');
        });
}

function searchVideosByArtist(name) {
    const query = `${name} official music video eurodance -live -remix`;
    fetch(`${API_URL}?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            renderVideos(data.items || []);
            switchTab('videos');
        })
        .catch(err => console.error(err));
}

function renderVideos(videos) {
    if (!videos?.length) {
        $('#videosGrid').html('<h2 class="euro-title medium section-title">Nenhum vídeo disponível</h2>');
        return;
    }
    
    const html = videos
        .filter(v => v.id?.videoId)
        .map(v => {
            const id = v.id.videoId;
            const title = v.snippet?.title || 'Sem título';
            const channel = v.snippet?.channelTitle || '';
            const thumb = v.snippet?.thumbnails?.medium?.url || '';
            
            return `
                <li class="euro-list-data-item" data-id="${id}" data-title="${title.replace(/"/g, '&quot;')}" data-thumb="${thumb}">
                    <a href="#" class="video-link">
                        <div class="euro-list-data-photo" style="background-image: url('${thumb}')"></div>
                    </a>
                    <div class="euro-list-data-desc">
                        <h2 class="euro-title small">
                            <a href="#" class="video-link">${title}</a>
                        </h2>
                    </div>
                </li>
            `;
        }).join('');
    
    $('#videosGrid').html(`
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Vídeos</h2>
                <ul class="euro-list-data">${html}</ul>
            </div>
        </div>
    `);
}

// =====================================================
// PLAYER SYSTEM (CENTRALIZADO)
// =====================================================
function initPlayer() {
    $(document)
        .on('click', '.video-link', function(e) {
            e.preventDefault();
            const $item = $(this).closest('.euro-list-data-item');
            openPlayerYoutube($item.data('id'), $item.data('title'), $item.data('thumb'));
        })
        .on('click', '.play-video', function(e) {
            e.preventDefault();
            openPlayerYoutube($(this).data('id'));
        })
        .on('click', '.podcast-click', function() {
            openPlayerMixcloud($(this).data('url'), {
                name: $(this).data('name'),
                pictures: { medium: $(this).data('img') }
            });
        })
        .on('click', '#togglePlayer', function(e) {
            e.preventDefault();
            $('#player-bar').toggleClass('showmore');
        });
}

function openPlayerYoutube(videoId, title = '', thumb = '') {
    const thumbnail = thumb || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    
    $('#playerImage').css('background-image', `url('${thumbnail}')`);
    $('#playerTitle').text(title || 'YouTube Player');
    $('#playerEmbed').html(`
        <iframe width="100%" height="315"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
    `);
    $('#player-bar').addClass('opened');
}

// =====================================================
// MIXCLOUD PODCASTS (SUPER ROBUSTO)
// =====================================================
function loadPodcasts() {
    // 1. Tenta cache primeiro
    const cached = getCachedPodcasts();
    if (cached) {
        renderPodcasts(cached);
        return;
    }
    
    // 2. Tenta API
    const user = 'Play90Music';
    const mixcloudUrl = `https://api.mixcloud.com/${user}/cloudcasts/?limit=20`;
    
    tryNextProxy(0, mixcloudUrl);
}

function tryNextProxy(proxyIndex, mixcloudUrl) {
    if (proxyIndex >= PROXY_URLS.length) {
        console.error('❌ Todos proxies falharam');
        showFallbackPodcasts();
        return;
    }
    
    const proxyUrl = PROXY_URLS[proxyIndex];
    console.log(`🔄 Proxy ${proxyIndex + 1}/${PROXY_URLS.length}`);
    
    fetch(proxyUrl + encodeURIComponent(mixcloudUrl), { cache: 'no-cache' })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(json => {
            cachePodcasts(json);
            renderPodcasts(json.data || []);
        })
        .catch(err => {
            console.error(`❌ Proxy ${proxyIndex + 1}:`, err.message);
            setTimeout(() => tryNextProxy(proxyIndex + 1, mixcloudUrl), 300);
        });
}

function getCachedPodcasts() {
    try {
        const cacheKey = 'mixcloud_podcasts_cache';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { data, expires } = JSON.parse(cached);
            if (Date.now() < expires && data?.length) {
                return data;
            }
        }
    } catch (e) {
        console.warn('Cache inválido');
    }
    return null;
}

function cachePodcasts(json) {
    const cacheData = {
        data: json.data || [],
        timestamp: Date.now(),
        expires: Date.now() + (60 * 60 * 1000) // 1h
    };
    localStorage.setItem('mixcloud_podcasts_cache', JSON.stringify(cacheData));
}

function renderPodcasts(list) {
    if (!list?.length) {
        showFallbackPodcasts();
        return;
    }
    
    const html = list.slice(0, 12).map(p => {
        const img = p.pictures?.medium || p.pictures?.sizes?.['320x320'] || 'public/images/defaults/no_image.png';
        const plays = p.play_count || p.stats?.plays || 0;
        const likes = p.favorite_count || p.stats?.likes || 0;
        
        return `
            <li class="euro-list-data-item">
                <div class="euro-list-data-photo podcast-click"
                     data-url="${p.url}"
                     data-name="${(p.name || '').replace(/"/g, '&quot;')}"
                     data-img="${img}"
                     style="background-image: url('${img}')">
                </div>
                <div class="euro-list-data-desc">
                    <h2 class="euro-title small podcast-title">${p.name || 'Sem título'}</h2>
                    <nav class="euro-list-data-options">
                        <ul>
                            <li class="euro-list-data-options-item">
                                <i class="icon material-symbols-outlined">play_arrow</i>
                                <b>${plays.toLocaleString()}</b>
                            </li>
                            <li class="euro-list-data-options-item">
                                <i class="material-symbols-outlined">favorite</i>
                                <b>${likes.toLocaleString()}</b>
                            </li>
                        </ul>
                    </nav>
                </div>
            </li>
        `;
    }).join('');
    
    const container = `
        <div class="euro-artists-mixes modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Podcasts</h2>
                <ul class="euro-list-data">${html}</ul>
            </div>
        </div>
    `;
    
    $('#homePodcasts, #podcastsGrid').html(container);
}

function showFallbackPodcasts() {
    const html = `
        <div class="euro-artists-mixes modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Podcasts</h2>
                <div style="padding: 3rem; text-align: center; color: #888; font-size: 1.1rem;">
                    🔄 Carregando podcasts...<br>
                    <small>Conexão instável</small><br>
                    <button class="btn-retry btn" onclick="loadPodcasts()" style="margin-top: 1rem;">
                        🔄 Tentar Novamente
                    </button>
                </div>
            </div>
        </div>
    `;
    $('#homePodcasts, #podcastsGrid').html(html);
}

function openPlayerMixcloud(url, data = {}) {
    const cacheKey = 'mixcloud_player_' + url.split('/').pop();
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        try {
            renderPlayer(JSON.parse(cached), data);
            return;
        } catch (e) {
            console.warn('Cache inválido');
        }
    }
    
    const oembedUrl = `https://www.mixcloud.com/oembed/?format=json&url=${encodeURIComponent(url)}`;
    tryOembedProxy(0, oembedUrl, data, cacheKey);
}

function tryOembedProxy(index, oembedUrl, data, cacheKey) {
    const proxies = ['https://corsproxy.io/?', 'https://api.codetabs.com/v1/proxy/?quest=', 'https://api.allorigins.win/raw?url='];
    
    if (index >= proxies.length) {
        renderIframeFallback(data);
        return;
    }
    
    fetch(proxies[index] + encodeURIComponent(oembedUrl))
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(json => {
            localStorage.setItem(cacheKey, JSON.stringify(json));
            renderPlayer(json, data);
        })
        .catch(() => tryOembedProxy(index + 1, oembedUrl, data, cacheKey));
}

function renderPlayer(json, data) {
    let embed = json.html || '';
    embed = embed.replace(/src="\/\//g, 'src="https://');
    embed = embed.replace(/width="100\%"/, 'width="100%"');
    embed = embed.replace(/height="450"/, 'height="400"');
    
    $('#playerEmbed').html(embed);
    $('#playerTitle').text(data.name || json.title || 'Podcast');
    $('#playerImage').css('background-image', `url('${data.pictures?.medium || json.thumbnail_url || 'public/images/defaults/no_image.png'}')`);
    $('#player-bar').addClass('opened');
}

function renderIframeFallback(data) {
    const iframe = `
        <iframe width="100%" height="400" 
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(data.url || '')}"
            frameborder="0" allowfullscreen>
        </iframe>
    `;
    $('#playerEmbed').html(iframe);
    $('#playerTitle').text(data.name || 'Podcast');
    $('#playerImage').css('background-image', `url('${data.pictures?.medium || 'public/images/defaults/no_image.png'}')`);
    $('#player-bar').addClass('opened');
}

// =====================================================
// AUTO-RELOAD (BG)
// =====================================================
setInterval(() => {
    if (!$('#player-bar').hasClass('opened')) {
        loadPodcasts();
    }
}, 30 * 60 * 1000);

// Função pública
window.reloadPodcasts = loadPodcasts;
window.loadPodcasts = loadPodcasts;
