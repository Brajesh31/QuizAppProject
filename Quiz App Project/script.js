const quizData = [
  {
    question: "What is the capital of Bhutan?",
    a: "Kathmandu",
    b: "Poducherry",
    c: "Thimpu",
    d: "Panaji",
    correct: "c",
  },
  {
    question: "Who is the present president of India?",
    a: "Xi Jinping",
    b: "Gustavo Petro",
    c: "Droupadi Murmu",
    d: "Ram Nath Kovind",
    correct: "c",
  },
  {
    question: "Buckingham palace located at which city?",
    a: "London",
    b: "Vijayapura",
    c: "Villasdardo",
    d: "Riyadh",
    correct: "a",
  },
  {
    question: "Who is the President of the US?",
    a: "Donald Trump",
    b: "Joe Biden",
    c: "Barack Obama",
    d: "George Bush",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "HyperText Markup Language",
    b: "Cascading Style Sheet",
    c: "JavaScript Object Notation",
    d: "Helicopters Terminals Motorboats Lamborghinis",
    correct: "a",
  },
  {
    question: "Which year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "None of the above",
    correct: "b",
  },
  {
    question: "In which country did the ancient Olympic Games originate?",
    a: "Greece",
    b: "Rome",
    c: "Egypt",
    d: "China",
    correct: "a",
  },
  {
    question: "What do the five rings on the Olympic flag represent?",
    a: "The five Olympic values",
    b: "The five Olympic sports",
    c: "The five founding countries of the Olympic Games",
    d: "The five continents",
    correct: "d",
  },
  {
    question: `The Olympic motto is "Citius, Altius, Fortius". What does it mean in English?`,
    a: "Faster, Higher, Stronger",
    b: "Better, Bigger, Best",
    c: "More, Less, Equal",
    d: "Old, New, Future",
    correct: "a",
  },
  {
    question: "What is the name of the Olympic mascot for the Paris 2024 Olympics?",
    a: "Miraitowa",
    b: "Oli",
    c: "Phryges",
    d: "Nagano",
    correct: "c",
  },
  {
    question: "How many medals did India win at the Paris Olympics 2024?",
    a: "0",
    b: "6",
    c: "9",
    d: "11",
    correct: "b",
  },
  {
    question: "Which state is set to conduct Socio-economic Assessment of Indigenous Muslim Communities?",
    a: "West Bengal",
    b: "Assam",
    c: "Gujarat",
    d: "Bihar",
    correct: "b",
  },
];


let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 30;  // Set the time limit for each question
let timeRemaining = timeLimit;
let timerInterval;


const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const questionNumberEl = document.getElementById("questionCount");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer"); 


let selectedAnswers = {}; 

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  resetOptionColors();
  resetTimer();

  const currentQuizData = quizData[currentQuestionIndex];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  questionNumberEl.innerText = `Question ${currentQuestionIndex + 1}`;


 // Preserve the selected answer for the current question
  if (selectedAnswers[currentQuestionIndex]) {
    document.getElementById(selectedAnswers[currentQuestionIndex]).checked = true;
  }
  startTimer();  // Start the timer for each question
}


function startTimer() {
  timerEl.innerText = `Time left: ${timeRemaining}s`;

  timerInterval = setInterval(() => {
    timeRemaining--;
    timerEl.innerText = `Time left: ${timeRemaining}s`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      moveToNextQuestion();  // Automatically move to the next question if time runs out
    }
  }, 1000);  // Update every second
}


function resetTimer() {
  clearInterval(timerInterval);  // Stop the previous timer
  timeRemaining = timeLimit;     // Reset the time for the new question
}

function moveToNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML = `
      <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
      <button onclick="location.reload()">Reload</button>
    `;
  }
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}


function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}


function resetOptionColors() {
  answerEls.forEach((answerEl) => {
    const label = answerEl.nextElementSibling;
    label.classList.remove('correct', 'wrong');
  });
}


// Handle submit button
submitBtn.addEventListener("click", () => {
  const selectedAnswer = getSelected();
  
  if (selectedAnswer) {
    selectedAnswers[currentQuestionIndex] = selectedAnswer;


    const correctAnswer = quizData[currentQuestionIndex].correct;

  


// Show the result for the selected answer
if (selectedAnswer === correctAnswer) {
  document.querySelector(`label[for=${selectedAnswer}]`).classList.add('correct');
  score++;
} else {
  document.querySelector(`label[for=${selectedAnswer}]`).classList.add('wrong');
  document.querySelector(`label[for=${correctAnswer}]`).classList.add('correct');
}



  // Disable further selections after answer is submitted
  answerEls.forEach(answerEl => answerEl.disabled = true);
    // Move to next question after a short delay to let user see the result
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        answerEls.forEach(answerEl => answerEl.disabled = false);  // Re-enable selections
        loadQuiz();
      } else {
        quiz.innerHTML = `
          <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
          <button onclick="location.reload()">Reload</button>
        `;
      }
    }, 2000);  // 2-second delay before moving to the next question
  } else {
    alert("Please select an answer before moving to the next question!");
  }
});


//Radio button colors random

 // Function to generate random hex color
 function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to apply random colors to each radio button
function applyRandomColorsToRadios() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  
  radioButtons.forEach(radio => {
    const randomColor = getRandomColor();
    radio.style.setProperty('--radio-color', randomColor); // Set custom property for radio color
  });
}

// Apply random colors when the page loads
window.onload = applyRandomColorsToRadios;