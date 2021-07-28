window.addEventListener('load', () => {
/**
 * -----------------------------------------------------------------------------
 * Collapse
 * -----------------------------------------------------------------------------
 * Bootstrap collapse component replacement. Limited usage.
 * Collapses target elements on button click with transition animation.
 */

document.querySelectorAll('[data-collapse-target]').forEach(button => {
	let targets = document.querySelectorAll(button.dataset.collapseTarget || null);

	button.addEventListener('click', () => {
		button.setAttribute(
			'aria-expanded',
			button.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
		);

		targets.forEach(target => {
			target.classList.add('collapsing');
			target.classList.remove('collapse', 'show');
			target.style.height = target.clientHeight ? '' : `${target.scrollHeight}px`;
		});
	});

	targets.forEach(target => {
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
 * Copy buttons
 * -----------------------------------------------------------------------------
 * Copies target text to clipboard on button click.
 */

document.querySelectorAll('[data-copy-target]').forEach(button => {
	let target = document.getElementById(button.dataset.copyTarget || null);

	if (target)
		button.addEventListener('click', () => {
			navigator.clipboard.writeText(target.textContent)
			.then(
				() => {
					button.innerHTML = button.dataset.copyReplace;
				}
			);
		});
});

/**
 * -----------------------------------------------------------------------------
 * Navbar highlight
 * -----------------------------------------------------------------------------
 * Makes navbar fixed and changes them style on scroll.
 */

document.querySelectorAll('[data-fixed-navbar]').forEach(navbar => {
	let brand = navbar.getElementsByClassName('navbar-brand');

	if (brand)
		brand = brand[0];
	else
		return;

	let toggler = navbar.getElementsByClassName('navbar-toggler');

	if (toggler)
		toggler = toggler[0];
	else
		return;

	let bg           = 'bg-light',
	    color        = 'navbar-light',
	    defaultcolor = navbar.classList.contains('navbar-dark') ? 'navbar-dark' : 'navbar-light',
	    scale        = 'upscale',
	    shadow       = 'shadow-sm';

	pin();
	highlight();
	window.addEventListener('scroll', highlight);
	toggler.addEventListener('click', highlight);

	function pin()
	{
		let filler = document.createElement('div');
		    filler.style.height = `${navbar.offsetHeight}px`;

		navbar.parentNode.prepend(filler);
		navbar.classList.add('fixed-top');
	}

	function highlight()
	{
		if (shouldHighlight())
			setHighlight();
		else
			unsetHighlight();
	}

	function setHighlight()
	{
		if (!navbar.classList.contains(bg)) {
			navbar.classList.remove(defaultcolor);
			navbar.classList.add(bg, color, shadow);
			brand.classList.remove(scale);
		}
	}

	function unsetHighlight()
	{
		if (navbar.classList.contains(bg)) {
			navbar.classList.remove(bg, color, shadow);
			navbar.classList.add(defaultcolor);
			brand.classList.add(scale);
		}
	}

	function shouldHighlight()
	{
		return window.scrollY > 5 || toggler.attributes['aria-expanded'].value == 'true';
	}
});

/**
 * -----------------------------------------------------------------------------
 * Shake
 * -----------------------------------------------------------------------------
 * Shakes the element marked in the link.
 */

(() => {
	let element = document.getElementById(
		window.location.hash.replace('#', '') || null
	);

	if (element) {
		element.addEventListener('animationend', () => {
			element.classList.remove('shake');
		});

		element.classList.add('shake');
	}
})();
});
