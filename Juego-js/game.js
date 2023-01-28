const canvas = document.querySelector("#game")
const game = canvas.getContext('2d')

window.addEventListener('load', startGame)

function startGame(){
    let canvasSize //Cree una variable que un if le dara un valor, esta variable es para el tamaño del canvas

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8

        //si el alto de la pagina es mas grande que el ancho, el canvas solo va a tomar el 80% del ancho
    }else if (window.innerHeight < window.innerWidth){
        canvasSize = window.innerHeight * 0.8

          //si el ancho de la pagina es mas grande que el alto, el canvas solo va a tomar el 80% del alto
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    const elementsSize = canvasSize / 10

    game.font = (elementsSize - 12) + "px Verdana"  //Con este metodo se cambia el tamaño de fuente y familia
    game.fillStyle ="orange" //Con este por ahora se que cambia el color
    game.textAlign = "end" //Este metodo es para que lon que ingreses empiece o termine justamente donde le mandas la ubicacion en el fill, por ejemplo, si pones una ubicacion 25, 25... no va a centrarce en esa ubicacion, va es a empezar justo alli, o terminar hasta alli.o otras como "center" que esa si lo centra en un punto justo de las hubicaciones
    // game.fillText("Prueba", 0, 25)

    console.log({canvasSize, elementsSize})

    for (let i = 1; i < 11 ; i++) {
        game.fillText(emojis['X'], elementsSize * i , elementsSize )
        
    }

    //  game.fillRect(0, 5, 100, 100)
    //  game.clearRect(0, 0, 50, 50)
    //  game.clearRect(50, 50, 100, 100)
   
    
    
}