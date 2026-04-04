// Header Component
	function Header() {
		return `
			<!-- Header -->
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

            <!-- Search -->
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

            <!-- Nav -->
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

// Menu Component
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

// Banner Component
	function Banner() {
		return `
			<!-- Banner -->
			<section id="banner">
				<div class="image filtered" data-position="center"></div>
			</section>
		`;
	}

// Home Content Component
	function HomeContent() {
		return `
        <!-- Content Home Tab -->
			<div id="home" class="tab-content active">
			
            <!-- Destaque -->
				<section class="wrapper style">
					<header class="major">
						<h2 id="featuredTitle">Destaque</h2>
						<div class="slick-actions">
							<div id="new-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="featuredAlbums" class="grid col-6"></div>
				</section>
            
            <!-- Day Hits -->
				<section class="wrapper style">
					<header class="major">
						<h2 id="dailyHitTitle">Hits do Dia</h2>
						<div class="slick-actions">
							<div id="hits-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="dailyHit"></div>
				</section>
            
            <!-- Day Titulos -->
				<section class="wrapper style">
					<header class="major">
						<h2 id="dailyFeaturedTitle">Títulos do Dia</h2>
						<div class="slick-actions">
							<div id="daily-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="dailyFeaturedTitles" class="grid col-6"></div>
				</section>

            <!-- DJS -->
				<section class="wrapper style">
					<header class="major">
						<h2 id="featuredDjsTitle">DJs em Destaque</h2>
						<div class="slick-actions">
							<div id="djs-slick-arrow" class="slick-arrows"></div>
						</div>
					</header>
					<div id="featuredDjs"></div>
				</section>
            
            <!-- Recent -->
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

// Artists Component
	function ArtistsContent() {
		return `
        <!-- Artists Tab -->
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

// Artists Component
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
	
// Timeline Component
	function timelineContent() {
		return `
		<!-- Timeline Tab -->
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

// Genres Component
	function genresContent() {
		return `
		<!-- Genres Albums Tab -->
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
	
// Year Albums Component
	function yearAlbumsContent() {
		return `
		<!-- Year Albums Tab -->
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
	
// Music Component
	function musicsContent() {
		return `
		<!-- Music -->
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
	
// Playlists Component
	function playlistsContent() {
		return `
		<!-- Playlists -->
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
	
// Álbuns Component
	function albumsContent() {
		return `
		<!-- Álbuns Tab -->
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

// Single Component
	function singlesContent() {
		return `
		<!-- Single Tab -->
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
	
// Vinyl Component
	function vinylsContent() {
		return `
		<!-- Vinyl Tab -->
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
	
// Djs Component
	function djsContent() {
		return `
		<!-- Djs Tab -->
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
	
// Instrumental Component
	function instrumentalContent() {
		return `
		<!-- Instrumental Tab -->
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
	
// Labels Component
	function labelsContent() {
		return `
		<!-- Labels Tab -->
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
	
// Sub Labels Component
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
	
// Main App Component
	function App() {
		return `
			${Header()}
			${Menu()}
			${Banner()}
        
        <!-- Main -->
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
					<!-- Outros tabs serão adicionados dinamicamente -->
				</div>
			</section>

        <!-- Player Page -->
			<section id="player-page" style="display: none;">
				<div class="content">
				
				<!-- Main Panel -->
					<div id="main-panel">
						<div class="player-embed"></div>
					</div>
					
				<!-- Side Panel -->
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
		
		<!-- related Albums Panel -->
			<section id="relatedContainer">
				<header class="major">
					<h3 id="relatedArtistName"></h3>
				</header>
				<div id="relatedAlbums" class="related-grid"></div>
			</section>

        <!-- Player Bar -->
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

// Render Function
	function renderRoot() {
		$('#app').html(App());
	}

// Tab System
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

		// menu (centralizado)
		$('[data-tab]').parent().removeClass('active');
		$('[data-tab="' + tab + '"]').parent().addClass('active');

	}

// Initialize App
	$(document).ready(function() {

		renderRoot();

		// Initialize systems
		initTabSystem();

		// Initialize other components (after DOM is ready)
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
	});

// SCROLL WATCH
	function setupScrollWatch() {

		const $banner = $('#banner');
		const $header = $('#header');
		const $menu = $('#menu');

		if (($header.hasClass('alt') || $menu.hasClass('alt')) && $banner.length > 0) {

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

		} else {
			console.warn('ScrollWatch não inicializado');
		}
	}

	$(document).ready(function() {
		renderRoot();
		initTabSystem();
		setupScrollWatch();
	});
	
	
	
