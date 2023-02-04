const canvas = document.querySelector("#game")
const game = canvas.getContext('2d')
let canvasSize //Cree una variable que un if le dara un valor, esta variable es para el tamaño del canvas
let elementsSize
let level = 0
let lives = 3

let timeStart
let timePlayer
let timeInterval

const playerPosition = {x: undefined, y: undefined}
const giftPosition = {x: undefined, y: undefined}

let enemiesPosition = []
let resizeElementXandY
let arrayUltimoCanvasSize =[]


window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', resize)


function resize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7

        //si el alto de la pagina es mas grande que el ancho, el canvas solo va a tomar el 80% del ancho
    }else if (window.innerHeight < window.innerWidth){
        canvasSize = window.innerHeight * 0.7

          //si el ancho de la pagina es mas grande que el alto, el canvas solo va a tomar el 80% del alto
    }

    canvasSize = Number(canvasSize.toFixed(0))

    playerPosition.x = (canvasSize * playerPosition.x) / arrayUltimoCanvasSize[arrayUltimoCanvasSize.length - 1]
    playerPosition.y = (canvasSize * playerPosition.y) / arrayUltimoCanvasSize[arrayUltimoCanvasSize.length - 1]

    // console.log(playerPosition.x, playerPosition.y)
    setCanvasSize()
}


function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7

        //si el alto de la pagina es mas grande que el ancho, el canvas solo va a tomar el 80% del ancho
    }else if (window.innerHeight < window.innerWidth){
        canvasSize = window.innerHeight * 0.7

          //si el ancho de la pagina es mas grande que el alto, el canvas solo va a tomar el 80% del alto
    }

    canvasSize = Number(canvasSize.toFixed(0))
    console.log(canvasSize)

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10

    // playerPosition.x = undefined
    // playerPosition.y = undefined
    
    arrayUltimoCanvasSize.push(canvasSize)
    // resizeElementPosition.push(elementsSize)

    // if (resizeElementPosition){
    //     let ultimoElementSize = resizeElementPosition[resizeElementPosition.length - 2]
    //     console.log(ultimoElementSize)
    // }

  
    startGame()
}


function startGame(){

    game.font = (elementsSize - 15) + "px Verdana"
    game.fillStyle ="orange"
    game.textAlign = "end"

    const map = maps[level]
    if(!map){
       gameWinAndSetRecord()
       return
    }
    if(!timeStart){
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100 )
        showRecord()
    }
    // console.log(timeStart)

    const mapRows = map.trim().split("\n")
    const mapRowsSinEspacios = mapRows.map((row) => row.trim().split(''))
    // console.log(mapRows, mapRowsSinEspacios )


    //si con un ForEach recibe un segundo parametro. este regresa la ubicacion en el index de ese elemento
    enemiesPosition = []
    game.clearRect(0, 0, canvasSize, canvasSize)
    showLives()
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
                // console.log({giftPosition})
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
    let tempUltimaPosiciones = [playerPosition.x, playerPosition.y]
    resizeElementXandY = tempUltimaPosiciones
   movePlayer()
}

window.addEventListener('keydown', moveByKeys)
const btnUp = document.getElementById('up')
const btnRight = document.getElementById('right')
const btnLeft = document.getElementById('left')
const btnDown = document.getElementById('down')
const spanLives = document.getElementById('lives')
const spanTime = document.getElementById('tiempo')
const spanRecord = document.getElementById('record')
const pResult = document.getElementById('result')


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

    // game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
//    console.log(playerPosition.x, playerPosition.y)
///colicion bombas//
  const enemyCollision = enemiesPosition.find(enemy => {
    const enemyCollisionX = (enemy.positionX).toFixed(2) == (playerPosition.x).toFixed(2);
    const enemyCollisionY = (enemy.positionY).toFixed(2) == (playerPosition.y).toFixed(2);
    return(enemyCollisionX && enemyCollisionY)
  })


    if(enemyCollision){
        levelFail()
    }

}

function levelWin(){
    console.log("subiste de nivel")
    level++
    return startGame()
}

function levelFail(){
    console.log('Chocaste con un enemigo :(')
    playerPosition.x = undefined
    playerPosition.y = undefined
    lives--
    if(lives <= 0){
       level = 0
       lives = 3
       timeStart = undefined 
    }


    startGame()

}

function gameWinAndSetRecord(){
    console.log("Superaste el juego")
    level = 0
    playerPosition.x = undefined
    playerPosition.y = undefined
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem('record_time') //Variable que nos trae una iformacion del local storaage
    const playerTime = Date.now() - timeStart //Variable que nos trae el ultimo tiempo cuando ya se acabaron los niveles del juego, osea tu marca en la partida

    //Revisa si ya existia un record y empieza a comparar
    if(recordTime){
        //Si el record en el localStorage es mayor, este lo sobre escribe
        if(recordTime >= playerTime ){
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Haz superado el record ✨✨'
        }
        //Y si el tiempo en esta partida no es mayor al record ya impuesto en otras partidas, te avisa que no lo has roto
        else{
            pResult.innerHTML = 'lo siento, no has roto el record 💀'
        }
    }
    //Si no habia un record en el localStorage, lo va a creear
    else{
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = 'Primer ingreso de tiempo ✍'
    }

    //Y aca te enseña en la consola el record anterior (si no existe es null), y el record de esta partida
    console.log({recordTime, playerTime})
    // startGame()
}

function moveUp(){
    // console.log('Arriba')
    if((playerPosition.y - elementsSize).toFixed(0) < Number(elementsSize.toFixed(0))){
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

/////////////Utilidades visuales (vidas, tiempo, etc )

function showLives(){
    //Esto es interesante, el metodo "Array" con a mayuscula te permite crear un array que le puedes decir cuantas posiciones quieres y despues con el metodo fill, la llenas de lo que le pediste
    let corazonesArray = Array(lives).fill(emojis['h'])
    // console.log(corazones)
    // let corazones = ""
    
    spanLives.innerHTML = ""
    corazonesArray.forEach(corazon => {
        spanLives.append(corazon)
        // corazones = corazones + corazon
        // console.log(corazones)
    } )
    

}

function showTime(){
    spanTime.innerHTML = Date.now() - timeStart
}

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

//Esta ves usaremos una herramiendo de navegadores que se llama el localStorage, que nos sirve para guardar informacion en el navegador y lo podamos usar de nuevo con su informacion guardada asi hallamos cerrado la pagina, usa 3 metodos (que conozco) como ".getItem" es para leer la informacio que este guardada , ".setItem" para guardar la informacion, variable etc, ".removeItem" saca la variable que se guardo