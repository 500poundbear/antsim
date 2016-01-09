var canvas;
var ctx;

var rows = 200;
var cols = 200;

var ants = [];
var fabricAnts = [];
var fabricFood = [];
function redraw() {
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

function recalc() {
    for(var i = 0; i < ants.length; i++ ) {
        ants[i].decideMove();
    }
}

function refresh(x) {
    console.log(x); 
    recalc();
    redraw();
    if (x < 2000) {
        window.requestAnimationFrame(refresh);
    }
}
$(document).ready(function () {
    canvas = new fabric.Canvas('c');
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
            fill: 'black',
            left: mouseX - 3,
            top: mouseY - 3,
        }));
        canvas.add(fabricFood[fabricFood.length - 1]);
    });


    for(var i = 0; i < 9; i++) {
        ants.push(new Ant(spawnX, spawnY)); 
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
