export class utils {
	addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else {
			if (!this.hasClass(el, className)) {
				el.className += className + ' ';
			}
		}
	}

	removeClass(el, className) {
		if (!el instanceof HTMLElement && typeof className !== 'string') {
			throw new Error(
				'The element passed in to removeClass is not a valid HTML element'
			);
		}

		if (el.classList) {
			el.classList.remove(className);
		} else {
			console.log(
				'%cNo classes on this element.',
				'color:green; background-color:yellow'
			);
		}
	}

	hasClass(el, className) {
		if (el.classList) {
			return el.classList.contains(className);
		} else {
			var r = new RegExp(`(?:\\s|^)${className}(?:\\s|$)`);
			return r.test(el.className);
		}
	}

	toggleClass(el, className) {
		if (!el instanceof HTMLElement && typeof className !== 'string') {
			throw new Error(
				'The element passed in to removeClass is not a valid HTML element'
			);
		}

		if (this.hasClass(el, className)) {
			this.removeClass(el, className);
		} else {
			this.addClass(el, className);
		}
	}
}
