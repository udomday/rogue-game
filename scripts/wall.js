class Wall {
    constructor(fieldElement){
        this.tileWall = document.createElement('div');
        this.tileWall.classList.add('tileW');
        fieldElement.append(this.tileWall);
    }

    setXY(x, y){
        this.x = x;
        this.y =y;
        this.tileWall.style.setProperty('--x', x);
        this.tileWall.style.setProperty('--y', y);
    }

    removeFromDOM(){
        this.tileWall.remove();
    }
}