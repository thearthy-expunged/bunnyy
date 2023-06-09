//namespacing
//criar uma variável de nome menor para referir a algo de nome maior
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint


//variaveis
var engine;
var world;
var solo, bola;
var parado;
var mexendo;
var b1;
var conexao;
var botaoImg, fundoImg, coelhoImg, corda, corda2, corda3;
var blink, sad, eat;
var coelho;
var somComer, somCorte, somFundo, somArLIXO;
var mutarImg, balaoImg,botaoImg2,botaoImg3;
var somtocano = false
function preload(){
    fundoImg = loadImage("planodefundo.png");
    frutaImg = loadImage("fruta.png");
    coelhoImg = loadImage("coelho.png");

    
    blink = loadAnimation("piscar1.png", "piscar2.png", "piscar3.png");
    sadi = loadAnimation("triste1.png","triste2.png","triste3.png");
    eat = loadAnimation("comer1.png","comer2.png","comer3.png","comer4.png","comer5.png")

    somFundo = loadSound("fundo.mp3")
    somArLIXO = loadSound("ar.mp3")
    somCorte = loadSound("corte.mp3")
    somComer = loadSound("comendo.mp3")
}

function setup() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if(isMobile){
    canW = displayWidth
    canH = displayHeight
    }else{
        canW = windowWidth
        canH = windowHeight
    }
    createCanvas(canW, canH);
    //cria o motor
    engine = Engine.create();
    world = engine.world;

    blink.looping = true;
    blink.frameDelay = 20;

    sadi.playing = true;
    sadi.looping = false;
    sadi.frameDelay = 20;

    eat.looping = false;
    eat.frameDelay = 20;


    //width
    //height
    var parado = {isStatic:true};
    //cria corpo retangular
    solo = Bodies.rectangle(width/2,height-10,width,20, parado);  
    //adiciona no mundo
    World.add(world, solo);

    //criar um objeto da classe Bola
    bola = new Bola(100);
    corda = new Corda({x:width/2,y:height/8},bola.body);
    corda2 = new Corda({x:width/8,y:height/2},bola.body)
    corda3 = new Corda({x:width/4,y:height/4},bola.body)
    //width    
    //height
    botaoImg = createImg("cortar.png");
    botaoImg.size(60,60);
    botaoImg.position(width/2-30,height/8-40);
    botaoImg.mouseClicked(cortar);
    
    botaoImg2 = createImg("cortar.png")
    botaoImg2.size(60,60)
    botaoImg2.position(width/8-30,height/2-40)
    botaoImg2.mouseClicked(cortar2)
    
    botaoImg3 = createImg("cortar.png")
    botaoImg3.size(60,60)
    botaoImg3.position(width/4-30,height/4-40)
    botaoImg3.mouseClicked(cortar3)
    
    mutarImg = createImg("mutar.png")
    mutarImg.size(99,99)
    mutarImg.position(width/8,width/8)
    mutarImg.mouseClicked(mutar)
   
    balaoImg = createImg("balão.png")  
    balaoImg.size(240,120)
    balaoImg.position(width/4,width/4)
    balaoImg.mouseClicked(balao)

coelho = createSprite(250,height-90);
   // coelho.addImage(coelhoImg);
    coelho.addAnimation("blinking", blink);
    coelho.addAnimation("eating", eat);
    coelho.addAnimation("sadi", sadi);
    coelho.scale = 0.2

    rectMode(CENTER);
    ellipseMode(RADIUS);
    imageMode(CENTER);


}



function draw() {
    if(!somFundo.isPlaying()&&somtocano==true){
    somFundo.setVolume(0.2)
    somFundo.play()
    }
    background("cyan");    
    image(fundoImg, width/2, height/2,width,height);
    //atualiza o motor
    Engine.update(engine);

    //pinta o solo
    fill("brown")
    //desenha o retângulo no corpo
    rect (solo.position.x, solo.position.y, width,20);
    //width
    //height
    drawSprites()

    corda.show();
    corda2.show()
    corda3.show()
    bola.show();
    if(detectarColisao(bola.body,coelho)){
        coelho.changeAnimation("eating")
        somComer.play()
    }
    if(bola.body!=null){
    var collided = Matter.SAT.collides(bola.body,solo)
    
    if(collided.collided){
    bola.E_R_A_S_E()
    coelho.changeAnimation("sadi")
}
    }
}

function cortar(){
    corda.cut();
    somCorte.play()
}
function cortar2(){
    corda2.cut()
    somCorte.play()
}
function cortar3(){
    corda3.cut()
    somCorte.play()
}



function detectarColisao(corpo, sprite){
    if(bola.body !== null){
        //calcula a distância e guarda o resultado
        var distancia = dist(corpo.position.x,corpo.position.y,sprite.position.x,sprite.position.y);
        if(distancia<=80){
            bola.E_R_A_S_E()
            return true;
        }else{
            return false;
        }
    }
    
}
function keyPressed(){
    if(keyCode == 32){
        location.reload()
    }
}
function mutar (){
    if(somtocano==true){
        somtocano = false
        somFundo.stop()
    
}else{
        somtocano = true
    }
    
}
function balao (){
somArLIXO.play()
Body.applyForce(bola.body,{x:0.1,y:0.1},{x:0.9,y:0.9})


}