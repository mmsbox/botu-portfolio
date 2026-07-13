// 開いているページのURL（パス）に "/pages/" が含まれているかでJSONの場所を切り替える
let jsonPath = './data/works.json'; // 通常（トップページなど）のパス

if (window.location.pathname.includes('/pages/')) {
	jsonPath = '../data/works.json'; // pagesフォルダ内にいるときは、1つ上の階層に戻ってからdataを探す
}

// JSONを読み込んで作品を表示・フィルター
fetch(jsonPath)
	.then((res) => {
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		return res.json();
	})
	.then((data) => {
		function displayWorks(filterTag) {
			// ヒーロータイトルの書き換え（要素が存在するときだけ実行してエラー防止）
			const heroTitle = document.querySelector('.hero h1');
			if (heroTitle) {
				heroTitle.textContent = filterTag === 'All' ? 'All Works' : filterTag;
			}

			const worksList = document.getElementById('works-gallery');
			if (!worksList) return; // 要素がなければ処理を抜ける
			worksList.innerHTML = '';

			data.forEach((work) => {
				// tagsがない場合は空の配列として扱い、エラーとスキップを防ぐ
				const workTags = work.tags || [];

				// フィルターに引っかからない場合はスキップ
				if (filterTag !== 'All' && !workTags.includes(filterTag)) return;

				// カード全体の枠を作成
				const card = document.createElement('div');
				card.classList.add('work-card');

				// 1. サムネイル画像とリンクの作成
				const thumbLink = document.createElement('a');
				
				// 詳細ページのパスを安全に解決
				let detailPath = './pages/work-detail.html';
				if (window.location.pathname.includes('/pages/')) {
					detailPath = './work-detail.html';
				}
				
				thumbLink.href = `${detailPath}?id=${work.id}`;
				thumbLink.classList.add('work-thumb');

				const img = document.createElement('img');
				img.src = work.mockup;
				img.alt = work.title;
				thumbLink.appendChild(img);
				
				// カードに画像リンクを追加
				card.appendChild(thumbLink);

				// 2. タイトルの作成
				const title = document.createElement('p');
				title.textContent = work.title;
				title.classList.add('work-title');
				card.appendChild(title);

				// 3. タグの作成（データが存在する場合のみ生成して追加）
				if (work.tags && work.tags.length > 0) {
					const tagsDiv = document.createElement('div');
					tagsDiv.classList.add('tags');
					tagsDiv.textContent = work.tags.join(' / ');
					card.appendChild(tagsDiv);
				}

				// 最後にリストへカードを挿入
				worksList.appendChild(card);
			});
		}

		// フィルターボタンのイベントを設定
		document.querySelectorAll('.filter-btn').forEach((btn) => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
				btn.classList.add('active');
				displayWorks(btn.dataset.tag);
			});
		});

		// 初期表示として全作品を表示
		displayWorks('All');
	})
	.catch((err) => {
		console.error('作品データの読み込みに失敗しました:', err);
	});