const gameBoard = document.querySelector('.field');
const audio = document.querySelector('.audio');
const audioOff = document.querySelector('.musicControllOff')
const audioOn = document.querySelector('.musicControllOn')
const FIELD_WIDTH = 25;
const FIELD_HEIGHT = 15;
document.querySelector('.restartGame').addEventListener('click', () => restartGame());
gameBoard.style.setProperty('FIELD_WIDTH', FIELD_WIDTH);
gameBoard.style.setProperty('FIELD_HEIGHT', FIELD_HEIGHT);
const field = new Field(gameBoard, FIELD_WIDTH, FIELD_HEIGHT);

//Управление музыкой
audioOff.addEventListener('click', () =>{
    audio.pause()
    audioOff.style.display = 'none';
    audioOn.style.display = 'block';
});

audioOn.addEventListener('click', () =>{
    audio.play()
    audioOff.style.display = 'block';
    audioOn.style.display = 'none';
});
////

//Перезагрузка игры
function restartGame(){
    field.cells.forEach(cells => cells.forEach(cell => {if(!cell.isEmpty())cell.unlinkTileAndDelete()}));
    startGame();
}   
////


//Старт игры
function startGame(){
    for(let i = 0; i < field.cells.length; i++){
        for(let j = 0; j < field.cells[i].length; j++){
            field.cells[i][j].linkTile(new Wall(gameBoard));
        }
    } 

    createHallWay(field, FIELD_WIDTH, FIELD_HEIGHT);
    createRoom(field, FIELD_WIDTH, FIELD_HEIGHT);

    spawnTile();

    setUpInputOnce()
}
////

startGame()

//Движение и атака врагов

function getRandomFrom(array){
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function heroIsNear(masEnemy, i){
    if(masEnemy[i].y-1 != -1 && field.cells[masEnemy[i].y-1][masEnemy[i].x].isType() == 'Hero'){
        return  field.cells[masEnemy[i].y-1][masEnemy[i].x]
    } else if(masEnemy[i].y+1 != FIELD_HEIGHT && field.cells[masEnemy[i].y+1][masEnemy[i].x].isType() == 'Hero'){
        return field.cells[masEnemy[i].y+1][masEnemy[i].x]
    } else if(masEnemy[i].x-1 != -1 && field.cells[masEnemy[i].y][masEnemy[i].x-1].isType() == 'Hero'){
        return field.cells[masEnemy[i].y][masEnemy[i].x-1]
    } else if(masEnemy[i].x+1 != FIELD_WIDTH && field.cells[masEnemy[i].y][masEnemy[i].x+1].isType() == 'Hero'){
        return field.cells[masEnemy[i].y][masEnemy[i].x+1]
    }
    return false
}

function moveEnemy(){
    const masEnemy = [];
    const masDerection = ['up', 'down', 'left', 'right']
    field.cells.map(cells => cells.map(cell =>{if(cell.isType() == 'Enemy') masEnemy.push(cell)}));
    if(masEnemy.length == 0){
        alert('Вы выиграли!')
        restartGame()
    }
    for(let i = 0; i < masEnemy.length; i++){
        let enemyTile = field.cells[masEnemy[i].y][masEnemy[i].x]
        let flag = true
        while(flag && !heroIsNear(masEnemy, i)){
            let derection = getRandomFrom(masDerection)
            if(derection == 'up' && masEnemy[i].y-1 != -1 && field.cells[masEnemy[i].y-1][masEnemy[i].x].isType() != 'Wall' && field.cells[masEnemy[i].y-1][masEnemy[i].x].isType() != 'Hero' && field.cells[masEnemy[i].y-1][masEnemy[i].x].isType() != 'Enemy' && field.cells[masEnemy[i].y-1][masEnemy[i].x].isType() != 'Heal' && field.cells[masEnemy[i].y-1][masEnemy[i].x].isType() != 'Sword'){
                field.cells[masEnemy[i].y-1][masEnemy[i].x].linkTile(enemyTile.linkedTile)
                enemyTile.unlinkTile()
                flag = false
            } else if(derection == 'down' && masEnemy[i].y+1 != FIELD_HEIGHT && field.cells[masEnemy[i].y+1][masEnemy[i].x].isType() != 'Wall' && field.cells[masEnemy[i].y+1][masEnemy[i].x].isType() != 'Hero' && field.cells[masEnemy[i].y+1][masEnemy[i].x].isType() != 'Enemy' && field.cells[masEnemy[i].y+1][masEnemy[i].x].isType() != 'Heal' && field.cells[masEnemy[i].y+1][masEnemy[i].x].isType() != 'Sword'){
                field.cells[masEnemy[i].y+1][masEnemy[i].x].linkTile(enemyTile.linkedTile)
                enemyTile.unlinkTile()
                flag = false
            } else if(derection == 'left' && masEnemy[i].x-1 != -1 && field.cells[masEnemy[i].y][masEnemy[i].x-1].isType() != 'Wall' && field.cells[masEnemy[i].y][masEnemy[i].x-1].isType() != 'Hero' && field.cells[masEnemy[i].y][masEnemy[i].x-1].isType() != 'Enemy' && field.cells[masEnemy[i].y][masEnemy[i].x-1].isType() != 'Heal' && field.cells[masEnemy[i].y][masEnemy[i].x-1].isType() != 'Sword'){
                field.cells[masEnemy[i].y][masEnemy[i].x-1].linkTile(enemyTile.linkedTile)
                enemyTile.unlinkTile()
                flag = false
            } else if(derection == 'right' && masEnemy[i].x+1 != FIELD_WIDTH && field.cells[masEnemy[i].y][masEnemy[i].x+1].isType() != 'Wall' && field.cells[masEnemy[i].y][masEnemy[i].x+1].isType() != 'Hero' && field.cells[masEnemy[i].y][masEnemy[i].x+1].isType() != 'Enemy' && field.cells[masEnemy[i].y][masEnemy[i].x+1].isType() != 'Heal' && field.cells[masEnemy[i].y][masEnemy[i].x+1].isType() != 'Sword'){
                field.cells[masEnemy[i].y][masEnemy[i].x+1].linkTile(enemyTile.linkedTile)
                enemyTile.unlinkTile()
                flag = false
            } else{flag = false}
        }
        if(!!heroIsNear(masEnemy, i)){
            const heroTile = heroIsNear(masEnemy, i);
            heroTile.linkedTile.subHealth(enemyTile.linkedTile.damage)
            if(!heroTile.linkedTile.isAlive()){
                alert('Вы проиграли!')
                restartGame()
            }
        }
    }
}

//Движение героя
function setUpInputOnce(){
    window.addEventListener('keydown', handleInput, {once: true});
}

async function handleInput(event) {
    switch(event.key.toLowerCase()) {
        case 'arrowup':
            moveHero('arrowup');
            break;
        
        case 'arrowdown':
            moveHero('arrowdown');
            break;
        
        case 'arrowleft':
            moveHero('arrowleft');
            break;
        
        case 'arrowright':
            moveHero('arrowright');
        break;
        
        case ' ':
            attackHero();
        break

        default:
            setUpInputOnce();
            return;
    }
    setUpInputOnce();
}

function moveHero(derection){
    const cell = field.cells
    for(let i = 0; i < FIELD_HEIGHT; i++){
        for(let j = 0; j < FIELD_WIDTH; j++){
            if(cell[i][j].isType() == 'Hero'){
                if(derection == 'arrowup' && i-1 != -1 && cell[i-1][j].isType() != 'Wall' && cell[i-1][j].isType() != 'Enemy'){
                    if(cell[i-1][j].isType() == 'Heal'){
                        cell[i-1][j].linkedTile.healHero(cell[i][j].linkedTile);
                        cell[i-1][j].unlinkTileAndDelete()
                        cell[i-1][j].linkTile(cell[i][j].linkedTile)
                        cell[i][j].unlinkTile()
                    } else if(cell[i-1][j].isType() == 'Sword'){
                        cell[i-1][j].linkedTile.addHeroDamage(cell[i][j].linkedTile);
                        cell[i-1][j].unlinkTileAndDelete()
                        cell[i-1][j].linkTile(cell[i][j].linkedTile)
                        cell[i][j].unlinkTile()
                    } else {
                        cell[i-1][j].linkTile(cell[i][j].linkedTile)
                        cell[i][j].unlinkTile()
                    }

                    moveEnemy()
                    return
                } else if(derection == 'arrowdown' && i+1 != FIELD_HEIGHT && cell[i+1][j].isType() != 'Wall' && cell[i+1][j].isType() != 'Enemy'){
                    if(cell[i+1][j].isType() == 'Heal'){
                        cell[i+1][j].linkedTile.healHero(cell[i][j].linkedTile);
                        cell[i+1][j].unlinkTileAndDelete();
                        cell[i+1][j].linkTile(cell[i][j].linkedTile);
                        cell[i][j].unlinkTile()
                    } else if(cell[i+1][j].isType() == 'Sword'){
                        cell[i+1][j].linkedTile.addHeroDamage(cell[i][j].linkedTile);
                        cell[i+1][j].unlinkTileAndDelete();
                        cell[i+1][j].linkTile(cell[i][j].linkedTile);
                        cell[i][j].unlinkTile()
                    } else {
                        cell[i+1][j].linkTile(cell[i][j].linkedTile)
                        cell[i][j].unlinkTile()
                    }
                    
                    moveEnemy()
                    return
                } else if(derection == 'arrowleft' && j-1 != -1 && cell[i][j-1].isType() != 'Wall' && cell[i][j-1].isType() != 'Enemy'){
                    if(cell[i][j-1].isType() == 'Heal'){
                        cell[i][j-1].linkedTile.healHero(cell[i][j].linkedTile);
                        cell[i][j-1].unlinkTileAndDelete();
                        cell[i][j-1].linkTile(cell[i][j].linkedTile);
                        cell[i][j].unlinkTile()
                    } else if(cell[i][j-1].isType() == 'Sword'){
                        cell[i][j-1].linkedTile.addHeroDamage(cell[i][j].linkedTile);
                        cell[i][j-1].unlinkTileAndDelete();
                        cell[i][j-1].linkTile(cell[i][j].linkedTile);
                        cell[i][j].unlinkTile()
                    } else {
                        cell[i][j-1].linkTile(cell[i][j].linkedTile)
                        cell[i][j].unlinkTile()
                    }
                    moveEnemy()
                    return
                } else if(derection == 'arrowright' && j+1 != FIELD_WIDTH && cell[i][j+1].isType() != 'Wall' && cell[i][j+1].isType() != 'Enemy'){
                    if(cell[i][j+1].isType() == 'Heal'){
                        cell[i][j+1].linkedTile.healHero(cell[i][j].linkedTile);
                        cell[i][j+1].unlinkTileAndDelete();
                        cell[i][j+1].linkTile(cell[i][j].linkedTile);
                        cell[i][j].unlinkTile()
                    } else if(cell[i][j+1].isType() == 'Sword'){
                        cell[i][j+1].linkedTile.addHeroDamage(cell[i][j].linkedTile);
                        cell[i][j+1].unlinkTileAndDelete();
                        cell[i][j+1].linkTile(cell[i][j].linkedTile);
                        cell[i][j].unlinkTile()
                    } else {
                        cell[i][j+1].linkTile(cell[i][j].linkedTile)
                        cell[i][j].unlinkTile()
                    }
                    moveEnemy()
                    return
                }
            }
        }
    }
}
////

//Атака героя
function EnemyDamageTracking(tile, heroDamage){
    tile.linkedTile.subHealth(heroDamage)
    if(!tile.linkedTile.isAlive()){
        tile.unlinkTileAndDelete()
    }
}

function attackHero(){
    const cell = field.cells
    for(let i = 0; i < FIELD_HEIGHT; i++){
        for(let j = 0; j < FIELD_WIDTH; j++){
            if(cell[i][j].isType() == 'Hero'){
                const heroDamage = cell[i][j].linkedTile.damage
                if(i+1 != FIELD_HEIGHT && cell[i+1][j].isType() == 'Enemy'){
                    EnemyDamageTracking(cell[i+1][j], heroDamage)
                } 
                if(i-1 != -1 && cell[i-1][j].isType() == 'Enemy'){
                    EnemyDamageTracking(cell[i-1][j], heroDamage)
                } 
                if (j+1 != FIELD_WIDTH && cell[i][j+1].isType() == 'Enemy'){
                    EnemyDamageTracking(cell[i][j+1], heroDamage)
                } 
                if(j-1 != -1 && cell[i][j-1].isType() == 'Enemy'){
                    EnemyDamageTracking(cell[i][j-1], heroDamage)
                }
            }
        }
    }
    moveEnemy()
}
////

//Создание спрайтов
function spawnTile(){
    field.getRandomEmptyCell().linkTile(new Hero(gameBoard))
    for(let i = 0; i < 10; i++) field.getRandomEmptyCell().linkTile(new Heal(gameBoard))
    for(let i = 0; i < 2; i++) field.getRandomEmptyCell().linkTile(new Sword(gameBoard))
    for(let i = 0; i < 10; i++) field.getRandomEmptyCell().linkTile(new Enemy(gameBoard))
}
////

