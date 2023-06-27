var quizintro = document.querySelector(".intro");
var HSlink = document.querySelector(".highscoreLink");
var mainQuiz = document.querySelector(".quiz-container")
var startButton = document.querySelector(".start-btn");

startButton.addEventListener("click", function() {
//Used Event Listener to hide intro and start time after user clicks "Start Quiz"
quizintro.setAttribute("style", "display: none");
mainQuiz.setAttribute("style", "display: flex; flex-direction: column")
setTime();
loadQuestion();
})

      
//Array of Quiz questions and answer options 
var quizData = [
    {
        question: "Which of the following is a boolean value in javascript?",
        options: ["Array", "Panda", "False", "Function"],
        answer: 2
    },
    {
        question: "What is CSS an accronym for?",
        options: ["Compiled Style Sheets", "Computer Style Sheets", "Coloring Style Sheets", "Casscading Style Sheets"],
        answer: 3
    },
    {
        question: "When was Javascript created?",
        options: ["1995", "1800", "1945", "2001"],
        answer: 0
    },
    {
        question: "What grade is this quiz getting?",
        options: ["C", "B", "A", "D"],
        answer: 2
    }
];

// Selects time element by class
var timeEl = document.querySelector(".time");
//Sets intial time for quiz
var secondsLeft = 60;

// Function to decrease time after each second
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
    
}

  }, 1000);
}

var currentQuestion = 0;
score = 0;


var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");

//Function to load questions on the browser 
function loadQuestion() {

    //displays current question 
    questionEl.innerHTML = quizData[currentQuestion].question;

    //displays all the 4 answer options using for loop
    optionsEl.innerHTML = "";
    for (var i = 0; i < quizData[currentQuestion].options.length; i++) {
        var option = document.createElement("MCQoptions");
        option.innerHTML = '<input type = "checkbox" name="answer" value="' + i + '"> ' + quizData[currentQuestion].options[i];
        optionsEl.appendChild(option);
    }

}

//added event listener to submit button to check answer
var submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", checkAnswer);


function checkAnswer() {
    var answer = document.querySelector('input[name="answer"]:checked');
    if (answer === null) {
        return;
    }

    if (parseInt(answer.value) === quizData[currentQuestion].answer) {
        score = score + 10;
    } else {
        //deducts 10 seconds if answer inpout is incorrect
        secondsLeft -= 10;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        //will load new question if quiz data had more questions 
        loadQuestion();
    } else {
        endQuiz();
    }
}

var savebtn = document.getElementById("save");
var initialsinput = document.getElementById("initials");

function endQuiz() {
    //clearInterval(timerInterval);

    var resultElement = document.getElementById("result");
    resultElement.innerHTML = "Quiz completed. Your score is " + score + ". Enter your initals below to save your score.";
    questionEl.setAttribute("style", "display: none");
    optionsEl.setAttribute("style", "display: none");
    submitButton.setAttribute("style", "display: none");
    var initials = document.getElementsByClassName("form");
    initials[0].setAttribute("style", "display: flex; justify-content: center;");
    savebtn.setAttribute("style", "display: flex, margin: 50px;");
}

savebtn.addEventListener("click", function (event) {
    event.preventDefault();
    var initial = initialsinput.value;
    saveScore(initial, score);
})

//fucntion to store score data

function saveScore(initial, score) {
  let scores = JSON.parse(localStorage.getItem("initials"));
  let tempScores = [];
  if (scores) {
    tempScores = scores
  }

  tempScores.push({ initial: initial, score: score });
  localStorage.setItem("initials", JSON.stringify(tempScores));

  scorecard();
}

//function to display scores

function scorecard () {
    let scores = JSON.parse(localStorage.getItem("initials"));
    const list = document.getElementById("listContainer");
    console.log(list);

    for (let i=0; i < scores.length; i++){
        const item = document.createElement("li");
        item.textContent = scores[i];
        list.appendChild(item);
        }
}