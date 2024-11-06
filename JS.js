document.addEventListener('DOMContentLoaded', () => {
    const startContainer = document.querySelector('.start-container');
    const quizContainer = document.querySelector('.quiz-container');
    const startQuizButton = document.getElementById('startQuiz');
    const submitQuizButton = document.getElementById('submitQuiz');
    const retryQuizButton = document.getElementById('retryQuiz');
    const result = document.getElementById('result');
    const timerDisplay = document.getElementById('timer');
    const questions = document.querySelectorAll('.question');
    
    let timer;
    let timeLeft = 300; 

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuizButton.click(); 
        }
        timeLeft--;
    }

    function calculateScore() {
        let score = 0;
        const answers = {
            q1: "Van Gogh",
            q2: "Water Lilies",
            q3: "Starry Night",
            q4: "Salvador Dalí",
            q5: "Mona Lisa",
            q6: "Edvard Munch",
            q7: "Johannes Vermeer",
            q8: "The Last Supper",
            q9: "Sandro Botticelli",
            q10: "Pablo Picasso"
        };
        
        for (const [key, value] of Object.entries(answers)) {
            if (document.querySelector(`input[name="${key}"]:checked`)?.value === value) {
                score++;
            }
        }
        
        return score;
    }

    function showResult(score) {
        result.textContent = `Your score is ${score} out of 10.`;
        result.style.opacity = 0;
        result.style.display = 'block';

        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.05;
            result.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeIn);
            }
        }, 50);
    }

    startQuizButton.addEventListener('click', () => {
        startContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        timeLeft = 300; 
        timer = setInterval(updateTimer, 1000); 
    });

    submitQuizButton.addEventListener('click', () => {
        clearInterval(timer);
        const score = calculateScore();
        showResult(score);
        retryQuizButton.style.display = 'block';
    });

    retryQuizButton.addEventListener('click', () => {
        result.style.display = 'none';
        retryQuizButton.style.display = 'none';
        startContainer.style.display = 'block';
        quizContainer.style.display = 'none';
        document.querySelectorAll('input[type="radio"]:checked').forEach(answer => answer.checked = false);
        timerDisplay.textContent = 'Time left: 05:00'; 
    });

    questions.forEach((question, index) => {
        setTimeout(() => {
            question.style.display = 'block';
            let opacity = 0;
            question.style.opacity = opacity;

            const fadeIn = setInterval(() => {
                opacity += 0.05;
                question.style.opacity = opacity;
                if (opacity >= 1) {
                    clearInterval(fadeIn);
                }
            }, 50);
        }, 500 * index);
    });
});
