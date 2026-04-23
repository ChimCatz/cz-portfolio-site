const config = window.TECH_MASTER_CONFIG || {
    countdownSeconds: 10,
    questionBanks: {},
    rankBands: [],
};

const trackerEl = document.querySelector('[data-level-tracker]');
const levelInlineEl = document.querySelector('[data-level-inline]');
const difficultyInlineEl = document.querySelector('[data-difficulty-inline]');
const rankInlineEl = document.querySelector('[data-rank-inline]');
const flavorInlineEl = document.querySelector('[data-flavor-inline]');
const timerInlineEl = document.querySelector('[data-timer-inline]');
const questionTextEl = document.querySelector('[data-question-text]');
const answerGridEl = document.querySelector('[data-answer-grid]');
const feedbackTextEl = document.querySelector('[data-feedback-text]');
const nextButtonEl = document.querySelector('[data-next-button]');
const restartButtonEl = document.querySelector('[data-restart-button]');
const explanationCardEl = document.querySelector('[data-explanation-card]');
const explanationTextEl = document.querySelector('[data-explanation-text]');
const launchOverlayEl = document.querySelector('[data-launch-overlay]');
const launchStartEl = document.querySelector('[data-launch-start]');
const winOverlayEl = document.querySelector('[data-win-overlay]');
const winRankEl = document.querySelector('[data-win-rank]');
const winStatusEl = document.querySelector('[data-win-status]');
const winRestartEl = document.querySelector('[data-win-restart]');

let questions = [];
let currentQuestionIndex = 0;
let hasAnswered = false;
let countdownValue = config.countdownSeconds;
let countdownTimer = null;

const shuffleArray = (items) => {
    const copy = [...items];

    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }

    return copy;
};

const getDifficultyClass = (difficulty) => {
    if (difficulty === 'Medium') {
        return 'is-medium';
    }

    if (difficulty === 'Hard') {
        return 'is-hard';
    }

    return 'is-easy';
};

const getRankClass = (rank) => {
    if (rank === 'Junior Developer') {
        return 'is-silver';
    }

    if (rank === 'Software Engineer') {
        return 'is-gold';
    }

    if (rank === 'Senior Engineer') {
        return 'is-platinum';
    }

    if (rank === 'Tech Lead') {
        return 'is-diamond';
    }

    if (rank === 'Chief Technology Officer') {
        return 'is-amethyst';
    }

    return 'is-bronze';
};

const getRankInfo = (level) => {
    return config.rankBands.find((band) => level >= band.min && level <= band.max) || {
        rank: 'Intern',
        flavorText: 'Learning the basics',
    };
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

const updateTimerDisplay = () => {
    timerInlineEl.textContent = `TIME: ${countdownValue}s`;
    timerInlineEl.classList.toggle('is-warning', countdownValue <= 5 && countdownValue > 2);
    timerInlineEl.classList.toggle('is-danger', countdownValue <= 2);
};

const stopCountdown = () => {
    if (countdownTimer) {
        window.clearInterval(countdownTimer);
        countdownTimer = null;
    }
};

const showRestartButton = () => {
    restartButtonEl?.removeAttribute('hidden');
};

const hideRestartButton = () => {
    restartButtonEl?.setAttribute('hidden', '');
};

const hideWinOverlay = () => {
    winOverlayEl?.setAttribute('hidden', '');
};

const showWinOverlay = (question) => {
    if (!winOverlayEl || !winRankEl || !winStatusEl || !question) {
        return;
    }

    const rankClass = getRankClass(question.rank);

    winRankEl.textContent = `RANK: ${question.rank}`;
    winStatusEl.textContent = `STATUS: "${question.flavorText}"`;

    winRankEl.className = 'meta-inline';
    winStatusEl.className = 'meta-inline meta-inline-flavor';
    winRankEl.classList.add(rankClass);
    winStatusEl.classList.add(rankClass);

    winOverlayEl.removeAttribute('hidden');
};

const disableAnswerButtons = () => {
    [...answerGridEl.querySelectorAll('.answer-button')].forEach((button) => {
        button.disabled = true;
    });
};

const revealExplanation = (question) => {
    explanationTextEl.textContent = question.explanation || 'No explanation available for this question yet.';
    explanationCardEl.removeAttribute('hidden');
};

const markAnswerState = (selectedButton, correctAnswer, isTimeout = false) => {
    const answerButtons = [...answerGridEl.querySelectorAll('.answer-button')];

    answerButtons.forEach((button) => {
        const choiceText = button.querySelector('.answer-copy')?.textContent;
        const isCorrectChoice = choiceText === correctAnswer;

        button.disabled = true;
        button.classList.toggle('is-correct', isCorrectChoice);
        button.classList.toggle('is-incorrect', Boolean(selectedButton) && button === selectedButton && !isCorrectChoice);
        button.classList.toggle('is-dimmed', button !== selectedButton && !isCorrectChoice && !isTimeout);
    });
};

const lockRunAsFailed = (message, question, selectedButton = null, isTimeout = false) => {
    hasAnswered = true;
    stopCountdown();
    markAnswerState(selectedButton, question.answer, isTimeout);
    revealExplanation(question);
    feedbackTextEl.textContent = message;
    nextButtonEl.disabled = true;
    showRestartButton();
};

const handleTimeout = () => {
    const question = questions[currentQuestionIndex];

    if (!question || hasAnswered) {
        return;
    }

    countdownValue = 0;
    updateTimerDisplay();

    lockRunAsFailed(
        `Time's up. This counts as a wrong answer. Correct answer: ${question.answer}.`,
        question,
        null,
        true
    );
};

const startCountdown = () => {
    stopCountdown();
    countdownValue = config.countdownSeconds;
    updateTimerDisplay();

    countdownTimer = window.setInterval(() => {
        countdownValue -= 1;
        updateTimerDisplay();

        if (countdownValue <= 0) {
            handleTimeout();
        }
    }, 1000);
};

const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        questionTextEl.textContent = 'Unable to load question.';
        feedbackTextEl.textContent = 'Question data is missing.';
        disableAnswerButtons();
        nextButtonEl.disabled = true;
        stopCountdown();
        return;
    }

    hasAnswered = false;
    nextButtonEl.disabled = true;
    hideRestartButton();
    hideWinOverlay();

    const difficultyClass = getDifficultyClass(currentQuestion.difficulty);

    levelInlineEl.textContent = `LEVEL: Level ${currentQuestion.level}`;
    difficultyInlineEl.textContent = `DIFFICULTY: ${currentQuestion.difficulty}`;
    rankInlineEl.textContent = `RANK: ${currentQuestion.rank}`;
    flavorInlineEl.textContent = `STATUS: "${currentQuestion.flavorText}"`;

    difficultyInlineEl.classList.remove('is-easy', 'is-medium', 'is-hard');
    rankInlineEl.classList.remove('is-bronze', 'is-silver', 'is-gold', 'is-platinum', 'is-diamond', 'is-amethyst');
    flavorInlineEl.classList.remove('is-bronze', 'is-silver', 'is-gold', 'is-platinum', 'is-diamond', 'is-amethyst');
    timerInlineEl.classList.remove('is-warning', 'is-danger');

    difficultyInlineEl.classList.add(difficultyClass);
    rankInlineEl.classList.add(getRankClass(currentQuestion.rank));
    flavorInlineEl.classList.add(getRankClass(currentQuestion.rank));

    questionTextEl.textContent = currentQuestion.question;
    feedbackTextEl.textContent = 'Answer before the timer reaches zero.';
    explanationTextEl.textContent = 'Explanation will appear here after you answer the question.';
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

        button.addEventListener('click', () => handleAnswer(button, choice));
        answerGridEl.appendChild(button);
    });

    startCountdown();
};

const handleAnswer = (selectedButton, selectedChoice) => {
    if (hasAnswered) {
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedChoice === currentQuestion.answer;

    hasAnswered = true;
    stopCountdown();
    markAnswerState(selectedButton, currentQuestion.answer);
    revealExplanation(currentQuestion);

    if (!isCorrect) {
        lockRunAsFailed(
            `Wrong answer. The correct answer is ${currentQuestion.answer}.`,
            currentQuestion,
            selectedButton
        );
        return;
    }

    if (currentQuestionIndex === questions.length - 1) {
        feedbackTextEl.textContent = 'You cleared the full 30-level Tech Master run.';
        nextButtonEl.disabled = true;
        showWinOverlay(currentQuestion);
        return;
    }

    feedbackTextEl.textContent = 'Correct answer. Move on to the next level.';
    nextButtonEl.disabled = false;
};

const goToNextQuestion = () => {
    if (nextButtonEl.disabled || currentQuestionIndex >= questions.length - 1) {
        return;
    }

    currentQuestionIndex += 1;
    renderQuestion();
};

const buildQuestionSet = () => {
    const easy = shuffleArray(config.questionBanks.easy || []).slice(0, 10).map((entry, index) => {
        const level = index + 1;
        const rankInfo = getRankInfo(level);

        return {
            level,
            difficulty: 'Easy',
            question: entry.question,
            choices: entry.choices,
            answer: entry.choices[entry.answer],
            explanation: entry.explanation,
            rank: rankInfo.rank,
            flavorText: rankInfo.flavorText,
        };
    });

    const medium = shuffleArray(config.questionBanks.medium || []).slice(0, 10).map((entry, index) => {
        const level = index + 11;
        const rankInfo = getRankInfo(level);

        return {
            level,
            difficulty: 'Medium',
            question: entry.question,
            choices: entry.choices,
            answer: entry.choices[entry.answer],
            explanation: entry.explanation,
            rank: rankInfo.rank,
            flavorText: rankInfo.flavorText,
        };
    });

    const hard = shuffleArray(config.questionBanks.hard || []).slice(0, 10).map((entry, index) => {
        const level = index + 21;
        const rankInfo = getRankInfo(level);

        return {
            level,
            difficulty: 'Hard',
            question: entry.question,
            choices: entry.choices,
            answer: entry.choices[entry.answer],
            explanation: entry.explanation,
            rank: rankInfo.rank,
            flavorText: rankInfo.flavorText,
        };
    });

    return [...easy, ...medium, ...hard];
};

const restartGame = () => {
    stopCountdown();
    currentQuestionIndex = 0;
    hasAnswered = false;
    hideRestartButton();
    hideWinOverlay();
    explanationCardEl?.setAttribute('hidden', '');
    explanationTextEl.textContent = 'Explanation will appear here after you answer the question.';
    feedbackTextEl.textContent = 'Answer before the timer reaches zero.';
    nextButtonEl.disabled = true;

    questions = buildQuestionSet();

    if (questions.length !== 30) {
        questionTextEl.textContent = 'Unable to load the Tech Master question set.';
        feedbackTextEl.textContent = 'Please refresh the page or verify the question files are available.';
        timerInlineEl.textContent = 'TIME: --';
        return;
    }

    renderQuestion();
    launchOverlayEl?.removeAttribute('hidden');
};

const initGame = () => {
    buildTracker();

    try {
        questions = buildQuestionSet();

        if (questions.length !== 30) {
            throw new Error('Tech Master question bank must contain exactly 30 levels.');
        }

        renderQuestion();
    } catch (error) {
        questionTextEl.textContent = 'Unable to load the Tech Master question set.';
        feedbackTextEl.textContent = 'Please refresh the page or verify the question files are available.';
        nextButtonEl.disabled = true;
        timerInlineEl.textContent = 'TIME: --';
        explanationTextEl.textContent = 'Question loading failed, so explanations are unavailable right now.';
        explanationCardEl.removeAttribute('hidden');
        console.error(error);
    }
};

nextButtonEl?.addEventListener('click', goToNextQuestion);
launchStartEl?.addEventListener('click', () => {
    launchOverlayEl?.setAttribute('hidden', '');
    renderQuestion();
});
restartButtonEl?.addEventListener('click', restartGame);
winRestartEl?.addEventListener('click', restartGame);

initGame();
