// Header Component
function Header() {
    return `
			<header id="header" class="alt">
				<!-- Logo -->
				<div class="logo">
					<a href="index.html">
						<picture>
							<source srcset="https://cdn.jsdelivr.net/gh/web5xcss3/icons/desktop.svg" media="(max-width: 767px)">
							<img src="https://cdn.jsdelivr.net/gh/web5xcss3/icons/desktop.svg" alt="Play 90 Music" />
						</picture>
					</a>
					<ul class="icons">
						<li><button type="button" class="icon solid fa-bars md-ripples ripples-light menuToogle"></button></li>
					</ul>
				</div>
				
				<nav id="search">
					<ul>
						<li>
							<form class="search">
								<input type="text" id="searchInput" placeholder="Pesquise Albuns, Artistas, CD, Maxi-Single, Vinyl, Selos, Timeline...">
								<div id="searchDropdown" class="dropdown-results"></div>
							</form>
						</li>
					</ul>
				</nav>

				<nav id="nav">
					<ul class="icons">
						<li class="alt"><button type="button" class="icon solid fa-magnifying-glass md-ripples ripples-light"></button></li>
						<li>
							<button type="button" class="toggle-dropdown icon solid fa-ellipsis-vertical md-ripples ripples-light"></button>
							<ul class="dropotron level-0">
								<li><button type="button" data-toggle="fullscreen" class="md-ripples ripples-light">Modo Fullscreen</button></li>
								<li><button type="button" id="toggleBanner" class="md-ripples ripples-light">Background Image</button></li>
							</ul>
						</li>
					</ul>
				</nav>

			</header>
		`;
}

function Menu() {
    return `
			<!-- Menu -->
			<section id="menu">
				<ul class="menu">
					<li><button type="button" class="active md-ripples ripples-light" data-tab="home"><i class="icon solid fa-house"></i><span class="label">Início</span></button></li>
					<li><button type="button" class="md-ripples ripples-light" data-tab="timeline"><i class="icon solid fa-compass"></i><span class="label">Explorar</span></button></li>
					<li><button type="button" class="md-ripples ripples-light" data-tab="artists"><i class="icon solid fa-chart-simple"></i><span class="label">Biblioteca</span></button></li>
				</ul>
			</section>
		`;
}

function Banner() {
    return `
			<!-- Banner -->
			<section id="banner">
				<div class="image filtered" data-position="center"></div>
			</section>
		`;
}

function HomeContent() {
    return `
        <!-- Content Home Tab -->
			<div id="home" class="tab-content active">
			
				<section class="wrapper style">
					<header class="major">
						<h2 id="featuredTitle">Destaque</h2>
						<div class="slick-actions">
							<div id="new-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="featuredAlbums" class="grid col-6"></div>
				</section>
            
				<section class="wrapper style">
					<header class="major">
						<h2 id="dailyHitTitle">Hits do Dia</h2>
						<div class="slick-actions">
							<div id="hits-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="dailyHit"></div>
				</section>
            
				<section class="wrapper style">
					<header class="major">
						<h2 id="dailyFeaturedTitle">Títulos do Dia</h2>
						<div class="slick-actions">
							<div id="daily-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="dailyFeaturedTitles" class="grid col-6"></div>
				</section>

				<section class="wrapper style">
					<header class="major">
						<h2 id="featuredDjsTitle">DJs em Destaque</h2>
						<div class="slick-actions">
							<div id="djs-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="featuredDjs"></div>
				</section>
            
				<section class="wrapper style">
					<header class="major">
						<h2 id="recentlyPlayedTitle">Recentemente Tocadas</h2>
						<div class="slick-actions">
							<div id="recentlyPlayed-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="recentlyPlayed"></div>
				</section>
			</div>
		`;
}

function ArtistsContent() {
    return `
			<section id="artists" class="tab-content">
				<article id="action">
					<ul class="actions">
						<li><button type="button" class="button md-ripples ripples-light" data-tab="musics">Músicas</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="playlists">Playlists</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="albums">Álbuns</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="singles">CD, Maxi-Single</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="vinyls">Vinyl, 12"</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="djs">Mix de D'J'S</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="instrumental">Instrumental</button></li>
						<li><button type="button" class="button md-ripples ripples-light" data-tab="labels">Labels / Selos</button></li>
					</ul>
				</article>
				<header class="major">
					<h2 id="artistsTitle">Artistas</h2>
				</header>
				<div id="allArtists" class="grid col-5"></div>
			</section>
		`;
}

function suballAlbumsContent() {
    return `
		<!-- Artists Albums Tab -->
			<section id="subalbums" class="tab-content">
				<header class="major">
					<h2 id="subalbumsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToArtistsBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="suballAlbums" class="grid col-6"></div>
			</section>
		`;
}

function timelineContent() {
    return `
			<section id="timeline" class="tab-content">
				<header class="major">
					<h2 id="timelineTitle"></h2>
					<div class="slick-actions">
						<div id="timeline-slick-arrow" class="slick-arrows"></div>
					</div>
				</header>
				<div id="allTimeline"></div>
							
				<div id="genres" class="">
					<header class="major">
						<h2 id="genresTitle"></h2>
					</header>
					<div id="AllGenres" class="grid col-4"></div>
				</div>
			</section>
			
		`;
}

function genresContent() {
    return `
			<section id="genresAlbums" class="tab-content">
				<header class="major">
					<h2 id="genresAlbumsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToTimelineFromGenres" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="genresAlbumsList" class="grid col-6"></div>
			</section>
		`;
}

function yearAlbumsContent() {
    return `
			<section id="yearAlbums" class="tab-content">
				<header class="major">
					<h2 id="yearAlbumsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToTimelineBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="yearAlbumsList" class="grid col-6"></div>
			</section>
		`;
}

function musicsContent() {
    return `
			<section id="musics" class="tab-content">
				<header class="major">
					<h2 id="musicsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToMusicsBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allMusics" class="grid col-6"></div>
			</section>
		`;
}

function playlistsContent() {
    return `
			<section id="playlists" class="tab-content">
				<header class="major">
					<h2 id="playlistsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToPlaylistsBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allPlaylists" class="grid col-6"></div>
			</section>
		`;
}

function albumsContent() {
    return `
			<section id="albums" class="tab-content">
				<header class="major">
					<h2 id="albumsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToAlbunsBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allAlbums" class="grid col-6"></div>
			</section>
		`;
}

function singlesContent() {
    return `
			<section id="singles" class="tab-content">
				<header class="major">
					<h2 id="singlesTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToSingleBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allSingles" class="grid col-6"></div>
			</section>
		`;
}

function vinylsContent() {
    return `
			<section id="vinyls" class="tab-content">
				<header class="major">
					<h2 id="vinylsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToVinylBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allVinyls" class="grid col-6"></div>
			</section>
		`;
}

function djsContent() {
    return `
			<section id="djs" class="tab-content">
				<header class="major">
					<h2 id="djsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToDjsBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allDjs" class="grid col-6"></div>
			</section>
		`;
}

function instrumentalContent() {
    return `
			<section id="instrumental" class="tab-content">
				<header class="major">
					<h2 id="instrumentalTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToInstrumentaisBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="allInstrumentals" class="grid col-6"></div>
			</section>
		`;
}

function labelsContent() {
    return `
			<section id="labels" class="tab-content">
				<header class="major">
					<h2 id="labelsTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToHomeFromLabels" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="labelsList" class="grid col-6"></div>
			</section>
		`;
}

function labelDetailsContent() {
    return `
		<!-- Sub Labels Tab -->
			<section id="labelDetails" class="tab-content">
				<header class="major">
					<h2 id="labelTitle"></h2>
					<ul class="actions">
						<li><button type="button" id="backToLabelsBtn" class="button icon solid fa-arrow-left md-ripples ripples-light">Voltar</button></li>
					</ul>
				</header>
				<div id="labelArtistsList" class="grid col-6"></div>
			</section>
		`;
}

function App() {
    return `
			${Header()}
			${Menu()}
			${Banner()}
        
			<section id="main" class="wrapper align-top">
				<div class="container">
					${HomeContent()}
					${ArtistsContent()}
					${suballAlbumsContent()}
					${timelineContent()}
					${genresContent()}
					${yearAlbumsContent()}
					${musicsContent()}
					${playlistsContent()}
					${albumsContent()}
					${singlesContent()}
					${vinylsContent()}
					${djsContent()}
					${instrumentalContent()}
					${labelsContent()}
					${labelDetailsContent()}
				</div>
			</section>

			<section id="player-page" style="display: none;">
				<div class="content">
				
					<div id="main-panel">
						<div class="player-embed"></div>
					</div>
					
					<div id="side-panel">
						<div class="album-details">
							<h4>Detalhes do Álbum</h4>
							<div class="details-grid">
								<div class="detail-item">
									<span class="label">Artista:</span>
									<span id="detailArtist"></span>
								</div>
								<div class="detail-item">
									<span class="label">Gravadora:</span>
									<span id="detailLabel"></span>
								</div>
								<div class="detail-item">
									<span class="label">Formato:</span>
									<span id="detailFormat"></span>
								</div>
								<div class="detail-item">
									<span class="label">País:</span>
									<span id="detailCountry"></span>
								</div>
								<div class="detail-item">
									<span class="label">Ano:</span>
									<span id="detailYear"></span>
								</div>
								<div class="detail-item">
									<span class="label">Gênero:</span>
									<span id="detailGenre"></span>
								</div>
								<div class="detail-item">
									<span class="label">Estilo:</span>
									<span id="detailStyle"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		
			<section id="relatedContainer">
				<header class="major">
					<h3 id="relatedArtistName"></h3>
				</header>
				<div id="relatedAlbums" class="related-grid"></div>
			</section>

			<section id="player-bar" style="display: none;">
				<div class="content">
					<div class="image" data-position="center">
						<img id="playerImage" src="" alt="Player" />
					</div>
					<header class="align-left">
						<h3 id="playerArtist"></h3>
						<p id="playerTitle"></p>
					</header>
					<ul class="icons">
						<li><button type="button" class="icon solid fa-long-arrow-down md-ripples ripples-light"></button></li>
						<li><button type="button" class="icon solid fa-list md-ripples ripples-light"></button></li>
					</ul>
				</div>
			</section>

		`;
}

function renderRoot() {
    $('#app').html(App());
}

function initTabSystem() {

    $(document).on('click', '[data-tab]', function(e) {
        e.preventDefault();

        const tab = $(this).data('tab');
        switchTab(tab);
    });

}

function switchTab(tab) {

    // conteúdo
    $('.tab-content').removeClass('active');
    $('#' + tab).addClass('active');

    // menu ativo
    $('[data-tab]').parent().removeClass('active');
    $('[data-tab="' + tab + '"]').parent().addClass('active');
}

function initGlobalEvents() {

    $(document).on('click', '.menuToogle', function(e) {
        e.preventDefault();
        $('body').toggleClass('is-menu-visible');
    });

    $(document).on('click', function(e) {
        const $menu = $('#menu');
        const $toggle = $('.menuToogle');

        if (
            $('body').hasClass('is-menu-visible') &&
            !$menu.is(e.target) &&
            $menu.has(e.target).length === 0 &&
            !$toggle.is(e.target) &&
            $toggle.has(e.target).length === 0
        ) {
            $('body').removeClass('is-menu-visible');
        }
    });

    $(document).on('click', '#menu', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', '.toggle-dropdown', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const $dropdown = $(this).next('.dropotron');

        $('.dropotron').not($dropdown).removeClass('dropdown-active');
        $dropdown.toggleClass('dropdown-active');
    });

    $(document).on('click', function() {
        $('.dropotron').removeClass('dropdown-active');
    });

    $(document).on('click', '.dropotron', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', '#toggleBanner', function() {
        const $image = $('#banner .image');
        if (!$image.length) return;

        $image.toggleClass('hidden');

        $(this).text(
            $image.hasClass('hidden') ?
            'Background Color' :
            'Background Image'
        );
    });

    $(document).on('click', '.fa-magnifying-glass', function(e) {
        e.preventDefault();

        const $search = $('#search');

        if (window.innerWidth <= 736) {
            $search.toggle();
            $('#searchInput').focus();
        }
    });

    $(document).on('click', function(e) {
        const $search = $('#search');

        if (
            window.innerWidth <= 736 &&
            !$search.is(e.target) &&
            $search.has(e.target).length === 0 &&
            !$(e.target).closest('.fa-magnifying-glass').length
        ) {
            $search.hide();
        }
    });

}

function initPlugins() {

    if ($.fn.fillColor) {
        $('.avg').fillColor({
            type: 'avg'
        });
    }

    if ($.fn.slick && $('#featuredAlbums').length) {
        $('#featuredAlbums').not('.slick-initialized').slick({
            slidesToShow: 4,
            arrows: true
        });
    }

}

function setupScrollWatch() {

    const $banner = $('#banner');
    const $header = $('#header');
    const $menu = $('#menu');

    if (!$banner.length || !$.fn.scrollwatch) {
        console.warn('ScrollWatch não disponível');
        return;
    }

    $banner.scrollwatch({
        delay: 0,
        range: 0,
        anchor: 'top',

        on: function() {
            $header.addClass('alt reveal');
            $menu.addClass('alt reveal');
        },

        off: function() {
            $header.removeClass('alt reveal');
            $menu.removeClass('alt reveal');
        }
    });

}

window.searchIndex = [];

let searchTimeout = null;

window.buildSearchIndex = function() {

    console.log('buildSearchIndex rodou');

    window.searchIndex = mockFeatured.map(item => ({
        id: item.id,
        type: 'featured',

        title: item.title || '',
        artist: item.artist || '',
        image: item.image || '',

        search: (
            (item.title || '') + ' ' +
            (item.artist || '') + ' ' +
            (item.year || '') + ' ' +
            (item.name || '')
        ).toLowerCase()
    }));

    console.log('TOTAL:', window.searchIndex.length);
};

function handleSearch(term) {

    const $dropdown = $('#searchDropdown');
    if (!$dropdown.length) return;

    if (!term || term.length < 2) {
        $dropdown.hide();
        return;
    }

    term = term.toLowerCase();

    const results = window.searchIndex
        .filter(item => item.search.includes(term))
        .slice(0, 10);

    if (!results.length) {
        $dropdown.hide();
        return;
    }

    renderSearchResults(results);
}

function renderSearchResults(results) {

    const html = results.map(item => `
        <div class="result-item md-ripples ripples-light" data-id="${item.id}" data-type="${item.type}">
            <img src="${item.image}" class="result-thumb">
            <div class="result-info">
                <h3>${item.artist || ''}</h3>
                <p>${item.title || ''}</p>
            </div>
        </div>
    `).join('');

    $('#searchDropdown')
        .html(html)
        .show();
}

function debounceSearch(value) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        handleSearch(value); // ✅ AGORA SIM
    }, 250);
}

$(document).on('input', '#searchInput', function() {
    debounceSearch($(this).val());
});

$(document).on('keypress', '#searchInput', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch($(this).val());
    }
});

$(document).on('click', '.result-item', function() {

    const id = parseInt($(this).data('id'));
    const type = $(this).data('type');

    if (!isNaN(id)) {
        openPlayer(id, type);
    }

    $('#searchDropdown').hide();
});

$(document).on('click', function(e) {
    if (!$(e.target).closest('#searchInput, #searchDropdown').length) {
        $('#searchDropdown').hide();
    }
});

function initRenderFunctions() {
    if (typeof renderAllAlbums === 'function') renderAllAlbums();
    if (typeof renderAllArtists === 'function') renderAllArtists();
    if (typeof renderAllPlaylists === 'function') renderAllPlaylists();
    if (typeof renderTimeline === 'function') renderTimeline();
    if (typeof renderMusics === 'function') renderMusics();
    if (typeof renderAllSingles === 'function') renderAllSingles();
    if (typeof renderAllVinyls === 'function') renderAllVinyls();
    if (typeof renderAllDjs === 'function') renderAllDjs();
    if (typeof renderAllInstrumental === 'function') renderAllInstrumental();
    if (typeof renderFeaturedAlbums === 'function') renderFeaturedAlbums();
    if (typeof renderRecentlyPlayed === 'function') renderRecentlyPlayed();
    if (typeof renderFeaturedDjs === 'function') renderFeaturedDjs();
    if (typeof renderDailyHit === 'function') renderDailyHit();
    if (typeof renderAllLabels === 'function') renderAllLabels();
    if (typeof renderDailyFeaturedTitles === 'function') renderDailyFeaturedTitles();
    if (typeof renderAllGenres === 'function') renderAllGenres();
}

$(document).ready(function() {

    console.log('SPA: inicializando...');

    renderRoot();
    initGlobalEvents();
    initTabSystem();
    initRenderFunctions();
    initPlugins();
    setupScrollWatch();
	
    setTimeout(() => {
        buildSearchIndex();
    }, 100);

});
