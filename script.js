const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");
const popupButton = document.getElementById("popupButton");

let firstPlayer = { name: "", Symbol: "" };
let secondPlayer = { name: "", Symbol: "" };
let gamePlaying = false;
const board = Array(200).fill("");

// Create cell
for (let index = 0; index < 400; index++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("index", index);
  cell.addEventListener("click", () => cellClick(index));
  container.appendChild(cell);
}

function cellClick(index) {
  if (!gamePlaying || board[index] == "") return;
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
      document.body.removeChild(popup);
      showPopup("Player 2 Setup", "Enter your name:", false);
    } else {
      secondPlayer.name = playerName;
      document.body.removeChild(popup);
    }
  });
}
startBtn.addEventListener("click", () => {
  showPopup("Player Setup", "Enter your name and choose a symbol:", true);
});
