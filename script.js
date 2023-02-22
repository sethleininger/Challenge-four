// Welcome Page Elements ======================
const welcomeEl = document.querySelector("#welcome");
// Quiz Questions ===================
const quizContentEl = document.querySelector("#quiz-questions");
// High Score Elements ===================
const highScoresEl = document.querySelector("#highscores");
const highScoreBtnEl = document.querySelector("#highScoreBtn");
const highScoresListEl = document.querySelector("#highScoresList");
const listOfScoresEl = document.querySelector("#listOfScores");
// Initials
var initials;
// Start button is assigned to the startButton id
const startButtonEl = document.querySelector("#startButton");
// Back button is assigned to the tryAgain id
const tryAgainButtonEl = document.querySelector("#tryAgainBtn");
// Clear button is assigned to the clearHighScores id
const clearScoreButtonEl = document.querySelector("#clearHighScoresBtn");

// Quiz Questions - an array within an array =======================
let currentQuestion = 0;

let questions = [
  {
    question: " ______ is the process of finding errors and fixing them within a program",
    answers: {
      a: "Compiling",
      b: "Executing",
      c: "Debugging",
      d: "Scanning",
    },
    correctAnswer: "Debugging",
  },

  {
    question: "A loop that never ends is referred to as a(n) ______?",
    answers: {
      a: "While loop",
      b: "Infinite loop",
      c: "Recursive loop",
      d: "For loop",
    },
    correctAnswer: "Infinite loop" 
  },

  {
    question: "Javascript is a(n) ______ language.",
    answers: {
      a: "Object-oriented",
      b: "Object-based",
      c: "Procedural",
      d: "None of the obove",
    },
    correctAnswer: "Object-oriented",
  },

  {
    question: "Which of the following keywords is used to define a variable in javascript?",
    answers: {
      a: "Var",
      b: "Let",
      c: "Both a and b",
      d: "None of the obove",
    },
    correctAnswer: "Both a and b",
  },
];
// Universal =======================
const timerEl = document.querySelector("#timer");

var interval;
var time = null;
var count = 80;

let scores = JSON.parse(localStorage.getItem("user")) || [];


// Timer Countdown Functionality
function startTimer() {
  time = setInterval(updateTimer, 1000);
}

// Function to update timer incrementally
function updateTimer() {
  document.getElementById("timer").innerHTML =
  "<p> Time Left: " + count + " second(s) left</p>";
  count--;
  if (count <= 0) {
    count = 0;
    endQuiz();
  }
};


// Start Quiz Function - Timer Runs
function startQuiz() {
  startTimer();
}
// Check Answer Function
function checkAnswer(userInput) {
  console.log("The user has selected the answer: " + userInput);
  // Conditional for Correct Answer - Verification
  if (userInput === questions[currentQuestion].correctAnswer) {
    alert("Correct!");
    getNextQuestion();
  } else {
    alert("Incorrect! Penalty of 10 Seconds!");
    getNextQuestion();
    count -= 10;
  }
  currentQuestion++;
  getNextQuestion();
}

function getNextQuestion() {
  if (!questions[currentQuestion]) {
    return endQuiz();
  }
   // Insert Question Text - Heading 1
  document.getElementById("question-text").innerHTML =
    "<h1 class='question'> Q:" + 
    " " +
    questions[currentQuestion].question 
    + "</h1>";

    // Insert Options - Choice A
  document.getElementById(
    "option-1").innerHTML =
   `<button class='opt-1' data-ans="${questions[currentQuestion].answers.a}">${questions[currentQuestion].answers.a}</button>`;

  // Event Listener - Choice A
  document.querySelector(".opt-1").addEventListener("click", function () {
    var user_ans = this.getAttribute("data-ans");
    checkAnswer(user_ans);
  });
  
  // Insert Options - Choice B
  document.getElementById(
    "option-2"
    ).innerHTML = `<button class='opt-2' data-ans="${questions[currentQuestion].answers.b}">${questions[currentQuestion].answers.b}</button>`;

    // Event Listener - Choice B
  document.querySelector(".opt-2").addEventListener("click", function () {
    var user_ans = this.getAttribute("data-ans");
    checkAnswer(user_ans);
  });
  
  // Insert Options - Choice C
  document.getElementById(
    "option-3"
    ).innerHTML = `<button class='opt-3' data-ans="${questions[currentQuestion].answers.c}">${questions[currentQuestion].answers.c}</button>`;

  // Event Listener - Choice C
  document.querySelector(".opt-3").addEventListener("click", function () {
    var user_ans = this.getAttribute("data-ans");
    checkAnswer(user_ans);
  });

  // Insert Options - Choice D
  document.getElementById(
    "option-4"
    ).innerHTML = `<button class='opt-4' data-ans="${questions[currentQuestion].answers.d}">${questions[currentQuestion].answers.d}</button>`;
  
  // Event Listener - Choice D
  document.querySelector(".opt-4").addEventListener("click", function () {
    var user_ans = this.getAttribute("data-ans");
    checkAnswer(user_ans);
  });
}
  // Function to End Quiz

  function endQuiz() {
    clearInterval(time);
    initials = prompt("Enter Initials");
    alert(
      `Quiz has ended - congrats ${initials}! Your score was ${count} points.`
    );

      // High Score Functionality
    show(highScoresEl);
    hide(quizContentEl);
    hide(timerEl);

  // Grab the "user" key from localStorage
  var savedHighScores = localStorage.getItem("user");
      
  // If savedHighScores is null, set scoresArray equal to an empty array
  if (savedHighScores === null) {
    scoresArray = [];
  } else {
      // Else parse the savedHighScores with JSON.parse
    scoresArray = JSON.parse(savedHighScores);
  }

  // Sets the userScore variable equal to the initials and the score to count
  var userScore = {
      initials: initials,
      score: count,
  };
  console.log(userScore);

  // Pushes the userScore into the scoresArray

  scoresArray.push(userScore);

  // Stringify the scoresArray
  var scoresArrayString = JSON.stringify(scoresArray);
    
  // Sets localStorage item to "high scores"
  window.localStorage.setItem("high scores", scoresArrayString);
    
  // Run showHighScores() function
  showHighScores();
}   
function showHighScores() {
  hide(timerEl);
  hide(quizContentEl);
  hide(welcomeEl);
  show(highScoresEl);
  show(highScoreBtnEl);
      
  // Grab item from localStorage
  var savedHighScores = localStorage.getItem("high scores");

  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);
  // Parse the savedHighScores
  var storedHighScores = JSON.parse(savedHighScores);
  console.log(storedHighScores);
  // Loop through the saved initials and score and then append the child to the
  // highScoresEl
  for (var j = 0; j < storedHighScores.length; j++) {
    var newHighScore = document.createElement("p");
    newHighScore.innerHTML =
      "<p class='highscore'>" +
      storedHighScores[j].initials +
      " : " +
      storedHighScores[j].score +
      "</p>";
    listOfScoresEl.append(newHighScore);
  }
}

function restartQuiz() {
  clearInterval(time);
  count = 80;
    currentQuestion = 0;
    hide(timerEl);
    hide(quizContentEl);
    hide(highScoresEl);
    hide(highScoreBtnEl);
    show(welcomeEl);
}
        // Hides Elements
function hide(element) {
      element.style.display = "none";
    }

// Displays Element

function show(element) {
  element.style.display = "block";
}

if (startButtonEl) {
  // When user clicks the start button, run the following functions
  startButtonEl.addEventListener("click", function () {
    hide(welcomeEl);
    hide(highScoresEl);
    hide(highScoreBtnEl);
    show(timerEl);
    show(quizContentEl);
    startQuiz();
    getNextQuestion();
  });
}

    // When user clicks the try again button, run the following function
tryAgainButtonEl.addEventListener("click", function () {
  restartQuiz();
});

    // When user clicks the clear high scores button, run the following function
clearScoreButtonEl.addEventListener("click", function () {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("high scores");
  // hide(highScoresEl);
  listOfScoresEl.innerHTML =
    "<p> Scores have been cleared! </p>" +
    "<p> Want to try again? Click the <strong>Try Again</strong> button! </p>";
});