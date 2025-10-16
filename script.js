const PLAYER_ARRAY = Array.from({ length: 10 }, () => Array(10).fill(0));
const COMPUTER_ARRAY = Array.from({ length: 10 }, () => Array(10).fill(0));

const PLAYER_SIDE_ELEMENT = document.getElementById("player_side_element_id");
const COMPUTER_SIDE_ELEMENT = document.getElementById(
  "computer_side_element_id"
);
const PORT_ELEMENT = document.getElementById("port_element");

const SHIPS = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1],
  [1, 1],
  [1],
];

let ships = [];

const renderBoard = (board, side, prefix) => {
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const BUTTON = document.createElement("button");
      BUTTON.id = `${prefix}-${rowIndex}-${colIndex}`;

      if (board[rowIndex][colIndex] === 0) {
        BUTTON.style.backgroundColor = "rgb(40, 84, 228)";
      }
      side.appendChild(BUTTON);
    });
  });
};

const renderShips = () => {
  SHIPS.forEach((ship, index) => {
    const SHIP_CONTAINER = document.createElement("div");
    SHIP_CONTAINER.id = index;
    SHIP_CONTAINER.className = "ship";
    SHIP_CONTAINER.setAttribute("draggable", true);

    ship.forEach((_) => {
      const BUTTON = document.createElement("button");
      SHIP_CONTAINER.appendChild(BUTTON);
    });
    PORT_ELEMENT.appendChild(SHIP_CONTAINER);
  });
};

const renderGame = () => {
  renderBoard(PLAYER_ARRAY, PLAYER_SIDE_ELEMENT, "Player");
  renderBoard(COMPUTER_ARRAY, COMPUTER_SIDE_ELEMENT, 'Computer');
  renderShips()
};

renderGame();
