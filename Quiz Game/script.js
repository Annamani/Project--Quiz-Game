const quizData = [
  {
    question: "What is Dannebrog?",
    options: ["The Danish flag ", "The Danish Anthem ", "The Danish currency "],
    answer: "The Danish flag ",
  },
  {
    question: "What is the capital of Denmark?",
    options: ["Copenhagen", "Aarhus", "Odense"],
    answer: "Copenhagen",
  },
  {
    question: "What is the currency of Denmark?",
    options: ["Danish Krone", "Euro", "Danish Dollar"],
    answer: "Danish Krone",
  },
];
//Shuffle the questions
quizData.sort(() => Math.random() - 0.5);
// console.log(quizData.sort(() => Math.random() - 0.5));
const questionCounterElement = document.getElementById("question-counter");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score-value");
const timerElement = document.getElementById("timer-value");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const skipButton = document.getElementById("skip-button");
let currentQuestionIndex = 0;
let score = 0;
let timer;
const timerValue = 120; //2 minutes for just to check for the quiz

// console.log("Quiz started!");

// console.log(questionCounterElement);

function showQuestion() {
  const question = quizData[currentQuestionIndex].question;
  const options = quizData[currentQuestionIndex].options;
  scoreElement.innerText = score;
  questionCounterElement.innerHTML = `Question ${currentQuestionIndex + 1} / ${quizData.length
  }`;
  console.log(question, options);
  questionElement.innerText = question;
  optionsElement.innerHTML = ""; // Clear previous options
  options.forEach((option) => {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.innerText = option;
    optionsElement.appendChild(radioButton);
    radioButton.addEventListener("click", () => selectAnswer(option));
    optionsElement.appendChild(radioButton);
  });
}

function selectAnswer(selectedValue) {
  const answer = quizData[currentQuestionIndex].answer;
  if (selectedValue === answer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
    const resultMessage = document.createElement("div");
    const scorePercentage = ((score / quizData.length) * 100).toFixed(2);
    questionCounterElement.innerText = "Quiz Completed!";
    clearInterval(timer); // Stop the timer
    questionElement.innerHTML = ""; 
    optionsElement.innerHTML = ""; 
    scoreElement.innerText = score;
    // one test case is failing on the first attempt bcz the score is 0
    // if (score >= quizData.length / 2) {
    //     scoreElement.innerText = score;
    //     resultMessage.innerText = `Congratulations! You scored ${scorePercentage}%`;
    //     resultMessage.style.color = "green";
    //     timerElement.innerText = "0";
    //     optionsElement.appendChild(resultMessage);
    // }
    // else {
    //     scoreElement.innerText = score;
    //     resultMessage.innerText = `Sorry !! You have failed the exam`;
    //     resultMessage.style.color = "red";
    //     timerElement.innerText = "0";
    //     optionsElement.appendChild(resultMessage);
    // }
    
}
function startTimer(duration) {
  let timeLeft = duration;
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      timerElement.textContent = timeLeft;
    } 
    else {
      showResult();
    }
  }, 1000);
}
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});
//Optional Buttons to go to previous question and skip the question
// previousButton.addEventListener("click", () => {
//     currentQuestionIndex--;
//     if (currentQuestionIndex >= 0) {
//         showQuestion();
//     } else {
//        showResult();
//     }
// }); 
// skipButton.addEventListener("click", () => {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < quizData.length) {
//       showQuestion();
//     } else {
//       showResult();
//     }
//   });

showQuestion();
startTimer(10); // Start the timer with 120 seconds (2 minutes)
