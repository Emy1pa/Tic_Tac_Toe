const container = document.getElementById("container");
const startBtn = document.getElementById("startBtn");
let firstPlayer = "";
let secondPlayer = "";
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

function showPopup(title, message, isWork = false) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
  <button class="close-btn">&times;</button>
  <div class="popup-content">
  <h2>${title}</h2>
  <p>${message}</p>
  ${
    isWork
      ? `
    <input type="text" id="playerName" placeholder="enter your name ?">
    <select id="playerSymbol">
    <option value="X">X</option>
    <option value="O">O</option>
    </select>
    `
      : ""
  }
    <button id="popupBtn">${isWork ? "Start" : "Ok"}</button>
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
}

startBtn.addEventListener("click", () => {
  showPopup("Player Setup", "Enter your name and choose a symbol:", true);
});
