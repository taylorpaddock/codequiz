var buttonStart = document.getElementById("button-start"); 
var start = document.getElementById("start"); 
var quiz = document.getElementById("quiz");
var quizQuestions = document.getElementById("paragraph");
var timeCounter = document.getElementById("counter");
var questionButtons = document.getElementById("question-buttons");
var timer = document.getElementById("timer");
var counter = 75;
var userScore = document.getElementById("score");
var buttonScore = document.getElementById("button-score");
var score = 0; 
var nextQuestion;
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));
var addScore = document.getElementById("addscore");

var currentIndex = 0;
var questions = [
  {
    paragraph : "What are the data types supported by JavaScript?",
    choices : ["Boolean", "Strings", "Numbers", "All the Above"],
    correct : "All the Above",
  },
  {
    paragraph : "Which built-in method reverses the order of the elements of an array?",
    choices : ["changeOrder(order)", "reverse()", "sort(order)", "function()"],
    correct : "reverse()",
  },
  {
    paragraph : "Which of the following function of Array object extracts a section of an array and returns a new array?",
    choices : ["slice()", "shift()", "some()", "filter()"],
    correct : "slice()",
  },
  {
    paragraph : "Which of the following are capabilities of functions in JavaScript?",
    choices : ["Return a value", "Accept parameters and return a value", "Accept parameters", "None of the Above"],
    correct : "Accept parameters",
  },
];

function startQuiz() {
  if (storedScores !== null) {
    allScores = storedScores;
  }
  start.style.display = "none";
  quiz.style.display = "flex";
  var nextQuestion = questions[currentIndex];
  console.log(nextQuestion.paragraph);
    
    displayQuestion(nextQuestion);
  
  gameTimer();
}

buttonStart.addEventListener("click", startQuiz);

function gameTimer() {
  setInterval(function(){
    timer.innerHTML = counter;
    counter--;
  }, 1000);
}

function displayQuestion(question){
  console.log(question);
  console.log(questions.length);
  if(currentIndex === questions.length - 1){
    endGame()};
  quizQuestions.innerHTML = question.paragraph;
  question.choices.forEach(element => {
  var button = document.createElement("BUTTON");
  button.className = "button";
  button.innerHTML = element;
  questionButtons.appendChild(button);
  button.addEventListener("click", displaynextQuestion);
  });
}

function displaynextQuestion(e){
  var nextQuestion = questions[currentIndex];
  console.log(nextQuestion);
  console.log(currentIndex);
  if(currentIndex < questions.length){
      correctResponse(e.target.textContent === nextQuestion.correct);
      questionButtons.innerHTML="";
      if(currentIndex < questions.length){    
          nextQuestion = questions[currentIndex + 1];
          currentIndex++;
          displayQuestion(nextQuestion);
      }else {
          currentIndex = 0;
          displayQuestion(nextQuestion);
      }
  }else{
      console.log("endgame");
      endGame();
  }
}

function correctResponse(response){
  console.log(response)
  if(response){
      userScore = score + 10;
      console.log("Good");
  }else {
      counter = counter - 10;
      timer.innerHTML = counter;
      console.log("Wrong");
  }
}

function endGame() {
  userScore.innerText = score;
  addScore.style.display = "flex";
  timer.style.display = "none";
  quiz.style.display = "none";
}