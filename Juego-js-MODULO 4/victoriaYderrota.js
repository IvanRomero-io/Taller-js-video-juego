//Elementos Html
const reiniarJuego = document.getElementById("reinicio-juego")
const seccionWinScreen = document.querySelector(".winFinal")
const spanRecordVictoria = document.getElementById("record-victoria")
const spanRecordAnterior = document.getElementById("anterior-record")
const pResultadoWin = document.getElementById("reuslt-Pantalla-Win")
//Variables


//Listeners 
reiniarJuego.addEventListener("click", reiniarPaginaButton)




//Funciones

function pantallaWin(tiempo, tiempoAnterior){
    seccionWinScreen.classList.remove('inactive')
    spanRecordVictoria.innerHTML = tiempo
    spanRecordAnterior.innerHTML = tiempoAnterior
    
    if(tiempoAnterior){
        //Si el record en el localStorage es mayor, este lo sobre escribe
        if(tiempoAnterior >= tiempo ){
            pResultadoWin.innerHTML = 'Haz superado el record ✨✨'
        }
        //Y si el tiempo en esta partida no es mayor al record ya impuesto en otras partidas, te avisa que no lo has roto
        else{
            pResultadoWin.innerHTML = 'lo siento, no has roto el record 💀'
        }
    }
    //Si no habia un record en el localStorage, lo va a creear
    else{
        pResultadoWin.innerHTML = 'Primer ingreso de tiempo ✍'
    }
}

function reiniarPaginaButton(){
    location.reload()
}