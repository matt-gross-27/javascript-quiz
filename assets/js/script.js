//~~~~~~~GLOBAL VARIABLES~~~~~~~

var startBtn = document.querySelector("#start");
var timeLeft = 60;
var timerEl = document.querySelector("#timer")
var score = 0;

var quizWrapperEl = document.createElement("section");
var qEl = document.createElement("h2");
var choiceListEl = document.createElement("ul");

var qNum = 0;

var qArr = [
  {
    q: 'Let stringNum = "9". Which of the following methods can be used to convert stringNum from a string to an integer?',
    choices: ["parseInt(stringNum)", "num(stringNum)", "int(stringNum)", "stringNum.toInt()"],
    a: "parseInt(stringNum)"
  } ,
  {
    q: 'JavaScript scripts can be located in what section of an html document?',
    choices: ["the body", "the head", "all of the above", "none of the above"],
    a: "all of the above"
  },
  {
    q: 'JavaScript and Java are the same language.',
    choices: ["true", "false"],
    a: "false"
  }
];

var bodyEl = document.querySelector("body");

//~~~~~~~FUNCTIONS~~~~~~~

var startQuiz = function() {
  //clear start message and button
  var startMessage = document.querySelector(".start-message")
  startMessage.remove();

  //start the timer
  var timedInterval = setInterval(function(){
    if (timeLeft <= 0){
      clearInterval(timedInterval);
      timerEl.textContent = 0;
      endQuiz();
      return;
    }
    else {
      timerEl.textContent = timeLeft;
      timeLeft --;
    }
  }, 1000);
};

var askQuestion = function() {
  if(qArr.length > qNum){

    quizWrapperEl.className = "quiz-wrapper";
    bodyEl.appendChild(quizWrapperEl);
    
    quizWrapperEl.appendChild(qEl);
    qEl.className = "question";
    qEl.textContent = qArr[qNum].q;
    
    choiceListEl.className = "choices";
    quizWrapperEl.appendChild(choiceListEl);
    
    for (let i = 0; i < qArr[qNum].choices.length; i++) {
      var choiceEl = document.createElement("li");
      choiceEl.className ="choice";
      choiceEl.textContent = qArr[qNum].choices[i];
      choiceListEl.appendChild(choiceEl);
    }
  } else {
    endQuiz();
  }
}


var scoreQuestion = function(event) {
  var userChoice = event.target;
  if(userChoice.matches("li.choice")) {
    if(userChoice.textContent === qArr[qNum].a) {
      score ++;
    }
    else {
      timeLeft -= 5;
    }
    for (let i = 0; i < qArr[qNum].choices.length; i++) {
      var choiceEl = document.querySelector("li.choice");
      choiceEl.remove();
      qEl.textContent = "";
    }
    qNum ++
    askQuestion();
  }
}

var endQuiz = function(){
  console.log("lets end the game now. You scored: " + score)
}


//~~~~~~~EVENT LISTENERS~~~~~~~
startBtn.addEventListener("click", startQuiz)
startBtn.addEventListener("click", askQuestion)
choiceListEl.addEventListener("click", scoreQuestion)
