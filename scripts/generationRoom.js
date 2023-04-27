function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function createRoom(field, FIELD_WIDTH, FIELD_HEIGHT){
    let countRoom = getRandom(5, 10);
    
    while(countRoom != 0){
        let tractorX = getRandom(0, FIELD_WIDTH);
        let tractorY = getRandom(0, FIELD_HEIGHT);
        
        let widthRoom = getRandom(3, 6);
        let heightRoom = getRandom(3, 6);
        for(let height = 0; height < heightRoom; height++){
            for(let width = 0; width < widthRoom; width++){
                if(height + tractorY < 15 && width + tractorX < 24 && !field.cells[height + tractorY][width + tractorX].isEmpty()){
                    field.cells[height + tractorY][width + tractorX].unlinkTileAndDelete();
                }
            }
        }
        countRoom--
    }
}


function createHallWay(field, FIELD_WIDTH, FIELD_HEIGHT){
    function isEven (n) {
        return n % 2 === 0;
    }
    
    function getRandomFrom (array) {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }
    
    function setField (x, y) {
        if (x < 0 || x >= FIELD_WIDTH || y < 0 || y >= FIELD_HEIGHT) {
            return null;
        };
        
        field.cells[y][x].unlinkTileAndDelete()
    }
    
    function isHallWay() {
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                if (isEven(x) && isEven(y) && getField(x, y)) {
                    return false
                }
            }
        }
        return true
    }
    
    function getField (x, y) {
        if (x < 0 || x >= FIELD_WIDTH || y < 0 || y >= FIELD_HEIGHT) {
            return false;
        }
    
        return !field.cells[y][x].isEmpty();
    }
    
    function moveTractor (tractor) {
        const directs = [];
        
        if (tractor.x > 0) {
            directs.push('left');
        };
    
        if (tractor.x < FIELD_WIDTH - 2) {
            directs.push('right');
        };
    
        if (tractor.y > 0) {
            directs.push('up');
        };
    
        if (tractor.y < FIELD_HEIGHT - 2) {
            directs.push('down');
        };
    
        const direct = getRandomFrom(directs);
    
        switch (direct) {
            case 'left':
    
                if (getField(tractor.x - 2, tractor.y)) {
                    setField(tractor.x - 1, tractor.y);
                    setField(tractor.x - 2, tractor.y);
                };
    
                tractor.x -= 2;
                break;
            case 'right':
    
                if (getField(tractor.x + 2, tractor.y)) {
                    setField(tractor.x + 1, tractor.y);
                    setField(tractor.x + 2, tractor.y);
                };
    
                tractor.x += 2;
                break;
            case 'up':
                if (getField(tractor.x, tractor.y - 2)) {
                    setField(tractor.x, tractor.y - 1);
                    setField(tractor.x, tractor.y - 2);
                };
                tractor.y -= 2
                break;
            case 'down':
                if (getField(tractor.x, tractor.y + 2)) {
                    setField(tractor.x, tractor.y + 1);
                    setField(tractor.x, tractor.y + 2);
                };
                tractor.y += 2;
                break;
        }
    }

    
    const tractorX = getRandomFrom(Array(FIELD_WIDTH).fill(0).map((item, index) => index).filter(x => isEven(x)));
    const tractorY = getRandomFrom(Array(FIELD_HEIGHT).fill(0).map((item, index) => index).filter(x => isEven(x)));
    var tractor = {};
    tractor.x = tractorX;
    tractor.y = tractorY;



    if(!field.cells[tractorY][tractorX].isEmpty()){
        setField(tractorX, tractorY)
    }

    while (!isHallWay()) {
        moveTractor(tractor);
    }
}