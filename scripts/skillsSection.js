
document.addEventListener('DOMContentLoaded', () => {
	const links = document.querySelectorAll("a:not([target='_blank']):not([href^='#'])");

	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = link.href;

			document.body.classList.add('fade-out');

			setTimeout(() => {
				window.location.href = href;
			}, 500); // フェードアウトの時間に合わせてね
		});
	});

	// フェードイン
	document.body.classList.add('loaded');
});










document.addEventListener('DOMContentLoaded', () => {
	// ✅ トップボタンアニメーション（右下くま）
	const topButton = document.querySelector('.top-button');

	topButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
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

	const bubble = document.createElement('div');
	bubble.className = 'bubble';
	bubble.innerText = 'Top!';
	topButton.appendChild(bubble);

	const showBubble = () => {
		bubble.classList.add('show');
		setTimeout(() => bubble.classList.remove('show'), 1500);
	};
	setInterval(showBubble, 3000);


	// ================= ✅ 飛行機アニメーション（スクロールで発火） ====================

	console.log('✅ DOM fully loaded');

	const target = document.querySelector('.message');
	console.log('🎯 message element:', target);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log('💥 INTERSECTING!');

					const planeBig = document.querySelector('.paperplane');
					const planeSmall = document.querySelector('.paperplane-s');
					if (planeBig) planeBig.style.animation = 'flyPaperPlane 3s ease-in-out forwards';
					if (planeSmall) planeSmall.style.animation = 'flyPaperPlaneS 3s ease-in-out forwards';

					const airplaneWrapper = document.querySelector('.airplane-wrapper');
					airplaneWrapper.style.opacity = '1';
					airplaneWrapper.style.animation = 'loopAirplane 10s ease-in-out forwards';

					const airplaneImg = document.querySelector('.airplane');
					if (airplaneImg) airplaneImg.style.opacity = '1';

					setTimeout(() => {
						document.querySelector('.speech1').classList.add('show');
					}, 1000);

					setTimeout(() => {
						document.querySelector('.speech2').classList.add('show');
					}, 3500);

					setTimeout(() => {
						document.querySelector('.speech3').classList.add('show');
					}, 5000);
				}
			});
		},
		{threshold: 0.1}
	);

	if (target) {
		observer.observe(target);
		console.log('👀 observer set');
	} else {
		console.warn('⚠️ .message not found!');
	}
});

//.code-contentからスクロールで.space-messageに入ると発火。

document.addEventListener('DOMContentLoaded', () => {
	const target = document.querySelector('.space-message');

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('active');

					// 一度だけでよければ解除
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.4, // 40%見えたら発火
		}
	);

	if (target) observer.observe(target);
});


// ＝＝＝＝＝＝　code-content アニメーション　＝＝＝＝＝＝＝

document.addEventListener('DOMContentLoaded', () => {
	const target = document.querySelector('.code-message'); // ← section全体でOK

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log('💨 雲出動！');

					// 雲たちにアニメーション付ける
					document.querySelectorAll('.code-cloud').forEach((cloud) => {
						cloud.style.animationPlayState = 'running';
					});

					// 雲が流れたあとに .code-content を表示
					setTimeout(() => {
						document.querySelector('.code-content').classList.add('active');
					}, 3000);

					observer.unobserve(entry.target); // 一度だけでOK
				}
			});
		},
		{threshold: 0.5}
	);

	if (target) observer.observe(target);
});

// 宇宙の星（bg）
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.star-field');

	for (let i = 0; i < 40; i++) {
		const star = document.createElement('div');
		star.classList.add('star');

		// ランダムな位置＆大きさ
		star.style.top = `${Math.random() * 100}%`;
		star.style.left = `${Math.random() * 100}%`;
		star.style.width = `${Math.random() * 2 + 1}px`;
		star.style.height = star.style.width;
		star.style.animationDelay = `${Math.random() * 3}s`;

		container.appendChild(star);
	}
});

// 流れ星アニメーション

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.space-message');

	function createShootingStar() {
		const star = document.createElement('div');
		star.classList.add('shooting-star');

		// ランダム位置（画面上半分〜全体）
		const top = Math.random() * 80 + 10; // 10%〜90%
		const left = Math.random() * 80; // 0〜80%

		star.style.top = `${top}%`;
		star.style.left = `${left}%`;

		// 追加してアニメーション
		container.appendChild(star);

		// アニメ後に削除
		setTimeout(() => {
			container.removeChild(star);
		}, 2000); // アニメ1.5s + 少し余裕
	}

	// ランダムな間隔で星を降らせる
	setInterval(() => {
		if (Math.random() < 0.4) {
			// 約40%の確率で降る
			createShootingStar();
		}
	}, 3000); // 3秒ごとに判定（実際の星の頻度調整はここ）
});


const messageContent = document.querySelector('.message-content');

// 開始トリガー
const startTrigger = document.createElement('div');
startTrigger.style.position = 'absolute';
startTrigger.style.top = '30%';
startTrigger.style.width = '100%';
startTrigger.style.height = '1px';
document.querySelector('.message').appendChild(startTrigger);

// 終了トリガー
const endTrigger = document.createElement('div');
endTrigger.style.position = 'absolute';
endTrigger.style.bottom = '30%';
endTrigger.style.width = '100%';
endTrigger.style.height = '1px';
document.querySelector('.message').appendChild(endTrigger);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.target === startTrigger && entry.isIntersecting) {
      messageContent.classList.add('visible'); // 表示
    }
    if (entry.target === endTrigger && entry.isIntersecting) {
      messageContent.classList.remove('visible'); // 非表示
    }
  });
});

observer.observe(startTrigger);
observer.observe(endTrigger);