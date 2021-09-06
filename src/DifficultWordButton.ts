namespace EnglishForKids {
	export class DifficultWordButton {
		private button: HTMLButtonElement;

		constructor(query, callback) {
			this.button = $(query) as HTMLButtonElement;

			this.button.addEventListener('click', ()=>{
				callback();
			});
		}
		
	}
}