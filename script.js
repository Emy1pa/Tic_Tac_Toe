const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");
const popupButton = document.getElementById("popupButton");

let firstPlayer = { name: "", symbol: "" };
let secondPlayer = { name: "", symbol: "" };

function getScore(name) {
  return parseInt(localStorage.getItem(name + "Score")) || 0;
}

function setScore(name, score) {
  localStorage.setItem(name + "Score", score);
}

function updateScore(name) {
  let score = getScore(name);
  score++;
  setScore(name, score);
  return score;
}

function scoreInitialize() {
  let firstPlayerScore = getScore(firstPlayer.name);
  let secondPlayerScore = getScore(secondPlayer.name);
  return { firstPlayerScore, secondPlayerScore };
}

let { firstPlayerScore, secondPlayerScore } = scoreInitialize();
let currentPlayer;
let gamePlaying = false;
const conditionWin = 5;

const board = Array(400).fill("");

// Create cell
for (let index = 0; index < 400; index++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("index", index);
  cell.addEventListener("click", () => cellClick(index));
  container.appendChild(cell);
}

function cellClick(index) {
  if (!gamePlaying || board[index] !== "") return;
  board[index] = currentPlayer.symbol;
  const cell = container.querySelector(`[index='${index}']`);
  cell.textContent = currentPlayer.symbol;
  if (checkWin(index)) {
    gamePlaying = false;
    const newScore = updateScore(currentPlayer.name);
    showWinPopup(currentPlayer.name, newScore);
  } else {
    currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    updatePlayerInfo();
  }
}

function updatePlayerInfo() {
  const leftPopup = document.querySelector(".left-popup");
  const rightPopup = document.querySelector(".right-popup");
  if (currentPlayer === firstPlayer) {
    leftPopup.style.backgroundColor = "rgba(30, 41, 59, 1)";
    rightPopup.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
  } else {
    leftPopup.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
    rightPopup.style.backgroundColor = "rgba(30, 41, 59, 1)";
  }
}

function checkWin(index) {
  const row = Math.floor(index / 20);
  const col = index % 20;

  // Checking horizontally
  let count = 0;
  for (let i = Math.max(0, col - 4); i <= Math.min(19, col + 4); i++) {
    if (board[row * 20 + i] === currentPlayer.symbol) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }

  // Checking vertically
  count = 0;
  for (let i = Math.max(0, row - 4); i <= Math.min(19, row + 4); i++) {
    if (board[i * 20 + col] === currentPlayer.symbol) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }

  // Checking diagonal (top-left to bottom-right)
  count = 0;
  for (let i = -4; i <= 4; i++) {
    if (
      row + i >= 0 &&
      row + i < 20 &&
      col + i >= 0 &&
      col + i < 20 &&
      board[(row + i) * 20 + (col + i)] === currentPlayer.symbol
    ) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }

  // Checking diagonal (top-right to bottom-left)
  count = 0;
  for (let i = -4; i <= 4; i++) {
    if (
      row + i >= 0 &&
      row + i < 20 &&
      col - i >= 0 &&
      col - i < 20 &&
      board[(row + i) * 20 + (col - i)] === currentPlayer.symbol
    ) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }

  return false;
}

function updateScoreDisplay() {
  document.querySelector(".left-popup .score").textContent = `Score: ${getScore(
    firstPlayer.name
  )}`;
  document.querySelector(
    ".right-popup .score"
  ).textContent = `Score: ${getScore(secondPlayer.name)}`;
}

function showWinPopup(winnerName, newScore) {
  const popup = document.createElement("div");
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;

  popup.innerHTML = `
    <div style="
      background-color: rgba(30, 41, 59, 0.9);
      padding: 40px;
      border-radius: 15px;
      text-align: center;
      color: #e0f2fe;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.3), 0 0 40px rgba(56, 189, 248, 0.2);
      max-width: 400px;
      width: 90%;
      border: 2px solid rgba(56, 189, 248, 0.5);
      position: relative;
      overflow: hidden;
    ">
      <h2 style="
        margin-bottom: 20px;
        font-size: 2.2rem;
        color: #38bdf8;
        text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
      ">Congratulations!</h2>
      <p style="
        margin-bottom: 30px;
        font-size: 1.2rem;
        color: #cbd5e1;
        line-height: 1.6;
      ">${winnerName} wins the game with a new score of ${newScore}!</p>
      <button id="restartBtn" style="
        padding: 12px 24px;
        font-size: 1.1rem;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        background-color: #1e40af;
        color: #e0f2fe;
        text-transform: uppercase;
        letter-spacing: 1px;
      ">Restart Game</button>
    </div>
  `;

  document.body.appendChild(popup);

  const restartBtn = document.getElementById("restartBtn");

  restartBtn.addEventListener("click", function () {
    location.reload();
  });
}

function showPopup(title, message, isFirstPlayer = false) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
  <button class="close-btn">&times;</button>
  <div class="popup-content">
  <h2>${title}</h2>
  <p>${message}</p>
  ${
    isFirstPlayer
      ? `
   <input type="text" id="playerName" placeholder="Enter your name">
    <select id="playerSymbol">
      <option value="X">X</option>
      <option value="O">O</option>
    </select>
    `
      : `
    <input type="text" id="playerName" placeholder="Enter your name">
    <p>Your symbol is : <strong>${secondPlayer.symbol}</strong></p>
    `
  }
    <button id="popupBtn">Save</button>
  </div>
  `;
  document.body.appendChild(popup);

  document.querySelector(".close-btn").addEventListener("click", function () {
    document.body.removeChild(popup);
  });

  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.remove();
    }
  });

  document.getElementById("popupBtn").addEventListener("click", () => {
    const playerName = document.querySelector("#playerName").value;
    if (isFirstPlayer) {
      firstPlayer.name = playerName;
      firstPlayer.symbol = document.querySelector("#playerSymbol").value;
      secondPlayer.symbol = firstPlayer.symbol === "X" ? "O" : "X";
      localStorage.setItem("firstPlayerName", firstPlayer.name);
      localStorage.setItem("firstPlayerSymbol", firstPlayer.symbol);
      localStorage.setItem("secondPlayerSymbol", secondPlayer.symbol);
      if (!localStorage.getItem(firstPlayer.name + "Score")) {
        setScore(firstPlayer.name, 0);
      }
      if (!localStorage.getItem(secondPlayer.name + "Score")) {
        setScore(secondPlayer.name, 0);
      }
      document.body.removeChild(popup);
      showPopup("Player 2 Setup", "Enter your name:", false);
    } else {
      secondPlayer.name = playerName;
      localStorage.setItem("secondPlayerName", secondPlayer.name);
      if (!localStorage.getItem(secondPlayer.name + "Score")) {
        setScore(secondPlayer.name, 0);
      }
      document.body.removeChild(popup);
      document.getElementById("startBtn").style.display = "none";
      currentPlayer = firstPlayer;
      gamePlaying = true;
      showPlayerInfo();
    }
  });
}

// Show Players Info
function showPlayerInfo() {
  firstPlayer.name = localStorage.getItem("firstPlayerName") || "";
  firstPlayer.symbol = localStorage.getItem("firstPlayerSymbol") || "";
  secondPlayer.name = localStorage.getItem("secondPlayerName") || "";
  secondPlayer.symbol = localStorage.getItem("secondPlayerSymbol") || "";

  const firstPlayerScore = getScore(firstPlayer.name);
  const secondPlayerScore = getScore(secondPlayer.name);

  const popup1 = document.createElement("div");
  popup1.className = "player-info left-popup";
  popup1.innerHTML = `
  <h2>Player 1</h2>
  <p>Name: ${firstPlayer.name}</p>
  <p>Symbol: ${firstPlayer.symbol}</p>
  <p class='score'>Score: ${firstPlayerScore}</p>
  `;

  const popup2 = document.createElement("div");
  popup2.className = "player-info right-popup";
  popup2.innerHTML = `
  <h2>Player 2</h2>
  <p>Name: ${secondPlayer.name}</p>
  <p>Symbol: ${secondPlayer.symbol}</p>
  <p class='score'>Score: ${secondPlayerScore}</p>
  `;

  document.body.appendChild(popup1);
  document.body.appendChild(popup2);
  updatePlayerInfo();
  updateScoreDisplay();
}

startBtn.addEventListener("click", () => {
  showScoresBtn.style.display = "none";
  showPopup("Player Setup", "Enter your name and choose a symbol:", true);
  hideScores();
});
