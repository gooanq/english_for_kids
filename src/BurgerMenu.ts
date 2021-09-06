//// <reference path="app.ts" />
//// <reference path="CategoryCard.ts" />

namespace EnglishForKids {
	export class BurgerMenu {
		private menu: HTMLDivElement;
		private button: HTMLDivElement;
		private isActive = false;

		constructor(queryBtn: string, queryMenu: string, categories: CategoryCard[], showMenu, showCategory, showStatistic) {
			this.button = $(queryBtn) as HTMLDivElement;
			this.menu = $(queryMenu) as HTMLDivElement;

			this.menu.append(this.createMenuItem('Main Menu', showMenu));
			categories.forEach(item => {
				const categoryMenuItem = this.createMenuItem(item.name, () => showCategory(item.index));
				this.menu.append(categoryMenuItem);
			});
			this.menu.append(this.createMenuItem('Statistic', showStatistic));

			this.menu.children[0].classList.add('active');
			document.documentElement.addEventListener('click', (e)=>{
				const target = e.target as HTMLDivElement
				if(!target.closest('.burger-menu') && !target.closest('.burger') && this.isActive)
					this.hide();
			});
			this.button.addEventListener('click', this.buttonClickHandle);
		}


		hide = () => {
			this.isActive = false;
			this.button.classList.remove('shown');
			this.menu.classList.remove('shown');
		}
		buttonClickHandle = (e: MouseEvent) => {
			this.isActive = true;
			this.button.classList.toggle('shown');
			this.menu.classList.toggle('shown');
		}

		markCategory = (categoryName : string) =>{
			for (const item of this.menu.children){
				item.classList.remove('active');
				if(item.textContent === categoryName){
					item.classList.add('active');
					return;
				}
			}
		}

		switchMenu =  () => {this.menu.children[0].dispatchEvent(new MouseEvent('click'))}
		
		createMenuItem = (text: string, callback) => {
			const element = document.createElement('div');
			element.classList.add('menu-item');
			element.textContent = text;
			element.addEventListener('click', () => {
				if (element.classList.contains('active')) {
					this.hide();
				} else {
					for (const item of this.menu.children)
						item.classList.remove('active');
					element.classList.add('active');
					this.hide();
					callback();
				}
			});
			return element;
		}
	}
}