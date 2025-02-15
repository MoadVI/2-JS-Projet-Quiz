let current_question = 1;
let totalQuestions = 10;
let countdownTimers = {};
let mark = 0;  
const result = document.getElementById("result");
const correctAnswers = {
    1: { answer: "var myVar;", points: 3 },
    2: { answer: "//", points: 2 },
    3: { answer: "function myFunction()", points: 2 },
    4: { answer: "onclick", points: 2 },
    5: { answer: "document.getElementById('id')", points: 2 },
    6: { answer: "===", points: 2 },
    7: { answer: "console.log('Hello World')", points: 2 },
    8: { answer: "setInterval()", points: 2 },
    9: { answer: "parseInt('10')", points: 2 },
    10: { answer: "JSON.stringify(obj)", points: 1 },
};

function startCountdown(questionNum) {
    const timer = document.getElementById(`timer${questionNum}`);
    timer.textContent = 10;

    if (countdownTimers[questionNum]) {
        clearInterval(countdownTimers[questionNum]);
    }

    const countdown = setInterval(() => {
        if (current_question === questionNum) {
            timer.textContent--;
            if (timer.textContent <= 0) {
                clearInterval(countdown);
                timer.innerHTML = "<h3 style='color:red; font-weight:bold; background-color:rgb(92, 25, 155)'>Time's up</h3>";


                if (current_question === totalQuestions) {
                    show_result();
                } else {
                    next(questionNum);
                }
            }
        } else {
            clearInterval(countdown);
        }
    }, 1000);

    countdownTimers[questionNum] = countdown;
}

function show_result() {

    clearInterval(countdownTimers[current_question]);


    const lastQuestionDiv = document.getElementById(`question${totalQuestions}`);
    if (lastQuestionDiv) {
        lastQuestionDiv.classList.add("inactive");
    }


    result.scrollIntoView({ behavior: "smooth" });
    displayResult();
}

function showQuestion(questionNum) {
    const currentQuestionDiv = document.getElementById(`question${questionNum}`);
    if (currentQuestionDiv) {
        currentQuestionDiv.style.display = "block";
    }
}

function next(current) {
    const currDiv = document.getElementById(`question${current}`);
    currDiv.classList.add("inactive");

    current_question++;

    if (current_question <= totalQuestions) {
        const nextDiv = document.getElementById(`question${current_question}`);
        if (nextDiv) {
            nextDiv.style.display = "block";
            nextDiv.classList.remove("inactive");
            nextDiv.scrollIntoView({ behavior: "smooth" });
            startCountdown(current_question);
        }
    } else {

        show_result();
    }
}

function selectOption(element, questionNum) {
    document.querySelectorAll(`#question${questionNum} .option`).forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");

    const selectedAnswer = element.textContent;
    if (selectedAnswer === correctAnswers[questionNum].answer) {
        mark += correctAnswers[questionNum].points;
    }
}

function displayResult() {
    result.textContent = `${mark}/20`;
}

document.getElementById("quiz-start").addEventListener("click", function () {
    document.getElementById("quiz-start").style.display = "none";
    showQuestion(current_question);
    startCountdown(current_question);
});
