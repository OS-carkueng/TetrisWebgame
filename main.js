const myGamepieceCords = [[5,0],[6,0],[5,1],[6,1]];
const RotationState0 = [[5,0],[6,0],[5,1],[6,1]];
const RotationState1 = []
const RotationState2 = []
const RotationState3 = []
const AllRotationStates = [RotationState0,RotationState1,RotationState2,RotationState3]
let distanceTravelledx = 0;
let distanceTravelledy = 0;
let collisonstate;
let isGameover = false;
let score;
document.body.style.zoom="80%"


var myGamePiece;
var replacementBlock;
let cooldown = 0;
let TetrisMusic = document.getElementById("TetrisMusic")
var blocks = [];
var grid = [];
let myGamePieceType;
let rotationState = 0;
let rotationCooldown;
let rotationStateSave

const matrix = [ [1,2],[3,4],[5,6] ];
function startGame() {
    for (let i = 0; i < 21; i++) {
        grid[i] = [];
        for (let j = 0; j < 10; j++) {
            grid[i][j] = 0;
        }
    }
    for (let i =0;i<10;i++){
        grid[20][i] = 1;
    }
    randomBlock()
    

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
       TetrisMusic.play();
       isGameover = false;
       score = 0;
        TetrisMusic.volume = 0.2;
        this.canvas.width = 100;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        this.interval = setInterval(blockFall, 200)
        this.interval = setInterval(inputLag, 300)
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//Blöcke macher
function component(width, height, color, x, y, type) {
    if (isGameover==false){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){
        if (type=="grey"){
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (type=="square"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    //I, rotation fertig
    if (type=="I"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        if (rotationState == 0 || rotationState == 2){
        ctx.fillRect(this.x, this.y, this.width, this.height);}
        if (rotationState == 1 || rotationState == 3){
        ctx.fillRect(this.x+20, this.y+10, this.height, this.width);}    
    }
    if (type=="L"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        if (rotationState==0){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x, this.y+20, 20, 10);}
        if (rotationState==1){
            ctx.fillRect(this.x-10, this.y, this.height, this.width);
            ctx.fillRect(this.x, this.y+10, -10, 10);}
        if (rotationState==2){
             ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x-10, this.y, 20, 10);}
        if (rotationState==3){
            ctx.fillRect(this.x-10, this.y, this.height, this.width);
            ctx.fillRect(this.x+20, this.y-10, -10, 10);}

    }
    if (type=="J"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        if (rotationState==0){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x, this.y+20, -10, 10);}
        if (rotationState==1){
            ctx.fillRect(this.x-20, this.y+10, this.height, this.width);
            ctx.fillRect(this.x-10, this.y, -10, 10);}
        if (rotationState==2){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x, this.y, 20, 10);}
        if (rotationState==3){
            ctx.fillRect(this.x-20, this.y+10, this.height, this.width);
            ctx.fillRect(this.x+10, this.y+20, -10, 10);}
        
    }
    if (type=="S"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;

        if (rotationState==0){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x+10, this.y-10, 20, 10);}
        if (rotationState==1){
            ctx.fillRect(this.x+20, this.y, this.height, this.width);
            ctx.fillRect(this.x+10, this.y-10, 10,20);}
        if (rotationState==2){
            ctx.fillRect(this.x, this.y+10, this.width, this.height);
            ctx.fillRect(this.x+10, this.y, 20, 10);}
        if (rotationState==3){
            ctx.fillRect(this.x+10, this.y, this.height, this.width);
            ctx.fillRect(this.x, this.y-10, 10,20);}
    }
    if (type=="Z"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;

        if (rotationState==0){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x-10, this.y-10, 20, 10);}
        if (rotationState==1){
            ctx.fillRect(this.x, this.y, this.height, this.width);
            ctx.fillRect(this.x+10, this.y-10, 10,20);}
        if (rotationState==2){
            ctx.fillRect(this.x, this.y+10, this.width, this.height);
            ctx.fillRect(this.x-10, this.y, 20, 10);}
        if (rotationState==3){
            ctx.fillRect(this.x, this.y, this.height, this.width);
            ctx.fillRect(this.x+10, this.y-10, 10,20);}
    }
    if (type=="T"){
        ctx = myGameArea.context;
        ctx.fillStyle = color;

        if (rotationState==0){
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x+10, this.y, 10, -10);}
        if (rotationState==1){
            ctx.fillRect(this.x+10, this.y, this.height, this.width);
            ctx.fillRect(this.x+30, this.y+10, -10, 10);}
        if (rotationState==2){
            ctx.fillRect(this.x, this.y+10, this.width, this.height);
            ctx.fillRect(this.x+10, this.y+30, 10, -10);}
        if (rotationState==3){
            ctx.fillRect(this.x+10, this.y, this.height, this.width);
            ctx.fillRect(this.x+10, this.y+10, -10, 10);}
    }
}

        this.newPos = function() {
            moveLeft()
            moveRight()

        }     
    }
}

function inputLag() {cooldown = 0;
    rotationCooldown = 0;
}


function updateGameArea() {
    if (isGameover==false) {

    if (myGameArea.key && myGameArea.key == 38&&rotationCooldown==0) {rotationCooldown=1
        rotateClockwise()
    }
    if (myGameArea.key && myGameArea.key == 40&&rotationCooldown==0) {rotationCooldown=1
        rotateCounterClockwise();   
    }
    myGameArea.clear();

    myGamePiece.update();

//gameoverlinie
ctx = myGameArea.context;  
ctx.beginPath();
ctx.moveTo(0, 10);
ctx.lineTo(200, 10);
ctx.stroke();


    for (let i = 0; i < blocks.length; i++) {
        blocks[i].update();
    }
    myGamePiece.newPos();    
    myGamePiece.update();
}
}
function blockFall() {
    if (canMove(myGamePiece.x,myGamePiece.y,myGamePiece.type)==true) {
        myGamePiece.y += 10;
myGamepieceCords[0][1] += 1
myGamepieceCords[1][1] += 1
myGamepieceCords[2][1] += 1
myGamepieceCords[3][1] += 1
distanceTravelledy += 1
    } 
    else {
//platzierter Block im Grid markieren
if (myGamePieceType=="square"||"L"){
grid[myGamepieceCords[0][1]][myGamepieceCords[0][0]] = 1;
grid[myGamepieceCords[1][1]][myGamepieceCords[1][0]] = 1;
grid[myGamepieceCords[2][1]][myGamepieceCords[2][0]] = 1;
grid[myGamepieceCords[3][1]][myGamepieceCords[3][0]] = 1;
}
       
     console.log(grid)
        
//Tetris?
        for (let i = 0; i < 20; i++) {
            if (grid[i][0]==1&&grid[i][1]==1&&grid[i][2]==1&&grid[i][3]==1&&grid[i][4]==1&&grid[i][5]==1&&grid[i][6]==1&&grid[i][7]==1&&grid[i][8]==1&&grid[i][9]==1) {
                for (let q=0; q < 10; q++){
                    grid[i][q] = 0
                }
                for (let j=i; j > 0; j = j-1){
                 //   console.log(j)
                    for (p=0; p < 10; p++){
                    if (grid[j][p] == 1) {
                        grid[j][p] = 0;
                        grid[j+1][p] = 1;
                   }}}
                 score += 100
                 console.log(score) 
                 updateScore()
            }
        }
//Gameover?
checkGameover()
//ersatzblöcke platzieren
        blocks.splice(0,blocks.length)
        for (let i=0; i < 20; i++) {
            for (j=0;j<10; j++) {
                let xNewBlock = j*10
                let yNewBlock = i*10
                if (grid[i][j]==1){
                    blocks.push(new component(10, 10, "grey", xNewBlock, yNewBlock,"grey"));  
                }
            }
           }
//"neuer" Block spawn
if (isGameover==false){
   myGamePiece.y = 50;
   myGamePiece.x = 50;
   distanceTravelledx = 0;
   distanceTravelledy = 0;
  randomBlock()
    }}}

function canMove(x,y,type) {
//square test
//console.log(myGamepieceCords)

if (grid[myGamepieceCords[0][1]+1][myGamepieceCords[0][0]] == 1 ||grid[myGamepieceCords[1][1]+1][myGamepieceCords[1][0]] == 1 ||grid[myGamepieceCords[2][1]+1][myGamepieceCords[2][0]] == 1 ||grid[myGamepieceCords[3][1]+1][myGamepieceCords[3][0]] == 1){
    return false;}
else {return true;}
}

function canMoveRight(x,y,Shape) {
if (grid[myGamepieceCords[0][1]][myGamepieceCords[0][0]+1] == 1 ||grid[myGamepieceCords[0][1]][myGamepieceCords[0][0]+1] === undefined ||grid[myGamepieceCords[1][1]][myGamepieceCords[1][0]+1] == 1 ||grid[myGamepieceCords[1][1]][myGamepieceCords[1][0]+1] === undefined ||grid[myGamepieceCords[2][1]][myGamepieceCords[2][0]+1] == 1 ||grid[myGamepieceCords[2][1]][myGamepieceCords[2][0]+1] === undefined ||grid[myGamepieceCords[3][1]][myGamepieceCords[3][0]+1] == 1||grid[myGamepieceCords[3][1]][myGamepieceCords[3][0]+1] === undefined){return false;}
else {return true;}}
function canMoveLeft(x,y,Shape) {
    if (grid[myGamepieceCords[0][1]][myGamepieceCords[0][0]-1] == 1 ||grid[myGamepieceCords[0][1]][myGamepieceCords[0][0]-1] === undefined ||grid[myGamepieceCords[1][1]][myGamepieceCords[1][0]-1] == 1 ||grid[myGamepieceCords[1][1]][myGamepieceCords[1][0]-1] === undefined ||grid[myGamepieceCords[2][1]][myGamepieceCords[2][0]-1] == 1 ||grid[myGamepieceCords[2][1]][myGamepieceCords[2][0]-1] === undefined ||grid[myGamepieceCords[3][1]][myGamepieceCords[3][0]-1] == 1||grid[myGamepieceCords[3][1]][myGamepieceCords[3][0]-1] === undefined){return false;}
else {return true;}
}


function randomBlock() {
 let randomNumber = Math.floor(Math.random() * 7);
    //square
    if (randomNumber==0){
        myGamePiece = new component(20, 20, "yellow", 50, 0,"square");
        myGamepieceCords[0] = [5,0]
        myGamepieceCords[1] = [6,0]
        myGamepieceCords[2] = [5,1]
        myGamepieceCords[3] = [6,1]
        myGamePieceType = "square";
        rotationState = 0;

        RotationState0[0] = [5,0]
        RotationState0[1] = [6,0]
        RotationState0[2] = [5,1]
        RotationState0[3] = [6,1]
        
        RotationState1[0] = [5,0]
        RotationState1[1] = [6,0]
        RotationState1[2] = [5,1]
        RotationState1[3] = [6,1]

        RotationState2[0] = [5,0]
        RotationState2[1] = [6,0]
        RotationState2[2] = [5,1]
        RotationState2[3] = [6,1]

        RotationState3[0] = [5,0]
        RotationState3[1] = [6,0]
        RotationState3[2] = [5,1]
        RotationState3[3] = [6,1]
    }

    //I
    if (randomNumber==1){
        myGamePiece = new component(40, 10, "cyan", 30, 0,"I");
        myGamepieceCords[0] = [3,0]
        myGamepieceCords[1] = [4,0]
        myGamepieceCords[2] = [5,0]
        myGamepieceCords[3] = [6,0]
        myGamePieceType = "I";

        RotationState0[0] = [3,0]
        RotationState0[1] = [4,0]
        RotationState0[2] = [5,0]
        RotationState0[3] = [6,0]

        RotationState1[0] = [5,1]
        RotationState1[1] = [5,2]
        RotationState1[2] = [5,3]
        RotationState1[3] = [5,4]

        RotationState2[0] = [3,0]
        RotationState2[1] = [4,0]
        RotationState2[2] = [5,0]
        RotationState2[3] = [6,0]

        RotationState3[0] = [5,1]
        RotationState3[1] = [5,2]
        RotationState3[2] = [5,3]
        RotationState3[3] = [5,4]
        rotationState = 0;

    }
    

    //J
    if (randomNumber==2){
        myGamePiece = new component(10, 30, "blue", 50, 0,"J");
        myGamepieceCords[0] = [5,0]
        myGamepieceCords[1] = [5,1]
        myGamepieceCords[2] = [5,2]
        myGamepieceCords[3] = [4,2]
        myGamePieceType = "J";

        RotationState0[0] = [5,0]
        RotationState0[1] = [5,1]
        RotationState0[2] = [5,2]
        RotationState0[3] = [4,2]

        RotationState1[0] = [3,1]
        RotationState1[1] = [4,1]
        RotationState1[2] = [5,1]
        RotationState1[3] = [3,0]

        RotationState2[0] = [5,0]
        RotationState2[1] = [5,1]
        RotationState2[2] = [5,2]
        RotationState2[3] = [6,0]

        RotationState3[0] = [3,1]
        RotationState3[1] = [4,1]
        RotationState3[2] = [5,1]
        RotationState3[3] = [5,2]
        rotationState = 0;
    }
   //T
    if (randomNumber==3){
        myGamePiece = new component(30, 10, "blue", 40, 0,"T");
        myGamepieceCords[0] = [4,1]
        myGamepieceCords[1] = [5,1]
        myGamepieceCords[2] = [6,1]
        myGamepieceCords[3] = [5,0]
        myGamePieceType = "T";

        RotationState0[0] = [4,1]
        RotationState0[1] = [5,1]
        RotationState0[2] = [6,1]
        RotationState0[3] = [5,0]

        RotationState1[0] = [5,0]
        RotationState1[1] = [5,1]
        RotationState1[2] = [5,2]
        RotationState1[3] = [6,1]
    
        RotationState2[0] = [4,1]
        RotationState2[1] = [5,1]
        RotationState2[2] = [6,1]
        RotationState2[3] = [5,2]

        RotationState3[0] = [5,0]
        RotationState3[1] = [5,1]
        RotationState3[2] = [5,2]
        RotationState3[3] = [4,1]
        rotationState = 0;
    }

        //L
        if (randomNumber==4){
            myGamePiece = new component(10, 30, "orange", 50, 0,"L");
            myGamepieceCords[0] = [5,0]
            myGamepieceCords[1] = [5,1]
            myGamepieceCords[2] = [5,2]
            myGamepieceCords[3] = [6,2]
            myGamePieceType = "L";
    
            RotationState0[0] = [5,0]
            RotationState0[1] = [5,1]
            RotationState0[2] = [5,2]
            RotationState0[3] = [6,2]

            RotationState1[0] = [4,1]
            RotationState1[1] = [5,1]
            RotationState1[2] = [6,1]
            RotationState1[3] = [4,2]
    
            RotationState2[0] = [5,0]
            RotationState2[1] = [5,1]
            RotationState2[2] = [5,2]
            RotationState2[3] = [4,0]

            RotationState3[0] = [4,1]
            RotationState3[1] = [5,1]
            RotationState3[2] = [6,1]
            RotationState3[3] = [6,0]
            rotationState = 0;
        }

    //S
    if (randomNumber==5){
        myGamePiece = new component(20, 10, "green", 40, 0,"S");
        myGamepieceCords[0] = [4,1]
        myGamepieceCords[1] = [5,1]
        myGamepieceCords[2] = [5,0]
        myGamepieceCords[3] = [6,0]
        myGamePieceType = "S";

        RotationState0[0] = [4,1]
        RotationState0[1] = [5,1]
        RotationState0[2] = [5,0]
        RotationState0[3] = [6,0]

        RotationState1[0] = [5,0]
        RotationState1[1] = [5,1]
        RotationState1[2] = [6,2]
        RotationState1[3] = [6,1]
    
        RotationState2[0] = [4,2]
        RotationState2[1] = [5,1]
        RotationState2[2] = [6,1]
        RotationState2[3] = [5,2]

        RotationState3[0] = [4,0]
        RotationState3[1] = [4,1]
        RotationState3[2] = [5,2]
        RotationState3[3] = [5,1]
        rotationState = 0;
    }

    //Z
    if (randomNumber==6){
        myGamePiece = new component(20, 10, "red", 50, 0,"Z");
        myGamepieceCords[0] = [4,0]
        myGamepieceCords[1] = [5,0]
        myGamepieceCords[2] = [5,1]
        myGamepieceCords[3] = [6,1]
        rotationState = 0;
        myGamePieceType = "Z";

        RotationState0[0] = [4,0]
        RotationState0[1] = [5,0]
        RotationState0[2] = [5,1]
        RotationState0[3] = [6,1]

        RotationState1[0] = [6,0]
        RotationState1[1] = [6,1]
        RotationState1[2] = [5,2]
        RotationState1[3] = [5,1]
    
        RotationState2[0] = [4,1]
        RotationState2[1] = [5,2]
        RotationState2[2] = [6,2]
        RotationState2[3] = [5,1]

        RotationState3[0] = [6,0]
        RotationState3[1] = [6,1]
        RotationState3[2] = [5,2]
        RotationState3[3] = [5,1]
    }
}

function rotateClockwise(){
    collisonstate = 0;
    rotationStateSave = rotationState;
    if (rotationState == 3) {
        rotationState =0;
    }
    else{rotationState += 1;}
    checkRotationCollision()

    if (collisonstate==0) {
        //  console.log("clear")
          for (let i=0;i<4;i++) {
          myGamepieceCords[i][1] = AllRotationStates[rotationState][i][1] + distanceTravelledy
          myGamepieceCords[i][0] = AllRotationStates[rotationState][i][0] + distanceTravelledx
      
          }}
    else {
        rotationState = rotationStateSave;
    }
}

function rotateCounterClockwise(){
    collisonstate = 0;
    rotationStateSave = rotationState;

    if (rotationState==0){
        rotationState = 3;
    }
    else {rotationState += -1}
    checkRotationCollision()

    if (collisonstate==0) {
        //  console.log("clear")
          for (let i=0;i<4;i++) {
          myGamepieceCords[i][1] = AllRotationStates[rotationState][i][1] + distanceTravelledy
          myGamepieceCords[i][0] = AllRotationStates[rotationState][i][0] + distanceTravelledx
      
          }}
    else {
        rotationState = rotationStateSave;
    }
}

    function checkRotationCollision() {
      console.log(rotationState)
        //console.log(AllRotationStates[rotationState])
            for (let i=0;i<4;i++) {
                if (grid[AllRotationStates[rotationState][i][1]+distanceTravelledy][AllRotationStates[rotationState][i][0]+distanceTravelledx]==1 || grid[AllRotationStates[rotationState][i][1]+distanceTravelledy][AllRotationStates[rotationState][i][0]+distanceTravelledx]=== undefined){  
            collisonstate = 1;
            return true;
            }}
    }

function checkGameover() {
    for (let q=0; q < 10; q++){
   if(  grid[0][q] == 1) {
    Gameover()
   }}
}
function Gameover() {
    console.log("Gameover")
    isGameover = true;
    ctx = myGameArea.context;  
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Gameover",5,40);
}

function updateScore() {
   let htmlScore = document.getElementById("Score")
   console.log(htmlScore)
   htmlScore.innerHTML = "Your Score: " + score;
}

function moveLeft() {
    if (myGameArea.key && myGameArea.key == 37 && cooldown == 0 && canMoveLeft(myGamePiece.x,myGamePiece.y,)==true) 
        {myGamePiece.x += -10, cooldown = 1,
        myGamepieceCords[0][0] += -1,
        myGamepieceCords[1][0] += -1,
        myGamepieceCords[2][0] += -1,
        myGamepieceCords[3][0] += -1;
    distanceTravelledx += -1}
}

function moveRight() {
    if (myGameArea.key && myGameArea.key == 39  && cooldown == 0 && canMoveRight(myGamePiece.x,myGamePiece.y,)==true) 
        {myGamePiece.x += 10, cooldown = 1
        myGamepieceCords[0][0] += 1,
        myGamepieceCords[1][0] += 1,
        myGamepieceCords[2][0] += 1,
        myGamepieceCords[3][0] += 1;
        distanceTravelledx += 1}
}

function moveRightButton() {
    if (cooldown == 0 && canMoveRight(myGamePiece.x,myGamePiece.y,)==true) 
        {myGamePiece.x += 10, cooldown = 1
        myGamepieceCords[0][0] += 1,
        myGamepieceCords[1][0] += 1,
        myGamepieceCords[2][0] += 1,
        myGamepieceCords[3][0] += 1;
        distanceTravelledx += 1}
}

function moveLeftButton() {
    if (cooldown == 0 && canMoveLeft(myGamePiece.x,myGamePiece.y,)==true) 
        {myGamePiece.x += -10, cooldown = 1,
        myGamepieceCords[0][0] += -1,
        myGamepieceCords[1][0] += -1,
        myGamepieceCords[2][0] += -1,
        myGamepieceCords[3][0] += -1;
    distanceTravelledx += -1}
}

//-Highscore
//start/restart button
//-insta drop
//-ui cleanup
//-save button
//-preview
//-