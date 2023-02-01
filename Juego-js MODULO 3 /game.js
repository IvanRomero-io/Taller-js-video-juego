const canvas = document.querySelector("#game")
const game = canvas.getContext('2d')
let canvasSize //Cree una variable que un if le dara un valor, esta variable es para el tamaño del canvas
let elementsSize
let level = 0

const playerPosition = {x: undefined, y: undefined}
const giftPosition = {x: undefined, y: undefined}

let enemiesPosition = []



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

    const map = maps[level]
    if(!map){
       gameWin() 
       return
    }

    const mapRows = map.trim().split("\n")
    const mapRowsSinEspacios = mapRows.map((row) => row.trim().split(''))
    // console.log(mapRows, mapRowsSinEspacios )


    //si con un ForEach recibe un segundo parametro. este regresa la ubicacion en el index de ese elemento
    enemiesPosition = []
    game.clearRect(0, 0, canvasSize, canvasSize)
    mapRowsSinEspacios.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            let emoji = emojis[col]
            let posX = elementsSize * (colI + 1)
            let posY = (elementsSize * (rowI + 1))
            // console.log({col, colI, row, rowI, emoji})
            if(col == 'O' && playerPosition.x == undefined && playerPosition.y == undefined){
                playerPosition.x = posX
                playerPosition.y = posY
                console.log({"Aqui debe estar el jugador": 0, posX, posY, playerPosition})
            }
            else if (col === 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
                console.log({giftPosition})
            }
            else if (col === 'X'){
                enemiesPosition.push({col, positionX: posX, positionY: posY})
                // console.log(enemiesPosition)

            }


            game.fillText(emoji, posX, posY)
            game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)

        })
       
    });
    // console.log(enemiesPosition)
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



function movePlayer(){
    const giftCollisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1)
    const giftCollisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1)
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
         levelWin()
    }

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
//    console.log(playerPosition.x, playerPosition.y)
///colicion bombas//
  const enemyCollision = enemiesPosition.find(enemy => {
    const enemyCollisionX = (enemy.positionX).toFixed(2) == (playerPosition.x).toFixed(2);
    const enemyCollisionY = (enemy.positionY).toFixed(2) == (playerPosition.y).toFixed(2);
    return(enemyCollisionX && enemyCollisionY)
  })


    if(enemyCollision){
        console.log("colision con enemigo")
    }

}

function levelWin(){
    console.log("subiste de nivel")
    level++
    return startGame()
}

function gameWin(){
    console.log("Superaste el juego")
}

function moveUp(){
    // console.log('Arriba')
    if((playerPosition.y - elementsSize) < elementsSize){
        console.log("limite")
    } else{
       playerPosition.y = playerPosition.y - elementsSize
        startGame()
    }

    
}

function moveRight(){
    // console.log('Derecha')
   
    if((playerPosition.x + elementsSize) > canvasSize){
        console.log("limite")
    } else{
        playerPosition.x = playerPosition.x + elementsSize
        startGame()
    }
    
}

function moveLeft(){
    // console.log('Izquierda')
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log("limite")
    } else{
        playerPosition.x = playerPosition.x - elementsSize
        startGame()
    }

}

function moveDown(){
    // console.log('Abajo')
    if((playerPosition.y + elementsSize) > canvasSize ){
        console.log("limite")
    } else{
        playerPosition.y = playerPosition.y + elementsSize
        startGame()
    }
    
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

