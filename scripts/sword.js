const damageBar = document.querySelector('.damageBar')
class Sword {
    constructor (fieldElement){
        this.tileSword = document.createElement('div');
        this.tileSword.classList.add('tileSW');
        this.damage = 2;
        fieldElement.append(this.tileSword);
    }
    
    setXY(x, y){
        this.x = x;
        this.y =y;
        this.tileSword.style.setProperty('--x', x);
        this.tileSword.style.setProperty('--y', y);
    }

    removeFromDOM(){
        this.tileSword.remove();
    }

    addHeroDamage(tileHero){
        tileHero.damage += this.damage
        damageBar.innerHTML = `Урон: ${tileHero.damage}`
    }
}