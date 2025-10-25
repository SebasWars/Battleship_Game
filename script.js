const PLAYER_ARRAY = Array.from({ length: 10 }, () => Array(10).fill(0));
const COMPUTER_ARRAY = Array.from({ length: 10 }, () => Array(10).fill(0));
const BOARD_COLOR = "rgb(40, 84, 228)";

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

const SHIPS_PLACED = [];

const renderBoard = (board, side, prefix) => {
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const BUTTON = document.createElement("button");
      BUTTON.id = `${prefix}-${rowIndex}-${colIndex}`;

      BUTTON.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      BUTTON.addEventListener("drop", (event) => {
        const SHIP_ID = parseInt(event.dataTransfer.getData("SHIP_ID"));
        const SHIP_LENGTH = parseInt(event.dataTransfer.getData("SHIP_LENGTH"));
        const SHIP_ORIENTATION =
          event.dataTransfer.getData("SHIP_ORIENTATION") || "horizontal";

        const NEW_SHIP = {
          row: rowIndex,
          col: colIndex,
          id: SHIP_ID,
          length: SHIP_LENGTH,
          orientation: SHIP_ORIENTATION,
        };

        if (canPlaceShip(board, NEW_SHIP)) {
          placeShip(board, NEW_SHIP, "Player");
        }
      });

      if (board[rowIndex][colIndex] === 0) {
        BUTTON.style.backgroundColor = BOARD_COLOR;
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

    SHIP_CONTAINER.addEventListener("dragstart", (event) => {
      const SHIP_LENGTH = event.dataTransfer.setData(
        "SHIP_LENGTH",
        ship.length
      );
      const SHIP_ID = event.dataTransfer.setData("SHIP_ID", SHIP_CONTAINER.id);
    });

    PORT_ELEMENT.appendChild(SHIP_CONTAINER);
  });
};

const canPlaceShip = (board, ship) => {
  const { row, col, length, orientation } = ship;
  for (let i = 0; i < length; i++) {
    const R = orientation === "horizontal" ? row : row + i;
    const C = orientation === "horizontal" ? col + i : col;

    if (R >= board.length || C >= board.length) return false;
    if (board[R][C] === 1) return false;

    for (let rowDirection = -1; rowDirection <= 1; rowDirection++) {
      for (let colDirection = -1; colDirection <= 1; colDirection++) {
        const NEW_R = R + rowDirection;
        const NEW_C = C + colDirection;
        if (
          NEW_R < 0 ||
          NEW_C < 0 ||
          NEW_R >= board.length ||
          NEW_C >= board.length
        ) {
          continue;
        }
        if (board[NEW_R][NEW_C] === 1) return;
      }
    }
  }
  return true;
};

const placeShip = (board, ship, prefix) => {
  const { row, col, length, id, orientation } = ship;
  for (let i = 0; i < length; i++) {
    const R = orientation === "horizontal" ? row : row + i;
    const C = orientation === "horizontal" ? col + i : col;

    const CELL = document.getElementById(`${prefix}-${R}-${C}`);
    if (CELL) {
      CELL.style.backgroundColor = "grey";
      CELL.id = id;
      CELL.setAttribute("draggable", true);
    }

    board[R][C] = 1;
  }
};

const renderGame = () => {
  renderBoard(PLAYER_ARRAY, PLAYER_SIDE_ELEMENT, "Player");
  renderBoard(COMPUTER_ARRAY, COMPUTER_SIDE_ELEMENT, "Computer");
  renderShips();
};

renderGame();
