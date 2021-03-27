var pet,petIMG;
var database;
var position;
function preload(){
  //Load images here
  petIMG=loadImage("images/dogImg1.png");
}
function setup(){
    database = firebase.database();
    
    createCanvas(500,500);

    pet = createSprite(250,250,10,10);
    pet.addImage(petIMG)
    pet.scale=0.1

    var petPosition = database.ref('pet/position');
    petPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
    
}

function writePosition(x,y){
    database.ref('pet/position').set({
        'x': position.x+ x,
        'y': position.y+ y
    });
}

function readPosition(data){
    position = data.val();

    pet.x = position.x;
    pet.y = position.y;
}

function showError(){
    console.log("Error in writing to the database");
}