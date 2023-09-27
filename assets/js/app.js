var starB = document.querySelector("#start");
var timerEL = document.querySelector("#timer");
var count = 25;
var questionEl = document.querySelector("#questions");
var optiosnEL = document.querySelector("#options");
var welcomeEL = document.querySelector("#welcomeMessage");
var scoreEl = document.querySelector("#score");
var highScoreEl = document.querySelector("#highScore");

var playerNameEl = document.querySelector("#playerName");
var submitScoreEl = document.querySelector("#submitScore");
var leaderBoardEl = document.querySelector("#leaderboardList");
var playAgainEl = document.querySelector("#playAgain");

let score = 0;
let currQuestion = 0;
let leaderBoardList = [];

var QA = [
  {
    q: "What keyword is used to declare a variable in JavaScript?",
    a: [
      { text: "var", isCorrect: true },
      { text: "cons", isCorrect: false },
      { text: "let", isCorrect: true },
      { text: "function", isCorrect: false },
    ],
  },
  {
    q: "Which operator is used for strict equality comparison in JavaScript?",
    a: [
      { text: "=", isCorrect: false },
      { text: "==", isCorrect: false },
      { text: "===", isCorrect: true },
      { text: "!=", isCorrect: false },
    ],
  },
  {
    q: "Which function is used to print a message to the console in JavaScript?",
    a: [
      { text: "console.log()", isCorrect: true },
      { text: "print()", isCorrect: false },
      { text: "alert()", isCorrect: false },
      { text: "console()", isCorrect: false },
    ],
  },
  {
    q: "What is the purpose of the if statement in JavaScript?",
    a: [
      { text: "Loop through an array", isCorrect: false },
      { text: "Declare a variable", isCorrect: false },
      { text: "Conditionally execute code", isCorrect: true },
      { text: "Declare a function", isCorrect: false },
    ],
  },
  {
    q: "What is the correct way to create an array in JavaScript?",
    a: [
      { text: "myArray = {}", isCorrect: false },
      { text: "myArray = []", isCorrect: true },
      { text: "myArray = ()", isCorrect: false },
      { text: "myArray = ''", isCorrect: false },
    ],
  },
];

submitScoreEl.style.display = "none";
playerNameEl.style.display = "none";
timerEL.style.disabled = "none";
playAgainEl.style.display = "none";
welcomeEL.textContent = "Welcome to the game!, Good luck!";

function start() {
  starB.style.display = "none";
  welcomeEL.style.display = "none";

  game();
  var timer = setInterval(function () {
    if (count > 0) {
      count--;
      timerEL.textContent = "Time: " + count;
      submitScoreEl.disabled = false;
      playerNameEl.disabled = false;
    } else {
      clearInterval(timer);
      submitScoreEl.disabled = false;
      playerNameEl.disabled = false;
    }
  }, 1000);
}

starB.addEventListener("click", start);

function game() {
  questionEl.textContent = QA[currQuestion].q;
  optiosnEL.innerHTML = "";

  for (var i = 0; i < QA[currQuestion].a.length; i++) {
    var choiceLabel = document.createElement("label");

    var choice = document.createElement("input");
    choice.type = "radio";
    choice.name = "answer";
    choice.value = i;

    choiceLabel.style.backgroundColor = "blueviolet";
    choiceLabel.style.padding = "10px";
    choiceLabel.style.margin = "5px";
    choiceLabel.style.borderRadius = "5px";
    choiceLabel.style.display = "block";
    choiceLabel.style.listStyleType = "none";

    choiceLabel.textContent = QA[currQuestion].a[i].text;

    choiceLabel.appendChild(choice);
    optiosnEL.appendChild(choiceLabel);
  }
  document.querySelectorAll("input[name='answer']").forEach(function (radio) {
    radio.addEventListener("click", function () {
      checkAnswer();
    });
  });
}

function scoreboard() {
  var scoreTotal = document.getElementById("score");
  scoreTotal.textContent = "You scored is " + score;
}

function questionflow() {
  if (currQuestion < QA.length - 1) {
    currQuestion++;
    game();
  } else {
    document.getElementById("options").remove();
    document.getElementById("questions").remove();
    submitScoreEl.style.display = "block";
    playerNameEl.style.display = "block";
    playAgainEl.style.display = "block";
    scoreboard();
  }
}

function checkAnswer() {
  var choice = parseInt(
    document.querySelector("input[name='answer']:checked").value
  );

  if (QA[currQuestion].a[choice].isCorrect) {
    score++;
  }
  questionflow();
}

function resetGame() {
  timerEL.textContent = "Time: " + count;

  submitScoreEl.style.display = "none";
  playerNameEl.style.display = "none";
  scoreEl.style.display = "none";
  starB.style.display = "block";
  welcomeEL.style.display = "block";

  playAgainEl.style.display = "none";
  leaderBoardEl.style.display = "none";
  start();
}

playAgainEl.addEventListener("click", resetGame);

function leaderboard() {
  leaderBoardEl.innerHTML = "";
  leaderBoardList.push({ name: playerNameEl.value, score: score });
  leaderBoardList.sort((a, b) => b.score - a.score);

  leaderBoardList.forEach((entry, index) => {});

  if (leaderBoardList.length > 0) {
    var playerInfo = document.createElement("li");
    playerInfo.textContent = `${
      leaderBoardList[leaderBoardList.length - 1].name
    }: ${leaderBoardList[leaderBoardList.length - 1].score}`;
    leaderBoardEl.appendChild(playerInfo);
  }
}

submitScoreEl.addEventListener("click", function () {
  submitScoreEl.style.display = "none";
  playerNameEl.style.display = "none";
  scoreEl.style.display = "none";
  timerEL.style.display = "none";
  leaderboard();
});

highScoreEl.addEventListener("click", function () {
  submitScoreEl.style.display = "none";
  playerNameEl.style.display = "none";
  scoreEl.style.display = "none";
  leaderboard();
});
