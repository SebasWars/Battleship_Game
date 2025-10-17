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

      BUTTON.addEventListener("dragover", (event) => event.preventDefault());

      BUTTON.addEventListener("drop", (event) => {
        const SHIP_LENGTH = parseInt(event.dataTransfer.getData("shipLength"));
        const SHIP_ID = event.dataTransfer.getData("shipID");
        const SHIP_ORIENTATION =
          event.dataTransfer.getData("shipOrientation") || "horizontal";

        let newShip = {
          row: rowIndex,
          col: colIndex,
          id: SHIP_ID,
          length: SHIP_LENGTH,
          orientation: SHIP_ORIENTATION,
        };

        if (canPlaceShip(board, newShip)) {
          removeShipFromPort(SHIP_ID)
          console.log("can!");
          placeShip(board, newShip, 'Player')
        }
      });

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

    SHIP_CONTAINER.addEventListener("dragstart", (event) => {
      const SHIP_LENGTH = event.dataTransfer.setData("shipLength", ship.length);
      const SHIP_ID = event.dataTransfer.setData("shipID", SHIP_CONTAINER.id);
    });

    PORT_ELEMENT.appendChild(SHIP_CONTAINER);
  });
};

const canPlaceShip = (board, ship) => {
  const { row, col, length, orientation } = ship;
  for (let i = 0; i < length; i++) {
    const r = orientation === "horizontal" ? row : row + i;
    const c = orientation === "horizontal" ? col + i : col;

    /* TODO: VALIDACION PARA QUE NO PUEDAN HABER 2 BOTES JUNTOS,
    ES DECIR QUE TIENE QUE HABER MINIMO 1 CELDA EN MEDIO
    */

    if (r >= board.length || c >= board.length || board[r][c] === 1){
      alert('Sorry, ship cannot be place here, choose another position.');
      return false
    };
  }
  return true;
};

const placeShip = (board, ship, prefix) => {
  const { row, col, length, orientation } = ship;
  for (let i = 0; i < length; i++) {
    const r = orientation === "horizontal" ? row : row + i;
    const c = orientation === "horizontal" ? col + i : col;

    board[r][c] = 1;

    const SHIP_CELL = document.getElementById(`${prefix}-${r}-${c}`);
    SHIP_CELL.style.backgroundColor = 'grey'
    SHIP_CELL.dataset.id = ship.id;
  }
};

const removeShipFromPort = (ID) => {
  const ship = document.getElementById(ID);
  if(ship){
    ship.remove();
  }
}

const renderGame = () => {
  renderBoard(PLAYER_ARRAY, PLAYER_SIDE_ELEMENT, "Player");
  renderBoard(COMPUTER_ARRAY, COMPUTER_SIDE_ELEMENT, "Computer");
  renderShips();
};

renderGame();
