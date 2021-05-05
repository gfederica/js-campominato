// Consegna
// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati.
// In seguito deve chiedere all'utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L'utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all'utente un altro numero.
// La partita termina quando il giocatore inserisce un numero "vietato" o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito.


// BONUS: (da fare solo se funziona tutto il resto)
// all'inizio il software richiede anche una difficoltà all'utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// inizio con lo stabilire due Array, uno per le bombe (numeri casuali) e uno per i tentativi dell'utente

var bombe = [];
var tentativi = [];
var gameOver = false;
var tentativiMax;
var numeroMax; //cambia in base alla difficoltà
var difficolta; //determina il range di difficoltà che l'utente sceglie all'inizio

// i numeri delle bombe e quelli inseriti dall'utente non possono essere duplicati, quindi posso scrivere una funzione che servirà per entrambi i casi: un ciclo for che scorre dei numeri finchè il numero che esce non è uguale ad uno già uscito. 
// Posso usarla anche per capire se il numeroutente è un "duplicato" del numerobomba

                            // FUNZIONI //
function duplicato (elemento, array) {
    // entro nel ciclo, se trovo il duplicato si ferma e il valore è duplicato=true. Di base è false;
    for (var i = 0; i < array.length; i++) {
        if (elemento == array[i]) {
            return true;
        } 
    }
    return false;
}

// mi serve una funzione che generi dei numeri casuali, per le bombe

function numeroRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

                            // fine FUNZIONI //



                            // SELEZIONE DIFFICOLTA'

//creo un ciclo che chiede di inserire la difficoltà finchè non è nel range prestabilito

do { 
    difficolta = parseInt(prompt("Campo Minato! \nSeleziona un livello di difficolta: \n0: Facile \n1: Medio \n2: Difficile"));
} while (isNaN(difficolta) || difficolta > 2);


// scrivo nello switch come cambiano le due variabili (tentativi e numero max) a seconda della difficoltà

switch (difficolta) {
    case (0):
    tentativiMax = 84;
    numeroMax = 100;
    break;
    
    case(1):
    tentativiMax = 64;
    numeroMax = 80;
    break;

    case(2):
    tentativiMax = 34;
    numeroMax = 50;
    break; 
}


                            // fine SELEZIONE DIFFICOLTA'


                            // STABILISCO NUMERI BOMBA
// inizializzo il gioco, creando le bombe/numeri casuali
// poichè non so quante volte devo eseguire il for (se mettessi il numero preciso non potrei eliminare eventuali duplicati senza diminuire il numero di bombe), utilizzo il while, con condizione di uscita il raggiungimento di 16 numeri differenti

while (bombe.length < 16) {
    var numeroBomba = numeroRandom(1, numeroMax);
    // pusho il numero random generato solo se il numero non è un duplicato, pushando dò l'incremento al ciclo
    if (duplicato(numeroBomba, bombe) == false ) {
        bombe.push(numeroBomba);
    }
}
console.log(bombe);
                            // fine STABILISCO NUMERI BOMBA


                            // CHIEDO NUMERI ALL'UTENTE
// adesso inizio il gioco vero e proprio: mi serve un prompt per chiedere all'utente i numeri che vuole. siccome i tentativi sono un tot. ma voglio eliminare la possibilità che inserisca duplicati o numeri fuori range, mi serve un ciclo do/while (NOT FOR)
// inserisco il ciclo dentro un altro ciclo che "comanda" quando il gioco finisce (per game over o fine tentativi = win)


while (tentativi.length < tentativiMax && gameOver == false) {

    var sceltaUtente;
    do { sceltaUtente = parseInt(prompt("Inserisci un numero tra 1 e 100")); } while (isNaN(sceltaUtente) || sceltaUtente < 1 || sceltaUtente > numeroMax);

    // // dopo aver chiesto il numero, continuo il ciclo con gli scenari probabili : 
    // O il numero è un numeroBomba (in quel caso mostro alert col punteggio) 
    // O il numero non è un numeroBomba (e lo pusho per tenere conto dei tentativi/punteggio)

    if (duplicato(sceltaUtente, bombe)) {
        gameOver = true;
        alert ("💣 Game Over! 💣 \nHai totalizzato " + tentativi.length + " punti");
    } else if (duplicato(sceltaUtente, bombe) == false) {
        tentativi.push(sceltaUtente);
    }
    
    // scenario vittoria: l'utente inserisce numeri "sicuri" ad ogni tentativo, totalizzando il massimo dei punti

    if (tentativi.length == tentativiMax) {
        alert ("🏆 Hai vinto! 🏆 \nHai evitato tutte le bombe e totalizzato " + tentativi.length + " punti");
    }
}
                            // fine CHIEDO NUMERI ALL'UTENTE


