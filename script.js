const container = document.getElementById("container");

// Create cell
for (let i = 0; i < 400; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  container.appendChild(cell);
}

// create button container
const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";
container.appendChild(buttonContainer);
