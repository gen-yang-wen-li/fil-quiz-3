document.addEventListener("DOMContentLoaded", () => {
    const homePage = document.getElementById("page-home");
    const quizPage = document.getElementById("page-quiz");
    const quizPageTitle = document.getElementById("quiz-page-title");
    const quizQuestionEl = document.getElementById("quiz-question");
    const choicesGrid = document.getElementById("choices-grid");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizExplanationEl = document.getElementById("quiz-explanation");
    const backBtn = document.getElementById("back-to-home");

    const boxes = document.querySelectorAll(".grid-box[data-page]");

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            const pageNum = box.getAttribute("data-page");
            
            // Find corresponding custom meta tag in the head
            const metaTag = document.querySelector(`meta[name="quiz-data"][data-page="${pageNum}"]`);
            if (!metaTag) return;

            const question = metaTag.getAttribute("data-question");
            const choices = metaTag.getAttribute("data-choices").split(",");
            const correctAnswer = metaTag.getAttribute("data-answer");
            const explanation = metaTag.getAttribute("data-explanation");

            // Populate quiz page
            quizPageTitle.textContent = `Tanong ${pageNum} ng 15`;
            quizQuestionEl.textContent = question;
            quizFeedback.textContent = "";
            quizExplanationEl.textContent = "";

            // Clear previous choices
            choicesGrid.innerHTML = "";

            // Render choice boxes
            choices.forEach(choice => {
                const choiceBox = document.createElement("div");
                choiceBox.className = "choice-box";
                choiceBox.textContent = choice;

                choiceBox.addEventListener("click", () => {
                    // Disable further clicks on choices for this round
                    const allChoices = choicesGrid.querySelectorAll(".choice-box");
                    allChoices.forEach(cb => cb.style.pointerEvents = "none");

                    if (choice.trim() === correctAnswer.trim()) {
                        choiceBox.classList.add("correct");
                        quizFeedback.textContent = "Tama! 🎉";
                        quizFeedback.style.color = "#4ade80";
                        quizExplanationEl.textContent = explanation;
                    } else {
                        choiceBox.classList.add("incorrect");
                        quizFeedback.textContent = `Mali. Tamang sagot: ${correctAnswer}`;
                        quizFeedback.style.color = "#f87171";
                        quizExplanationEl.textContent = explanation;

                        // Highlight correct one
                        allChoices.forEach(cb => {
                            if (cb.textContent.trim() === correctAnswer.trim()) {
                                cb.classList.add("correct");
                            }
                        });
                    }
                });

                choicesGrid.appendChild(choiceBox);
            });

            // Switch to quiz page
            homePage.classList.remove("active");
            quizPage.classList.add("active");
        });
    });

    backBtn.addEventListener("click", () => {
        quizPage.classList.remove("active");
        homePage.classList.add("active");
    });
});
