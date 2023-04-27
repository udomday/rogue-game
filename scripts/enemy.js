class Enemy {
    constructor (fieldElement){
        this.tileEnemy = document.createElement('div');
        this.tileEnemy.classList.add('tileE');
        this.health = 10;
        this.damage = 2;
        fieldElement.append(this.tileEnemy);
    }
    
    setXY(x, y){
        this.x = x;
        this.y =y;
        this.tileEnemy.style.setProperty('--x', x);
        this.tileEnemy.style.setProperty('--y', y);
    }

    removeFromDOM(){
        this.tileEnemy.remove();
    }

    isAlive(){
        return this.health > 0
    }

    subHealth(damege){
        this.health-=damege
    }
}