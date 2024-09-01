const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");
const popupButton = document.getElementById("popupButton");

let firstPlayer = { name: "", Symbol: "" };
let secondPlayer = { name: "", Symbol: "" };

let firstPlayerScore = parseInt(localStorage.getItem("firstPlayerScore")) || 0;
let secondPlayerScore =
  parseInt(localStorage.getItem("secondPlayerScore")) || 0;

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
  board[index] = currentPlayer.Symbol;
  const cell = container.querySelector(`[index='${index}']`);
  cell.textContent = currentPlayer.Symbol;
  if (checkWin(index)) {
    gamePlaying = false;
    showWinPopup(currentPlayer.name);
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
    leftPopup.style.backgroundColor = "rgba(30, 41, 59, 0.5 )";
    rightPopup.style.backgroundColor = "rgba(30, 41, 59, 1)";
  }
}
function checkWin(index) {
  const row = Math.floor(index / 20);
  const col = index % 20;

  // Checking horizontally
  let count = 0;
  for (let i = Math.max(0, col - 4); i <= Math.min(19, col + 4); i++) {
    if (board[row * 20 + i] === currentPlayer.Symbol) {
      count++;
      if (count === 5) {
        updateScore();
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Checking vertically
  count = 0;
  for (let i = Math.max(0, row - 4); i <= Math.min(19, row + 4); i++) {
    if (board[i * 20 + col] === currentPlayer.Symbol) {
      count++;
      if (count === 5) {
        updateScore();
        return true;
      }
    } else {
      count = 0;
    }
  }
  return false;
}
function updateScore() {
  if (currentPlayer === firstPlayer) {
    firstPlayerScore++;
    localStorage.setItem("firstPlayerScore", firstPlayerScore);
  } else {
    secondPlayerScore++;
    localStorage.setItem("secondPlayerScore", secondPlayerScore);
  }
  updateScoreDisplay();
}
function updateScoreDisplay() {
  document.querySelector(
    ".left-popup .score"
  ).textContent = `Score: ${firstPlayerScore}`;
  document.querySelector(
    ".right-popup .score"
  ).textContent = `Score: ${secondPlayerScore}`;
}
function showWinPopup(winnerName) {
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
      ">${winnerName} wins the game!</p>
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
   <input type="text" id="playerName" placeholder = "Enter your name">
    <select id="playerSymbol">
      <option value="X">X</option>
      <option value="O">O</option>
    </select>
    `
      : `
    <input type="text" id="playerName" placeholder = "Enter your name">
    <p>Your symbol is : <strong>${secondPlayer.Symbol}</strong></p>
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
      firstPlayer.Symbol = document.querySelector("#playerSymbol").value;
      secondPlayer.Symbol = firstPlayer.Symbol === "X" ? "O" : "X";
      localStorage.setItem("firstPlayerName", firstPlayer.name);
      localStorage.setItem("firstPlayerSymbol", firstPlayer.Symbol);
      localStorage.setItem("secondPlayerSymbol", secondPlayer.Symbol);
      document.body.removeChild(popup);
      showPopup("Player 2 Setup", "Enter your name:", false);
    } else {
      secondPlayer.name = playerName;
      localStorage.setItem("secondPlayerName", secondPlayer.name);
      document.body.removeChild(popup);
      document.getElementById("startBtn").style.display = "none";
      currentPlayer = firstPlayer;
      gamePlaying = true;
      showPlayerInfo();
    }
  });
}

// show Players Infos;
function showPlayerInfo() {
  const firstPlayerName = localStorage.getItem("firstPlayerName");
  const firstPlayerSymbol = localStorage.getItem("firstPlayerSymbol");
  const secondPlayerName = localStorage.getItem("secondPlayerName");
  const secondPlayerSymbol = localStorage.getItem("secondPlayerSymbol");
  const popup1 = document.createElement("div");
  popup1.className = "player-info left-popup";
  popup1.innerHTML = `
  <h2>Player 1</h2>
  <p>Name: ${firstPlayer.name}</p>
  <p>Symbol: ${firstPlayer.Symbol}</p>
  <p class='score'>Score: ${firstPlayerScore}</p>
  `;
  const popup2 = document.createElement("div");
  popup2.className = "player-info right-popup";
  popup2.innerHTML = `
  <h2>Player 2</h2>
  <p>Name: ${secondPlayer.name}</p>
  <p>Symbol: ${secondPlayer.Symbol}</p>
  <p class='score'>Score: ${secondPlayerScore}</p>

  `;

  document.body.appendChild(popup1);
  document.body.appendChild(popup2);
  updatePlayerInfo();
  updateScoreDisplay();
}

startBtn.addEventListener("click", () => {
  showPopup("Player Setup", "Enter your name and choose a symbol:", true);
});
