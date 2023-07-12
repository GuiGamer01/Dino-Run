
var trex, trex_running;

var die, checkpoint, jump;

var trexPerdeu;

var Piso;

var ImagemDoPiso;

var Pontos = 0;

var ImagemDaNuvem;

var play = 1;

var end = 0;

var estadoDoJogo = play

var GameOverIMG, RestartIMG;

function Resetar() {
  estadoDoJogo = play
  GameOver.visible = false;
  Restart.visible = false;
  ObstaculosGP.destroyEach();
  NuvensGP.destroyEach();
  Pontos = 0

  Trex.changeAnimation("running", trex_running)




}
function SpawnarNuvens() {
  if (frameCount % 60 === 0) {
    Nuvem = createSprite(width + 20, height/2, 40, 10);
    Nuvem.addImage(ImagemDaNuvem);
    Nuvem.y = Math.round(random(10, 70));
    Nuvem.velocityX = -3;
    Nuvem.depth = Trex.depth;
    Trex.depth = Trex.depth + 1;
    NuvensGP.add(Nuvem)
    Nuvem.lifetime = 475;

  }

}
function SpawnarObstaculo() {
  if (frameCount % 80 === 0) {
    Obstaculo = createSprite(width, height - 85, 20, 30);
    Obstaculo.velocityX = -(3 + Pontos / 300);
    rand = Math.round(random(1, 6));

    switch (rand) {
      case 1: Obstaculo.addImage(Obstaculo1);
        break;
      case 2: Obstaculo.addImage(Obstaculo2);
        break;
      case 3: Obstaculo.addImage(Obstaculo3);
        break;
      case 4: Obstaculo.addImage(Obstaculo4);
        break;
      case 5: Obstaculo.addImage(Obstaculo5);
        break;
      case 6: Obstaculo.addImage(Obstaculo6);
        break;
      default: break;
    }
    Obstaculo.scale = 0.4;

    ObstaculosGP.add(Obstaculo)
    Obstaculo.lifetime = 450;
  }



}
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ImagemDoPiso = loadImage("ground2.png");
  ImagemDaNuvem = loadImage("cloud.png");
  Obstaculo1 = loadImage("obstacle1.png");
  Obstaculo2 = loadImage("obstacle2.png");
  Obstaculo3 = loadImage("obstacle3.png");
  Obstaculo4 = loadImage("obstacle4.png");
  Obstaculo5 = loadImage("obstacle5.png");
  Obstaculo6 = loadImage("obstacle6.png");
  GameOverIMG = loadImage("gameOver.png");
  RestartIMG = loadImage("restart.png");
  trexPerdeu = loadImage("trex_collided.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkpoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Trex = createSprite(50, height - 70, 20, 50);
  Trex.addAnimation("running", trex_running);
  Trex.scale = 0.5;
  Trex.addAnimation("collided", trexPerdeu);
  Piso = createSprite(width / 2, height - 70, width, 2);
  Piso.addImage("Piso", ImagemDoPiso);
  PisoInvisivel = createSprite(width / 2, height - 10, width, 125);
  PisoInvisivel.visible = false;
  GameOver = createSprite(width / 2, height / 2 - 50);
  GameOver.addImage(GameOverIMG);
  GameOver.scale = 0.5;
  GameOver.visible = false
  Restart = createSprite(width / 2, height / 2);
  Restart.addImage(RestartIMG);
  Restart.scale = 0.5;
  Restart.visible = false
  ObstaculosGP = new Group();
  NuvensGP = new Group();

  Trex.setCollider("circle", 0, 0, 40);
  Trex.debug = false;


}

function draw() {
  background("White");
  text("Pontos:" + Pontos, 500, 50);
  if (estadoDoJogo === play) {
    Piso.velocityX = -(4 + 3 * Pontos / 250);
    Pontos = Pontos + Math.round(getFrameRate() / 60);
    if (Pontos > 0 && Pontos % 500 === 0) {
      checkpoint.play();
    }
    if (Piso.x < 0) {

      Piso.x = Piso.width / 2;


    }

    if (touches.length > 0 || keyDown("Space") && Trex.y >= height - 120) {
      Trex.velocityY = -10;
      jump.play();
      touches = []

    }
    Trex.velocityY = Trex.velocityY + 0.5;
    Trex.collide(PisoInvisivel);
    SpawnarObstaculo();
    SpawnarNuvens();

    if (ObstaculosGP.isTouching(Trex)) {
      estadoDoJogo = end;
      die.play();
    }

  } else {
    Piso.velocityX = 0;
    NuvensGP.setVelocityXEach(0);
    ObstaculosGP.setVelocityXEach(0);
    Trex.velocityY = 0;
    GameOver.visible = true;
    Restart.visible = true;
    Trex.changeAnimation("collided", trexPerdeu);
    ObstaculosGP.setLifetimeEach(-1);
    NuvensGP.setLifetimeEach(-1);
  }
  if (touches.length > 0 || mousePressedOver(Restart)) {
    Resetar();
    touches = [];
  }



  drawSprites();


}
//  % = Resto da divisão;
//  / = Divisão Normal; 
//   = = Atribuir;
//  == = Compara valor;
// === = Compara valor e tipo;