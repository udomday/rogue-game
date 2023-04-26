import { Field } from "./field.js";
import { Wall } from "./wall.js";

const gameBoard = document.querySelector('.field');
const FIELD_WIDTH = 24;
const FIELD_HEIGHT = 15;

const field = new Field(gameBoard, FIELD_WIDTH, FIELD_HEIGHT);

// for(let i = 0; i < field.cells.length; i++){
//     field.cells[i].linkTile(new Wall(gameBoard));
// } 
// for(let i = 0; i < field.cells.length; i++){
//     if(Math.random() < 0.65) field.cells[i].unlinkTile()
//     continue
// } 

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

console.log(field)

//24x15(360) ячейка от 3 до 8

function startGame(field){
    for(let i = 0; i < field.cells.length; i++){
        for(let j = 0; j < field.cells[i].length; j++){
            field.cells[i][j].linkTile(new Wall(gameBoard));
        }
    } 

    const tractorX = getRandom(0, FIELD_WIDTH);
    const tractorY = getRandom(0, FIELD_HEIGHT);

    let widthRoom = getRandom(3, 8);
    let heightRoom = getRandom(3, 8);

    for(let height = 0; height < heightRoom; height++){
        for(let width = 0; width < widthRoom; width++){
            console.log(height + tractorY, width + tractorY)
            field.cells[height + tractorY][width + tractorY].unlinkTile();
        }
    }
}

startGame(field)