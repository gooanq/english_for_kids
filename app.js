//// <reference path="app.ts" />
//// <reference path="CategoryCard.ts" />
var EnglishForKids;
(function (EnglishForKids) {
    class BurgerMenu {
        constructor(queryBtn, queryMenu, categories, showMenu, showCategory, showStatistic) {
            this.isActive = false;
            this.hide = () => {
                this.isActive = false;
                this.button.classList.remove('shown');
                this.menu.classList.remove('shown');
            };
            this.buttonClickHandle = (e) => {
                this.isActive = true;
                this.button.classList.toggle('shown');
                this.menu.classList.toggle('shown');
            };
            this.markCategory = (categoryName) => {
                for (const item of this.menu.children) {
                    item.classList.remove('active');
                    if (item.textContent === categoryName) {
                        item.classList.add('active');
                        return;
                    }
                }
            };
            this.switchMenu = () => { this.menu.children[0].dispatchEvent(new MouseEvent('click')); };
            this.createMenuItem = (text, callback) => {
                const element = document.createElement('div');
                element.classList.add('menu-item');
                element.textContent = text;
                element.addEventListener('click', () => {
                    if (element.classList.contains('active')) {
                        this.hide();
                    }
                    else {
                        for (const item of this.menu.children)
                            item.classList.remove('active');
                        element.classList.add('active');
                        this.hide();
                        callback();
                    }
                });
                return element;
            };
            this.button = EnglishForKids.$(queryBtn);
            this.menu = EnglishForKids.$(queryMenu);
            this.menu.append(this.createMenuItem('Main Menu', showMenu));
            categories.forEach(item => {
                const categoryMenuItem = this.createMenuItem(item.name, () => showCategory(item.index));
                this.menu.append(categoryMenuItem);
            });
            this.menu.append(this.createMenuItem('Statistic', showStatistic));
            this.menu.children[0].classList.add('active');
            document.documentElement.addEventListener('click', (e) => {
                const target = e.target;
                if (!target.closest('.burger-menu') && !target.closest('.burger') && this.isActive)
                    this.hide();
            });
            this.button.addEventListener('click', this.buttonClickHandle);
        }
    }
    EnglishForKids.BurgerMenu = BurgerMenu;
})(EnglishForKids || (EnglishForKids = {}));
//// <reference path="WordCard.ts" />
//// <reference path="app.ts" />
var EnglishForKids;
(function (EnglishForKids) {
    class CategoryCard {
        constructor(section, index) {
            this.createElement = (section, index) => {
                const element = document.createElement('div');
                element.classList.add('section-card');
                element.setAttribute('data-index', index.toString());
                const imgSrc = section.data[EnglishForKids.randomInt(0, (section.data.length - 1))].image;
                element.innerHTML = `
				<img src="data/${imgSrc}" alt="" class="section-card__image">
				<h2 class="section-card__name">${section.sectionName}</h2>
			`;
                return element;
            };
            this.name = section.sectionName;
            this.index = index;
            this.node = this.createElement(section, index);
            this.words = section.data.map(i => new EnglishForKids.WordCard(i));
        }
    }
    EnglishForKids.CategoryCard = CategoryCard;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class DifficultWordButton {
        constructor(query, callback) {
            this.button = EnglishForKids.$(query);
            this.button.addEventListener('click', () => {
                callback();
            });
        }
    }
    EnglishForKids.DifficultWordButton = DifficultWordButton;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class EndgameModal {
        constructor(query) {
            this.failure = new Audio();
            this.success = new Audio();
            this.show = (errorCount) => {
                if (errorCount === 0) {
                    this.message.textContent = "Congratulations!";
                    this.image.src = "assets/win.jpg";
                    this.success.play();
                }
                else {
                    this.message.textContent = `${errorCount} errors!`;
                    this.image.src = "assets/lose.jpg";
                    this.failure.play();
                }
                this.body.classList.add('shown');
            };
            this.hide = () => this.body.classList.remove('shown');
            this.body = EnglishForKids.$(query);
            this.message = this.body.querySelector('.endgame-modal__info');
            this.image = this.body.querySelector('.endgame-modal__picture');
            this.failure.src = `assets/failure.mp3`;
            this.success.src = `assets/success.mp3`;
            //this.body.addEventListener('click', this.hide);
        }
    }
    EnglishForKids.EndgameModal = EndgameModal;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class ModeButton {
        constructor(query, callback) {
            this.activate = () => {
                this.button.dispatchEvent(new MouseEvent('click'));
            };
            this.clickHandle = () => {
                this.button.classList.toggle('train');
            };
            this.button = EnglishForKids.$(query);
            this.button.addEventListener('click', () => {
                this.clickHandle();
                callback();
            });
        }
    }
    EnglishForKids.ModeButton = ModeButton;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class RepeatButton {
        constructor(query, callback) {
            this.show = () => {
                this.button.style.display = "block";
            };
            this.hide = () => {
                this.button.style.display = "none";
            };
            this.button = EnglishForKids.$(query);
            this.button.addEventListener('click', callback);
        }
    }
    EnglishForKids.RepeatButton = RepeatButton;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class ResetButton {
        constructor(query, callback) {
            this.button = EnglishForKids.$(query);
            this.button.addEventListener('click', () => {
                callback();
            });
        }
    }
    EnglishForKids.ResetButton = ResetButton;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class StartGameButton {
        constructor(query, callback) {
            this.show = () => {
                this.button.style.display = "block";
            };
            this.hide = () => {
                this.button.style.display = "none";
            };
            this.button = EnglishForKids.$(query);
            this.button.addEventListener('click', callback);
        }
    }
    EnglishForKids.StartGameButton = StartGameButton;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class StatisticTable {
        constructor(query, wordStatistic) {
            this.sort = [];
            this.headerClickHandle = (e) => {
                const target = e.target.closest('th');
                const i = Array.from(target.parentElement.children).indexOf(target);
                const isNumber = Boolean(target.dataset.number);
                const sortCallback = (isNumber) ?
                    (a, b) => parseInt(a.children[i].textContent) - parseInt(b.children[i].textContent) :
                    (a, b) => (a.children[i].textContent > b.children[i].textContent) ? 1 : -1;
                const newOrder = (this.sort[i]) ? Array.from(this.body.children).sort(sortCallback).reverse() : Array.from(this.body.children).sort(sortCallback);
                this.sort[i] = !this.sort[i];
                this.body.append(...newOrder);
            };
            this.fillTable = () => {
                this.body.innerHTML = '';
                for (const word in this.wordStatistic.cache) {
                    const row = this.createTableRow(word, this.wordStatistic.cache[word]);
                    this.body.append(row);
                }
            };
            this.createTableRow = (word, data) => {
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
			`;
                return row;
            };
            this.table = EnglishForKids.$(query);
            this.body = this.table.querySelector('tbody');
            this.wordStatistic = wordStatistic;
            const head = this.table.querySelector('thead');
            for (const th in head.children)
                this.sort.push(false);
            head.addEventListener('click', this.headerClickHandle);
            this.fillTable();
        }
    }
    EnglishForKids.StatisticTable = StatisticTable;
})(EnglishForKids || (EnglishForKids = {}));
//// <reference path="app.ts" />
var EnglishForKids;
(function (EnglishForKids) {
    class WordCard {
        constructor(word) {
            this.audio = new Audio();
            this.createElement = (word) => {
                const element = document.createElement('div');
                element.classList.add('word-card-wrap');
                element.innerHTML = `
					<div class="word-card">
						<img src="data/${word.image}" alt="" class="word-card__image">
						<h2 class="word-card__word">${word.word}</h2>
						<button class="word-card__button">
							<img src="assets/rotate.svg" alt="">
						</button>
					</div>
			`;
                this.audio.src = `data/${word.audioSrc}`;
                const card = element.querySelector('.word-card');
                const btn = element.querySelector('.word-card__button');
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    element.classList.add('rotated');
                    setTimeout(() => {
                        element.querySelector('.word-card__word').textContent = word.translation;
                    }, 300);
                });
                element.addEventListener('mouseleave', (e) => {
                    element.classList.remove('rotated');
                    setTimeout(() => {
                        element.querySelector('.word-card__word').textContent = word.word;
                    }, 300);
                });
                element.addEventListener('click', (e) => {
                    if (element.classList.contains('train'))
                        return;
                    this.play();
                });
                return element;
            };
            this.play = () => { this.audio.play(); };
            this.word = word;
            this.node = this.createElement(word);
        }
    }
    EnglishForKids.WordCard = WordCard;
})(EnglishForKids || (EnglishForKids = {}));
var EnglishForKids;
(function (EnglishForKids) {
    class WordStatistics {
        constructor() {
            this.cache = {};
            this.reset = () => {
                for (const key in this.cache) {
                    this.cache[key].clicks = 0;
                    this.cache[key].correct = 0;
                    this.cache[key].errors = 0;
                    this.cache[key].percent = 0;
                }
                this.save();
            };
            this.save = () => {
                localStorage.setItem('words_stat', JSON.stringify(this.cache));
            };
        }
        static Create(wordData) {
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
                        };
                    });
                });
            }
            else {
                obj.cache = cache;
            }
            obj.save();
            return obj;
        }
        addInfo(word, isCorrect) {
            const current = this.cache[word];
            current.clicks++;
            isCorrect ? current.correct++ : current.errors++;
            current.percent = Math.round((current.correct / current.clicks) * 100);
        }
    }
    EnglishForKids.WordStatistics = WordStatistics;
})(EnglishForKids || (EnglishForKids = {}));
//// <reference path="CategoryCard.ts" />
//// <reference path="BurgerMenu.ts" />
var EnglishForKids;
(function (EnglishForKids) {
    class App {
        constructor(query) {
            this.correctAlarm = new Audio();
            this.errorAlarm = new Audio();
            this.isTrain = false;
            this.isGame = false;
            this.currentCategory = null;
            this.currentWordSet = [];
            this.mistakesCount = 0;
            this.startGame = (words) => {
                this.isGame = true;
                this.startGameButton.hide();
                this.repeatButton.show();
                this.currentWordSet = words.slice().sort((a, b) => Math.random() - 0.5);
                this.repeat();
                this.cardsField.addEventListener('click', this.pickGuessedWord);
            };
            this.pickGuessedWord = (e) => {
                const closest = e.target.closest('.word-card-wrap');
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
                        }
                        else {
                            setTimeout(() => this.repeat(), 1000);
                        }
                    }
                    else {
                        this.errorAlarm.play();
                        this.addStar(false);
                        this.mistakesCount++;
                    }
                }
            };
            this.endGame = () => {
                this.isGame = false;
                this.repeatButton.hide();
                this.starsField.innerHTML = "";
                this.mistakesCount = 0;
                this.cardsField.removeEventListener('click', this.pickGuessedWord);
                for (const element of this.cardsField.children) {
                    element.classList.remove('inactive');
                }
                ;
                this.currentWordSet = [];
                this.wordStatistic.save();
            };
            this.repeat = () => {
                this.currentWordSet[0].play();
            };
            this.addStar = (isCorrect) => {
                const star = document.createElement('div');
                (isCorrect) ? star.classList.add('star__win') : star.classList.add('star');
                this.starsField.prepend(star);
            };
            this.showStatistic = () => {
                if (this.isGame) {
                    this.endGame();
                }
                ;
                this.cardsField.classList.remove('shown');
                this.statisticField.classList.add('shown');
                this.staticTable.fillTable();
            };
            this.hideStatistic = () => {
                this.cardsField.classList.add('shown');
                this.statisticField.classList.remove('shown');
            };
            this.categoryClickHande = (e) => {
                const closest = e.target.closest('.section-card');
                if (closest) {
                    const index = parseInt(closest.getAttribute('data-index'));
                    this.showCategoryWords(index);
                    this.burger.markCategory(this.currentCategory.name);
                }
            };
            this.changeMode = () => {
                if (this.isGame) {
                    this.endGame();
                }
                ;
                this.isTrain = !this.isTrain;
                if (this.isTrain && this.currentWordSet) {
                    this.startGameButton.show();
                }
                else {
                    this.startGameButton.hide();
                }
                for (let i = 0; i < this.cardsField.children.length; i++) {
                    this.cardsField.children[i].classList.toggle('train');
                }
            };
            this.resetWords = () => {
                this.wordStatistic.reset();
                this.staticTable.fillTable();
            };
            this.showDifficultWords = () => {
                let cacheEnteties = Object.entries(this.wordStatistic.cache);
                cacheEnteties = cacheEnteties
                    .filter(item => (item[1].clicks > 0 && item[1].percent < 90))
                    .sort((a, b) => (a[1].percent - b[1].percent))
                    .slice(0, 8);
                if (cacheEnteties.length === 0) {
                    alert("No difficult words");
                    return;
                }
                const words = cacheEnteties.map(i => i[0]);
                const wordCards = this.categories.reduce((arr, cat) => arr.concat(cat.words), [])
                    .filter(item => words.includes(item.word.word));
                this.showWords(wordCards);
            };
            this.showCategoryWords = (index) => {
                this.currentCategory = this.categories[index];
                const words = this.currentCategory.words;
                this.showWords(words);
            };
            this.showWords = (words) => {
                this.hideStatistic();
                if (this.isGame)
                    this.endGame();
                this.cardsField.innerHTML = "";
                if (this.isTrain) {
                    this.startGameButton.show();
                }
                else {
                    this.startGameButton.hide();
                }
                this.currentWordSet = words;
                words.sort((a, b) => Math.random() - 0.5);
                words.forEach(item => {
                    if (this.isTrain) {
                        item.node.classList.add('train');
                    }
                    else {
                        item.node.classList.remove('train');
                    }
                    this.cardsField.append(item.node);
                });
            };
            this.showAllCategories = () => {
                this.hideStatistic();
                if (this.isGame)
                    this.endGame();
                this.currentCategory = null;
                this.currentWordSet = null;
                this.startGameButton.hide();
                this.cardsField.innerHTML = "";
                this.categories.forEach(item => {
                    if (this.isTrain) {
                        item.node.classList.add('train');
                    }
                    else {
                        item.node.classList.remove('train');
                    }
                    this.cardsField.append(item.node);
                });
            };
            this.getWordsData = async () => {
                const text = await (await fetch('data/cards.js')).text();
                const data = eval(text);
                return data;
                // const data = await import('data/cards.js');
                // return data;
            };
            this.root = EnglishForKids.$(query);
            this.cardsField = this.root.querySelector('.cards-field');
            this.statisticField = this.root.querySelector('.statistic');
            this.starsField = this.root.querySelector('.stars');
            this.errorAlarm.src = `assets/error.mp3`;
            this.correctAlarm.src = `assets/correct.mp3`;
            (async () => {
                this.wordData = await this.getWordsData();
                this.categories = this.wordData.map((item, index) => new EnglishForKids.CategoryCard(item, index));
                this.wordStatistic = EnglishForKids.WordStatistics.Create(this.wordData);
                console.log(this.wordStatistic);
                this.staticTable = new EnglishForKids.StatisticTable('.statistic__table', this.wordStatistic);
                this.showAllCategories();
                this.burger = new EnglishForKids.BurgerMenu('.burger', '.burger-menu', this.categories, this.showAllCategories.bind(this), this.showCategoryWords.bind(this), this.showStatistic.bind(this));
            })();
            this.endgameModal = new EnglishForKids.EndgameModal('.endgame-modal-cover');
            this.modeButton = new EnglishForKids.ModeButton('.mode', this.changeMode.bind(this));
            this.startGameButton = new EnglishForKids.StartGameButton('.button-start', (() => this.startGame(this.currentWordSet)).bind(this));
            this.repeatButton = new EnglishForKids.RepeatButton('.button-repeat', this.repeat.bind(this));
            this.difficultWordButton = new EnglishForKids.DifficultWordButton('.repeat', (() => { this.showDifficultWords(); }).bind(this));
            this.resetButton = new EnglishForKids.ResetButton('.button-reset', this.resetWords.bind(this));
            this.cardsField.addEventListener('click', this.categoryClickHande);
        }
    }
    EnglishForKids.$ = (query) => document.querySelector(query);
    function randomInt(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    EnglishForKids.randomInt = randomInt;
    const APP = new App('.app');
})(EnglishForKids || (EnglishForKids = {}));
//# sourceMappingURL=app.js.map