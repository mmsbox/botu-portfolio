document.addEventListener('DOMContentLoaded', () => {
	const links = document.querySelectorAll("a:not([target='_blank']):not([href^='#'])");

	// 🌟 ナビ背景切り替え
	const header = document.querySelector('header');
	window.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// ✅ リンク遷移フェード
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = link.href;

			document.body.classList.add('fade-out');

			setTimeout(() => {
				window.location.href = href;
			}, 500);
		});
	});

	// ✅ フェードイン
	document.body.classList.add('loaded');

	// ✅ トップボタン
	const topButton = document.querySelector('.top-button');

	topButton.addEventListener('click', () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	});

	window.addEventListener('scroll', () => {
		topButton.style.opacity = window.scrollY > 300 ? '1' : '0';
		topButton.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
	});

	const bubble = document.createElement('div');
	bubble.className = 'bubble';
	bubble.innerText = 'Top!';
	topButton.appendChild(bubble);

	const showBubble = () => {
		bubble.classList.add('show');
		setTimeout(() => bubble.classList.remove('show'), 1500);
	};

	setInterval(showBubble, 3000);

	// ✅ JSON読み込み & 表示
	Promise.all([
		fetch('./data/works.json').then((res) => res.json()),
		new Promise((resolve) => window.addEventListener('load', resolve)),
	]).then(([data]) => {
		const gallery = document.getElementById('works-gallery');
		gallery.innerHTML = '';

		data.forEach((work) => {
			const card = document.createElement('div');
			card.classList.add('work-card');

			const thumbLink = document.createElement('a');
			thumbLink.href = `pages/work-detail.html?id=${work.id}`;
			thumbLink.classList.add('work-thumb');

			const img = document.createElement('img');
			img.src = work.mockup;
			img.alt = work.title;
			thumbLink.appendChild(img);

			const title = document.createElement('p');
			title.textContent = work.title;
			title.classList.add('work-title');

			const btnLink = document.createElement('a');
			btnLink.href = `pages/work-detail.html?id=${work.id}`;
			btnLink.textContent = 'View More';
			btnLink.classList.add('view-more-btn');

			card.appendChild(thumbLink);
			card.appendChild(title);
			card.appendChild(btnLink);

			gallery.appendChild(card);
		});

		// ✅ ローディング非表示
		const loadingScreen = document.getElementById('loading-screen');
		if (loadingScreen) {
			loadingScreen.style.opacity = 0;
			setTimeout(() => {
				loadingScreen.style.display = 'none';
				document.body.classList.add('loaded');
			}, 500);
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const brush = document.querySelector('.brush');

	const handleScroll = () => {
		const triggerPoint = window.innerHeight * 0.85;
		const brushTop = brush.getBoundingClientRect().top;

		if (brushTop < triggerPoint && !brush.classList.contains('animate')) {
			brush.classList.add('animate');
		}
	};

	window.addEventListener('scroll', handleScroll);
	handleScroll(); // ページ読み込み時にもチェック！
});

