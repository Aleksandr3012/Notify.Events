const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		let _this = this;
		if (_this.btnToggleMenuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {

					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});
					_this.menuMobile.classList.toggle("active");
					_this.body.classList.toggle("fixed");

					return false;
				});
			});
		}
	},

	closeMenu() {
		let _this = this;
		if (_this.menuMobile) {

			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");

			});
			_this.menuMobile.classList.remove("active");
			_this.body.classList.remove("fixed");
		}

	},

	mobileMenu() {
		// закрыть/открыть мобильное меню
		let _this = this;
		if (_this.menuMobileLink) {

			_this.toggleMenu();
			_this.menuMobileLink.forEach(function (element) {
				element.addEventListener('click', function (e) {
					console.log(element);
					_this.closeMenu();

				});
			})
			// document.addEventListener('mouseup', function (event) {
			// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// 	if (!container) {
			// 		_this.closeMenu();

			// 	}
			// });
		}
	},
	// /mobileMenu

	// // табы  .
	// tabscostume(tab) {

	// 	let tabs = {
	// 		Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
	// 		BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
	// 		Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
	// 	}
	// 	tabs.Btn.forEach((element, index) => {
	// 		element.addEventListener('click', () => {
	// 			if (!element.classList.contains('active')) {
	// 				let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
	// 				let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
	// 				siblings.classList.remove('active');
	// 				siblingsContent.classList.remove('active')
	// 				element.classList.add('active');
	// 				tabs.Content[index].classList.add('active');
	// 			} 
	// 		})
	// 	})
	// 	// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
	// 	// 	$(this)
	// 	// 		.addClass('active').siblings().removeClass('active')
	// 	// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
	// 	// 		.eq($(this).index()).fadeIn().addClass('active');

	// 	// });

	// },
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .topLine li a, .scroll-link, .headerBlock__scrollBlock").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = '02.jpg';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();

	$('.resp-tabs-js').easyResponsiveTabs({
		activate: function () {}
	});

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 10,
		// loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},

		breakpoints: {
			992 : {
				spaceBetween: 15,
			},
		},
	}

	let tarifSlider = document.querySelector('.sTariffs__slider--js')
	if (tarifSlider) {
		const swiper4 = new Swiper(tarifSlider, {
			// slidesPerView: 5,
			...defaultSl,
			slidesPerView: 'auto',
			freeMode: true,
			centeredSlides: true,
			loopFillGroupWithBlank: true,
			touchRatio: 0.2,
			slideToClickedSlide: true,
			freeModeMomentum: true,
			// loop: true,

			// breakpoints: {
			// 	576: {
			// 		spaceBetween: 30
			// 	},
			// 	992 : {
			// 		spaceBetween: 40,
			// 	},
			// },
			on: {
				slideChange: function () {
					if (!swiper4) return
					let currentSlideTxt = tarifSlider.querySelector('.current-slide-js');
					if (!currentSlideTxt) return;

					currentSlideTxt.innerHTML = addZero(swiper4.realIndex + 1);
				},
			}
		});
		swiper4.slideTo(2);
		// modal window
		//prev, next
		$('.sTariffs .next-sl-js').on('click', function () {
			swiper4.slideNext();
		});
		$('.sTariffs .prev-sl-js').on('click', function () {
			swiper4.slidePrev();
		});
	}

	function addZero(num) {
		num = Number(num);
		if (num >= 0 && num <=9) {
			num = "0" + num;
		}
		return num
	}

	let filterSlider =  new Swiper('.sFilter__slider--js', {
		spaceBetween: 10,
		slidesPerView: 'auto',
		breakpoints: {
			576: {
				spaceBetween: 30
			},
			992 : {
				spaceBetween: 40,
			},
		},

		loop: true,

		//autoplay
		//autoplay: {
		//	delay: 4000,
		//},
		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		},

		on: {
			slideChange: function () {
				if (!filterSlider) return
				let currSlideTxt = document.querySelector('.sFilter .current-slide-js');
				if (!currSlideTxt) return;

				currSlideTxt.innerHTML = addZero(filterSlider.realIndex + 1);
			},
		}
	});

	//prev, next
	$('.sFilter .next-sl-js').on('click', function () {
		filterSlider.slideNext();
	});
	$('.sFilter .prev-sl-js').on('click', function () {
		filterSlider.slidePrev();
	});
	
	$('.drop-accardion-js').on('click', function(){
		$(this).parent().toggleClass('active')
		.find('.drop-accardion-toggle-js').toggleClass('active');
	})


	$('.accardionBlock__toggle--js').on('click', function(){
		$(this).parent().find('.accardionBlock__hiddenBlock').slideToggle();
	})

	var lastId,
		linksBlock = $(".linksBlock--js"),
		linksBlockHeight = 20,
		topMenuHeight = linksBlock.height(),
		// linksBlockHeight = linksBlock.outerHeight()+15,
		// All list items
		menuItems = linksBlock.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			// console.log(item);
			if (item.length) { return item; }
		});
		// console.log(scrollItems);
		menuItems.click(function (e) {
			var href = $(this).attr("href"),
				offsetTop = href === "#" ? 0 : $(href).offset().top;
			$('html, body').stop().animate({
				scrollTop: offsetTop
			}, 1100);
			e.preventDefault();
		});
	
		// Bind to scroll
		$(window).scroll(function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop();

			// Get id of current scroll item
			var cur = scrollItems.map(function () {
				if ($(this).offset().top < fromTop)
				return this;
				
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur[0].id : "";
			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems
					.removeClass("active").parent()
					.end().filter("[href='#" + id + "']").addClass("active");
			}
		});
		
	
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
