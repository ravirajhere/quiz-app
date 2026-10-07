# 🧠 Quiz App

A clean, interactive JavaScript quiz app that runs entirely in the browser. 10 questions, 30-second timer per question, instant answer feedback, and high score saved locally. No backend, no signup, no dependencies.

## 🌐 Live Demo
👉 **https://rj-quiz-app.vercel.app**

## 💡 Why I Built This
Most quiz apps online are cluttered with ads, require signup, or have ugly interfaces. I wanted to build a quiz app that:
1. Opens instantly — no installation, no signup
2. Looks clean and works on any device
3. Has a real timer to make it feel like a quiz
4. Saves your high score so you can try to beat it

This is also my first project where I managed real state — timer, score, current question, and screen switching — all in vanilla JavaScript.

## ✨ Features
- **10 JavaScript questions** — basics level (HTML, CSS, JS fundamentals)
- **30-second timer per question** — turns red and pulses when 10 seconds are left
- **Auto-reveal on timeout** — if you don't answer, the correct option is shown
- **Instant feedback** — correct answer goes green, wrong goes red
- **Score tracking** — +1 for every correct answer
- **High score saved in localStorage** — survives page refresh
- **4 result messages** — different emoji and message based on score
- **Restart anytime** — try again with one click
- **100% client-side** — no backend, no data sent anywhere

## 🛠️ Tech Stack
- HTML5
- CSS3 — animations, transitions, responsive layout
- JavaScript (Vanilla) — timer logic, state management, DOM manipulation
- localStorage (high score persistence)
- Vercel (Deployment)

## 📂 Project Structure

quiz-app/
├── index.html
├── style.css
├── script.js
└── README.md

## 🎮 How It Works

1. **Home screen** — shows your high score and a Start button
2. **Quiz screen** — one question at a time, with a 30-second timer and progress bar
3. **Result screen** — final score, a message based on performance, and Try Again button

The app manages state in vanilla JavaScript:
- `currentQuestion` — which question you're on
- `score` — how many you got right
- `timeLeft` — seconds remaining for the current question
- `answered` — whether you've already picked an option

## 🚀 How to Run Locally
1. Clone the repo:
   git clone https://github.com/ravirajhere/quiz-app.git
2. Navigate into the folder:
   cd quiz-app
3. Open index.html in your browser. That's it — no installation needed.

## 🧠 What I Learned From This Project
- Managing multiple pieces of state in vanilla JavaScript
- Timer logic with setInterval and clearInterval
- Screen switching without any framework (just class toggling)
- Storing and reading data from localStorage
- Building clean, responsive UI with CSS transitions
- Handling edge cases: timeout, double-click prevention, disabled states

## 🔮 Future Improvements
- Add more categories (Math, History, Science)
- Difficulty levels (Easy / Medium / Hard)
- Sound effects for correct/wrong answers
- Leaderboard with names (would need a backend)
- Shuffle questions and options on every play
- Timer customization (15s / 30s / 60s)
- Progress saved across sessions

## 👤 Author
**Ravi Raj**
GitHub: [@ravirajhere](https://github.com/ravirajhere)
