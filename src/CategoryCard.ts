//// <reference path="WordCard.ts" />
//// <reference path="app.ts" />

namespace EnglishForKids{
	export class CategoryCard{
		public node: HTMLDivElement;
		public words: WordCard[];

		public name: string;
		public index: number;
		

		constructor(section : Section, index:number){
			this.name = section.sectionName;
			this.index = index;
			this.node = this.createElement(section, index);
			this.words = section.data.map(i=>new WordCard(i));
		}

		private createElement = (section: Section, index:number): HTMLDivElement => {
			const element = document.createElement('div');
			element.classList.add('section-card');
			element.setAttribute('data-index', index.toString());
			const imgSrc = section.data[randomInt(0, (section.data.length-1))].image;
			element.innerHTML = `
				<img src="data/${imgSrc}" alt="" class="section-card__image">
				<h2 class="section-card__name">${section.sectionName}</h2>
			`;
			return element
		}
	}
}