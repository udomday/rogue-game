//Создание игрового поля

class Field {
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

    getRandomEmptyCell(){
        const emptyCells = this.cells.map(cells => cells.filter(cell => cell.isEmpty()));
        const randomIndexY = Math.floor(Math.random() * emptyCells.length);
        const randomIndexX = Math.floor(Math.random() * emptyCells[randomIndexY].length);
        return emptyCells[randomIndexY][randomIndexX];
    }
}