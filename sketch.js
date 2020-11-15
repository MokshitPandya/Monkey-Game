
var gameState = "start";
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survival_time;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(100,360,60,80);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  //monkey.debug = true;
  
  ground = createSprite(400,411,800,15);
  ground.velocityX = -4.5;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survival_time = 0;
}


function draw() {
  background("lightblue");
  
  textSize(20); 
  stroke("black");
  fill("black");
  text("Score: " + score,400,50);
  
  textSize(20);
  stroke("black");
  fill("black");
  survival_time = Math.round(frameCount/frameRate());
  text("Survival Time: " + survival_time,30,50);
  
  if(gameState === "start"){
 
   if(ground.x > 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 120){
    monkey.velocityY = -7.5;
 }
 
 monkey.velocityY = monkey.velocityY  + 0.7;
  
 monkey.collide(ground);
  
  food();
  obstacles();
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score + 1;
    }
    
    if(obstacleGroup.isTouching(monkey)){
     gameState = "end"
    }
   
  }
  
  if(gameState === "end"){
    
    textSize(30);
    stroke("red");
    fill("red");
    text("Game Over!",170,200);
    
   survival_time = Math.round(frameCount/frameRate(0));
    
   monkey.velocityY = 0;
    
    ground.velocityX = 0;
    
   //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
  }
    
  

  
drawSprites();
}

function food(){
  if(frameCount%80 === 0){
    banana = createSprite(400,150);
    banana.addImage(bananaImage);
    banana.scale = 0.1125;
    banana.velocityX = -6;
    
    //assign lifetime to the variable
    banana.lifetime = 85;
    
    //giving random y positions to the banana
    banana.y = Math.round(random(120,250)); 
    
    //adding banana to the foodGroup
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(450,365,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    
    obstacle.depth = monkey.depth;
    obstacle.depth = monkey.depth - 1;
    
  obstacle.velocityX = -6;
  
  //assign lifetime to the variable
    obstacle.lifetime = 95;
    
   
    obstacle.setCollider("circle",0,0,100);
    obstacle.debug = false;
  
    obstacleGroup.add(obstacle)
  }
}








