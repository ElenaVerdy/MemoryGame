(function memoryGame(options) {
	var startButton = document.createElement("button");
	startButton.innerHTML = "Start";
	startButton.classList.add("start-button");
	var container = document.getElementById("container");
	container.appendChild(startButton);
	cardsOrder = [];
	timerId = null;
	container.onselectstart = function(event){return false};

	var gameBar = new GameBar();
	startButton.addEventListener("click", ()=>{
		gameBar.setPlayScore(0)
		createInterface();
		shuffleCards();
		quitButton = document.getElementsByClassName("quit-button")[0];
		quitButton.addEventListener("click", function() {
			container.removeChild(container.children[1]);
			container.removeChild(container.children[1]);
			cardsOrder = [];
			if (timerId) clearTimeout(timerId);
			timerId = null;
			startButton.classList.toggle("not-displayed");
		});
		})
														

	container.onclick = function(event) {
		if (!event.target.classList.contains("hint")) return;
		event.target.style.visibility = "hidden";
		gameBar.hint();
	};

		document.getElementsByClassName("hints");

		var selected1 = null;
		var inProcess = null;

		function reveal(event) {

			var tds = [].slice.call(container.getElementsByTagName("td"));
			if (inProcess) return;
			if (!event.target.classList.contains("cover")) return;

			if (!timerId) gameBar.timerStart();
			if (!selected1) {
				selected1 = event.target.parentElement;
				event.target.style.visibility = "hidden";
				return;
			} else {
				var selected2 = event.target.parentElement;
				event.target.style.visibility = "hidden";

						if (selected1.className !== selected2.className) {
							inProcess = setTimeout(()=>{
								inProcess = null;
								selected1.children[0].style.visibility = "visible";
								selected2.children[0].style.visibility = "visible";
								selected1 = selected2 = null;
							}, 1000)
						} else {
							gameBar.updScore(2);
							if (gameBar.checkForTheWin()) gameBar.gameOver();
							selected1 = selected2 = null;
							};
				};
			};

		function GameBar() {
			var playerScore = 0;
			this.hint = function(){
				var imgs = [].slice.call(document.getElementsByTagName("img"));
				for (var i = 0; i < imgs.length; i++) {
					(function(i){
						setTimeout(()=>{
							imgs[i].classList.toggle("not-displayed");
							setTimeout(()=>{
								imgs[i].classList.toggle("not-displayed")
							},1500)

						},i*50);
					})(i)
				}}




			this.setPlayScore = function(num){
				playerScore = num;
			}

			this.gameOver = function(){
				clearTimeout(timerId);
				var congrats = document.createElement("div");
				congrats.classList.add("congrats");
				document.getElementById("container").appendChild(congrats);
				congrats.innerHTML = `You won!<br>Congratulations!`
				congrats.addEventListener("click", event=>{
					congrats.parentElement.removeChild(congrats)
				});
			};

			this.checkForTheWin = function(){
				if (playerScore === 48) return true;
			};

			this.timerStart = function (){
				var time = 0;
				timerId = setInterval(()=>{
					time +=1;
					var seconds = time%60;
					var minutes = (time-(seconds))/60;
					var str =  `${("00"+minutes).slice(-2)}:${("00"+seconds).slice(-2)}`;
					document.getElementsByClassName("timer")[0].innerHTML = str;
				}, 1000)
			};

			this.updScore = function(number) {
				var score = document.getElementsByClassName("score")[0];
				playerScore += number;
				score.innerHTML = `Score: ${playerScore}`;
				};
			};


		function shuffleCards() {
			for (var i = 0; i < 24; i++) {
				cardsOrder.push(i,i);
			}
			cardsOrder.sort((a,b)=>{return Math.random()-0.5})

			var tds = [].slice.call(container.getElementsByTagName("td"));
			for (var i = 0; i < cardsOrder.length; i++) {
				tds[i].classList.add("picture"+cardsOrder[i]);
				tds[i].style.backgroundImage = `url(${cardsOrder[i]}.png)`;
				}
			return tds;
			};

		function createInterface(){
			startButton.classList.toggle("not-displayed");
			var playground = document.createElement("div");
			playground.classList.add("playground");
			container.appendChild(playground);

			var table = document.createElement("table");
			table.setAttribute("cellspacing", "0px")
			for (var i = 0; i < 6; i++) {
				var tr = document.createElement("tr");
				for (var j = 0; j < 8; j++) {
					var td = document.createElement("td");
					var img = document.createElement("img");
					img.classList.add("cover")
					td.appendChild(img);
					tr.appendChild(td);
				}
				table.appendChild(tr);
			}
			playground.appendChild(table);
			table.addEventListener("click", reveal);
			var gameBar = document.createElement("div");
			gameBar.classList.add("game-bar");
			container.appendChild(gameBar);

			var hintBlock = document.createElement("div");
			hintBlock.classList.add("hint-block");
			gameBar.appendChild(hintBlock);

			for (var i = 0; i < 3; i++) {
				var hint = document.createElement("img");
				hint.classList.add("hint");

				hintBlock.appendChild(hint);
			}

			var quitButton = document.createElement("button");
			quitButton.innerHTML = "Quit";
			quitButton.classList.add("quit-button");
			gameBar.appendChild(quitButton);

			var timer = document.createElement("div");
			timer.innerHTML = "00:00";
			timer.classList.add("timer");
			gameBar.appendChild(timer);

			var score = document.createElement("div");
			score.innerHTML = "Score: 0";
			score.classList.add("score");
			gameBar.appendChild(score);
			};

	})();