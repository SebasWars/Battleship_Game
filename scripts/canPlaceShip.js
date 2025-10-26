export const canPlaceShip = (board, ship) => {
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
        if (board[NEW_R][NEW_C] === 1) return false;
      }
    }
  }
  return true;
};
