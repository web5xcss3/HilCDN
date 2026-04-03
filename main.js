(function($) {

	var $window = $(window),
		$body = $('body'),
		$banner = $('#banner'),
		$header = $('#header'),
		$menu = $('#menu');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ]
		});

	// Disable animations/transitions until the page has loaded.
		$body.addClass('is-preload');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Search.
		breakpoints.on('<=small', function () {
			$("#nav ul li button.fa-magnifying-glass").on("click.searchToggle", function (e) {
				e.preventDefault();
				$("#search").show();
				$("#searchInput").focus();
			});

			$(document).on("click.searchOutside", function (e) {
				const $search = $("#search");
				const $toggle = $("#nav ul li button.fa-magnifying-glass");
				
				if (
					!$search.is(e.target) &&
					$search.has(e.target).length === 0 &&
					!$toggle.is(e.target) &&
					$toggle.has(e.target).length === 0
				) {
					$search.hide();
				}
			});
		});

		breakpoints.on('>small', function () {
			$("#nav ul li button.fa-magnifying-glass").off(".searchToggle");
			$(document).off(".searchOutside");
			$("#search").show();
		});

	// Menu toogle
		$(document).on("click", ".menuToogle", function (e) {
			e.preventDefault();
			$("body").toggleClass("is-menu-visible");
		});

	// fechar ao clicar fora
		$(document).on("click", function (e) {

			const $menu = $("#menu");
			const $toggle = $(".menuToogle");

			if (
				$("body").hasClass("is-menu-visible") &&
				!$menu.is(e.target) &&
				$menu.has(e.target).length === 0 &&
				!$toggle.is(e.target) &&
				$toggle.has(e.target).length === 0
			) {
				$("body").removeClass("is-menu-visible");
			}

		});

	// impedir fechar ao clicar dentro do menu
		$(document).on("click", "#menu", function (e) {
			e.stopPropagation();
		});

	// ================= DROPDOWN (SPA SAFE) =================

	// abrir/fechar dropdown
		$(document).on('click', '.toggle-dropdown', function(e) {
			e.preventDefault();

			const $dropdown = $(this).next('.dropotron');

			$dropdown.toggleClass('dropdown-active');

			// fecha outros
			$('.dropotron').not($dropdown).removeClass('dropdown-active');
		});

		// fechar ao clicar fora
		$(document).on('click', function(e) {

			if (!$(e.target).closest('.toggle-dropdown, .dropotron').length) {
				$('.dropotron').removeClass('dropdown-active');
			}

		});
		
		// ================= TOGGLE BANNER (SPA SAFE) =================

		$(document).on('click', '#toggleBanner', function() {

			const $image = $('#banner .image');

			if (!$image.length) return; // segurança SPA

			$image.toggleClass('hidden');

			// Atualiza texto do botão
			if ($image.hasClass('hidden')) {
				$(this).text('Background Color');
			} else {
				$(this).text('Background Image');
			}

		});

})(jQuery);
