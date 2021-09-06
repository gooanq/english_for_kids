//// <reference path="app.ts" />

namespace EnglishForKids {
	export class WordCard {
		private audio: HTMLAudioElement = new Audio();
		public node: HTMLDivElement;
		public word: Word

		constructor(word: Word) {
			this.word = word;
			this.node = this.createElement(word)
		}

		private createElement = (word: Word): HTMLDivElement => {
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

			const card: HTMLDivElement = element.querySelector('.word-card');
			const btn: HTMLButtonElement = element.querySelector('.word-card__button');
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
					if(element.classList.contains('train')) return;
					this.play();
			});

			return element
		}

		play = () => {this.audio.play();}
	}
}