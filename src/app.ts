//// <reference path="CategoryCard.ts" />
//// <reference path="BurgerMenu.ts" />
namespace EnglishForKids {
	class App {
		private root: HTMLDivElement;
		private cardsField: HTMLDivElement;
		private statisticField: HTMLDivElement;
		private starsField: HTMLDivElement;
		private correctAlarm = new Audio();
		private errorAlarm = new Audio();
		private burger: BurgerMenu;
		private endgameModal: EndgameModal;
		private modeButton: ModeButton;
		private startGameButton: StartGameButton;
		private repeatButton: RepeatButton;
		private staticTable: StatisticTable;
		private difficultWordButton: DifficultWordButton;
		private resetButton: ResetButton;

		private wordData: Section[];
		private categories: CategoryCard[];
		private wordStatistic: WordStatistics;

		private isTrain = false;
		private isGame = false;
		private currentCategory: CategoryCard = null;
		private currentWordSet: WordCard[] = [];
		private mistakesCount: number = 0;

		constructor(query: string) {
			this.root = $(query) as HTMLDivElement;
			this.cardsField = this.root.querySelector('.cards-field');
			this.statisticField = this.root.querySelector('.statistic');
			this.starsField = this.root.querySelector('.stars');
			this.errorAlarm.src = `assets/error.mp3`;
			this.correctAlarm.src = `assets/correct.mp3`;

			(async () => {
				this.wordData = await this.getWordsData();
				this.categories = this.wordData.map((item, index) => new CategoryCard(item, index));

				this.wordStatistic = WordStatistics.Create(this.wordData);
				console.log(this.wordStatistic);
				this.staticTable = new StatisticTable('.statistic__table', this.wordStatistic);
				this.showAllCategories();

				this.burger = new BurgerMenu(
					'.burger',
					'.burger-menu',
					this.categories,
					this.showAllCategories.bind(this),
					this.showCategoryWords.bind(this),
					this.showStatistic.bind(this)
				);
			})();

			this.endgameModal = new EndgameModal('.endgame-modal-cover');
			this.modeButton = new ModeButton(
				'.mode',
				this.changeMode.bind(this)
			)

			this.startGameButton = new StartGameButton(
				'.button-start',
				(() => this.startGame(this.currentWordSet)).bind(this)
			)

			this.repeatButton = new RepeatButton(
				'.button-repeat',
				this.repeat.bind(this)
			)

			this.difficultWordButton = new DifficultWordButton(
				'.repeat',
				(() => { this.showDifficultWords(); }).bind(this)
			)

			this.resetButton = new ResetButton(
				'.button-reset',
				this.resetWords.bind(this)
			)

			this.cardsField.addEventListener('click', this.categoryClickHande);
		}

		startGame = (words: WordCard[]) => {
			this.isGame = true;
			this.startGameButton.hide();
			this.repeatButton.show();
			this.currentWordSet = words.slice().sort((a, b) => Math.random() - 0.5);
			this.repeat();

			this.cardsField.addEventListener('click', this.pickGuessedWord);
		}

		pickGuessedWord = (e: MouseEvent) => {
			const closest: HTMLDivElement = (e.target as HTMLDivElement).closest('.word-card-wrap');
			if (closest && !closest.classList.contains('inactive')) {
				const isCorrect = closest === this.currentWordSet[0].node;
				this.wordStatistic.addInfo(this.currentWordSet[0].word.word, isCorrect);
				if (isCorrect) {
					this.correctAlarm.play();
					this.addStar(true);
					closest.classList.add('inactive');
					this.currentWordSet.shift();

					if (this.currentWordSet.length === 0) {
						this.endgameModal.show(this.mistakesCount);
						setTimeout(() => {
							this.endgameModal.hide();
							this.endGame();
							this.burger.switchMenu();
						}, 3000);
					} else {
						setTimeout(() => this.repeat(), 1000);
					}
				} else {
					this.errorAlarm.play();
					this.addStar(false);
					this.mistakesCount++;
				}


			}
		}

		endGame = () => {
			this.isGame = false;
			this.repeatButton.hide();
			this.starsField.innerHTML = "";
			this.mistakesCount = 0;
			this.cardsField.removeEventListener('click', this.pickGuessedWord);
			for (const element of this.cardsField.children) {
				element.classList.remove('inactive');
			};
			this.currentWordSet = [];
			this.wordStatistic.save();
		}

		repeat = () => {
			this.currentWordSet[0].play();
		}

		addStar = (isCorrect: boolean) => {
			const star = document.createElement('div');
			(isCorrect) ? star.classList.add('star__win') : star.classList.add('star');
			this.starsField.prepend(star);
		}

		showStatistic = () => {
			if (this.isGame) { this.endGame() };
			this.cardsField.classList.remove('shown');
			this.statisticField.classList.add('shown');
			this.staticTable.fillTable();
		}

		hideStatistic = () => {
			this.cardsField.classList.add('shown');
			this.statisticField.classList.remove('shown');
		}

		categoryClickHande = (e: MouseEvent) => {
			const closest = (e.target as HTMLDivElement).closest('.section-card');
			if (closest) {
				const index = parseInt(closest.getAttribute('data-index'));
				this.showCategoryWords(index);
				this.burger.markCategory(this.currentCategory.name);
			}
		}

		changeMode = () => {
			if (this.isGame) { this.endGame(); };
			this.isTrain = !this.isTrain;
			if (this.isTrain && this.currentWordSet) {
				this.startGameButton.show();
			} else {
				this.startGameButton.hide();
			}
			for (let i = 0; i < this.cardsField.children.length; i++) {
				this.cardsField.children[i].classList.toggle('train');
			}
		};

		resetWords = () => {
			this.wordStatistic.reset();
			this.staticTable.fillTable();
		}

		showDifficultWords = () => {
			let cacheEnteties: Array<[string, WordRecord]> = Object.entries(this.wordStatistic.cache);
			cacheEnteties = cacheEnteties
				.filter(item => (item[1].clicks > 0 && item[1].percent < 90))
				.sort((a, b) => (a[1].percent - b[1].percent))
				.slice(0, 8);

			if (cacheEnteties.length === 0) {
				alert("No difficult words");
				return;
			}

			const words: string[] = cacheEnteties.map(i => i[0]);
			const wordCards: WordCard[] = this.categories.reduce((arr, cat) => arr.concat(cat.words), [])
				.filter(item => words.includes(item.word.word));

			this.showWords(wordCards);
		}

		showCategoryWords = (index: number) => {
			this.currentCategory = this.categories[index];
			const words: WordCard[] = this.currentCategory.words;
			this.showWords(words);
		}

		showWords = (words: WordCard[]) => {
			this.hideStatistic();
			if (this.isGame) this.endGame();
			this.cardsField.innerHTML = "";

			if (this.isTrain) {
				this.startGameButton.show();
			} else {
				this.startGameButton.hide();
			}

			this.currentWordSet = words;
			words.sort((a, b) => Math.random() - 0.5);
			words.forEach(item => {
				if (this.isTrain) {
					item.node.classList.add('train');
				} else {
					item.node.classList.remove('train');
				}
				this.cardsField.append(item.node)
			})
		}

		showAllCategories = () => {
			this.hideStatistic();
			if (this.isGame) this.endGame();
			this.currentCategory = null;
			this.currentWordSet = null;
			this.startGameButton.hide();
			this.cardsField.innerHTML = "";
			this.categories.forEach(item => {
				if (this.isTrain) {
					item.node.classList.add('train');
				} else {
					item.node.classList.remove('train');
				}
				this.cardsField.append(item.node);
			});
		}

		getWordsData = async (): Promise<Section[]> => {
			const text = await (await fetch('data/cards.js')).text();
			const data: Section[] = eval(text);
			return data;
		}
	}

	export const $ = (query: string) => document.querySelector(query);
	export function randomInt(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}
	export interface Word {
		word: string,
		translation: string,
		image: string,
		audioSrc: string
	}
	export interface Section {
		sectionName: string,
		data: Array<Word>
	}


	const APP = new App('.app');
}
