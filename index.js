// =====================================================
// CONFIG
// =====================================================

const LASTFM_KEY = '4959ac7ccf2055437d47a70303cc0ee0';
const YOUTUBE_KEY = 'AIzaSyBaGigYcCmqoHVwc0nidjzpEsTO5PHOwy4';

// =====================================================
// INIT
// =====================================================

$(document).ready(function () {

    initTabs();
    initSearch();

    loadHome();

});

// =====================================================
// TABS SYSTEM
// =====================================================

function initTabs() {

    $(document).on('click', '[data-tab]', function (e) {
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
	$target.fadeIn(150).css('opacity', 0).animate({ opacity: 1 }, 200);

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

    $('#openSearch').on('click', function () {
        $('#searchBox').addClass('opened');
        $('#searchInput').focus();
    });

    $('#closeSearch').on('click', function () {
        $('#searchBox').removeClass('opened');
    });

    $('#searchForm').on('submit', function (e) {
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
// LAST.FM (ARTISTS)
// =====================================================

function loadHomeArtists() {

    fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=eurodance&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {

            renderArtists(data.topartists.artist.slice(0, 8), '#homeArtists');

        });

}

function loadArtists() {

    fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=eurodance&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {

            renderArtists(data.topartists.artist, '#artistsGrid');

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
                        const img = a.image && a.image[2] ? a.image[2]['#text'] : '';

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
                                                <a href="#" class="artist-music icon-cd"
                                                   data-artist="${slug}" title="Músicas"></a>
                                            </li>

                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="artist-videos icon-video"
                                                   data-artist="${slug}" title="Vídeos"></a>
                                            </li>

                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="artist-info icon-paper"
                                                   data-artist="${slug}" title="Detalhes"></a>
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

    // =========================
    // EVENTOS
    // =========================

    $('.artist-link').on('click', function (e) {
        e.preventDefault();

        const artist = $(this).data('artist');
        loadArtistDetails(artist);
    });

    $('.artist-videos').on('click', function (e) {
        e.preventDefault();

        const artist = $(this).data('artist');
        searchVideosByArtist(artist);
    });

    $('.artist-music').on('click', function (e) {
        e.preventDefault();

        const artist = $(this).data('artist');
        searchMusicByArtist(artist);
    });

}

function loadArtistDetails(slug) {

    const artistName = slug.replace(/-/g, ' ');

    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${LASTFM_KEY}&format=json`)
        .then(res => res.json())
        .then(data => {

            const artist = data.artist;

            const name = artist.name;
            const image = artist.image[3]['#text'];
            const bio = artist.bio.content || artist.bio.summary || '';

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

                            <h2 class="euro-title medium">
                                ${name}
                            </h2>

                            <nav class="euro-artists-header-options">
                                <ul>

                                    <li class="euro-artists-header-options-item">
                                        <a href="#" class="icon-cd artist-music"
                                           data-artist="${slug}" title="Músicas"></a>
                                    </li>

                                    <li class="euro-artists-header-options-item">
                                        <a href="#" class="icon-video artist-videos"
                                           data-artist="${slug}" title="Vídeos"></a>
                                    </li>

                                    <li class="euro-artists-header-options-item">
                                        <a href="#" class="icon-paper artist-info"
                                           data-artist="${slug}" title="Detalhes"></a>
                                    </li>

                                    <li class="euro-artists-header-options-item">
                                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}"
                                           class="icon-facebook" target="_blank"></a>
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
            loadSimilarArtists(artist.similar.artist);

            // eventos
            bindArtistActions();

        });

}

function formatBio(text) {
    if (!text) return '';

    return text
        .replace(/<a.*?>.*?<\/a>/g, '') // remove links
        .replace(/\n/g, '<br>');
}

function loadSimilarArtists(list) {

    if (!list) return;

    const html = `
        <div class="euro-artists-list modules">
            <div class="grid">

                <h2 class="euro-title medium section-title">
                    Artistas Relacionados
                </h2>

                <ul class="euro-list-data">

                    ${list.slice(0, 4).map(a => {

                        const slug = a.name.toLowerCase().replace(/\s+/g, '-');
                        const img = a.image[2]['#text'];

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
                                                <a href="#" class="icon-cd artist-music"
                                                   data-artist="${slug}"></a>
                                            </li>

                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon-video artist-videos"
                                                   data-artist="${slug}"></a>
                                            </li>

                                            <li class="euro-list-data-options-item">
                                                <a href="#" class="icon-paper artist-info"
                                                   data-artist="${slug}"></a>
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

}

function bindArtistActions() {

    $('.artist-link').off().on('click', function (e) {
        e.preventDefault();
        loadArtistDetails($(this).data('artist'));
    });

    $('.artist-videos').off().on('click', function (e) {
        e.preventDefault();
        searchVideosByArtist($(this).data('artist'));
    });

    $('.artist-music').off().on('click', function (e) {
        e.preventDefault();
        searchMusicByArtist($(this).data('artist'));
    });

}

// =====================================================
// YOUTUBE (VIDEOS)
// =====================================================

function loadVideos() {

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=eurodance&type=video&maxResults=12&key=${YOUTUBE_KEY}`)
        .then(res => res.json())
        .then(data => {

            renderVideos(data.items);

        });

}

function searchVideosByArtist(name) {

    const query = name.replace(/-/g, ' ');

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_KEY}`)
        .then(res => res.json())
        .then(data => {

            renderVideos(data.items);
            switchTab('videos');

        });

}

function renderVideos(videos) {

    const html = videos.map(v => {

        const id = v.id.videoId;

        return `
            <div class="card video-card" data-id="${id}">
                <img src="${v.snippet.thumbnails.medium.url}" />
                <h4>${v.snippet.title}</h4>
            </div>
        `;
    }).join('');

    $('#videosGrid').html(html);

    $('.video-card').on('click', function () {
        const id = $(this).data('id');
        openPlayerYoutube(id);
    });

}

// =====================================================
// MIXCLOUD (PODCASTS)
// =====================================================

function loadPodcasts() {

    const user = 'Play90Music';

    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://api.mixcloud.com/${user}/cloudcasts/`))
        .then(res => res.json())
        .then(data => {

            const json = JSON.parse(data.contents);

            console.log('Podcasts carregados:', json); // debug

            renderPodcasts(json.data);

        })
        .catch(err => {
            console.error('Erro Mixcloud:', err);
        });

}

function renderPodcasts(list) {

    const html = `
        <div class="euro-artists-mixes modules">
            <div class="grid">

                <h2 class="euro-title medium section-title">
                    Podcasts
                </h2>

                <ul class="euro-list-data">

                    ${list.slice(0, 12).map(p => {

                        const img = p.pictures?.medium || 'public/images/defaults/no_image.png';
                        const plays = p.play_count || 0;
                        const likes = p.favorite_count || 0;

                        return `
                            <li class="euro-list-data-item align-top">

                                <div class="euro-list-data-photo podcast-click"
                                     data-url="${p.url}"
                                     style="background-image: url('${img}')">
                                </div>

                                <div class="euro-list-data-desc">

                                    <h2 class="euro-title small">
                                        ${p.name || ''}
                                    </h2>

                                    <nav class="euro-list-data-options">
                                        <ul>

                                            <li class="euro-list-data-options-item">
                                                <i class="icon-play"></i>
                                                <b class="euro-list-data-options-item-counter">
                                                    ${plays}
                                                </b>
                                            </li>

                                            <li class="euro-list-data-options-item">
                                                <i class="icon-heart"></i>
                                                <b class="euro-list-data-options-item-counter">
                                                    ${likes}
                                                </b>
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

    // renderiza em HOME e na aba podcasts
    $('#homePodcasts, #podcastsGrid').html(html);

    // =========================
    // EVENTO PLAYER
    // =========================

    $('.podcast-click').off().on('click', function () {

    const url = $(this).data('url');

    // pegar dados do item
    const item = $(this).closest('.euro-list-data-item');

    const name = item.find('h2').text().trim();
    const img = $(this).css('background-image')
        .replace('url("', '')
        .replace('")', '');

    openPlayerMixcloud(url, {
        name: name,
        pictures: { medium: img }
    });

});

}

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
// PLAYER
// =====================================================

function openPlayerYoutube(videoId) {

    const embed = `
        <iframe width="100%" height="200"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            frameborder="0" allowfullscreen>
        </iframe>
    `;

    $('#playerEmbed').html(embed);
    $('#playerTitle').text('YouTube Player');
    $('#player-bar').addClass('opened');

}

function openPlayerMixcloud(url, data = {}) {

    const api = 'https://api.codetabs.com/v1/proxy/?quest=' +
        encodeURIComponent(`https://www.mixcloud.com/oembed/?format=json&url=${url}`);

    fetch(api)
        .then(res => res.json())
        .then(json => {

            let embed = json.html || '';

            // ✅ correção correta
            embed = embed.replace(/src="\/\//g, 'src="https://');

            $('#playerEmbed').html(embed);

            $('#playerTitle').text(data.name || json.title || 'Podcast');

            const img =
                data.pictures?.medium ||
                json.thumbnail_url ||
                'public/images/defaults/no_image.png';

            $('#playerImage').css('background-image', `url('${img}')`);

            $('#player-bar').addClass('opened');

        })
        .catch(err => {
            console.error('Erro player:', err);
        });

}

// =====================================================
// PLAYER TOGGLE
// =====================================================

$('#togglePlayer').on('click', function (e) {
    e.preventDefault();
    $('#player-bar').toggleClass('showmore');
});
