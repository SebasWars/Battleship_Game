export const renderShips = (SHIPS, PORT_ELEMENT) => {
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