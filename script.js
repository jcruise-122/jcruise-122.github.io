// ===============================
// Past Papers Website - script.js
// ===============================

// Wait until the page has loaded
document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // Search functionality
    // -------------------------------
    const searchInput = document.getElementById("searchInput");
    const papers = document.querySelectorAll(".paper-card");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase().trim();

            papers.forEach(function (paper) {
                const text = paper.textContent.toLowerCase();

                if (text.includes(searchTerm)) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Country filter
    // -------------------------------
    const countryFilter = document.getElementById("countryFilter");

    if (countryFilter) {
        countryFilter.addEventListener("change", function () {
            const selectedCountry = countryFilter.value.toLowerCase();

            papers.forEach(function (paper) {
                const country = paper.dataset.country
                    ? paper.dataset.country.toLowerCase()
                    : "";

                if (selectedCountry === "all" || country === selectedCountry) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Subject filter
    // -------------------------------
    const subjectFilter = document.getElementById("subjectFilter");

    if (subjectFilter) {
        subjectFilter.addEventListener("change", function () {
            const selectedSubject = subjectFilter.value.toLowerCase();

            papers.forEach(function (paper) {
                const subject = paper.dataset.subject
                    ? paper.dataset.subject.toLowerCase()
                    : "";

                if (
                    selectedSubject === "all" ||
                    subject === selectedSubject
                ) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Paid explanations
    // -------------------------------
    const paidButtons = document.querySelectorAll(".paid-answer");

    paidButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            alert(
                "The explained answer costs K1.00. " +
                "Payment can be made using MTN Mobile Money, " +
                "Airtel Money, Zamtel Money or supported bank options."
            );
        });
    });


    // -------------------------------
    // Mobile menu
    // -------------------------------
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");
        });
    }


    // -------------------------------
    // Back to top button
    // -------------------------------
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
// ===============================
// QUIZ SYSTEM
// ===============================

let quizQuestions = [
    {
        question: "What is the capital city of Zambia?",
        answers: ["Lusaka", "Kitwe", "Ndola", "Livingstone"],
        correct: 0
    },
    {
        question: "What is 5 + 5?",
        answers: ["8", "9", "10", "11"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    }
];

let currentQuestion = 0;
let quizScore = 0;
let quizMode = "solo";
let playerNames = [];
let playerScores = [0, 0, 0];
let currentPlayer = 0;


// ===============================
// SOLO QUIZ
// ===============================

function startSoloQuiz() {
    quizMode = "solo";
    currentQuestion = 0;
    quizScore = 0;

    document.getElementById("battle-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    showQuizQuestion();
}


// ===============================
// SHOW QUESTION
// ===============================

function showQuizQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }

    const question = quizQuestions[currentQuestion];

    document.getElementById("quiz-question").textContent =
        `${currentQuestion + 1}. ${question.question}`;

    const answersContainer = document.getElementById("quiz-answers");

    answersContainer.innerHTML = "";

    question.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.textContent = answer;

        button.onclick = function() {
            if (index === question.correct) {
                quizScore++;
                alert("✅ Correct!");
            } else {
                alert("❌ Wrong answer!");
            }

            document.getElementById("quiz-score").textContent =
                `Score: ${quizScore}`;

            document.getElementById("next-question").style.display =
                "block";

            const buttons =
                answersContainer.querySelectorAll("button");

            buttons.forEach(function(btn) {
                btn.disabled = true;
            });
        };

        answersContainer.appendChild(button);
    });

    document.getElementById("next-question").style.display = "none";
}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {
    currentQuestion++;
    showQuizQuestion();
}


// ===============================
// END QUIZ
// ===============================

function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";

    alert(
        `Quiz finished! Your score was ${quizScore} out of ${quizQuestions.length}.`
    );
}


// ===============================
// CHALLENGE FRIENDS
// ===============================

function startBattleQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("battle-container").style.display = "block";
}


// ===============================
// START BATTLE
// ===============================

function startBattle() {

    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();
    const player3 = document.getElementById("player3").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for Player 1 and Player 2.");
        return;
    }

    playerNames = [player1, player2];

    if (player3 !== "") {
        playerNames.push(player3);
    }

    playerScores = new Array(playerNames.length).fill(0);

    currentQuestion = 0;
    currentPlayer = 0;

    document.getElementById("battle-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    showBattleQuestion();
}


// ===============================
// BATTLE QUESTION
// ===============================

function showBattleQuestion() {

    if (currentQuestion >= quizQuestions.length) {
        showBattleResult();
        return;
    }

    const question = quizQuestions[currentQuestion];

    document.getElementById("quiz-question").textContent =
        `${playerNames[currentPlayer]}'s turn: ${question.question}`;

    const answersContainer = document.getElementById("quiz-answers");

    answersContainer.innerHTML = "";

    question.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.textContent = answer;

        button.onclick = function() {

            if (index === question.correct) {
                playerScores[currentPlayer]++;
                alert("✅ Correct!");
            } else {
                alert("❌ Wrong answer!");
            }

            const buttons =
                answersContainer.querySelectorAll("button");

            buttons.forEach(function(btn) {
                btn.disabled = true;
            });

            setTimeout(function() {

                currentPlayer++;

                if (currentPlayer >= playerNames.length) {
                    currentPlayer = 0;
                    currentQuestion++;
                }

                showBattleQuestion();

            }, 500);
        };

        answersContainer.appendChild(button);
    });

    document.getElementById("quiz-score").textContent =
        `${playerNames[currentPlayer]}: ${playerScores[currentPlayer]}`;
}


// ===============================
// BATTLE RESULTS
// ===============================

function showBattleResult() {

    let result = "🏆 Quiz Battle Results\n\n";

    playerNames.forEach(function(name, index) {
        result +=
            `${name}: ${playerScores[index]} points\n`;
    });

    alert(result);

    document.getElementById("quiz-container").style.display = "none";
}

// ===============================
// DOCUMENT SEARCH
// ===============================

function searchDocuments() {
    const searchBox = document.getElementById("search");

    if (!searchBox) {
        return;
    }

    const searchText = searchBox.value.toLowerCase();

    const documents = document.querySelectorAll(".document-card");

    documents.forEach(documentCard => {
        const text = documentCard.textContent.toLowerCase();

        if (text.includes(searchText)) {
            documentCard.style.display = "";
        } else {
            documentCard.style.display = "none";
        }
    });
}


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("show");
    }
}


// ===============================
// PAGE LOADING
// ===============================

document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully.");

    const searchBox = document.getElementById("search");

    if (searchBox) {
        searchBox.addEventListener("input", searchDocuments);
    }
});
