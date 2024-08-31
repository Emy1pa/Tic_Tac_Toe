const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");
const popupButton = document.getElementById("popupButton");

let firstPlayer = { name: "", Symbol: "" };
let secondPlayer = { name: "", Symbol: "" };

let currentPlayer;
let gamePlaying = false;
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
  currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
  updatePlayerInfo();
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
  `;
  const popup2 = document.createElement("div");
  popup2.className = "player-info right-popup";
  popup2.innerHTML = `
  <h2>Player 2</h2>
  <p>Name: ${secondPlayer.name}</p>
  <p>Symbol: ${secondPlayer.Symbol}</p>
  `;

  document.body.appendChild(popup1);
  document.body.appendChild(popup2);
  updatePlayerInfo();
}

startBtn.addEventListener("click", () => {
  showPopup("Player Setup", "Enter your name and choose a symbol:", true);
});

cell.addEventListener("click", () => {
  console.log(`Cell ${index} clicked`);
  cellClick(index);
});
