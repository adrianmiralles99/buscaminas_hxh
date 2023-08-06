export default class clase_cronometro {

    seg = 0;
    divcronometro = document.getElementById("cronometro");
    spansegundos = document.getElementById("segundos");
    tiempo;
    killua(){
        this.divcronometro.style.backgroundColor="#0D6EFD";
    }
    gon(){
        this.divcronometro.style.backgroundColor="#1A744C";
    }
    cronometrar() {
        this.tiempo = setInterval(() => {
            this.escribir();
            console.log(this.seg);
        },1000);
    }
    escribir(){//para escribir el tiempo por pantalla
        this.seg++;
        this.spansegundos.innerHTML = "<span>"+this.seg +"'s</span>";
        if(this.seg == 999){//ponemos que pare cuando llegue a 999
            this.parar();
        }
    }
    parar(){
        clearInterval(this.tiempo);
    }
    reiniciar(){//reiniciamos a cero
        clearInterval(this.tiempo);
        this.seg = 0;
        this.spansegundos.innerHTML = "<span>"+this.seg +"'s</span>";
    }
}
