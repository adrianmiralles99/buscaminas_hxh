export default class clase_numeros {
    colocarNumeros(set_de_bombas, tablero, tamaño) {//le pasamos el array set de las bombas
        let trozos, x, y;
        for (let elemento of set_de_bombas) {//cogemos el set de bombas
            trozos = elemento.split("-");
            x = trozos[0];
            y = trozos[1];
            this.minasCerca(x, y, tablero, tamaño);//le pasamos la posicion de la bomba a "minasCerca"
        }
    }
    minasCerca(fila, columna, tablero, tamaño) {//segun la posicicion de la bomba colocará los números cercanos a este, que indican donde se encuentra
        let inifila = (fila - 1);
        let finfila = inifila + 2;
        let inicolumna = (columna - 1);
        let fincolumna = inicolumna + 2;
        while (inifila < (finfila + 1)) {
            while (inicolumna < (fincolumna + 1)) {
                if (inifila > -1 && inifila < tamaño && inicolumna > -1 && inicolumna < tamaño) {
                    if (tablero[inifila][inicolumna] != "O") {
                        if (tablero[inifila][inicolumna] == "v") {
                            tablero[inifila][inicolumna] = 1;
                        } else {
                            tablero[inifila][inicolumna]++;
                        }
                    }
                }
                inicolumna++;
            }
            inicolumna = (columna - 1);
            fincolumna = inicolumna + 2;
            inifila++;
        }
    }
}