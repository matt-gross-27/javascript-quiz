//~~~~~~~GLOBAL VARIABLES~~~~~~~

var startBtn = document.querySelector("#start");
var timeLeft = 60;
var timerEl = document.querySelector("#timer");
var score = 0;
var formEl = {};
var playerName = "";
var highScore = "";

var bodyEl = document.querySelector("body");
var quizWrapperEl = document.createElement("section");
var qEl = document.createElement("h2");
var choiceListEl = document.createElement("ul");

var qNum = 0;
var qArr = [
  {
    q: 'Let stringNum = "9". Which of the following methods can be used to convert stringNum from a string to an integer?',
    l: ["parseInt(stringNum)", "num(stringNum)", "int(stringNum)", "stringNum.toInt()"],
    a: "parseInt(stringNum)"
  } ,
  {
    q: 'JavaScript scripts can be located in what section of an html document?',
    l: ["the body", "the head", "all of the above", "none of the above"],
    a: "all of the above"
  },
  {
    q: 'JavaScript and Java are the same language.',
    l: ["true", "false"],
    a: "false"
  },
  {
    q: `Given the code: <br><br> var bodyEl = document.querySelector( 'body' ); <br> console.log( typeof bodyEl ); <br><br> Which message do you expect to find in the console?`,
    l: [`"body"`, `"element"`, `"object"`,`"document"`],
    a: `"object"`
  },
  {
    q: `Which of the following is not a data type in Java Script?`,
    l: [`string`, `boolean`, `array`, `table`],
    a: `table`,
  },
  {
    q: `Using the setInterval() method will call a function until ______  is called?`,
    l: [`setStop()`, `breakInterval()`, `clearInterval()`, `setTimeout()`],
    a: `clearInterval()`,
  },
  {
    q: `Who created JavaScript?`,
    l: [`Yan Zhu`,`Brendan Eich`,`Jim Highsmith`,`Håkon Wium Lie`],
    a: `Brendan Eich`,
  },
  {
    q: `Var arr = ["3", "2", "1", "0"]; <br>
        var x = arr[2] + arr[0]; <br>
        console.log(x) prints____?`,    
    l: [`2`, `"20"`, `4` ,`"13"`],
    a: `"13"`
  }
];

//~~~~~~~FUNCTIONS~~~~~~~

var startQuiz = function() {
  //clear start message and button
  var startMessage = document.querySelector(".message")
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
    qEl.innerHTML = qArr[qNum].q;
    
    choiceListEl.className = "choices";
    quizWrapperEl.appendChild(choiceListEl);
    
    for (let i = 0; i < qArr[qNum].l.length; i++) {
      var choiceEl = document.createElement("li");
      choiceEl.className ="choice";
      choiceEl.textContent = qArr[qNum].l[i];
      choiceListEl.appendChild(choiceEl);
    }
  } else {
    timeLeft = 0;
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
    for (let i = 0; i < qArr[qNum].l.length; i++) {
      var choiceEl = document.querySelector("li.choice");
      choiceEl.remove();
      qEl.textContent = "";
    }
    qNum ++
    askQuestion();
  }
}

//WIP
var endQuiz = function(){
  choiceListEl.remove();
  
  quizWrapperEl.className = "message";

  qEl.textContent = `Nice Job you answered ${score} questions correctly!`;
  var formWrapperEl = document.createElement("div");
  formWrapperEl.className = "form";
  quizWrapperEl.appendChild(formWrapperEl);

  formEl = document.createElement("form");
  formWrapperEl.appendChild(formEl);
  
  var formHeadingEl = document.createElement("h2");
  formHeadingEl.textContent = `Enter your name below and hit submit to save your score!`;
  formEl.appendChild(formHeadingEl);

  var labelEl = document.createElement("label");
  labelEl.setAttribute("for", "name");
  labelEl.textContent = "";
  formEl.appendChild(labelEl);

  var inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("placeholder", "Your Name");
  inputEl.setAttribute("id", "name");
  inputEl.setAttribute("name", "name");
  formEl.appendChild(inputEl);
  
  var submitEl = document.createElement("button");
  submitEl.textContent = "Submit";
  formEl.appendChild(submitEl);
  formEl.addEventListener("submit", saveScore)
}

var saveScore = function(event) {
  event.preventDefault();
  playerName = event.target.querySelector("input[name='name']").value;
  console.log(playerName)
  if(playerName) {
    highScore = localStorage.getItem(`jsQuiz: ${playerName}`);
    if(!highScore){
      localStorage.setItem(`jsQuiz: ${playerName}`, score);
      shoutOut();
    }
    else if(parseInt(highScore) < score){
      localStorage.setItem(`jsQuiz: ${playerName}`, score);
      shoutOut();
    }
  }
  formEl.reset();
}

var shoutOut = function() {
  formWrapperEl = document.querySelector(".form")
  formWrapperEl.remove();
  qEl.remove();
  var shoutOutEl = document.createElement("h2");
  shoutOutEl.textContent = `Nice Job ${playerName}, ${score} is your new high score!`;
  quizWrapperEl.appendChild(shoutOutEl);
  shoutOutEl.className = "shout-out";
  var restart = document.createElement("button");
  restart.textContent = "Try Again";
  restart.setAttribute("id","restart");
  bodyEl.appendChild(restart);
}

//~~~~~~~EVENT LISTENERS~~~~~~~
startBtn.addEventListener("click", startQuiz)
startBtn.addEventListener("click", askQuestion)
choiceListEl.addEventListener("click", scoreQuestion)
