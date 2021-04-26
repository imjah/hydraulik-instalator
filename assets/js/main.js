/**
 * -----------------------------------------------------------------------------
 * Copy buttons
 * -----------------------------------------------------------------------------
 */

document.querySelectorAll('[data-copy-target]').forEach(button => {
	button.addEventListener('click', function() {
		let text = document.querySelector(this.dataset.copyTarget).textContent;

		navigator.clipboard.writeText(text).then(() => {
			this.innerHTML = this.dataset.copyReplace;
		}, e => {
			console.log(e);
		});
	});
});

/**
 * -----------------------------------------------------------------------------
 * Collapse
 * -----------------------------------------------------------------------------
 */

document.querySelectorAll('[data-collapse-target]').forEach(button => {
	button.addEventListener('click', () => {
		button.setAttribute('aria-expanded', button.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');

		document.querySelectorAll(button.dataset.collapseTarget).forEach(target => {
			target.classList.add('collapsing');
			target.classList.remove('collapse', 'show');
			target.style.height = target.clientHeight ? '' : target.scrollHeight + 'px';
		});
	});

	document.querySelectorAll(button.dataset.collapseTarget).forEach(target => {
		target.addEventListener('transitionend', () => {
			target.classList.add('collapse');
			target.classList.remove('collapsing');

			if (target.style.height) {
				target.classList.add('show');
			}
		});
	});
});

/**
 * -----------------------------------------------------------------------------
 * ???
 * -----------------------------------------------------------------------------
 */

(() => {
	const navbar = document.getElementById('navbar');
	const navbar_brand = document.getElementById('navbar-brand');
	const navbar_toggler = document.getElementById('navbar-toggler');
	const is_navbar_dark = navbar.classList.contains('navbar-dark');

	navbar_toggler.addEventListener('click', () => {
		if (window.scrollY == 0) {
			navbar.classList.toggle('bg-light');
			navbar.classList.toggle('shadow-sm');

			if (is_navbar_dark) {
				navbar.classList.toggle('navbar-dark');
				navbar.classList.toggle('navbar-light');
			}
		}
	});

	window.addEventListener('scroll', () => {
		if (window.scrollY == 0 && navbar_toggler.attributes['aria-expanded'].value == 'false') {
			navbar.classList.remove('bg-light', 'shadow-sm');

	 		if (is_navbar_dark) {
	 			navbar.classList.add('navbar-dark');
	 			navbar.classList.remove('navbar-light');
	 		}

			navbar_brand.classList.add('upscale');
	 	} else {
			navbar.classList.add('bg-light', 'shadow-sm');

	 		if (is_navbar_dark) {
				navbar.classList.add('navbar-light');
	 			navbar.classList.remove('navbar-dark');
	 		}

	 		navbar_brand.classList.remove('upscale');
	 	}
	});
})();
