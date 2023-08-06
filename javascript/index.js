
import clase_bombas from "./bombas.js";//importando la clase bombas
var bombas = new clase_bombas();
import clase_numeros from "./numeros.js";//importando la clase numeros
var numeros = new clase_numeros();
import clase_cronometro from "./cronometro.js";//importando la clase numeros
var cronometro = new clase_cronometro();

var tamaño = 9;//el tamaño predeterminado es de una matriz 9 * 9
var tablero = [[]];
var recorridas = [];
var banderas = 0;
var banderasrestantes = 10;
var gon = false;
var killua = false;
var clasetdnumero;
var primerclick = true;//para que el primer click sea siempre agua o vacio, y para que no puedas poner banderas antes de hora.
var ponebombas;
var personajebomba;

var modojuego = new Map();
//creamos un Map con un array dentro para configurar los modos de juego, el primer elemento del array es el tamaño de la matriz tanto de filas como columnas 
//y el segundo es el numero de bombas.
window.onload = function () {
    modojuego.set("boton_facil", new Array(9, 10));
    modojuego.set("boton_normal", new Array(12, 30));
    modojuego.set("boton_dificil", new Array(15, 60));
    //los tres modos de juego metidos.

    let botonhistoria = document.getElementById("botonhistoria");
    botonhistoria.addEventListener("click", historia);
    let botoninstrucciones = document.getElementById("botoninstrucciones");
    botoninstrucciones.addEventListener("click", instrucciones);
    let botoninicio = document.getElementById("botoninicio");
    botoninicio.addEventListener("click", inicio);
    let botonajustes = document.getElementById("botonajustes");
    botonajustes.addEventListener("click", ajustes);

    let caja = document.getElementById("cajaprincipal");
    caja.className = ("class", "cajapequeña");
    inicio();
}
function inicio() {
    let divinicio = document.getElementById("divinicio");
    let divhistoria = document.getElementById("divhistoria");
    let divinstrucciones = document.getElementById("divinstrucciones");
    let divtablero = document.getElementById("tablero");
    let divajustes = document.getElementById("divajustes");
    let divvictoria = document.getElementById("victoria");
    let imgvictoria = document.getElementById("victoriaimg");
    let divderrota = document.getElementById("derrota");
    let imgderrota = document.getElementById("derrotaimg");
    let navderecha = document.getElementById("derecha");
    //ocultamos
    divtablero.style.display = "none";
    divinstrucciones.style.display = "none";
    divhistoria.style.display = "none";
    divajustes.style.display = "none";
    navderecha.style.display = "none";

    if (imgvictoria) {
        divvictoria.removeChild(imgvictoria);
    }
    if (imgderrota) {
        divderrota.removeChild(imgderrota);
    }
    //visibilizamos
    divinicio.style.display = "block";
    fondo.style.backgroundColor = "black";
    //apagamos los dos OST (si estuvieran encendidos)
    sonidoillumi(false);
    sonidohisoka(false);

    reinicio();
    cronometro.reiniciar();

    let caja = document.getElementById("cajaprincipal");
    caja.className = ("class", "cajapequeña");
    let escogegon = document.getElementById("escogegon");
    escogegon.addEventListener("click", modogon);
    let escogekillua = document.getElementById("escogekillua");
    escogekillua.addEventListener("click", modokillua);
    let botonrestart = document.getElementById("botonrestart");
    botonrestart.addEventListener("click", restart);

}
function restart() {
    let divvictoria = document.getElementById("victoria");
    let imgvictoria = document.getElementById("victoriaimg");
    let divderrota = document.getElementById("derrota");
    let imgderrota = document.getElementById("derrotaimg");
    if (imgvictoria) {
        divvictoria.removeChild(imgvictoria);
    }
    if (imgderrota) {
        divderrota.removeChild(imgderrota);
    }
    reinicio();
    let divtablero = document.getElementById("tablero");
    divtablero.style.display = "block";
    cronometro.reiniciar();
    cronometro.cronometrar();

}
function reinicio() {
    let divresultado = document.getElementById("resultado");
    divresultado.style.display = "none";
    let divtablero = document.getElementById("tablero");
    divtablero.style.pointerEvents = "auto";
    divtablero.innerHTML = "";//reseteamos la tabla del divtablero
    let cantidadbombas = document.getElementById("cantidadbombas");
    cantidadbombas.innerHTML = bombas.getNumBombas();//poniendo graficamente la cantidad de bombas
    banderasrestantes = bombas.getNumBombas();
    crearTablero();
    clearInterval(ponebombas);
    resetear();
    primerclick = true;
}

function modogon() {
    //modo de juego con tematica verde y la bomba es hisoka
    gon = true; killua = false;
    let fondo = document.getElementById("fondo");
    fondo.style.backgroundColor = "#019875";
    let celdas = document.getElementsByTagName("td");
    for (let cell of celdas) {
        cell.style.border = " 2px solid #019875";

    }
    let divbombas = document.getElementById("nbombas");
    let imgdivbombas = document.getElementById("nbombasillumi");
    if (imgdivbombas) {
        divbombas.removeChild(imgdivbombas);
        let imghisoka = document.createElement("img");
        imghisoka.setAttribute("id", "nbombashisoka");
        imghisoka.setAttribute("alt", "bombas");
        imghisoka.setAttribute("src", "../img/hisokabomba.jpg");
        divbombas.appendChild(imghisoka);
    }
    let divinicio = document.getElementById("divinicio");
    divinicio.style.display = "none";
    let divtablero = document.getElementById("tablero");
    divtablero.style.display = "block";
    if (gon == true) {
        clasetdnumero = "numeroGon";
    }
    dimensionestabla();
    let navderecha = document.getElementById("derecha");
    navderecha.style.display = "block";
    cronometro.gon();
    cronometro.cronometrar();

    let botonrestart = document.getElementById("botonrestart");
    botonrestart.className = "btn btn-outline-success btn-lg";
    sonidoillumi(false);//apagamos el OST de illumi (si estuviera encendido)
    sonidohisoka(true);//encendemos el OST de hisoka

}
function modokillua() {
    //modo de juego con tematica azul y la bomba es Illumi
    gon = false; killua = true;
    let fondo = document.getElementById("fondo");
    fondo.style.backgroundColor = "#004C81";
    let celdas = document.getElementsByTagName("td");
    for (let cell of celdas) {
        cell.style.border = " 2px solid #004C81";

    }
    let divbombas = document.getElementById("nbombas");
    let imgdivbombas = document.getElementById("nbombashisoka");
    if (imgdivbombas) {
        divbombas.removeChild(imgdivbombas);
        let imgillumi = document.createElement("img");
        imgillumi.setAttribute("id", "nbombasillumi");
        imgillumi.setAttribute("alt", "bombas");
        imgillumi.setAttribute("src", "../img/illumibomba.jpg");

        divbombas.appendChild(imgillumi);
    }
    let divinicio = document.getElementById("divinicio");
    divinicio.style.display = "none";
    let divtablero = document.getElementById("tablero");
    divtablero.style.display = "block";
    if (killua == true) {
        clasetdnumero = "numeroKillua";
    }
    dimensionestabla();
    let navderecha = document.getElementById("derecha");
    navderecha.style.display = "block";
    cronometro.killua();
    cronometro.cronometrar();
    let botonrestart = document.getElementById("botonrestart");
    botonrestart.className = "btn btn-outline-primary btn-lg";
    sonidohisoka(false);//apagamos el OST de hisoka (si estuviera encendido)
    sonidoillumi(true);//encendemos el OST de illumi
}
//esta funcion sirve para regular el tamaño y las propiedades de la caja donde se ubica el tablero 
function dimensionestabla() {
    let caja = document.getElementById("cajaprincipal");
    let clase;
    switch (tamaño) {
        case 9:
            clase = "cajapequeña";
            break;
        case 12:
            clase = "cajanormal";
            break;
        case 15:
            clase = "cajagrande";
            break;
    }
    caja.className = ("class", clase);
}
function ajustes() {
    let divajustes = document.getElementById("divajustes");

    let divinicio = document.getElementById("divinicio");
    let divhistoria = document.getElementById("divhistoria");
    let divinstrucciones = document.getElementById("divinstrucciones");
    let divtablero = document.getElementById("tablero");
    let divvictoria = document.getElementById("victoria");
    let imgvictoria = document.getElementById("victoriaimg");
    let divderrota = document.getElementById("derrota");
    let imgderrota = document.getElementById("derrotaimg");
    let navderecha = document.getElementById("derecha");
    let divresultado = document.getElementById("resultado");
    //ocultamos
    divtablero.style.display = "none";
    divinstrucciones.style.display = "none";
    divhistoria.style.display = "none";
    divinicio.style.display = "none";
    navderecha.style.display = "none";
    divresultado.style.display = "none";

    if (imgvictoria) {
        divvictoria.removeChild(imgvictoria);

    }
    if (imgderrota) {
        divderrota.removeChild(imgderrota);
    }
    //visibilizamos
    divajustes.style.display = "block";

    let botonfacil = document.getElementById("boton_facil");
    let botonnormal = document.getElementById("boton_normal");
    let botondificil = document.getElementById("boton_dificil");
    botonnormal.addEventListener("click", setmodo);
    botonfacil.addEventListener("click", setmodo);
    botondificil.addEventListener("click", setmodo);

    let caja = document.getElementById("cajaprincipal");
    caja.className = ("class", "cajapequeña");
}
//Usamos el map para configurar el tamaño y para cambiar el número de bombas de una manera eficiente.
function setmodo() {
    let modo = this.id;
    let cantbombas;
    tamaño = modojuego.get(modo)[0];
    cantbombas = modojuego.get(modo)[1];
    bombas.setnumBombas(cantbombas);
    banderasrestantes = bombas.getNumBombas();
}
function historia() {
    let divhistoria = document.getElementById("divhistoria");
    let divinstrucciones = document.getElementById("divinstrucciones");
    let divtablero = document.getElementById("tablero");
    let divinicio = document.getElementById("divinicio");
    let divajustes = document.getElementById("divajustes");
    let divvictoria = document.getElementById("victoria");
    let imgvictoria = document.getElementById("victoriaimg");
    let divderrota = document.getElementById("derrota");
    let imgderrota = document.getElementById("derrotaimg");
    let navderecha = document.getElementById("derecha");
    let divresultado = document.getElementById("resultado");
    //ocultamos
    divtablero.style.display = "none";
    divinstrucciones.style.display = "none";
    divinicio.style.display = "none";
    divajustes.style.display = "none";
    navderecha.style.display = "none";
    divresultado.style.display = "none";
    if (imgvictoria) {
        divvictoria.removeChild(imgvictoria);

    }
    if (imgderrota) {
        divderrota.removeChild(imgderrota);
    }
    //visibilizamos
    divhistoria.style.display = "block";

    let caja = document.getElementById("cajaprincipal");
    caja.className = ("class", "cajapequeña");

}
function instrucciones() {
    let divinstrucciones = document.getElementById("divinstrucciones");
    let divtablero = document.getElementById("tablero");
    let divhistoria = document.getElementById("divhistoria");
    let divinicio = document.getElementById("divinicio");
    let divajustes = document.getElementById("divajustes");
    let divvictoria = document.getElementById("victoria");
    let imgvictoria = document.getElementById("victoriaimg");
    let divderrota = document.getElementById("derrota");
    let imgderrota = document.getElementById("derrotaimg");
    let navderecha = document.getElementById("derecha");
    let divresultado = document.getElementById("resultado");
    //ocultamos
    divhistoria.style.display = "none";
    divtablero.style.display = "none";
    divinicio.style.display = "none";
    divajustes.style.display = "none";
    navderecha.style.display = "none";
    divresultado.style.display = "none";
    if (imgvictoria) {
        divvictoria.removeChild(imgvictoria);

    }
    if (imgderrota) {
        divderrota.removeChild(imgderrota);
    }
    //visibilizamos
    divinstrucciones.style.display = "block";

    let caja = document.getElementById("cajaprincipal");
    caja.className = ("class", "cajapequeña");
}
//deja todo limpio para cuando haya una nueva partida
function resetear() {
    rellenarMatriz();
    let td;
    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {
            td = document.getElementById(i + "-" + j);
            td.innerHTML = "";
        }
    }
    bombas.eliminarBombas();
    bombas.crearBombas(tamaño);
    bombas.colocarBombas(tablero);
    numeros.colocarNumeros(bombas.getBombas(), tablero, tamaño);
    recorridas = [];
    banderas = 0;
    console.log(tablero);//console log necesario
}

function crearTablero() {
    let tablerito = document.getElementById("tablero");
    let table = document.createElement('table');
    table.setAttribute("id", "tabla" + tamaño);
    table.setAttribute("border", "2");
    let tbody = document.createElement('tbody');
    let cantidadbombas = document.getElementById("cantidadbombas");
    cantidadbombas.innerHTML = bombas.getNumBombas();//poniendo graficamente el número bombas disponibles
    let cantidadbanderas = document.getElementById("cantidadbanderas");
    cantidadbanderas.innerHTML = banderasrestantes;//poniendo graficamente el número banderas disponibles
    for (let i = 0; i < tamaño; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < tamaño; j++) {
            let td = document.createElement('td');
            td.setAttribute("id", i + "-" + j)//ponemos el id de la posicion como si fuera una matriz
            td.addEventListener("click", comprobarcasilla);
            td.addEventListener('contextmenu', function (banderita) {

                if (primerclick == false) {//si no has hecho el primer click no puedes poner banderas
                    sonidoclickder();
                    let img = document.getElementById("band" + td.id);
                    if (td.contains(img)) {//si la casilla contiene imágenes pues la quita
                        td.removeChild(img);
                        if (banderas >= 0) {
                            banderas--;
                            banderasrestantes++;
                        }

                    } else { //si no contiene, crea el nodo de la img.
                        if (banderas < bombas.getNumBombas()) {//tenemos el limite de banderas de 10
                            if (!td.className) { //si no tiene clase asignada, se puede colocar la banderita
                                let imgBandera = document.createElement('img');
                                imgBandera.setAttribute("src", "../img/bandera.png");
                                imgBandera.setAttribute("class", "imgbandera");
                                imgBandera.setAttribute('id', 'band' + td.id);
                                td.appendChild(imgBandera);
                                banderas++;
                                banderasrestantes--;
                            }
                        }
                    }
                }
                cantidadbanderas.innerHTML = banderasrestantes;//poniendo graficamente el número banderas disponibles
                banderita.preventDefault();//para cancelar la proxima acción, que es que se abra el menu del propio navegador.
                banderita.stopPropagation();
            }, false);
            tr.appendChild(td)
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    tablerito.appendChild(table);
    if (gon == true) {
        let celdas = document.getElementsByTagName("td");
        for (let cell of celdas) {
            cell.style.border = " 2px solid #019875";
        }
    }
    else if (killua == true) {
        let celdas = document.getElementsByTagName("td");
        for (let cell of celdas) {
            cell.style.border = " 2px solid #004C81";

        }
    }
}
function rellenarMatriz() {
    tablero = [[]];
    for (let i = 0; i < tamaño; i++) {
        tablero[i] = [];
        for (let j = 0; j < tamaño; j++) {
            tablero[i][j] = "v"; // v de Vacio
        }
    }
}

function comprobarcasilla() {
    let casilla = this.id;
    let trozos = casilla.split("-");
    let x = trozos[0];
    let y = trozos[1];
    let td = document.getElementById(casilla);
    let imgbandera = document.getElementById("band" + td.id);
    sonidoclickizq();
    if (td.contains(imgbandera)) {//si la casilla contiene imágenes pues la quita
        td.removeChild(imgbandera);
        if (banderas >= 0) {
            banderas--;
            banderasrestantes++;
            let cantidadbanderas = document.getElementById("cantidadbanderas");
            cantidadbanderas.innerHTML = banderasrestantes;//poniendo graficamente el número banderas disponibles
        }
    }

    if (primerclick == true) {
        while (tablero[x][y] != "v") {
            resetear();
            //reseteamos la matriz hasta que el primer click sea vacio.
        }
        primerclick = false;
    }
    if (tablero[x][y] == "v") {
        td.setAttribute("class", "vacio");
        comprobarVictoria();
        casillasBlancas();
    } else {
        if (tablero[x][y] != "O") {
            td.innerHTML = tablero[x][y];
            comprobarVictoria();
            td.setAttribute("class", clasetdnumero);

        }
        else {
            td.setAttribute("class", "bomba");
            //Si hubiera una bandera en el td donde clicamos y hay una bomba, eliminamos la bandera y ponemos la bomba
            let bandera = document.getElementById("band" + td.id);
            if (bandera) {
                td.removeChild(bandera);
            }
            //se coloca la casilla en la bomba
            let imgBomba = document.createElement('img');
            if (gon == true) {
                personajebomba = "hisokabomba";
            } else {
                personajebomba = "illumibomba";
            }
            imgBomba.setAttribute("src", "../img/" + personajebomba + ".jpg");
            imgBomba.setAttribute('id', 'bomba' + td.id);
            imgBomba.setAttribute("class", "imgbomba");
            td.appendChild(imgBomba);
            sonidobomba();
            //y llamamos a la funcion perdiste para colocar las demás bombas
            perdiste(imgBomba.id);
        }
    }
}
//Las dos siguientes funciones van de la mano y sirven para destapar las aguas
function casillasBlancas() {
    let td; let img;
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero.length; j++) {
            td = document.getElementById(i + "-" + j);
            //si en la matriz está vacia, la celda existe, no está en el array de recorridas y su clase es "vacio".
            //pues le pasamos la posicion a despejar Aguas.
            if (tablero[i][j] == "v" && td && !recorridas.includes(i + "-" + j) && document.getElementById(i + "-" + j).className == "vacio") {
                img = document.getElementById("band" + td.id);
                if (td.contains(img)) {//si la casilla contiene una bandera pues la quita
                    td.removeChild(img);
                    if (banderas >= 0) {//nos devuelve la bandera
                        banderas--;
                        banderasrestantes++;
                        let cantidadbanderas = document.getElementById("cantidadbanderas");
                        cantidadbanderas.innerHTML = banderasrestantes;//poniendo graficamente el número banderas disponibles
                    }
                }
                despejarAguas(i, j);
                recorridas.push(i + "-" + j);
                //metemos la posicion de la matriz en el array de recorridas, para que en la proxima iteración no vuelva comprobar esta celda.
                i = 0; j = 0; //vuelve a empezar
            }
        }
    }
    comprobarVictoria();
}
function despejarAguas(x, y) {
    //esta función basicamente comprueba desde la celda de arriba a la izquierda a la de abajo a la derecha de la posición mandada como parámetro
    x--; y--;
    for (let i = x; i <= (x + 2); i++) {
        for (let j = y; j <= (y + 2); j++) {
            let td = document.getElementById(i + "-" + j);
            if (td) {//si existe el td
                let img = document.getElementById("band" + td.id);
                if (td.contains(img)) {//si la casilla contiene una bandera pues la quita
                    td.removeChild(img);
                    if (banderas >= 0) {//nos devuelve la bandera
                        banderas--;
                        banderasrestantes++;
                        let cantidadbanderas = document.getElementById("cantidadbanderas");
                        cantidadbanderas.innerHTML = banderasrestantes;//poniendo graficamente el número banderas disponibles
                    }
                }
                if (tablero[i][j] == "v") {
                    td.setAttribute("class", "vacio");
                } else {
                    if (tablero[i][j] != "O") {
                        td.setAttribute("class", clasetdnumero);
                        td.innerHTML = tablero[i][j];
                    }
                    else {
                        td.setAttribute("class", "bomba");//esto no tiene mucho sentido porque si destapamos una bomba has perdido
                    }
                }
            }
        }
    }
    comprobarVictoria();
}
//recorremos toda la matriz si el numero de casillas destapadas - el numero de bombas es igual a el tamaño de la matriz
function comprobarVictoria() {
    let td; let img;
    let numeroceldas = (tamaño * tamaño) - bombas.getNumBombas();
    let destapadas = 1;
    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {
            td = document.getElementById(i + "-" + j);
            img = document.getElementById(personajebomba);
            if (td) {
                if (td.className != "") {
                    destapadas++;
                } else {
                }
            }
        }
    }
    if (destapadas == numeroceldas) {
        victoria();
    }
}
//pantalla final victoria
function victoria() {
    cronometro.parar();
    let victoria = document.getElementById("victoria")
    let tabla = document.getElementById("tablero")
    let divresultado = document.getElementById("resultado");
    tabla.style.display = "none";
    divresultado.style.display = "block";
    if (killua == true) {
        let gif = document.createElement("img");
        gif.setAttribute("id", "victoriaimg")
        gif.setAttribute("src", "../img/killua1.gif")
        victoria.appendChild(gif);
        divresultado.innerHTML = "<p>Te has escapado de tú hermano Illumi...</p>";
    }
    else if (gon == true) {
        let gif = document.createElement("img");
        gif.setAttribute("id", "victoriaimg")
        gif.setAttribute("src", "../img/gon.gif")
        victoria.appendChild(gif);
        divresultado.innerHTML = "<p>Te has escapado de tú enemigo Hisoka...</p>";
    }
    divresultado.innerHTML += "<p>Has salido victorioso!</p>";
}
function perdiste(bombacolocada) {
    let td;
    let array = Array.from(bombas.getBombas());
    let i = 0;
    //se van destapando las minas poco a poco.
    cronometro.parar();
    let tabla = document.getElementById("tablero");
    let cantidadbombas = document.getElementById("cantidadbombas");
    cantidadbombas.innerHTML -= 1;
    let divresultado = document.getElementById("resultado");
    divresultado.innerHTML = "";
    divresultado.style.display = "block";
    var tiempo;
    switch (bombas.getNumBombas()) {
        case 10: tiempo = 400;
            break;
        case 30: tiempo = 200;
            break;
        case 60: tiempo = 100;
            break;
    }
    ponebombas = setInterval(() => {//esta función es para que vaya destapando las bombas
        if (bombacolocada != "bomba" + array[i]) {// si es distinto a la bomba ya revelada, pues revela las demás
            td = document.getElementById(array[i]);
            let imgBomba = document.createElement('img');
            let bandera = document.getElementById("band" + td.id);
            if (bandera) {//si hay una bandera la quitamos
                td.removeChild(bandera);
            }
            imgBomba.setAttribute("src", "../img/" + personajebomba + ".jpg");
            imgBomba.setAttribute('id', 'bomba' + td.id);
            imgBomba.setAttribute("class", "imgbomba");

            td.appendChild(imgBomba);
            sonidobomba();

            cantidadbombas.innerHTML -= 1;//vamos reduciendo en el marcador el número de bombas
        }
        i++;
        if (i >= array.length) {
            clearInterval(ponebombas);//termina el interval, es como un break
            //pantalla final derrota
            let tabla = document.getElementById("tablero");
            tabla.style.pointerEvents = "none";
            tabla.style.display = "none";
            let derrota = document.getElementById("derrota")
            if (killua == true) {
                let gif = document.createElement("img");
                gif.setAttribute("id", "derrotaimg")
                gif.setAttribute("src", "../img/illumi.gif")
                derrota.appendChild(gif);
                divresultado.innerHTML = "<p>Te ha atrapado tú hermano Illumi...</p>";
            }
            else if (gon == true) {
                let gif = document.createElement("img");
                gif.setAttribute("id", "derrotaimg")
                gif.setAttribute("src", "../img/hisoka.gif")
                derrota.appendChild(gif);
                divresultado.innerHTML = "<p>Te ha atrapado tú enemigo Hisoka...</p>";
            }
            divresultado.innerHTML += "<p>Has sido derrotado!</p>";
        }
    }, tiempo);
    tabla.style.pointerEvents = "none";
}

//Reflexión interesante sobre los audios en html5 y DOM.
//Cuando son audios largos, como bandas sonoras o así, es mejor crear el elemento audio en el html y manipularlo con javascript
//a crearlo con dom directamente, puesto que cuando se quiere parar un audio muchas veces no funciona.
//entonces para audios cortos como el sonido de la bomba o un botón, que no es necesario pararlo, pues podemos crearlos de cero con el DOM directamente.
function sonidoillumi(sonar) {
    let illumiost = document.getElementById("illumiost");
    if (sonar == true) {
        illumiost.play();
        illumiost.loop = true;
        illumiost.volume = 0.20;
    } else {
        illumiost.currentTime = 0;
        illumiost.pause();
    }
}
function sonidohisoka(sonar) {
    let hisokaost = document.getElementById("hisokaost");
    if (sonar == true) {
        hisokaost.play();
        hisokaost.loop = true;
        hisokaost.volume = 0.20;
    } else {
        hisokaost.currentTime = 0;
        hisokaost.pause();

    }
}
function sonidobomba() {
    let bomba = new Audio('..//audio/bombita.mp3');
    bomba.play();
    bomba.volume = 0.10;
}
function sonidoclickizq() {
    let sonido = new Audio('..//audio/clickizq.mp3');
    sonido.play();
    sonido.volume = 0.30;
}
function sonidoclickder() {
    let sonido = new Audio('..//audio/clickder.mp3');
    sonido.play();
    sonido.volume = 0.30;
}

/*
Como posible ampliación de este buscaminas, me parecería interesante el hecho de que cuando ganes se guarde el tiempo del cronometro,
en un archivo y tu puedas acceder a el desde la página web para ver cuales son tus mejores partidas, en el modo de juego que sucedieron (difcil,normal o fácil),
etc.
*/