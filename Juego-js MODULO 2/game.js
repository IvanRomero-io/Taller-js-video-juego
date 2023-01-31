const canvas = document.querySelector("#game")
const game = canvas.getContext('2d')
let canvasSize //Cree una variable que un if le dara un valor, esta variable es para el tamaño del canvas
let elementsSize



window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize(){
   
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8

        //si el alto de la pagina es mas grande que el ancho, el canvas solo va a tomar el 80% del ancho
    }else if (window.innerHeight < window.innerWidth){
        canvasSize = window.innerHeight * 0.8

          //si el ancho de la pagina es mas grande que el alto, el canvas solo va a tomar el 80% del alto
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10

 console.log({canvasSize, elementsSize})


    startGame()
}


function startGame(){

    game.font = (elementsSize - 15) + "px Verdana"  
    game.fillStyle ="orange"
    game.textAlign = "end" 

    const map = maps[0]
    const mapRows = map.trim().split("\n")
    game.clearRect(0, 0, canvasSize, canvasSize)
    const mapRowsSinEspacios = mapRows.map((row) => row.trim().split(''))

    // console.log(mapRows, mapRowsSinEspacios )
    //si con un ForEach recibe un segundo parametro. este regresa la ubicacion en el index de ese elemento
    game.clearRect(0, 0, canvasSize, canvasSize)
    mapRowsSinEspacios.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            let emoji = emojis[col]
            let posX = elementsSize * (colI + 1)
            let posY = (elementsSize * (rowI + 1) - 10)
            // console.log({col, colI, row, rowI, emoji})
            if(col == 'O' && playerPosition.x == undefined && playerPosition.y == undefined){
                playerPosition.x = posX
                playerPosition.y = posY
                console.log({"Aqui debe estar el jugador": 0, posX, posY, playerPosition})
            }
            
            game.fillText(emoji, posX, posY)
            game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
            
        })

            
    });

    movePlayer()
}

window.addEventListener('keydown', moveByKeys)
const btnUp = document.getElementById('up')
const btnRight = document.getElementById('right')
const btnLeft = document.getElementById('left')
const btnDown = document.getElementById('down')

btnUp.addEventListener('click', moveUp)
btnRight.addEventListener('click', moveRight)
btnLeft.addEventListener('click', moveLeft)
btnDown.addEventListener('click', moveDown)

const playerPosition = {x: undefined, y: undefined}

function movePlayer(){

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
    console.log(playerPosition.x, playerPosition.y)
} 

function moveUp(){
    // console.log('Arriba')
    playerPosition.y = playerPosition.y - 10
    if(playerPosition.y < (canvasSize - canvasSize + 30)){
        playerPosition.y = canvasSize - canvasSize + (canvasSize / 20)
    }
   
    startGame()
}

function moveRight(){
    // console.log('Derecha')
    playerPosition.x = playerPosition.x + 10
    if(playerPosition.x > canvasSize){
        playerPosition.x = canvasSize 
    }
    startGame()
}

function moveLeft(){
    // console.log('Izquierda')
    playerPosition.x = playerPosition.x - 10
    if(playerPosition.x < (canvasSize - canvasSize + 30)){
        playerPosition.x = canvasSize - canvasSize + (canvasSize / 20)
    }

    startGame()
}

function moveDown(){
    // console.log('Abajo')
    playerPosition.y = playerPosition.y + 10
    if(playerPosition.y > canvasSize){
        playerPosition.y = canvasSize 
    }
    startGame()
}

function moveByKeys(event){
//    console.log(event.key)

    let teclaPulsada = event.key
    switch(teclaPulsada){
        case "ArrowUp":
            moveUp()
        break;
        case "ArrowRight":
            moveRight()
        break;
        case "ArrowLeft":
            moveLeft()
        break;
        case "ArrowDown":
            moveDown()
        break;
    }

}