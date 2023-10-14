let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");

let startNewGameBtn = document.getElementById("startNewGame");
let pauseGameBtn = document.getElementById("pauseGame");

let squares = document.querySelectorAll(".square");

let gameMusic = new Audio("./gameMusic.mp3");
let hitMusic = new Audio("./hitMusic.mp3");

let score = 0;
let timeLeft = 0;
let hitPosition = null;

let timerId = null;
let randomMoleId = null;

// polace the mole at random place
function randomMolePosition() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

function countDown() {
  timeLeft--;
  timeLeftH2.innerText = `Time Left: ${timeLeft}`;

  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(randomMoleId);
  }
}
randomMolePosition();

// start the game
function startGame() {
  score = 0;
  timeLeft = 60;
  pauseGameBtn.style.display = "block";
  scoreH2.innerText = `Your Score: 0`;
  timeLeft.innerText = `Time Left: 60`;
  pauseGameBtn.innerText = "Pause";
  gameMusic.play();

  //callback
  // setInterval calls function at regular interval
  timerId = setInterval(randomMolePosition, 1000);
  randomMoleId = setInterval(countDown, 1000);
}

function pauseResumeGame() {
  if (pauseGameBtn.textContent === "Pause") {
    gameMusic.pause();
    clearInterval(timerId);
    clearInterval(randomMoleId);

    timerId = null;
    randomMoleId = null;

    pauseGameBtn.textContent = "Resume";
  } else if (pauseGameBtn.textContent === "Resume") {
    gameMusic.play();
    timerId = setInterval(randomMolePosition, 1000);
    randomMoleId = setInterval(countDown, 1000);

    pauseGameBtn.textContent = "Pause";
  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (square.id === hitPosition) {
        hitMusic.play();
        setTimeout(() => {
          hitMusic.pause();
        }, 1000);
        score++;
        scoreH2.innerText = `Your Score ${score}`;
        hitPosition = null;
      }
    }
  });
});

startNewGameBtn.addEventListener("click", startGame);
pauseGameBtn.addEventListener("click", pauseResumeGame);
