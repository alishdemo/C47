var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var ob1,ob2,ob3,ob4,ob5,ob6
var cloud;
var obstacle;

var score;
var ogroup;
var cgroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var go,restart;
var gameover,re;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png")
  Clouds=loadImage('cloud.png');

  groundImage = loadImage("ground2.png");
  ob1=loadImage("obstacle1.png") 
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  go=loadImage("gameOver.png")
  restart=loadImage("restart.png")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.debug=true;
  trex.setCollider("rectangle",0,0,40,40)
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   gameover=createSprite(300,100)
  gameover.addImage(go)
    re=createSprite(300,150)
     re.addImage(restart)
     re.scale=0.5
   gameover.visible=false;
   re.visible=false;



  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  ogroup= new Group();
  cgroup= new Group();
  

}

function draw() {
  //set background color
  background(180);
  
  console.log(trex.y)
  
  if(gamestate===PLAY)
  {
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
      ground.x = ground.width/2;
    }

  //Spawn Clouds
    spawnClouds()
    spawnObstacle()

  if(ogroup.isTouching(trex))
      gamestate=END
    }
  else if(gamestate===END)
  {
      ground.velocityX=0;
      trex.velocityX=0;
      trex.changeAnimation("collided", trex_collided);
      gameover.visible=true;
      re.visible=true;
      ogroup.setVelocityXEach(0);
      cgroup.setVelocityXEach(0);
      
      ogroup.setLifetimeEach(-1);
      cgroup.setLifetimeEach(-1);

  }
  
 

  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  drawSprites();
  text("Score" +"Alish",500,50)
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here
if(frameCount%60===0)
{
 cloud=createSprite(600,100,40,10)
 cloud.velocityX=-5;
 cloud.addImage(Clouds)
 cloud.y=Math.round(random(10,120))
 cloud.scale=0.5
 cloud.lifetime=120
 cloud.depth=trex.depth
 trex.depth=trex.depth+1
 cgroup.add(cloud)
}
}

function spawnObstacle()
{
  if(frameCount%80===0)
  {
    obstacle=createSprite(600,165,10,40)
    obstacle.velocityX=-4
    var r=Math.round(random(1,6));
    switch(r)
    {
      case 1: obstacle.addImage(ob1);
             break;
      case 2: obstacle.addImage(ob2);
            break;
      case 3: obstacle.addImage(ob3);
            break;
      case 4: obstacle.addImage(ob4);
           break;
      case 5: obstacle.addImage(ob5);
           break;
      case 6: obstacle.addImage(ob6);
           break;
      default:
          break;
    }
    obstacle.scale=0.5
    obstacle.lifetime=150
    obstacle.depth=trex.depth
    trex.depth=trex.depth+1
    ogroup.add(obstacle)

  }
}

