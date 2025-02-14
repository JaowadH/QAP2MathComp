[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Tw9ktGPW)
# Math Competition App

This is the starting point for the **Math Competition App** assignment. The goal of this project is to create a simple web application where users can practice solving math questions, track their streak of correct answers, and view leaderboards.

## Features
- **Home Page**: 
  - Start a new quiz or view the leaderboards.
  - Display the user's last recorded streak or a message indicating no streak exists.
  
- **Quiz Page**: 
  - Display math questions for the user to answer.
  - Track the user's streak of correct answers.

- **Quiz Completion Page**:
  - Display the current streak.
  - Allow the user to start a new quiz or return to the home page.

- **Leaderboards Page**:
  - Display the top 10 streaks, including the number of correct answers and when the streak was obtained.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org) installed on your machine.
- A code editor, such as [VSCode](https://code.visualstudio.com/).

## How to Use this Repo

This repository is set up as a **GitHub assignment** to help you quickly create your own version of the **Math Competition App**.

### Steps to use Your Own Repository

1. Once your repository is created, **clone your new repo** to your local machine:
    ```bash
    git clone <your-new-repo-url>
    ```

1. Navigate into the project directory and install the necessary dependencies:
    ```bash
    cd <your-new-repo-name>
    npm install
    ```
  
1. **Run the app:**
    ```bash
    npm start
    ```
    This will start the server at `http://localhost:3000/`.

1. **Run tests:**
    ```bash
    npm test
    ```
    This will run the unit tests for the application.

1. You can now begin working on your project, adding your own code and committing your changes as you go:
    ```bash
    git add .
    git commit -m "First commit"
    git push origin main
    ```

By using this template, you'll have the project structure and initial setup ready to go, so you can focus on building the functionality!

## Development Guidelines

1. **Homepage**:
   - The homepage links should bring you to a new quiz or the leaderboards.
   - Show the last recorded streak or a message indicating there was no streak.
   
2. **Quiz Functionality**:
   - Implement logic to present math questions.
   - Check the correctness of user answers and update the streak.
   
3. **Leaderboards**:
   - Track and display the top 10 streaks in memory (no database required).

4. **Testing**:
   - Write unit tests for:
     - Generating a new math question.
     - Checking if the user's answer is correct or incorrect.
   - Make sure tests pass before submitting the assignment.

## Submission Guidelines
- Submit a link to your GitHub repository through the Teams assignment.
- Ensure all required functionality is implemented and working.
- The project should run with `npm start` and all tests should pass with `npm test`.

## Notes
- Extra npm packages are allowed (except for templating engines other than EJS, and no front-end frameworks like React).
  - No session packages should be required for this assignment
- All pages should use **.ejs templates**.
- All data should be stored in memory (using variables in the code). No persistence between server runs is required. For the sake of this project, assume only one user will be accessing the site at a time
