var canvas;
var ctx;
var canvasHeight = 300;
var canvasWidth = 300;

var spawnX = 100;
var spawnY = 100;    

var rows = 20;
var cols = 20;

var ants = [];
var fabricAnts = [];
var fabricFood = [];
var fabricPheromones = [];
var pathPoints = [];

function reDraw() {
    //If position change, redraw

    for(var i = 0; i < fabricAnts.length; i++ ){
        var pos = ants[i].getPos();
        fabricAnts[i].set({
            top: pos[1], 
            left: pos[0],
        });
        fabricAnts[i].setCoords(); 
    }     
    canvas.renderAll();
}
function reDrawPheromones() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var pheromonelevel = fabricPheromones[i][j].theval;
            var blueness = (256 - Math.floor(pheromonelevel % 256)).toString(16);
            fabricPheromones[i][j].set("fill","#EEEE" + blueness);
        }
    }
    canvas.renderAll();
}
function reCalcAnts() {
    for(var i = 0; i < ants.length; i++ ) {
        ants[i].decideMove(fabricFood);
    }
}
function addPheromones() {
    for(var i = 0; i < fabricAnts.length; i++ ){
        var pos = ants[i].getPos();
        
        if (pos[0] >= 0 && pos[0] <= canvasWidth &&
            pos[1] >= 0 && pos[1] <= canvasHeight) {

            var width = canvasWidth / cols;
            var height = canvasHeight / rows;
            
            var gRow = Math.floor(pos[1]/height);
            var gCol = Math.floor(pos[0]/width);
            
            fabricPheromones[gRow][gCol].theval += 0.3; 
        } 
    }    
}

function setUpPheromones() {
    var width = canvasWidth / cols;
    var height = canvasHeight / rows;
    for (var i = 0; i < rows; i++) {
        fabricPheromones[i] = new Array();
        for (var j = 0; j < cols; j++) {
            fabricPheromones[i].push(new fabric.Rect({
                fill: "#7EC0EE",
                width: width,
                height: height,
                top: Math.floor(i*height),
                left: Math.floor(j*width),
                selectable:false
            }));
            fabricPheromones[i][j].theval = 0;
            canvas.add(fabricPheromones[i][j]);
        }
    }
    canvas.renderAll();
}
function refresh(x) {
    //console.log(x); 
    reCalcAnts();
    addPheromones();
    reDraw();
    reDrawPheromones();
    if (x < 20000) {
        window.requestAnimationFrame(refresh);
    }
}
$(document).ready(function () {
    canvas = new fabric.Canvas('c');
    
    canvas.setHeight(canvasHeight);
    canvas.setWidth(canvasWidth);

    ctx = canvas.getContext('2d');
    ctx.fillStyle="pink";
    ctx.fillRect(100, 100, 20, 20);


    canvas.on('mouse:down', function(e) {
        var mouse = e.e;
        var mouseX = mouse.clientX;
        var mouseY = mouse.clientY;    
         
        fabricFood.push(new fabric.Circle({
            radius: 3,
            originX: 'center',
            originY: 'center',
            fill: 'black',
            left: mouseX - 3,
            top: mouseY - 3,
        }));
        canvas.add(fabricFood[fabricFood.length - 1]);
    });
    
    setUpPheromones(); 

    for(var i = 0; i < 5; i++) {
        ants.push(new Ant(spawnX, spawnY, 2)); 
        fabricAnts.push(new fabric.Circle({
            radius: 2,
            fill: 'maroon',
            left: spawnX + Math.random() * 100,
            top: spawnY,
        }));
        canvas.add(fabricAnts[i]);
    }
    window.requestAnimationFrame(refresh);
});
