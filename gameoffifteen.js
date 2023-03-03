const size = 4;
let missedcount = 1;
let message = "Fantastic:) You did it";

function randomNumbersGenerator() {
    let randomNumbers = [];
    for(let i=0; i<16; i++) {
        let numbers = Math.floor(Math.random()*16);
        for(let j=0; j<randomNumbers.length; j++){
            if(randomNumbers[j]==numbers){
                numbers= Math.floor(Math.random()*16);
                j=-1;
            }
        }
        randomNumbers.push(numbers);
    }
    return randomNumbers;
}

function getInversionCount(randomNumbersArray) {
    let count = 0;
    for(let i=0; i<size*size-1; i++) {
        for(j=i+1; j<size*size; j++) {
            if(randomNumbersArray[j]&&randomNumbersArray[i]&&randomNumbersArray[i]>randomNumbersArray[j]){
                count++;
            }
        }
    }
    return count;
}

function isPuzzleSolvable(randomNumbersArray, indexZero) {
    let inversionCount = getInversionCount(randomNumbersArray);
    console.log(inversionCount);
    let emptyTileRow = Math.floor(indexZero/4);
    console.log(emptyTileRow);
    if((((emptyTileRow+1)%2==0)&&(inversionCount%2==0))||(((emptyTileRow+1)%2==1)&&(inversionCount%2==1))) {
        return true;
    }
    else {
        return false;
    }
}

function getIndexZero(randomNumbersArray) {
    
    let indexZeroValue = randomNumbersArray.findIndex(function (currentVal) { //to find zero index number in array//
        return currentVal === 0;
    });
    return indexZeroValue;
}

function checkIfgameOver(randomNumbersArray){
    let result = false;
    for(let i=0; i<randomNumbersArray.length-1; i++) {
        if((randomNumbersArray[i]-1)!=i){
           return "notwin"; 
        }
    }
    return "win";
}


window.onload = function() {
    let span;
    let randomNumbersArray;
    let indexZeroValue;
    let puzzleResult;
    function arrangeGrid() {
        do {
            randomNumbersArray = randomNumbersGenerator();
            indexZeroValue = getIndexZero(randomNumbersArray);
            puzzleResult = isPuzzleSolvable(randomNumbersArray, indexZeroValue);
        } while(puzzleResult==false)

        let grid = document.querySelector(".grid");

        for(let i=0; i<randomNumbersArray.length; i++) {
            let id = randomNumbersArray[i];
            span = document.createElement("span");
            if(randomNumbersArray[i]==0){
                span.classList.add("hole");        
            }
            span.classList.add("tile");
            span.innerHTML = randomNumbersArray[i];
            span.setAttribute("id",id);
            span.style.top = '0px';
            span.style.left = '0px';
            grid.appendChild(span);
            span.onclick = tilePositions; 
        }
    }
    arrangeGrid();

    let win = document.querySelector(".winningMessage");

    function tilePositions(eventObj) {
        let clicked = eventObj.target.id;
        let clickedTile = eventObj.target;
        // let index = randomNumbersGenerator.findIndex(()=>);
        // let index = randomNumbersGenerator.findIndex(currentVal => currentVal === clicked);
        let index = randomNumbersArray.findIndex(function (currentVal) {
            return currentVal === parseInt(clicked);
        })
        let indexZero = randomNumbersArray.findIndex(function (currentVal) { //to find zero index number in array//
            return currentVal === 0;
        });
        // console.log(index);
        // let index;
        // for(let i = 0; i < randomNumbersGenerator.length; i++) {
        //     if (randomNumbersGenerator[i] === clicked) {
        //         index = i
        //     }
        // }
        let col, row; //to find x&y co-ordinates of clicked number in grid//
        row = Math.floor(index/4);
        col = index%4;
        
        let col2, row2; //to find 0 co-ordinates in grid//
        row2 = Math.floor(indexZero/4);
        col2 = indexZero%4;
        let absColoumnDiff = Math.abs(col-col2);
        let absRowDiff = Math.abs(row-row2);
        let columnDiff = col-col2;
        let rowDiff = row-row2;
        if(((absColoumnDiff===1)&&(absRowDiff===0))||((absColoumnDiff===0)&&(absRowDiff===1))){ //co-ordinates diff should(either rowdiff 0 and column diff 1 or row diff 1 and column diff 0) if rowdiff 1 and column diff 1 unte anni tiles move cheyochu. maanaki anni tiles move cheyodu kada. 
            let direction;
            if(rowDiff===-1){
                direction = "down";
            }
            else if(rowDiff===1){
                direction = "up";
            }
            else if(columnDiff===1){
                direction = "left";
            }
            else{
                direction = "right";
            }
            moveTile(clickedTile,direction);
            let temp = randomNumbersArray[indexZero]; // swaping to update the array.
            randomNumbersArray[indexZero] = randomNumbersArray[index];
            randomNumbersArray[index] = temp;
            // console.log(randomNumbersArray); //this is updated array
            let gameresult = checkIfgameOver(randomNumbersArray);
            
            if(gameresult=="win"){
                win.innerHTML = message;
                clickedTile.onclick = null;
                let playBtn = document.createElement("button");
                let text = document.createTextNode("Play again");
                playBtn.classList.add("play");
                let container = document.querySelector(".game-container");
                playBtn.appendChild(text);
                container.appendChild(playBtn);
                playBtn.onclick = playAgainGame;
                // btn.classList.add("playbtn");
                // playbtn.style.display = "inline-block";
            }
            else{
                let count = document.querySelector(".count");
                count.innerHTML = missedcount++;
            }
            console.log(missedcount,gameresult);
        }
    }

    function moveTile(tileElementRef,direction) {
        let top = parseInt((tileElementRef.style.top).replace('px', ''));
        let left = parseInt((tileElementRef.style.left).replace('px', ''));
        if(direction==="down") {
            // top = top ? top : 0;
            tileElementRef.style.top = `${top+104}px`;
        } else if(direction==="up"){
            // top = top ? top : 0;
            tileElementRef.style.top = `${top-104}px`;
        }
        else if(direction==="left"){
            // left = left ? left : 0;
            tileElementRef.style.left = `${left-104}px`;
        }
        else{
            // left = left ? left : 0;
            tileElementRef.style.left = `${left+104}px`;
        }
    }
    
    function playAgainGame (){
        
        let grid = document.querySelector(".grid");
        grid.innerHTML= "";
        // playBtn.classList.remove("play");
        win.innerHTML = "";
        arrangeGrid();
    }
    

    

}
