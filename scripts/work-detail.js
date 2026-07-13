'use strict';

document.addEventListener('DOMContentLoaded', () => {
	// ======================
	// フェードアウトリンク遷移
	// ======================
	const links = document.querySelectorAll("a:not([target='_blank']):not([href^='#'])");

	links.forEach((link) => {
		const href = link.href;
		const current = window.location.href;

		if (href !== current) {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				document.body.classList.add('fade-out');
				setTimeout(() => {
					window.location.href = href;
				}, 500);
			});
		}
	});

	document.body.classList.add('loaded');
	// ======================
	// JSONから作品データ取得
	// ======================
	const params = new URLSearchParams(window.location.search);
	const workId = params.get('id');

	fetch('/data/works.json')
		.then((res) => res.json())
		.then((data) => {
			const work = data.find((w) => w.id === workId);
			const main = document.getElementById('work-detail');
			if (!work) {
				main.innerHTML = '<p>作品が見つかりませんでした。</p>';
				return;
			}
			main.innerHTML = `
          <div class="mockup-area slider">
    <img src="${work.mockup}" alt="Webサイトモックアップ画像">
    ${work.card_mockup ? `<img src="${work.card_mockup}" alt="名刺モックアップ">` : ''}
  </div>
  <div class="work-info">
    <h2>${work.title}</h2>

    <div class="work-block"><h3 class="block-title">🕑 制作期間</h3><p>${work.period}</p></div>
    <div class="work-block"><h3 class="block-title">🎯 ターゲット</h3><p>${work.target}</p></div>
    <div class="work-block"><h3 class="block-title">📝 目的</h3><p>${work.purpose}</p></div>
    <div class="work-block"><h3 class="block-title">⚠️ 制作課題・問題</h3><p>${
		Array.isArray(work.problem)
			? work.problem.map((p) => p.replace(/\n/g, '<br>')).join('<br>')
			: work.problem.replace(/\n/g, '<br>')
	}</p></div>
    <div class="work-block"><h3 class="block-title">💡 制作ポイント</h3><p>${
		work.points ? work.points.replace(/\n/g, '<br>') : ''
	}</p></div>
    <div class="work-block"><h3 class="block-title">🔧 使用ツール</h3><p>${work.tools}</p></div>

    ${
		work.code_url
			? `
    <div class="code-link">
      <a href="${work.code_url}" target="_blank" class="view-code-btn">
        👀 コーディングデモを見る
      </a>
    </div>
	`
			: ''
	}
  </div>

            </div>
            <div class="site-images">
              <div class="pc-site">
                <img src="${work.pc_image}" alt="PCサイト全体" class="zoom-img">
                <p>💻 PCサイト全体</p>
				 <small class="zoom-note">👆クリックで拡大できます</small>
              </div>
              <div class="sp-site">
                <img src="${work.sp_image}" alt="SP版全体" class="zoom-img">
                <p>📱 SP版全体</p>
				 <small class="zoom-note">👆クリックで拡大できます</small>
              </div>
            </div>
          `;
			const others = data.filter((w) => w.id !== workId).slice(0, 6);
			document.getElementById('other-works').innerHTML = `
        <div class="other-works-box">
          <h3>🧁 Other Works</h3>
          <div class="other-works-list">
            ${others
				.map(
					(o) => `
                  <a href="work-detail.html?id=${o.id}" class="other-work-thumb">
                    <img src="${o.mockup}" alt="${o.title}">
                    <span>${o.title}</span>
                  </a>
                `
				)
				.join('')}
          </div>
          <a href="works.html" class="view-all-btn">View All</a>
        </div>
      `;
			// ★ ここでスライダー初期化
			initMockupSlider();
		});

	// ======================
	// ズーム表示（モーダル）
	// ======================
	const modalHTML = `
    <div id="modal" class="modal scroll-modal">
      <span id="modal-close">&times;</span>
      <div class="modal-scroll-container">
        <img id="modal-img" class="modal-full" />
      </div>
    </div>
  `;
	document.body.insertAdjacentHTML('beforeend', modalHTML);

	const modal = document.getElementById('modal');
	const modalImg = document.getElementById('modal-img');
	const closeBtn = document.getElementById('modal-close');

	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('zoom-img')) {
			modal.style.display = 'block';
			setTimeout(() => {
				modal.classList.add('show');
			}, 10);
			modalImg.src = e.target.src;
			document.body.style.overflow = 'hidden';
		}
	});

	closeBtn.onclick = () => {
		modal.classList.remove('show');
		setTimeout(() => {
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
		}, 500);
	};

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			modal.classList.remove('show');
			setTimeout(() => {
				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}, 500);
		}
	});

	modal.onclick = (e) => {
		if (e.target === modal) {
			modal.classList.remove('show');
			setTimeout(() => {
				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}, 500);
		}
	};

	// ======================
	// フェードスライダー（mockupエリア）
	// ======================
	function initMockupSlider() {
		const container = document.querySelector('.mockup-area.slider');
		if (container) {
			const imgs = container.querySelectorAll('img');
			if (imgs.length > 0) {
				let current = 0;
				imgs.forEach((img, i) => {
					img.style.opacity = i === 0 ? '1' : '0';
					img.style.zIndex = i === 0 ? '2' : '1';
					img.style.position = 'absolute';
					img.style.top = 0;
					img.style.left = 0;
					img.style.transition = 'opacity 1s ease';
					img.style.width = '100%';
					img.style.height = 'auto';
				});
				container.style.position = 'relative';
				container.style.aspectRatio = '16 / 9';
				container.style.overflow = 'hidden';
				setInterval(() => {
					imgs[current].style.opacity = '0';
					imgs[current].style.zIndex = '1';
					current = (current + 1) % imgs.length;
					imgs[current].style.opacity = '1';
					imgs[current].style.zIndex = '2';
				}, 3000);
			}
		}
	}
});
