import { renderShips } from "./renderBoats.js";
import { removeShipFromPort } from "./removeShipFromPort.js";
import { canPlaceShip } from "./canPlaceShip.js";
import { placeShip } from "./placeShip.js";

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
          removeShipFromPort(SHIP_ID);
        }
      });

      if (board[rowIndex][colIndex] === 0) {
        BUTTON.style.backgroundColor = BOARD_COLOR;
      }
      side.appendChild(BUTTON);
    });
  });
};


const renderGame = () => {
  renderBoard(PLAYER_ARRAY, PLAYER_SIDE_ELEMENT, "Player");
  renderBoard(COMPUTER_ARRAY, COMPUTER_SIDE_ELEMENT, "Computer");
  renderShips(SHIPS, PORT_ELEMENT);
};

renderGame();
