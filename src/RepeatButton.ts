namespace EnglishForKids{
	export class RepeatButton{
		private button: HTMLButtonElement;

		constructor(query, callback){
			this.button = $(query) as HTMLButtonElement;
			this.button.addEventListener('click', callback);
		}

		public show = () => {
			this.button.style.display="block";
		}

		public hide = () => {
			this.button.style.display="none";
		}
	}
}