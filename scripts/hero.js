const healthBar = document.querySelector('.health')
export class Hero {
    constructor (fieldElement){
        this.tileHero = document.createElement('div');
        this.tileHero.classList.add('tileP');
        this.health = 20;
        this.damage = 3;
        fieldElement.append(this.tileHero);
    }
    
    setXY(x, y){
        this.x = x;
        this.y =y;
        this.tileHero.style.setProperty('--x', x);
        this.tileHero.style.setProperty('--y', y);
    }

    removeFromDOM(){
        this.tileHero.remove();
    }

    isAlive(){
        return this.health > 0
    }

    subHealth(damege){
        this.health-=damege;
        let perHealth = (this.health * 100) / 20;
        healthBar.style.width = `${perHealth}%`
    }
}