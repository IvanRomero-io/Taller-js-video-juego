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

    game.font = (elementsSize - 15) + "px Verdana"  //Con este metodo se cambia el tamaño de fuente y familia
    game.fillStyle ="orange" //Con este por ahora se que cambia el color
    game.textAlign = "end" //Este metodo es para que lon que ingreses empiece o termine justamente donde le mandas la ubicacion en el fill, por ejemplo, si pones una ubicacion 25, 25... no va a centrarce en esa ubicacion, va es a empezar justo alli, o terminar hasta alli.o otras como "center" que esa si lo centra en un punto justo de las hubicaciones
    // game.fillText("Prueba", 0, 25)

    const mapRows = maps[0].trim().split("\n")

    const mapRowsSinEspacios = mapRows.map((row) => row.trim().split(''))

    console.log(mapRows, mapRowsSinEspacios )


for(let y = 1;  y < 11 ; y++){ 
    // console.log({y})
    for (let x = 1; x < 11 ; x++) {
        game.fillText(emojis[mapRowsSinEspacios[y - 1][x - 1]], elementsSize * x , elementsSize * y - 10)
        // console.log({elementsSize, x})
    }
}
    //  game.fillRect(0, 5, 100, 100)
    //  game.clearRect(0, 0, 50, 50)
    //  game.clearRect(50, 50, 100, 100)
   
    

}


//NUEVO METODO ".split()", este metodo nos sirve para convertir en elemento de array a cada letra de un string, o tambien si que remos que solo sean las paralabra, le podemos añadir un espacio para que sepa desde donde va a ser el inicio y el final de cada elemento que va crear, por ejemplo .split(" ")

//NUEVO METODO ".trim()" elimina los espacios vacios de cada string