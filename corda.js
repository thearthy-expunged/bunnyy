class Corda{
    constructor(pontoA, corpoB){
        this.sling = Constraint.create({
            pointA:pontoA, bodyB:corpoB, length:50, stiffness:0.001
        })
        this.pontoA = pontoA;
        World.add(world, this.sling);
    }
    show(){
        
        if(this.sling.bodyB != null && bola.body !== null){
            var pos = bola.body.position;
            //desenhar linha
            stroke("yellow")
            strokeWeight(5)
            line (this.pontoA.x,this.pontoA.y, pos.x, pos.y);
            
        }
    }
    cut(){
        this.sling.bodyB = null;
    }
}