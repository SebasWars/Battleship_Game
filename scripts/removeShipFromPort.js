export const removeShipFromPort = (ID) => {
  const ship = document.getElementById(ID);
  if (ship) {
    ship.remove();
  }
};
