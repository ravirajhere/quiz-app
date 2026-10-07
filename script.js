/* ============================================
   Quiz App — Logic
   Vanilla JavaScript
   ============================================ */

// ============================================
// QUESTIONS DATA
// ============================================
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: 0
  },
  {
    question: "Which keyword declares a variable in modern JavaScript?",
    options: ["var", "let", "int", "dim"],
    answer: 1
  },
  {
    question: "What is the correct way to write a comment in JavaScript?",
    options: ["<!-- comment -->", "# comment", "// comment", "** comment **"],
    answer: 2
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: 1
  },
  {
    question: "Which symbol is used for strict equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: 2
  },
  {
    question: "How do you select an element by ID in JavaScript?",
    options: [
      "document.getElement('id')",
      "document.getElementById('id')",
      "document.query('id')",
      "document.selectId('id')"
    ],
    answer: 1
  },
  {
    question: "What will 'typeof []' return in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    answer: 1
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Float"],
    answer: 3
  },
  {
    question: "What does 'DOM' stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Digital Object Method",
      "Document Oriented Model"
    ],
    answer: 0
  }
];

// ============================================
// STATE
// ============================================
let currentQuestion = 0;
let score = 0;
let timer = null;
let timeLeft = 30;
let answered = false;

// ============================================
// DOM ELEMENTS
// ============================================
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");

const highScoreEl = document.getElementById("highScore");
const questionCounter = document.getElementById("questionCounter");
const timerEl = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");

const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

// ============================================
// SCREEN SWITCHING
// ============================================
function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// ============================================
// HIGH SCORE
// ============================================
function loadHighScore() {
  const saved = localStorage.getItem("quizHighScore");
  return saved ? parseInt(saved) : 0;
}

function saveHighScore(newScore) {
  const current = loadHighScore();
  if (newScore > current) {
    localStorage.setItem("quizHighScore", newScore);
  }
}

function displayHighScore() {
  highScoreEl.textContent = `${loadHighScore()} / ${questions.length}`;
}

// ============================================
// START QUIZ
// ============================================
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}

// ============================================
// LOAD QUESTION
// ============================================
function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];

  // Update counter
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  // Update progress bar
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  // Update question text
  questionText.textContent = q.question;

  // Render options
  optionsEl.innerHTML = "";
  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(index, btn));
    optionsEl.appendChild(btn);
  });

  // Start timer
  startTimer();
}

// ============================================
// TIMER
// ============================================
function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = `${timeLeft}s`;

  if (timeLeft <= 10) {
    timerEl.classList.add("warning");
  } else {
    timerEl.classList.remove("warning");
  }
}

function timeUp() {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const allOptions = optionsEl.querySelectorAll(".option");

  // Reveal correct answer
  allOptions.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("dimmed");
    }
  });

  nextBtn.disabled = false;
}

// ============================================
// OPTION SELECT
// ============================================
function selectOption(index, btn) {
  if (answered) return;
  answered = true;

  clearInterval(timer);

  const q = questions[currentQuestion];
  const allOptions = optionsEl.querySelectorAll(".option");

  // Disable all options
  allOptions.forEach(b => b.disabled = true);

  if (index === q.answer) {
    // Correct answer
    btn.classList.add("correct");
    score++;
  } else {
    // Wrong answer
    btn.classList.add("wrong");
    allOptions[q.answer].classList.add("correct");
  }

  // Dim others
  allOptions.forEach((b, i) => {
    if (i !== index && i !== q.answer) {
      b.classList.add("dimmed");
    }
  });

  nextBtn.disabled = false;
}

// ============================================
// NEXT QUESTION
// ============================================
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

// ============================================
// FINISH QUIZ
// ============================================
function finishQuiz() {
  clearInterval(timer);
  showScreen(resultScreen);

  saveHighScore(score);

  const total = questions.length;
  const percentage = (score / total) * 100;

  finalScore.textContent = `${score} / ${total}`;

  if (percentage === 100) {
    resultEmoji.textContent = "🏆";
    resultTitle.textContent = "Perfect Score!";
    resultMessage.textContent = "You got everything right. Outstanding!";
  } else if (percentage >= 80) {
    resultEmoji.textContent = "🎉";
    resultTitle.textContent = "Excellent!";
    resultMessage.textContent = "You really know your JavaScript basics.";
  } else if (percentage >= 60) {
    resultEmoji.textContent = "👍";
    resultTitle.textContent = "Good Job!";
    resultMessage.textContent = "Solid effort. Keep practicing!";
  } else if (percentage >= 40) {
    resultEmoji.textContent = "📚";
    resultTitle.textContent = "Not Bad";
    resultMessage.textContent = "A bit more practice and you'll nail it.";
  } else {
    resultEmoji.textContent = "💪";
    resultTitle.textContent = "Keep Learning";
    resultMessage.textContent = "Every expert was once a beginner. Try again!";
  }
}

// ============================================
// EVENT LISTENERS
// ============================================
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", () => {
  displayHighScore();
  startQuiz();
});
nextBtn.addEventListener("click", nextQuestion);

// ============================================
// INIT
// ============================================
displayHighScore();
