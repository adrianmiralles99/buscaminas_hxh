export default class clase_bombas {
    bombas = new Set();
    nbombas = 10;

    getNumBombas = () => this.nbombas;
    getBombas = () => this.bombas;

    //cuando se cambia la modalidad de juego se cambia el numero de bombas
    setnumBombas(nbombas) {
        this.nbombas = nbombas;
    }
    crearBombas(tamaño) {

        let veces = 1;
        while (veces <= this.nbombas) {
            let i = Math.floor(Math.random() * ((tamaño) - 0) + 0);
            let j = Math.floor(Math.random() * ((tamaño) - 0) + 0);
            let posaleatoria = i + "-" + j;
            if (!this.bombas.has(posaleatoria)) {//comprobamos si la posición de la bomba se encuentra ya en el array.
                this.bombas.add(posaleatoria);
                veces++;
            }

        }
    }

    //colocamos las bombas en la matriz
    colocarBombas(tablero) {
        let trozos; let i, j;
        this.bombas.forEach((elemento) => {
            trozos = elemento.split("-");
            i = trozos[0];
            j = trozos[1];
            tablero[i][j] = "O";

        })
    }
    eliminarBombas() {
        this.bombas.clear();

    }
    recorrerarrayBombas() {
        for (let elemento of this.bombas) {
            console.log(elemento);
        }
    }

}