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
    //radioButtons: [radioButton1, radioButton2, radioButton3],
    //Next: [false, false, true] - one of them always true
    //Skip: [false, false, false]
    // answeredCorrectly: false,
    // userAnswer: "",
    answer: "Danish Krone",
  },
  {
    question: "Which country was Denmark forced to relinquish to Sweden at the end of the Napoleonic Wars in 1814?",
    options: ["Norway", "Iceland", "Greenland"],
    // answeredCorrectly: false,
    answer: "Norway",
  },
  {
    question: "On January 1st, 2007, Denmark was divided into regions. How many?",
    options: ["7", "13", "5"],
    answer: "5",
  },
  {
    question: "Which political party emerged in 1870 as a part of the labour movement?",
    options: [
      "The Social Liberals (Radikale Venstre)",
      "The Socialist People's Party (Socialistisk Folkeparti)",
      "The Social Democrats (Socialdemokratiet)",
    ],
    answer: "The Social Democrats (Socialdemokratiet)",
  },
  {
    question: "Which of the following persons is known as a key figure amongst the Skagen painters?",
    options: ["Berthel Thorvaldsen", "C. C. Eckersberg", "P. S. KrÃ¸yer"],
    answer: "P. S. KrÃ¸yer",
  },
  {
    question: "What is the average age for women having their first child in Denmark?",
    options: ["24", "29", "19"],
    answer: "29",
  },
  {
    question: "In which decade was abortion legalised in Denmark?",
    options: ["1930s", "1950s", "1970s"],
    answer: "1970s",
  },
  {
    question: "Until when was Greenland a Danish colony?",
    options: ["2005", "1901", "1953"],
    answer: "1953",
  },
  {
    question: "On which day does the Queen give a live televised speech to the country?",
    options: ["New Years Eve", "Christmas Eve", "Queen Birthday"],
    answer: "New Years Eve",
  },
  {
    question: "In which sport did the Danish women's national team finish second in the 2017 European Championships?",
    options: ["Handball", "Football", "Volleyball"],
    answer: "Football",
  },
];
//Shuffle the questions
// quizData.sort(() => Math.random() - 0.5);
// console.log(quizData.sort(() => Math.random() - 0.5));
const questionCounterElement = document.getElementById("question-counter");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score-value");
const timerElement = document.getElementById("timer-value");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const skipButton = document.getElementById("skip-button");
const resultElement = document.getElementById("results");
let currentQuestionIndex = 0;
let score = 0;
let timer;
const timerValue = 120; //2 minutes for just to check for the quiz
let userAnswer = Array(quizData.length).fill(null);
// console.log("Quiz started!");

// console.log(questionCounterElement);
function showQuestion() {
  const question = quizData[currentQuestionIndex].question;
  const options = quizData[currentQuestionIndex].options;
  scoreElement.innerText = score;
  questionCounterElement.innerHTML = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
  console.log(question, options);
  questionElement.innerText = question;
  optionsElement.innerHTML = ""; // Clear previous options
  options.forEach((option) => {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.innerText = option;
    radioButton.name = "answer";
    radioButton.checked = userAnswer[currentQuestionIndex] === option;

    const label = document.createElement("label");
    label.innerText = option;
    label.prepend(radioButton);
    // optionsElement.appendChild(radioButton);
    optionsElement.appendChild(label); // Append the label to the options element
    radioButton.addEventListener("click", () => selectAnswer(option));
  });
  if (currentQuestionIndex === 0) {
    previousButton.disabled = true;
  } else {
    previousButton.disabled = false;
  }
}

function selectAnswer(selectedValue) {
  const answer = quizData[currentQuestionIndex].answer;
  userAnswer[currentQuestionIndex] = selectedValue;
  if (selectedValue === answer && currentQuestionIndex < quizData.length) {
    score++;
  }
  if (currentQuestionIndex < quizData.length) {
    // showQuestion();
  } else {
    nextButton.disabled = quizData.length === 0;
    // showQuestion();
  }
}

function showResult() {
  nextButton.disabled = true;
  nextButton.innerText = "Finish";
  skipButton.disabled = true;
  previousButton.disabled = true;
  const resultMessage = document.createElement("div");
  const scorePercentage = ((score / quizData.length) * 100).toFixed(2);
  questionCounterElement.innerText = "Quiz Completed!";
  clearInterval(timer); // Stop the timer
  questionElement.innerHTML = "";
  optionsElement.innerHTML = "";
  scoreElement.innerText = score;
  // one test case is failing on the first attempt bcz the score is 0
  if (score >= quizData.length / 2) {
    scoreElement.innerText = score;
    resultMessage.innerText = `Congratulations! You scored ${scorePercentage}%`;
    resultMessage.style.color = "green";
    timerElement.innerText = "0";
    optionsElement.appendChild(resultMessage);
  } else {
    scoreElement.innerText = score;
    resultMessage.innerText = `Sorry !! You have failed the exam`;
    resultMessage.style.color = "red";
    timerElement.innerText = "0";
    optionsElement.appendChild(resultMessage);
  }
  showCorrectAnswers();
}

function showCorrectAnswers() {
  resultElement.innerHTML = "<h2>Quiz Results: </h2>";
  quizData.forEach((question, index) => {
    const userAns = userAnswer[index] || "Not Attempted";
    const isCorrect = userAns === question.answer ? "Correct" : "Incorrect";
    resultElement.innerHTML += `<p>Question ${index + 1}: ${question.question}</p>`;
    resultElement.innerHTML += `<p>Your Answer: ${userAns}</p>`;
    resultElement.innerHTML += `<p>Correct Answer: ${question.answer}</p>`;
    resultElement.innerHTML += `<p>Status: ${isCorrect}</p>`;
    resultElement.innerHTML += "<hr>";
    resultElement.appendChild(questionElement);
  });
}
function startTimer(duration) {
  let timeLeft = duration;
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      timerElement.textContent = timeLeft;
    } else {
      showResult();
    }
  }, 1000);
}
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    nextButton.disabled = quizData.length === 0;
    showResult();
  }
  if (currentQuestionIndex === quizData.length - 1) {
    nextButton.innerText = "Finish";
    skipButton.disabled = true;
  } else {
    nextButton.innerText = "Next";
  }
});

previousButton.addEventListener("click", () => {
  currentQuestionIndex--;
  if (currentQuestionIndex >= 0) {
    showQuestion();
  } else {
    showResult();
  }
});
skipButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

showQuestion();
startTimer(60);

//Have user name fields and show the score with the name
