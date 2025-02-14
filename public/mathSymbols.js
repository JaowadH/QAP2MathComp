document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < 20; i++) {
        let symbol = document.createElement("div");
        symbol.classList.add("math-symbol");
        symbol.innerHTML = ["+", "-", "×", "÷", "∑", "π", "√", "∞", "∫", "∆"][Math.floor(Math.random() * 10)];
        symbol.style.left = Math.random() * 100 + "vw";
        symbol.style.top = Math.random() * 100 + "vh";
        symbol.style.animationDuration = Math.random() * 5 + 3 + "s";
        document.body.appendChild(symbol);
    }
});

