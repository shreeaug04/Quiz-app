/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is Waldeinsamkeiti?',
      answers: [
        'The feeling of solitude and connectedness to nature when being alone in the woods.',
        'The cake that melts in your mouth',
        'The farthest planet ever discovered',
        'The most beautiful girl in the world',
      ],
      correctAnswer: 'The feeling of solitude and connectedness to nature when being alone in the woods.'
    },
    {
      question: 'What is Forelsket?',
      answers: [
        'The state caused by hallucinogens',
        'The best of dance breakdown',
        'The song in the world',
        'The euphoria experienced as you begin to fall in love',
      ],
      correctAnswer: 'The euphoria experienced as you begin to fall in love'
    },
    {
      question: 'What is Kilig?',
      answers: [
        'The state caused by hallucinogens',
        'The feeling of butterflies in your stomach, usually when something romantic takes place.',
        'Discover the past walking tours victoria',
        'The song in the world',
      ],
      correctAnswer: 'The feeling of butterflies in your stomach, usually when something romantic takes place.'
    },
    {
      question: 'What is Duende?',
      answers: [
        'A work of art’s mysterious power to deeply move a person.',
        'Feel that you don’t really belong',
        'That tingling feeling in your stomach',
        'One of the best feelings in the world',
      ],
      correctAnswer: 'A work of art’s mysterious power to deeply move a person.'
    },
    {
      question: 'What is Wabi-Sabi?',
      answers: [
        'Finding beauty in imperfections',
        'Finding the inverse of a function',
        'Finding tasty foods in unlikely places',
        'Finding the taste buds of tongue'
      ],
      correctAnswer: 'Finding beauty in imperfections'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

function getEndOfQuizTemplate() {
  return `<div>
    <h2>Well done! Your score is ${store.score} out of ${store.questionNumber}</h2>
    You can redo the quiz by clicking this button.
    </div><button id="redo-button">Retake Quiz</button></div>
  </div>`
}

function generateQuestions() {
  if (store.questions.length === store.questionNumber) {
    return getEndOfQuizTemplate()
  }
  const currentQuestion = store.questions[store.questionNumber];
  let answersArr = ''
  currentQuestion.answers.forEach((answer, index) => {
    answersArr += `<div>
      <label for='answer-${index}'>
        <input value="${answer}" required id='answer-${index}' type='radio' name='answer' />
        ${answer}
      </label>
    </div>`
  })
  return `<div>
    <h2>Question number #${store.questionNumber + 1}</h2>
    <div class='current-score'><h3>Current Score: ${store.score}</h3></div>
    <form id='question-form'>
      <p>${currentQuestion.question}</p>
      ${answersArr}
      <button type='submit'>Submit</button>
    </form>
  </div>`
}

function showMessage(type, correctAnswer) {
  if (type === 'success') {
    return `<div>
      Your answer was right! Go to next question.
      <div><button id='next-question' type='button'>Next</button></div>
    </div>`
  } else {
    return `<div>
      Wrong answer, correct answer is ${correctAnswer}
      <div><button id='next-question' type='button'>Next</button></div>
    </div>`
  }
}

// These functions return HTML templates
function render(template) {
  let html = template || `<div><button id='start-quiz'>Start Quiz</button></div>`
  $("main").html(html)
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function startQuiz() {
  $("body").on("click", "#start-quiz", function() {
    store.quizStarted = true;
    render(generateQuestions());
  });
}

function evaluateAnswer() {
  const currentQuestion = store.questions[store.questionNumber]
  const answerVal = $('input[name="answer"]:checked').val();
  if (currentQuestion.correctAnswer === answerVal) {
    store.score++;
    render(showMessage('success'));
  } else {
    render(showMessage('failure', currentQuestion.correctAnswer));
  }
}

function submitAnswer() {
  $("body").on("submit", "#question-form", function (e) {
    e.preventDefault();
    evaluateAnswer()
  });
}

function goToNextQuestion() {
  $("body").on("click", "#next-question", function () {
    store.questionNumber++;
    render(generateQuestions())
  });
}

function redoQuiz() {
  $("body").on("click", "#redo-button", function () {
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = true;
    render(generateQuestions())
  });
}

function initializePage() {
  render();
  startQuiz();
  submitAnswer();
  goToNextQuestion();
  redoQuiz();
}

$(initializePage)