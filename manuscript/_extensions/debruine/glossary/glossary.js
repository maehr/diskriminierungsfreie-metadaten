(function () {
	'use strict';
	function r() {
		if (typeof window.bootstrap > 'u') {
			console.warn('Bootstrap not found. Popovers will not work.');
			return;
		}
		const n = document.querySelectorAll('.glossary[data-bs-toggle="popover"]');
		(n.forEach(function (o) {
			window.bootstrap.Popover.getInstance(o) ||
				new window.bootstrap.Popover(o, {
					trigger: 'click',
					placement: 'top',
					html: !1,
					sanitize: !0,
					container: 'body'
				});
		}),
			n.forEach(function (o) {
				o.addEventListener('show.bs.popover', function () {
					n.forEach(function (t) {
						if (t !== o) {
							const e = window.bootstrap.Popover.getInstance(t);
							e && e.hide();
						}
					});
				});
			}));
	}
	(document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', r) : r(),
		new MutationObserver(function (n) {
			let o = !1;
			(n.forEach(function (t) {
				t.type === 'childList' &&
					t.addedNodes.length > 0 &&
					t.addedNodes.forEach(function (e) {
						e.nodeType === Node.ELEMENT_NODE &&
							((e.matches && e.matches('.glossary[data-bs-toggle="popover"]')) ||
								(e.querySelectorAll &&
									e.querySelectorAll('.glossary[data-bs-toggle="popover"]').length > 0)) &&
							(o = !0);
					});
			}),
				o && setTimeout(r, 0));
		}).observe(document.body, { childList: !0, subtree: !0 }));
})();
