var MENU = 0;
var PLAY = 1;
var END = 2;
var gameState = MENU;

var path1, path2, pathImg;
var grassR, grassL, grassImg;
var fence1R, fence2R, fence3R, fence4R, fence5R, fence6R, fence7R, fence8R, fence9R, fence10R, fence1L, fence2L, fence3L, fence4L, fence5L, fence6L, fence7L, fence8L, fence9L, fence10L, fenceImg;

var bullet, bulletImg, bulletG;
var greg, gregAnim, gregImg;

var zombie1, zombie2, zombie1Anim;
var zombie1G, zombie2G;

var topEdge, bottomEdge;

var dyingZombie1, dyingZombie2;

var distance = 0;
var bestDistance = 0;
var zombieKills = 0;
var bestZombieKills = 0;

function preload(){

    gregAnim = loadAnimation("greg1-1.png","greg1-2.png","greg1-3.png");
    gregImg = loadImage("greg1-1.png");

    zombie1Anim = loadAnimation("zombie1-1.png","zombie1-2.png","zombie1-3.png");
    zombie2Anim = loadAnimation("zombie2-1.png","zombie2-2.png","zombie2-3.png");

    pathImg = loadImage("path.png");

    bulletImg = loadImage("bullet.png");
    gunshot = loadSound("gunshot.mp3");

    grassImg = loadImage("grass.png");

    fenceImg = loadImage("fence.png");

    dyingZombie1 = loadSound("dyingzombie1.mp3");
    dyingZombie2 = loadSound("dyingzombie2.mp3");

}

function setup(){

    createCanvas(400,400)

    //Paths

    path1 = createSprite(200,200);
    path1.addImage(pathImg);

    path2 = createSprite(200, 800);
    path2.addImage(pathImg);

    //Grasses

    grassR = createSprite(360,200);
    grassR.addImage(grassImg)

    grassL = createSprite(40,200);
    grassL.addImage(grassImg)

    //Fences

    fence1R = createSprite(335,390);
    fence1R.addImage("fence", fenceImg);
    fence2R = createSprite(384,390);
    fence2R.addImage("fence", fenceImg);
    fence3R = createSprite(335,290);
    fence3R.addImage("fence", fenceImg);
    fence4R = createSprite(384,290);
    fence4R.addImage("fence", fenceImg);
    fence5R = createSprite(335,190);
    fence5R.addImage("fence", fenceImg);
    fence6R = createSprite(384,190);
    fence6R.addImage("fence", fenceImg);
    fence7R = createSprite(335,90);
    fence7R.addImage("fence", fenceImg);
    fence8R = createSprite(384,90);
    fence8R.addImage("fence", fenceImg);
    fence9R = createSprite(335,-10);
    fence9R.addImage("fence", fenceImg);
    fence10R = createSprite(384,-10);
    fence10R.addImage("fence", fenceImg);

    fence1L = createSprite(17,390);
    fence1L.addImage("fence", fenceImg);
    fence2L = createSprite(66,390);
    fence2L.addImage("fence", fenceImg);
    fence3L = createSprite(17,290);
    fence3L.addImage("fence", fenceImg);
    fence4L = createSprite(66,290);
    fence4L.addImage("fence", fenceImg);
    fence5L = createSprite(17,190);
    fence5L.addImage("fence", fenceImg);
    fence6L = createSprite(66,190);
    fence6L.addImage("fence", fenceImg);
    fence7L = createSprite(17,90);
    fence7L.addImage("fence", fenceImg);
    fence8L = createSprite(66,90);
    fence8L.addImage("fence", fenceImg);
    fence9L = createSprite(17,-10);
    fence9L.addImage("fence", fenceImg);
    fence10L = createSprite(66,-10);
    fence10L.addImage("fence", fenceImg);

    //Greg

    greg = createSprite(200,350);
    greg.addAnimation("gregAnim", gregAnim);

    //Edges

    topEdge = createSprite(200,-1,400,1)
    bottomEdge = createSprite(200,400,400,1)

    //Group

    bulletG = new Group();
    zombie1G = new Group();
    zombie2G = new Group();

}

function draw(){

// -------------------- MENU --------------------

if(gameState == MENU){

    greg.visible = true;

    path1.velocityY = 0;
    path2.velocityY = 0;


    greg.addImage("greg", gregImg);

    if(keyWentDown("enter")){
        gameState = PLAY;
    }

}

// -------------------- END --------------------

    if(gameState == END){

        greg.collide(topEdge);

        path1.velocityY = 0;
        path2.velocityY = 0;
    
        fence1R.velocityY = 0;
        fence2R.velocityY = 0;
        fence3R.velocityY = 0;
        fence4R.velocityY = 0;
        fence5R.velocityY = 0;
        fence6R.velocityY = 0;
        fence7R.velocityY = 0;
        fence8R.velocityY = 0;
        fence9R.velocityY = 0;
        fence10R.velocityY = 0;
    
        fence1L.velocityY = 0;
        fence2L.velocityY = 0;
        fence3L.velocityY = 0;
        fence4L.velocityY = 0;
        fence5L.velocityY = 0;
        fence6L.velocityY = 0;
        fence7L.velocityY = 0;
        fence8L.velocityY = 0;
        fence9L.velocityY = 0;
        fence10L.velocityY = 0;

        zombie1G.destroyEach();
        zombie2G.destroyEach();

        if(keyDown("r")){

            gameState = MENU;

            greg.x = 200;
            greg.y = 350;

            distance = 0;
            zombieKills = 0;
        }

    }

    if(gameState == PLAY){
    
        background("0")

        greg.visible = true;
    
        if(World.frameCount % 100 == 0){
    
            zombie1 = createSprite(Math.round(random(100,300)),-50)
            zombie1.addAnimation("zombie", zombie1Anim);
    
            zombie1.velocityY = +4;
    
            zombie1G.add(zombie1);
    
        }
    
        if(zombie1G.isTouching(bulletG)){
            dyingZombie1.play();
            zombieKills = zombieKills+1
            zombie1G.destroyEach();
    }

    if(World.frameCount % 120 == 0){
    
        zombie2 = createSprite(Math.round(random(100,300)),-50)
        zombie2.addAnimation("zombie", zombie2Anim);

        zombie2.velocityY = +5;

        zombie2G.add(zombie2);

    }

    if(zombie2G.isTouching(bulletG)){
        dyingZombie2.play();
        zombieKills = zombieKills+1
        zombie2G.destroyEach();
}

   if(World.frameCount % 10 == 0){
    
    distance = distance+1;

}

        path1.velocityY = +4;
        path2.velocityY = +4;
    
        fence1R.velocityY = +4;
        fence2R.velocityY = +4;
        fence3R.velocityY = +4;
        fence4R.velocityY = +4;
        fence5R.velocityY = +4;
        fence6R.velocityY = +4;
        fence7R.velocityY = +4;
        fence8R.velocityY = +4;
        fence9R.velocityY = +4;
        fence10R.velocityY = +4;
    
        fence1L.velocityY = +4;
        fence2L.velocityY = +4;
        fence3L.velocityY = +4;
        fence4L.velocityY = +4;
        fence5L.velocityY = +4;
        fence6L.velocityY = +4;
        fence7L.velocityY = +4;
        fence8L.velocityY = +4;
        fence9L.velocityY = +4;
        fence10L.velocityY = +4;
    
        if(path1.y > 400){
            path1.y = 0;
        }
        if(path2.y > 400){
            path2.y = 0;
        }

        if(fence3R.y > 400){
            fence3R.y = -10;
        }
        if(fence4R.y > 400){
            fence4R.y = -10;
        }
        if(fence5R.y > 400){
            fence5R.y = -10;
        }
        if(fence6R.y > 400){
            fence6R.y = -10;
        }
        if(fence7R.y > 400){
            fence7R.y = -10;
        }
        if(fence8R.y > 400){
            fence8R.y = -10;
        }
        if(fence9R.y > 400){
            fence9R.y = -10;
        }
        if(fence10R.y > 400){
            fence10R.y = -10;
        }
    
        if(fence3L.y > 400){
            fence3L.y = -10;
        }
        if(fence4L.y > 400){
            fence4L.y = -10;
        }
        if(fence5L.y > 400){
            fence5L.y = -10;
        }
        if(fence6L.y > 400){
            fence6L.y = -10;
        }
        if(fence7L.y > 400){
            fence7L.y = -10;
        }
        if(fence8L.y > 400){
            fence8L.y = -10;
        }
        if(fence9L.y > 400){
            fence9L.y = -10;
        }
        if(fence10L.y > 400){
            fence10L.y = -10;
        }

        if(keyDown("w")){
            greg.y = greg.y-4;
        }
        if(keyDown("a")){
            greg.x = greg.x-4;
        }
        if(keyDown("s")){
            greg.y = greg.y+4;
        }
        if(keyDown("d")){
            greg.x = greg.x+4;
        }
    
        if(keyWentDown("space")){
            
            bullet = createSprite(greg.x+7,greg.y-13);
            bullet.addImage(bulletImg);
            bullet.scale = 0.3;
            bullet.velocityY = -10;

            gunshot.play();

            bulletG.add(bullet);

        }
    
        greg.collide(grassR) || greg.collide(grassL);
        greg.collide(topEdge) || greg.collide(bottomEdge);
    
        if(greg.isTouching(zombie1G)){
            greg.visible = false;
            gameState = END;
         }

         if(greg.isTouching(zombie2G)){
            gameState = END;
         }
    
    }

  drawSprites();

  if(gameState == MENU){

  textSize(15)
  fill("#0CFF00");
  text("Aperte ENTER para iniciar", 120, 90);

  textSize(12)
  fill("white");
  text("Controles:", 90, 300)

  textSize(12)
  fill("blue");
  text("W - Frente\nA - Esquerda\nS - Costas\nD - Direita", 90, 315)

  textSize(12)
  fill("red");
  text("NÃO TOQUE NOS ZUMBIS E MATE-OS!", 90, 285)

  textSize(12)
  fill("red")
  text("SPACE - Atirar", 90, 375)

  }

  if(gameState == PLAY){

    fill("#0013FF")
    stroke("#0013FF")
    text("Distância: " + distance, 5, 80);

    fill("yellow")
    stroke("yellow")
    text("Melhor: " + bestDistance, 5, 30);

    fill("#0013FF")
    stroke("#0013FF")
    text("Mortes: " + zombieKills, 315, 80);

    fill("yellow")
    stroke("yellow")
    text("Melhor: " + bestZombieKills, 315, 30);

  }

  if(gameState == END){

    if(distance > bestDistance){
        bestDistance = distance;
    } else {
        bestDistance = bestDistance;
    }

    if(zombieKills > bestZombieKills){
        bestZombieKills = zombieKills;
    } else {
        bestZombieKills = bestZombieKills;
    }

    fill("red");
    stroke("red");
    textSize(20);
    text("GAME OVER", 140, 180)

    fill("#0CFF00");
    stroke("#0CFF00");
    textSize(12);
    text("Aperte R para reiniciar", 140, 195)

    textSize(12);
    fill("#0013FF");
    stroke("#0013FF");
    text("Distância: " + distance, 5, 80);

    textSize(12);
    fill("yellow");
    stroke("yellow");
    text("Melhor: " + bestDistance, 5, 30);

    fill("#0013FF")
    stroke("#0013FF")
    text("Mortes: " + zombieKills, 315, 80);

    fill("yellow")
    stroke("yellow")
    text("Melhor: " + bestZombieKills, 315, 30);


  }
    
}