// Function to find the Greatest Common Divisor (GCD)
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Generates a random math question
function generateMathQuestion() {
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;

  let questionText = `${a} ${operator} ${b}`;
  let correctAnswer;

  switch (operator) {
      case '+':
          correctAnswer = a + b;
          break;
      case '-':
          correctAnswer = a - b;
          break;
      case '*':
          correctAnswer = a * b;
          break;
      case '/':
          if (a % b === 0) {
              correctAnswer = a / b; // Integer division
          } else {
              const divisor = gcd(a, b);
              let numerator = a / divisor;
              let denominator = b / divisor;
              correctAnswer = { num: numerator, denom: denominator }; // Store fraction as an object
          }
          break;
      default:
          correctAnswer = null;
  }

  return { questionText, correctAnswer };
}

// Validates that input is a number
function isValidNumber(input) {
  return /^-?\d+(\.\d+)?(\/-?\d+(\.\d+)?)?$/.test(input);
}


// Checks the user's answer
function checkAnswer(userAnswer, correctAnswer) {
  if (!userAnswer || !isValidNumber(userAnswer)) return false;

  userAnswer = userAnswer.trim();

  if (typeof correctAnswer === 'number') {
      return Math.abs(parseFloat(userAnswer) - correctAnswer) < 0.001;
  } else if (typeof correctAnswer === 'object') {
      // Handle fraction comparison
      const [num, denom] = userAnswer.split('/').map(Number);
      if (!num || !denom) return false;
      
      // Normalize the user's fraction
      const userGcd = gcd(num, denom);
      const userNum = num / userGcd;
      const userDenom = denom / userGcd;

      return userNum === correctAnswer.num && userDenom === correctAnswer.denom;
  } else {
      return userAnswer === correctAnswer.toString();
  }
}

module.exports = { generateMathQuestion, checkAnswer, isValidNumber };
