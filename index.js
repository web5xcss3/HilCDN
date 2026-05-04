// =====================================================
// CONFIG
// =====================================================
const LASTFM_KEY = '4959ac7ccf2055437d47a70303cc0ee0';

// =====================================================
// INIT
// =====================================================
$(document).ready(function() {
    initTabs();
    initSearch();
    
    // ✅ Carrega tudo de uma vez (sem duplicatas)
    loadHome();
    loadArtists();
    loadVideos();
    
    // Podcasts com cache primeiro
    const cachedPodcasts = getCachedPodcasts();
    if (cachedPodcasts) {
        renderPodcasts(cachedPodcasts);
    } else {
        loadPodcasts();
    }
    
    // ✅ Bind único para todos os eventos
    bindGlobalEvents();
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

    // mostra só a atual (SUAVE)
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
    // Podcasts já carregados no init
}

// =====================================================
// LAST.FM (ARTISTS)
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

function renderArtists(list, target) {
    const html = `
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Artistas</h2>
                <ul class="euro-list-data">
                    ${list.map(a => {
                        const name = a.name;
                        const slug = name.toLowerCase().replace(/\s+/g, '-');
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
    // ✅ Eventos já bindados globalmente - SEM DUPLICATA!
}

function getArtistImage(images) {
    if (!images || !Array.isArray(images)) return 'public/images/defaults/no_image.png';

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

function loadArtistDetails(slug) {
    const artistName = slug.replace(/-/g, ' ');

    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {
            const artist = data.artist;
            const name = artist.name;
            const image = getArtistImage(artist.image);
            const bio = artist.bio?.content || artist.bio?.summary || '';

            const html = `
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

                <section class="euro-artists-bio">
                    <div class="grid">
                        <p>${formatBio(bio)}</p>
                    </div>
                </section>

                <section id="relatedArtists"></section>
            `;

            $('#searchResults').html(html);
            switchTab('search');
            loadSimilarArtists(artist.similar?.artist || []);
            // ✅ Eventos já globais

        })
        .catch(err => {
            console.error('Erro detalhes artista:', err);
        });
}

function formatBio(text) {
    if (!text) return '';
    return text
        .replace(/<a.*?>.*?<\/a>/g, '')
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
    // ✅ Eventos já globais
}

// =====================================================
// EVENTOS GLOBAIS
// =====================================================
let clickDebounce = {}; // ✅ DEBOUNCE

function bindGlobalEvents() {
    // ✅ LIMPA TUDO PRIMEIRO
    $(document).off('click.artistEvents click.videoEvents click.podcastEvents');
    
    // 🎨 ARTISTAS (ÚNICO HANDLER)
    $(document).on('click.artistEvents', '.artist-link, .artist-info', function(e) {
        e.preventDefault();
        handleArtistAction($(this), 'info');
    }).on('click.artistEvents', '.artist-music', function(e) {
        e.preventDefault();
        handleArtistAction($(this), 'music');
    }).on('click.artistEvents', '.artist-videos', function(e) {
        e.preventDefault();
        handleArtistAction($(this), 'videos');
    });

    // 🎥 VÍDEOS
    $(document).on('click.videoEvents', '.video-link', function(e) {
        e.preventDefault();
        const item = $(this).closest('.euro-list-data-item');
        const id = item.data('id');
        const title = item.data('title');
        const thumb = item.data('thumb');
        openPlayerYoutube(id, title, thumb);
    });

    // 🎵 PODCASTS
    $(document).on('click.podcastEvents', '.podcast-click', function() {
        const url = $(this).data('url');
        const name = $(this).data('name') || $(this).closest('li').find('.podcast-title').text().trim();
        const img = $(this).data('img');
        openPlayerMixcloud(url, {
            name: name,
            pictures: { medium: img }
        });
    });

    // 🎚️ PLAYER
    $(document).on('click', '#togglePlayer', function(e) {
        e.preventDefault();
        $('#player-bar').toggleClass('showmore');
    });
}

function handleArtistAction($el, action) {
    const artist = $el.data('artist');
    const key = `${action}_${artist}`;
    
    // ✅ DEBOUNCE 300ms
    if (clickDebounce[key]) return;
    clickDebounce[key] = true;
    setTimeout(() => { clickDebounce[key] = false; }, 300);
    
    const name = artist.replace(/-/g, ' ');
    
    switch(action) {
        case 'info':
            loadArtistDetails(artist);
            break;
        case 'music':
            searchTracksByArtist(name);
            break;
        case 'videos':
            searchVideosByArtist(name);
            break;
    }
}

// =====================================================
// LASTFM TRACK
// =====================================================
function searchTracksByArtist(name) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(name)}&api_key=${LASTFM_KEY}&format=json&limit=12`;

    $('#searchResults').html('<h2 class="euro-title medium section-title">Carregando músicas...</h2>');

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const tracks = data.toptracks?.track || [];
            if (!tracks.length) {
                $('#searchResults').html('<h2 class="euro-title medium section-title">Nenhuma música encontrada</h2>');
                return;
            }
            renderTracks(tracks, name);
            switchTab('search');
        })
        .catch(err => {
            console.error(err);
            $('#searchResults').html('<h2 class="euro-title medium section-title">Erro ao carregar músicas</h2>');
        });
}

function renderTracks(tracks, artistName) {
    const html = `
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Músicas de ${artistName}</h2>
                <ul class="euro-list-data">
                    ${tracks.map(t => {
                        const title = t.name;
                        const artist = t.artist?.name || artistName;
                        return `
                            <li class="euro-list-data-item">
                                <div class="euro-list-data-photo"
                                     style="background-image:url('https://i.ibb.co/39DXFZKM/no-image.png')">
                                </div>
                                <div class="euro-list-data-desc">
                                    <h2 class="euro-title small">${title}</h2>
                                    <p>${artist}</p>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        </div>
    `;
    $('#searchResults').html(html);
}

// =====================================================
// YOUTUBE (VIDEOS)
// =====================================================
const API_URL = 'https://eurodance-api.onrender.com/youtube';

function loadVideos() {
    fetch(`${API_URL}?q=eurodance`)
        .then(res => res.json())
        .then(data => {
            if (!data.items) {
                $('#videosGrid').html('<h2 class="euro-title medium section-title">Nenhum vídeo encontrado</h2>');
                return;
            }
            renderVideos(data.items);
        })
        .catch(err => {
            console.error('Erro API:', err);
            $('#videosGrid').html('<p>Erro ao carregar vídeos</p>');
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
    if (!videos || !videos.length) {
        $('#videosGrid').html('<h2 class="euro-title medium section-title">Nenhum vídeo disponível</h2>');
        return;
    }

    const html = `
        <div class="euro-artists-list modules">
            <div class="grid">
                <h2 class="euro-title medium section-title">Vídeos</h2>
                <ul class="euro-list-data">
                    ${videos
                        .filter(v => v.id && v.id.videoId)
                        .map(v => {
                            const id = v.id.videoId;
                            const title = v.snippet?.title || 'Sem título';
                            const channel = v.snippet?.channelTitle || '';
                            const thumb = v.snippet?.thumbnails?.medium?.url || '';

                            return `
                                <li class="euro-list-data-item"
                                    data-id="${id}"
                                    data-title="${title.replace(/"/g, '&quot;')}"
                                    data-thumb="${thumb}">
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
                        }).join('')}
                </ul>
            </div>
        </div>
    `;
    $('#videosGrid').html(html);
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
// MIXCLOUD (PODCASTS)
// =====================================================
const PROXY_URLS = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/',
    'https://api.codetabs.com/v1/proxy/?quest=',
];

function loadPodcasts() {
    const user = 'Play90Music';
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

    fetch(proxyUrl + encodeURIComponent(mixcloudUrl), { cache: 'no-cache' })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            return res.text();
        })
        .then(data => {
            const json = JSON.parse(data);
            console.log('✅ Podcasts carregados com sucesso!', json.data?.length || 0);
            cachePodcasts(json);
            renderPodcasts(json.data || []);
        })
        .catch(err => {
            console.error(`❌ Proxy ${proxyIndex + 1} falhou:`, err.message);
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
        expires: Date.now() + (60 * 60 * 1000)
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
                <h2 class="euro-title medium section-title">Podcasts</h2>
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

    $('#homePodcasts, #podcastsGrid').html(html);
    // ✅ Eventos já globais
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
                <h2 class="euro-title medium section-title">Podcasts</h2>
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

function openPlayerMixcloud(url, data = {}) {
    console.log('🎵 Abrindo player:', url);
    const cacheKey = 'mixcloud_player_' + url.split('/').pop();
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        try {
            const json = JSON.parse(cached);
            renderPlayer(json, data);
            return;
        } catch (e) {
            console.warn('Cache inválido, recarregando...');
        }
    }

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
}

// Auto-reload podcasts
setInterval(() => {
    if (!$('#player-bar').hasClass('opened')) {
        loadPodcasts();
    }
}, 30 * 60 * 1000);

window.reloadPodcasts = loadPodcasts;

// =====================================================
// SEARCH ARTISTS
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
