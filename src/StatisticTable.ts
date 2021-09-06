namespace EnglishForKids {
	export class StatisticTable {
		private table: HTMLTableElement;
		private body;
		private wordStatistic: WordStatistics;
		private sort: boolean[] = [];

		constructor(query, wordStatistic: WordStatistics) {
			this.table = $(query) as HTMLTableElement;
			this.body = this.table.querySelector('tbody');
			this.wordStatistic = wordStatistic;

			const head = this.table.querySelector('thead');
			for(const th in head.children) this.sort.push(false);
			head.addEventListener('click', this.headerClickHandle);
			this.fillTable();
		}

		headerClickHandle = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest('th');
			const i = Array.from(target.parentElement.children).indexOf(target);
			const isNumber: boolean = Boolean(target.dataset.number);
			const sortCallback = (isNumber) ?
				(a, b) => parseInt(a.children[i].textContent) - parseInt(b.children[i].textContent) :
				(a, b) => (a.children[i].textContent > b.children[i].textContent) ? 1 : -1;

			const newOrder = (this.sort[i]) ? Array.from(this.body.children).sort(sortCallback).reverse() : Array.from(this.body.children).sort(sortCallback);
			this.sort[i] = !this.sort[i];
			this.body.append(...newOrder);
		}

		fillTable = () => {
			this.body.innerHTML = '';
			for (const word in this.wordStatistic.cache) {
				const row = this.createTableRow(word, this.wordStatistic.cache[word]);
				this.body.append(row);
			}
		}

		createTableRow = (word: string, data: WordRecord): HTMLTableRowElement => {
			const row = document.createElement('tr');
			row.setAttribute('data-word', word);
			row.innerHTML = `
				<td>${word}</td>
				<td>${data.translation}</td>
				<td>${data.category}</td>
				<td>${data.clicks}</td>
				<td>${data.correct}</td>
				<td>${data.errors}</td>
				<td>${data.percent}%</td>
			`
			return row;
		}
	}
}