var canvas;
var ctx;

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

function reCalcAnts() {
    for(var i = 0; i < ants.length; i++ ) {
        ants[i].decideMove();
    }
}
function addPheromones() {
    
}

function setUpPheromones() {
    var width = 300 / cols;
    var height = 300 / rows;
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
            console.log(i+" "+j);
            canvas.add(fabricPheromones[i][j]);
        }
    }
    canvas.renderAll();
}
function refresh(x) {
    console.log(x); 
    reCalcAnts();
    addPheromones();
    reDraw();
    if (x < 20000) {
        window.requestAnimationFrame(refresh);
    }
}
$(document).ready(function () {
    canvas = new fabric.Canvas('c');
    
    canvas.setHeight(300);
    canvas.setWidth(300);

    ctx = canvas.getContext('2d');
    ctx.fillStyle="pink";
    ctx.fillRect(100, 100, 20, 20);

    var spawnX = 100;
    var spawnY = 100;    

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

    for(var i = 0; i < 9; i++) {
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
