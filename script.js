const quiz = [
  {
    question: 'What does the acronym "DOM" stand for in JavaScript?',
    options: ['Document Object Model', 'Data Object Model', 'Dynamic Object Method'],
    correctIndex: 0
  },
  {
    question: 'What is the difference between "==" and "===" operators in JavaScript?',
    options: ['They are the same', '== checks value only, while === checks both value and type', '=== checks value only, while == checks both value and type'],
    correctIndex: 1
  },
  {
    question: 'What is hoisting in JavaScript?',
    options: ['A technique to lift heavy objects', 'The process of moving code from one file to another', 'The behavior where variable declarations are moved to the top of their scope during compilation'],
    correctIndex: 2
  },
  {
    question: 'What is a callback function in JavaScript?',
    options: ['A function that is executed immediately when it is defined', 'A function passed as an argument to another function to be executed later', 'A function that returns another function'],
    correctIndex: 1
  },
  {
    question: 'What is the purpose of the "use strict" statement in JavaScript?',
    options: ['To enable strict mode for the current script or function', 'To disable strict mode for the current script or function', 'To indicate that the script should be run on a user-controlled environment'],
    correctIndex: 0
  },
  {
    question: 'What is a closure in JavaScript?',
    options: ['A data structure that holds multiple values in JavaScript', 'A function that is automatically invoked when an event occurs', 'A function that has access to variables from its outer function scope even after the outer function has returned'],
    correctIndex: 2
  },
  {
    question: 'What is the purpose of the "this" keyword in JavaScript?',
    options: ['To refer to the current object in which the code is being executed', 'To define a new class in JavaScript', 'To declare a variable with block scope'],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the "querySelector" method in JavaScript?',
    options: ['To select and retrieve the first element that matches a specific CSS selector', 'To add a new CSS class to an element', 'To remove an element from the DOM'],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the "fetch" function in JavaScript?',
    options: ['To perform AJAX requests and retrieve data from a server', 'To create a new array from an existing array by applying a function to each element', 'To convert a string to an integer'],
    correctIndex: 0
  },
  {
    question: 'What is the purpose of the "map" method in JavaScript?',
    options: ['To iterate over the elements of an array and modify each element', 'To concatenate two or more strings together', 'To execute a function for each element in an array and return a new array'],
    correctIndex: 2
  }
];


const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.querySelector('#question');
const optionsElement = document.querySelector('#options');
const resultContainer = document.querySelector('#result-container');
const resultMessage = document.querySelector('#result-message');
const scoreMessage = document.querySelector('#score-message');

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const question = quiz[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = '';

  question.options.forEach((option, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index));

    li.appendChild(button);
    optionsElement.appendChild(li);
  });
}

function selectAnswer(answerIndex) {
  const question = quiz[currentQuestionIndex];
  const selectedButton = optionsElement.children[answerIndex].querySelector('button');

  if (question.correctIndex === answerIndex) {
    selectedButton.classList.add('correct');
    score++;
    resultMessage.textContent = 'Correct!';
  } else {
    selectedButton.classList.add('wrong');
    resultMessage.textContent = `Wrong! The correct answer is ${question.options[question.correctIndex]}.`;
  }

  optionsElement.classList.add('disabled');

  currentQuestionIndex++;

  if (currentQuestionIndex >= quiz.length) {
    endQuiz();
  } else {
    setTimeout(() => {
      optionsElement.classList.remove('disabled');
      selectedButton.classList.remove('correct', 'wrong');
      showQuestion();
      resultMessage.textContent = '';
    }, 1000);
  }
}

function endQuiz() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  scoreMessage.textContent = `You scored ${score} out of ${quiz.length}.`;

  if (score >= 7) {
    resultMessage.textContent = 'Congratulations! You passed the test.';
    resultMessage.classList.add('pass-message');
  } else {
    resultMessage.textContent = 'Better luck next time!';
    resultMessage.classList.add('fail-message');
  }
}

showQuestion();
