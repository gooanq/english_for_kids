namespace EnglishForKids {
	export class ModeButton {
		private button: HTMLDivElement;

		constructor(query, callback) {
			this.button = $(query) as HTMLDivElement;

			this.button.addEventListener('click', ()=>{
				this.clickHandle();
				callback();
			});
		}


		activate = () => {
			this.button.dispatchEvent(new MouseEvent('click'));
		}
		
		clickHandle = () =>{
			this.button.classList.toggle('train');
		}
	}
}