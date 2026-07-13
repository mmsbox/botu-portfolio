document.addEventListener('DOMContentLoaded', () => {
	setupPageTransition();
	setupTopButton();
	setupAirplaneAnimation();
	setupSpaceMessage();
	setupCodeCloudAnimation();
	createStarField();
	setupShootingStars();
});


// ==========================
// ページ遷移フェード処理
// ==========================
function setupPageTransition() {
	const links = document.querySelectorAll("a:not([target='_blank']):not([href^='#'])");

	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = link.href;
			document.body.classList.add('fade-out');
			setTimeout(() => window.location.href = href, 500);
		});
	});

	document.body.classList.add('loaded');
}


// ==========================
// トップボタン（くまちゃん）アニメーション
// ==========================
function setupTopButton() {
	const topButton = document.querySelector('.top-button');
	const bubble = document.createElement('div');
	bubble.className = 'bubble';
	bubble.innerText = 'Top!';
	topButton.appendChild(bubble);

	topButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) {
			topButton.style.opacity = '1';
			topButton.style.pointerEvents = 'auto';
		} else {
			topButton.style.opacity = '0';
			topButton.style.pointerEvents = 'none';
		}
	});

	const showBubble = () => {
		bubble.classList.add('show');
		setTimeout(() => bubble.classList.remove('show'), 1500);
	};
	setInterval(showBubble, 3000);
}


// ==========================
// 飛行機アニメーション
// ==========================
function setupAirplaneAnimation() {
	const target = document.querySelector('.message');
	if (!target) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const planeBig = document.querySelector('.paperplane');
				const planeSmall = document.querySelector('.paperplane-s');
				if (planeBig) planeBig.style.animation = 'flyPaperPlane 3s ease-in-out forwards';
				if (planeSmall) planeSmall.style.animation = 'flyPaperPlaneS 3s ease-in-out forwards';

				const airplaneWrapper = document.querySelector('.airplane-wrapper');
				if (airplaneWrapper) {
					airplaneWrapper.style.opacity = '1';
					airplaneWrapper.style.animation = 'loopAirplane 10s ease-in-out forwards';
				}

				const airplaneImg = document.querySelector('.airplane');
				if (airplaneImg) airplaneImg.style.opacity = '1';

				setTimeout(() => document.querySelector('.speech1')?.classList.add('show'), 1000);
				setTimeout(() => document.querySelector('.speech2')?.classList.add('show'), 3500);
				setTimeout(() => document.querySelector('.speech3')?.classList.add('show'), 5000);
			}
		});
	}, { threshold: 0.1 });

	observer.observe(target);
}


// ==========================
// 宇宙セクションで発火するアニメーション
// ==========================
function setupSpaceMessage() {
	const target = document.querySelector('.space-message');
	if (!target) return;

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.4 });

	observer.observe(target);
}


// ==========================
// 雲 → コードセクション演出
// ==========================
function setupCodeCloudAnimation() {
	const target = document.querySelector('.code-message');
	if (!target) return;

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				document.querySelectorAll('.code-cloud').forEach((cloud) => {
					cloud.style.animationPlayState = 'running';
				});
				setTimeout(() => {
					document.querySelector('.code-content')?.classList.add('active');
				}, 3000);
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	observer.observe(target);
}


// ==========================
// 星の背景生成（宇宙の星）
// ==========================
function createStarField() {
	const container = document.querySelector('.star-field');
	if (!container) return;

	for (let i = 0; i < 40; i++) {
		const star = document.createElement('div');
		star.classList.add('star');
		star.style.top = `${Math.random() * 100}%`;
		star.style.left = `${Math.random() * 100}%`;
		star.style.width = `${Math.random() * 2 + 1}px`;
		star.style.height = star.style.width;
		star.style.animationDelay = `${Math.random() * 3}s`;
		container.appendChild(star);
	}
}


// ==========================
// 流れ星アニメーション
// ==========================
function setupShootingStars() {
	const container = document.querySelector('.space-message');
	if (!container) return;

	function createShootingStar() {
		const star = document.createElement('div');
		star.classList.add('shooting-star');
		star.style.top = `${Math.random() * 80 + 10}%`;
		star.style.left = `${Math.random() * 80}%`;
		container.appendChild(star);
		setTimeout(() => {
			container.removeChild(star);
		}, 2000);
	}

	setInterval(() => {
		if (Math.random() < 0.4) {
			createShootingStar();
		}
	}, 3000);
}