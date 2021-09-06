namespace EnglishForKids {
	export class WordStatistics {
		public cache = {};

		public static Create(wordData: Section[]) {
			let cache = JSON.parse(localStorage.getItem("words_stat"));
			const obj = new WordStatistics();
			if (!cache) {
				wordData.forEach(item => {
					const currentCategory = item.sectionName;
					item.data.forEach(w => {
						obj.cache[w.word] = {
							translation: w.translation,
							category: currentCategory,
							clicks: 0,
							correct: 0,
							errors: 0,
							percent: 0
						}
					})
				});
			} else {
				obj.cache = cache;
			}
			obj.save();
			return obj;
		}

		private constructor() {

		}

		addInfo(word: string, isCorrect: boolean) {
			const current: WordRecord = this.cache[word];
			current.clicks++;
			isCorrect ? current.correct++ : current.errors++;
			current.percent = Math.round((current.correct / current.clicks) * 100)
		}

		reset = () => {
			for (const key in this.cache) {
				this.cache[key].clicks = 0;
				this.cache[key].correct = 0;
				this.cache[key].errors = 0;
				this.cache[key].percent = 0;
			}
			this.save();
		}

		save = () => {
			localStorage.setItem('words_stat', JSON.stringify(this.cache));
		}
	}

	export interface WordRecord {
		translation: string,
		category: string,
		clicks: number,
		correct: number,
		errors: number,
		percent: number
	}
}