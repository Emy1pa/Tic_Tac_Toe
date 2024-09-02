const showScoresBtn = document.getElementById("showScoresBtn");
const scoresMenu = document.getElementById("scoresMenu");
const closeScoresBtn = document.getElementById("closeScoresBtn");

function getAllPlayersScores() {
  const players = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.endsWith("Score")) {
      const playerName = key.replace("Score", "");
      const playerScore = getScore(playerName);
      players.push({ name: playerName, score: playerScore });
    }
  }
  return players;
}

function showScores() {
  const players = getAllPlayersScores();

  const filteredPlayers = players.filter((player) => player.score > 0);
  filteredPlayers.sort((a, b) => b.score - a.score);

  const scoresList = document.getElementById("scoresList");

  const tableRows = filteredPlayers
    .map(
      (player) => `
        <tr>
          <td>${player.name}</td>
          <td>${player.score}</td>
        </tr>
      `
    )
    .join("");

  scoresList.innerHTML = `
    <table id="scoresTable">
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  scoresMenu.style.display = "block";
}

function hideScores() {
  scoresMenu.style.display = "none";
}

showScoresBtn.addEventListener("click", showScores);
closeScoresBtn.addEventListener("click", hideScores);
