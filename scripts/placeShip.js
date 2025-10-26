export const placeShip = (board, ship, prefix) => {
  const { row, col, length, id, orientation } = ship;

  for (let i = 0; i < length; i++) {
    const R = orientation === "horizontal" ? row : row + i;
    const C = orientation === "horizontal" ? col + i : col;

    const CELL = document.getElementById(`${prefix}-${R}-${C}`);
    /* TODO: CREAR UN CONTENEDOR 'TEMPORAL' PARA QUE AL MOMENTO DE MOVERLO DE LUGAR NUEVAMENTE SE VEA EL
    SHIP COMPLETO Y NO SOLAMENTE UNA PARTE */
    if (CELL) {
      CELL.style.backgroundColor = "grey";
      CELL.classList.add("ship_placed");
      CELL.dataset.shipId = id;
      CELL.setAttribute("draggable", true);
    }

    board[R][C] = 1;
  }
};
