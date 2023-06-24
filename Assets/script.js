var quizintro = document.querySelector(".intro");

var startButton = document.querySelector(".start-btn");


startButton.addEventListener("click", function() {
//Used Event Listener to hide intro adter user starts quiz
quizintro.setAttribute("style", "display: none");
setTime();
})



// Selects element by class
var timeEl = document.querySelector(".time");

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    //add code for taking 10 seconds if answer is incorrect

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
    }

  }, 1000);
}
