function startConfetti() {
    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.backgroundColor = randomColor();
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function stopConfetti() {
    document.querySelectorAll(".confetti").forEach(el => el.remove());
}

function randomColor() {
    const colors = ["#ffeb3b", "#ff4081", "#3f51b5", "#4caf50", "#ff5722"];
    return colors[Math.floor(Math.random() * colors.length)];
}
