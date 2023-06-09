//Ячейки игрового поля
class fieldCell {
    constructor(fieldElement, x, y){
        this.cell = document.createElement("div");
        this.cell.classList.add("tile");
        fieldElement.append(this.cell);
        this.x = x;
        this.y = y;
    }

    linkTile(tile){
        tile.setXY(this.x, this.y);
        this.linkedTile = tile;
    }

    unlinkTile(){
        this.linkedTile = null;
    }

    unlinkTileAndDelete(){
        this.linkedTile.removeFromDOM()
        this.linkedTile = null;
    }

    isEmpty(){
        return !this.linkedTile;
    }

    isType(){
        if(this.linkedTile != null) return this.linkedTile.constructor.name
    }
}