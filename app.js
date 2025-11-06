document.addEventListener("DOMContentLoaded", () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let scores = {
    player1: 0,
    player2: 0,
    ties: 0,
  };

  const cells = document.querySelectorAll(".cell");
  const statusElemet = document.querySelector(".status");
  const playerScore1 = document.querySelector("#player-1");
  const playerScore2 = document.querySelector("#player-2");
  const tiesScore = document.querySelector("#ties-score");
  const restartButton = document.querySelector(".restart-button");

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  cells.forEach((cell) => {
    cell.addEventListener("click", () => handleCellClick(cell));
  });

  restartButton.addEventListener("click", restartGame);
  function restartGame() {
    board.fill("");
    cells.forEach((cell) => (cell.textContent = ""));
    currentPlayer = "X";
    statusElemet.textContent = "player 1 turn";
  }

  async function handleCellClick(cell) {
    const index = cell.getAttribute("data-index");
    if (board[index] != "") {
      return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (isGameOver()) {
      showWinnerOverlay(currentPlayer);
      await wait(500);
      board.fill("");

      cells.forEach((cell) => (cell.textContent = ""));
      if (currentPlayer === "X") {
        scores.player1 += 1;
        playerScore1.textContent = scores.player1;
      } else {
        scores.player2 += 1;
        playerScore2.textContent = scores.player2;
      }
      currentPlayer = "X";
      statusElemet.textContent = "player 1 turn";

      return;
    }

    if (checkDraw()) {
      await wait(700);
      board.fill("");
      cells.forEach((cell) => (cell.textContent = ""));
      currentPlayer = "X";
      statusElemet.textContent = "player 1 turn";
      scores.ties += 1;
      tiesScore.textContent = scores.ties;
      return;
    }

    if (currentPlayer === "X") {
      currentPlayer = "O";
      statusElemet.textContent = "player 2 turn";
    } else {
      currentPlayer = "X";
      statusElemet.textContent = "player 1 turn";
    }
  }

  function isGameOver() {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return board[index] === currentPlayer;
      });
    });
  }

  function checkDraw() {
    return board.every((cell) => {
      return cell != "";
    });
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const playerOverlay = document.getElementById("playerOverlay");
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");

  function showWinnerOverlay(player) {
    // Show overlay and correct image
    playerOverlay.classList.remove("hidden");
    playerOverlay.classList.add("grid");

    setTimeout(() => {
      playerOverlay.classList.remove("opacity-0");
      playerOverlay.classList.add("opacity-100");
    }, 10);

    if (player === "X") {
      player1.classList.remove("hidden");
      player2.classList.add("hidden");
    } else {
      player1.classList.add("hidden");
      player2.classList.remove("hidden");
    }

    // Hide again after 2 seconds
    setTimeout(() => {
      playerOverlay.classList.remove("opacity-100");
      playerOverlay.classList.add("opacity-0");

      // Wait for fade-out animation (0.5s) before hiding
      setTimeout(() => {
        playerOverlay.classList.add("hidden");
      }, 700);
    }, 2000);
  }
});
