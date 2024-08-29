const container = document.getElementById("container");
for (let i = 0; i < 400; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  container.appendChild(cell);
}
