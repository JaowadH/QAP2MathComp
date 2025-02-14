document.addEventListener("DOMContentLoaded", function () {
    const feedbackMessage = document.getElementById("feedbackMessage");

    if (feedbackMessage) {
        // If the answer is correct, trigger confetti
        if (feedbackMessage.classList.contains("correct-answer")) {
            startConfetti();
            setTimeout(stopConfetti, 3000);
        }

        // Remove feedback message after 3 seconds
        setTimeout(() => {
            feedbackMessage.style.opacity = "0";
            setTimeout(() => feedbackMessage.remove(), 500);
        }, 3000);
    }
});
