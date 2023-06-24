var quizintro = document.querySelector(".intro");
var HSlink = document.querySelector(".highscoreLink");
var mainQuiz = document.querySelector(".quiz-container")
var startButton = document.querySelector(".start-btn");

startButton.addEventListener("click", function() {
//Used Event Listener to hide intro and start time after user clicks "Start Quiz"
quizintro.setAttribute("style", "display: none");
HSlink.setAttribute("style", "display: none");
mainQuiz.setAttribute("style", "display: flex")
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
//score = 0;

//Function to load questions on the browser 
function loadQuestion() {
    var questionEl = document.getElementById("question");
    var optionsEl = document.getElementById("options");


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
        //score++;
    } else {
        //deducts 10 seconds if answer inpout is incorrect
        secondsLeft -= 10;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        //will load new question if quiz data had more questions 
        loadQuestion();
    } else {
        //endQuiz();
    }
}


loadQuestion();