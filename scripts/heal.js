healthBar = document.querySelector('.health')
class Heal {
    constructor (fieldElement){
        this.tileHeal= document.createElement('div');
        this.tileHeal.classList.add('tileHP');
        this.health = 5;
        fieldElement.append(this.tileHeal);
    }
    
    setXY(x, y){
        this.x = x;
        this.y =y;
        this.tileHeal.style.setProperty('--x', x);
        this.tileHeal.style.setProperty('--y', y);
    }

    removeFromDOM(){
        this.tileHeal.remove();
    }

    healHero(tileHero){
        tileHero.health += this.health
        tileHero.health > 20 ?  tileHero.health = 20 : tileHero.health = tileHero.health
        let perHealth = (tileHero.health * 100) / 20;
        healthBar.style.width = `${perHealth}%`
    }
}