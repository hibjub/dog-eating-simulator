var dog,dogImg,dogImg2,foodS,foodStock,database;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,300,25,25);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }
  
  drawSprites();

  fill("white");
  stroke("black");
  textSize(20);
  text("Press Up Arrow to Feed the Dog",100,450);

  fill("white");
  stroke("black");
  textSize(20);
  text("Food Remaining: " + foodS ,140,175);

}


function readStock(data) {
  foodS = data.val();
}


function writeStock(x) {
  if(x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({Food:x})
}



