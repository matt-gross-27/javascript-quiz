//~~~~~~~GLOBAL VARIABLES~~~~~~~

var startBtn = document.querySelector("#start");
var timeLeft = 60;
var timerEl = document.querySelector("#timer")
var score = 0;

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
    q: `which of the following is not a data type in Java Script?`,
    l: [`string`, `boolean`, `array`, `table`],
    a: `table`,
  },
  {
    q:``,
    l:[],
    a:``,
  },
];

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
    endQuiz();
  }
}


var scoreQuestion = function(event) {
  var userChoice = event.target;
  if(userChoice.matches("li.choice")) {
    if(userChoice.textContent === qArr[qNum].a) {
      score ++;
      //temp_del
      alert(score);
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

var endQuiz = function(){
  console.log("lets end the game now. You scored: " + score)
}


//~~~~~~~EVENT LISTENERS~~~~~~~
startBtn.addEventListener("click", startQuiz)
startBtn.addEventListener("click", askQuestion)
choiceListEl.addEventListener("click", scoreQuestion)
