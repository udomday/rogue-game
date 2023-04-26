import { fieldCell } from "./fieldCell.js";
import { Wall } from "./wall.js";

//Создание игрового поля

export class Field {
    constructor(fieldElement, FIELD_WIDTH, FIELD_HEIGHT){
        this.cells = [];
        for (let i = 0; i < FIELD_HEIGHT; i++) {
            this.cells.push([]);
            for(let j = 0; j < FIELD_WIDTH; j++){
                this.cells[i].push(
                    new fieldCell(fieldElement, j, i)
                );    
            }
        }
    }
}