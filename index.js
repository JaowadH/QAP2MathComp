const express = require('express');
const path = require('path');
const session = require('express-session');
const { generateMathQuestion, checkAnswer, isValidNumber } = require('./utils/mathUtilities');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Set up Express and Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Configure Express Session
app.use(session({
    secret: 'your-secret-key', // Change to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to `true` in production with HTTPS
}));

// 🏆 Streak & Leaderboard Data
let lastStreak = 0;
let leaderboards = []; // Stores { score, date }

// 📌 Home Page Route
app.get('/', (req, res) => {
  if (!req.session.currentStreak) {
      req.session.currentStreak = 0; // ✅ Initialize if not set
  }
  res.render('home', { 
      currentStreak: req.session.currentStreak,
      lastStreak: req.session.lastStreak || 0
  });
});


// 🎯 Start Quiz Route
app.get('/quiz', (req, res) => {
  try {
      // Ensure session streak exists
      if (!req.session.currentStreak) req.session.currentStreak = 0;
      
      // If no question exists, generate a new one
      if (!req.session.currentQuestion) {
          req.session.currentQuestion = generateMathQuestion();
      }

      res.render('quiz', { 
          question: req.session.currentQuestion.questionText,
          feedback: null, 
          isCorrect: null,
          userAnswer: "", // Ensure the input box starts empty
          currentStreak: req.session.currentStreak
      });
  } catch (error) {
      console.error("Error generating math question:", error);
      res.status(500).send("Internal Server Error");
  }
});

// ✅ Handle Quiz Answer Submission
app.post('/quiz', (req, res) => {
    try {
        if (!req.session.currentStreak) req.session.currentStreak = 0;
  
        let userAnswer = req.body.userAnswer ? req.body.userAnswer.trim() : '';
        let currentQuestion = req.session.currentQuestion;
  
        // ✅ Check if currentQuestion is defined before accessing its properties
        if (!currentQuestion) {
            console.error("Error: currentQuestion is undefined.");
            return res.render('quiz', {
                question: "Error: No question found. Please restart the quiz.",
                feedback: "⚠️ Something went wrong! Please restart the quiz.",
                isCorrect: false,
                userAnswer: '',
                currentStreak: req.session.currentStreak
            });
        }
  
        // Validate input
        if (!isValidNumber(userAnswer)) {
            return res.render('quiz', {
                question: currentQuestion.questionText,
                feedback: "❌ Invalid input! Please enter a valid number.",
                isCorrect: false,
                userAnswer: '',
                currentStreak: req.session.currentStreak
            });
        }
  
        // ✅ Check if correctAnswer exists
        if (typeof currentQuestion.correctAnswer === "undefined") {
            console.error("Error: currentQuestion.correctAnswer is undefined.");
            return res.render('quiz', {
                question: "Error: No correct answer found. Please restart the quiz.",
                feedback: "⚠️ Something went wrong! Please restart the quiz.",
                isCorrect: false,
                userAnswer: '',
                currentStreak: req.session.currentStreak
            });
        }
  
        // Check if the answer is correct
        const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);
        let feedback;
  
        if (isCorrect) {
            req.session.currentStreak++; // ✅ Increase streak
            feedback = `✅ Correct! 🎉 Your current streak: ${req.session.currentStreak}`;
            req.session.currentQuestion = generateMathQuestion(); // ✅ Generate a new question
        } else {
            feedback = `❌ Incorrect! The correct answer is: ${currentQuestion.correctAnswer}. Your final streak was: ${req.session.currentStreak}`;
  
            if (req.session.currentStreak > 0) {
                leaderboards.push({ score: req.session.currentStreak, date: new Date().toISOString() });
  
                // Keep only top 10 scores
                leaderboards.sort((a, b) => b.score - a.score);
                leaderboards = leaderboards.slice(0, 10);
            }
  
            req.session.currentStreak = 0; // ✅ Reset streak
        }
  
        res.render('quiz', {
            question: req.session.currentQuestion.questionText,
            feedback,
            isCorrect,
            userAnswer: '', // ✅ Clears input box after submission
            currentStreak: req.session.currentStreak
        });
  
    } catch (error) {
        console.error("Error processing quiz answer:", error);
        res.status(500).send("Internal Server Error");
    }
  });
  
// 🔄 Restart Quiz Route (No Input Required)
app.post('/restart-quiz', (req, res) => {
  try {
      req.session.currentStreak = 0; // ✅ Reset streak
      req.session.currentQuestion = generateMathQuestion(); // ✅ Generate a new question
      res.redirect('/quiz'); // ✅ Redirect to fresh quiz page
  } catch (error) {
      console.error("Error restarting quiz:", error);
      res.status(500).send("Internal Server Error");
  }
});

// 🎉 End Quiz Route (No Input Required)
app.post('/end-quiz', (req, res) => {
  try {
      req.session.destroy((err) => {
          if (err) {
              console.error("Error ending quiz session:", err);
              return res.status(500).send("Internal Server Error");
          }
          res.render('endQuiz', { message: "🎉 Thanks for playing! See you next time. 🎮" });
      });
  } catch (error) {
      console.error("Error ending quiz:", error);
      res.status(500).send("Internal Server Error");
  }
});

// 🏆 Quiz Completion Page Route
app.get('/quiz-completion', (req, res) => {
    res.render('quizCompletion', { currentStreak: req.session.currentStreak || lastStreak });
});

// 📊 Leaderboards Page Route
app.get('/leaderboards', (req, res) => {
    res.render('leaderboards', { leaderboards });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
