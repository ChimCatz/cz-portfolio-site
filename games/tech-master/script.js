const questions = window.TECH_MASTER_SAMPLE_QUESTIONS || [];

const trackerEl = document.querySelector('[data-level-tracker]');
const levelInlineEl = document.querySelector('[data-level-inline]');
const difficultyInlineEl = document.querySelector('[data-difficulty-inline]');
const rankInlineEl = document.querySelector('[data-rank-inline]');
const flavorInlineEl = document.querySelector('[data-flavor-inline]');
const questionTextEl = document.querySelector('[data-question-text]');
const answerGridEl = document.querySelector('[data-answer-grid]');
const feedbackTextEl = document.querySelector('[data-feedback-text]');
const nextButtonEl = document.querySelector('[data-next-button]');
const explanationCardEl = document.querySelector('[data-explanation-card]');
const explanationTextEl = document.querySelector('[data-explanation-text]');
const launchOverlayEl = document.querySelector('[data-launch-overlay]');
const launchStartEl = document.querySelector('[data-launch-start]');

let currentQuestionIndex = 0;
let hasAnswered = false;

const getDifficultyClass = (difficulty) => {
    if (difficulty === 'Medium') {
        return 'is-medium';
    }

    if (difficulty === 'Hard') {
        return 'is-hard';
    }

    return 'is-easy';
};

const buildTracker = () => {
    trackerEl.innerHTML = '';

    for (let level = 1; level <= 30; level += 1) {
        const item = document.createElement('li');
        item.className = 'level-dot';
        item.dataset.level = String(level);
        item.textContent = String(level);
        trackerEl.appendChild(item);
    }
};

const updateTracker = (currentLevel) => {
    const dots = [...trackerEl.querySelectorAll('.level-dot')];

    dots.forEach((dot) => {
        const dotLevel = Number(dot.dataset.level);
        const tier =
            dotLevel >= 21 ? 'hard'
            : dotLevel >= 11 ? 'medium'
            : 'easy';

        dot.classList.remove(
            'is-complete',
            'is-current',
            'is-medium-complete',
            'is-medium-current',
            'is-hard-complete',
            'is-hard-current'
        );

        if (dotLevel < currentLevel) {
            if (tier === 'medium') {
                dot.classList.add('is-medium-complete');
            } else if (tier === 'hard') {
                dot.classList.add('is-hard-complete');
            } else {
                dot.classList.add('is-complete');
            }
        }

        if (dotLevel === currentLevel) {
            if (tier === 'medium') {
                dot.classList.add('is-medium-current');
            } else if (tier === 'hard') {
                dot.classList.add('is-hard-current');
            } else {
                dot.classList.add('is-current');
            }
        }
    });
};

const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return;
    }

    hasAnswered = false;
    nextButtonEl.disabled = true;

    levelInlineEl.textContent = `LEVEL: Level ${currentQuestion.level}`;
    difficultyInlineEl.textContent = `DIFFICULTY: ${currentQuestion.difficulty}`;
    rankInlineEl.textContent = `RANK: ${currentQuestion.rank}`;
    flavorInlineEl.textContent = `STATUS: "${currentQuestion.flavorText}"`;
    difficultyInlineEl.classList.remove('is-easy', 'is-medium', 'is-hard');
    rankInlineEl.classList.remove('is-easy', 'is-medium', 'is-hard');
    difficultyInlineEl.classList.add(getDifficultyClass(currentQuestion.difficulty));
    rankInlineEl.classList.add(getDifficultyClass(currentQuestion.difficulty));
    questionTextEl.textContent = currentQuestion.question;
    feedbackTextEl.textContent = 'Choose one answer to preview the interaction flow.';
    explanationTextEl.textContent = 'Explanation will appear here after you submit an answer.';
    explanationCardEl.setAttribute('hidden', '');
    updateTracker(currentQuestion.level);

    answerGridEl.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-button';
        button.innerHTML = `
            <span class="answer-label">Option ${String.fromCharCode(65 + index)}</span>
            <span class="answer-copy">${choice}</span>
        `;

        button.addEventListener('click', () => handleAnswer(button, choice, currentQuestion.answer));
        answerGridEl.appendChild(button);
    });
};

const handleAnswer = (selectedButton, selectedChoice, correctAnswer) => {
    if (hasAnswered) {
        return;
    }

    hasAnswered = true;

    const answerButtons = [...answerGridEl.querySelectorAll('.answer-button')];
    const isCorrect = selectedChoice === correctAnswer;

    answerButtons.forEach((button) => {
        const choiceText = button.querySelector('.answer-copy')?.textContent;
        const isCorrectChoice = choiceText === correctAnswer;

        button.disabled = true;
        button.classList.toggle('is-correct', isCorrectChoice);
        button.classList.toggle('is-incorrect', button === selectedButton && !isCorrectChoice);
        button.classList.toggle('is-dimmed', button !== selectedButton && !isCorrectChoice);
    });

    if (isCorrect) {
        feedbackTextEl.textContent = 'Prototype flow: correct answers simply move to the next sample question.';
    } else {
        feedbackTextEl.textContent = `Prototype only: the final version will reset on a wrong answer. Correct answer: ${correctAnswer}.`;
    }

    explanationTextEl.textContent = questions[currentQuestionIndex].explanation || 'No explanation available for this prototype question yet.';
    explanationCardEl.removeAttribute('hidden');

    nextButtonEl.disabled = false;
};

const goToNextQuestion = () => {
    if (!questions.length) {
        return;
    }

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    renderQuestion();
};

nextButtonEl?.addEventListener('click', goToNextQuestion);
launchStartEl?.addEventListener('click', () => {
    launchOverlayEl?.setAttribute('hidden', '');
});

buildTracker();
renderQuestion();
