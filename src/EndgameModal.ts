namespace EnglishForKids{
	export class EndgameModal{
		private failure = new Audio();
		private success = new Audio();

		private body: HTMLDivElement;
		private message: HTMLDivElement;
		private image: HTMLImageElement;

		constructor(query: string){
			this.body = $(query) as HTMLDivElement;
			this.message = this.body.querySelector('.endgame-modal__info');
			this.image = this.body.querySelector('.endgame-modal__picture');
			this.failure.src = `assets/failure.mp3`;
			this.success.src = `assets/success.mp3`;
		}

		show = (errorCount: number) => {
			if(errorCount === 0){
				this.message.textContent = "Congratulations!";
				this.image.src = "assets/win.jpg";
				this.success.play();
			}else{
				this.message.textContent = `${errorCount} errors!`;
				this.image.src = "assets/lose.jpg";
				this.failure.play();
			}

			this.body.classList.add('shown');
		}

		hide = () => this.body.classList.remove('shown');
	}
}