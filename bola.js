class Bola{
    //definir os atributos do objeto
    constructor(x){
        this.body = Bodies.circle(x, 100, 30);
        World.add(world, this.body);
    }
    
    //show, aparecer, mostrar,exibir, desenhar, display
    E_R_A_S_E(){
        World.remove(world,this.body)
        this.body = null
    }
    show(){
        if(this.body !== null){
            //desenha bolinha na mesma posição que o corpo
            image(frutaImg, this.body.position.x, this.body.position.y,60,60)
        }
    }
}