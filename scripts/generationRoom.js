function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createRoom(field, FIELD_WIDTH, FIELD_HEIGHT) {
  let countRoom = getRandom(8, 14);
  while (countRoom != 0) {
    let tractorX = getRandom(0, FIELD_WIDTH);
    let tractorY = getRandom(0, FIELD_HEIGHT);

    let widthRoom = getRandom(3, 8);
    let heightRoom = getRandom(3, 8);

    for (let height = 0; height < heightRoom; height++) {
      for (let width = 0; width < widthRoom; width++) {
        if (
          height + tractorY < 24 &&
          width + tractorX < 40 &&
          !field.cells[height + tractorY][width + tractorX].isEmpty()
        ) {
          field.cells[height + tractorY][
            width + tractorX
          ].unlinkTileAndDelete();
        }
      }
    }

    countRoom--;
  }
}

function createVertivalRoads(field, FIELD_WIDTH, FIELD_HEIGHT) {
  let countRouds = getRandom(5, 8);
  let arrayRouds = [];
  while (countRouds != 0) {
    let tractorX = getRandom(0, FIELD_WIDTH);
    if (!(tractorX in arrayRouds)) {
      arrayRouds.push(tractorX);
      for (let height = 0; height < FIELD_HEIGHT; height++) {
        if (!field.cells[height][tractorX].isEmpty()) {
          field.cells[height][tractorX].unlinkTileAndDelete();
        }
      }
      countRouds--;
    }
  }
}

function createHorizontalRoads(field, FIELD_WIDTH, FIELD_HEIGHT) {
  let countRouds = getRandom(5, 8);
  let arrayRouds = [];
  while (countRouds != 0) {
    let tractorY = getRandom(0, FIELD_HEIGHT);
    if (!(tractorY in arrayRouds)) {
      arrayRouds.push(tractorY);
      for (let width = 0; width < FIELD_WIDTH; width++) {
        if (!field.cells[tractorY][width].isEmpty()) {
          field.cells[tractorY][width].unlinkTileAndDelete();
        }
      }
      countRouds--;
    }
  }
}
