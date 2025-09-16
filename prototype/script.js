// Load student profile
let student = JSON.parse(localStorage.getItem("student"));
if (!student) {
  window.location.href = "register.html";
} else {
  document.getElementById("welcome").innerText =
    "👋 Welcome " + student.name + " (Class " + student.class + ")";
}

// Load quiz
let questions = [];
let currentQuestion = 0;
let startTime = 0;

fetch("../quizzes/motion_and_force.json")
  .then(response => response.json())
  .then(data => {
    questions = data.questions;
    startTime = Date.now();
    showQuestion();
  });

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }
  let q = questions[currentQuestion];
  document.getElementById("question").innerText = q.q;
  let optionsHTML = "";
  q.options.forEach((opt, i) => {
    optionsHTML += `<button onclick="checkAnswer(${i})">${opt}</button><br>`;
  });
  document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(choice) {
  let q = questions[currentQuestion];
  if (choice === q.answer) {
    student.xp += 10;
    alert("✅ Correct! +10 XP");
  } else {
    alert("❌ Wrong answer.");
  }
  localStorage.setItem("student", JSON.stringify(student));
  document.getElementById("xp").innerText = student.xp;
  document.getElementById("level").innerText = student.level;
  currentQuestion++;
  showQuestion();
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function endQuiz() {
  let timeSpent = Math.round((Date.now() - startTime) / 1000);
  document.getElementById("quiz-area").style.display = "none";
  document.getElementById("result").innerHTML =
    `<h3>Quiz Finished!</h3>
     <p>Total XP: ${student.xp}</p>
     <p>Level: ${student.level}</p>
     <p>Time Spent: ${timeSpent} seconds</p>`;
}
