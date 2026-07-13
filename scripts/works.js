// JSONファイルは絶対パスで取得
const jsonPath = '/data/works.json';

// JSONを読み込んで作品を表示・フィルター
fetch(jsonPath)
	.then((res) => res.json())
	.then((data) => {
		function displayWorks(filterTag) {
			const heroTitle = document.querySelector('.hero h1');
			heroTitle.textContent = filterTag === 'All' ? 'All Works' : filterTag;

			const worksList = document.getElementById('works-list');
			worksList.innerHTML = '';

			data.forEach((work) => {
				if (filterTag !== 'All' && !work.tags?.includes(filterTag)) return;

				const card = document.createElement('div');
				card.classList.add('work-card');

				const thumbLink = document.createElement('a');

				// 詳細ページのリンクを動的に切り替え
				let detailPath = 'pages/work-detail.html';
				if (window.location.pathname.includes('/pages/')) {
					detailPath = 'work-detail.html';
				}
				thumbLink.href = `${detailPath}?id=${work.id}`;
				thumbLink.classList.add('work-thumb');

				const img = document.createElement('img');
				img.src = work.mockup;
				img.alt = work.title;
				thumbLink.appendChild(img);

				const title = document.createElement('p');
				title.textContent = work.title;
				title.classList.add('work-title');

				if (work.tags) {
					const tags = document.createElement('div');
					tags.classList.add('tags');
					tags.textContent = work.tags.join(' / ');
					card.appendChild(tags);
				}

				card.appendChild(thumbLink);
				card.appendChild(title);
				worksList.appendChild(card);
			});
		}

		document.querySelectorAll('.filter-btn').forEach((btn) => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
				btn.classList.add('active');
				displayWorks(btn.dataset.tag);
			});
		});

		displayWorks('All');
	})
	.catch((err) => {
		console.error('作品データの読み込みに失敗しました:', err);
	});
