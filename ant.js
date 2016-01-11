function Ant (x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.maxvx = 1;
    this.maxvy = 1;
    this.pheromonerate = 0.1
    this.foodcapacity = 0.5;
    this.food = 0;
    this.checkpoint = undefined;
}
Ant.prototype.decideMove = function (foods) {
    //First scan for food
    if (this.checkpoint === undefined) {
        var foodscanningradius = 20;
        for (var q = 0; q < foods.length; q++) {
            
            var dy = Math.abs(this.y - foods[q].top);
            var dx = Math.abs(this.x - foods[q].left);
            
            var dist = Math.sqrt(dy*dy + dx*dx);

            if (dist < this.radius + foods[q].radius) { 
                //break if found 
                
                //origin variable records current position, so reverse vector can be projected
                
                this.checkpoint = [foods[q].left, foods[q].top];            
                this.origin = [this.left, this.top];

                break;
            } else { }
        }
    }
    
    if (this.checkpoint === undefined) {
        //First scan surrounding squares for any square with high pheromones
        
        var checkingradius = 10; /* Assumption is only the circumference gets checked */

        var mostpromisingcp = 0;
        var mostpromisingcpcoord = [];
        for (var q = 0; q < 8; q++) {
            var checkx = this.x + checkingradius * Math.cos(q * (Math.PI) / 4);
            var checky = this.y + checkingradius * Math.sin(q * (Math.PI) / 4);
            //console.log("tocheck quadrant: "+q+" with "+checkx + ":" + checky);

            if (checkx >= 0 && checkx <= canvasWidth &&
              checky >= 0 && checky <= canvasHeight) {

                var width = canvasWidth / cols;
                var height = canvasHeight / rows;

                var gRow = Math.floor(checky/height);
                var gCol = Math.floor(checkx/width);
                if (fabricPheromones[gRow][gCol].theval > mostpromisingcp) {
                    mostpromisingcp = fabricPheromones[gRow][gCol].theval;
                    mostpromisingcpcoord = [checkx, checky];
                }
            }        
        }
        //
        //DEFINE THRESHOLD HERE
        //
        var threshold = 20;    
        if (mostpromisingcp > threshold) {
            this.checkpoint = mostpromisingcpcoord;
        }
    } 
    
    //Actual movement department

    if (collidefoodant(this, foods)) {
        console.log("YEA");  

    } else if (this.checkpoint && collideptant(this, this.checkpoint, 5)){
        this.checkpoint = undefined; 
        console.log("DOOYEAH");
    }

    // In exploration mode, ant will set a checkpoint within a certain radius 
    // And make its way there in the general direction
    
    if (this.checkpoint === undefined) {
        //generate new checkpoint
        
        var rad = (Math.random() * 2 * Math.PI)
        var cpdist = 120 + (Math.random() * 70 - 35);

        var newx = this.x + cpdist * Math.cos(rad);
        var newy = this.y + cpdist * Math.sin(rad);
        this.checkpoint = [newx, newy];
    }

    if (this.checkpoint !== undefined) {
        //move in direction of checkpoint
        if (this.checkpoint[0] > this.x) {
            this.x += Math.random() * this.maxvx;
        } else {
            this.x -= Math.random() * this.maxvx;
        }

        if (this.checkpoint[1] > this.y) {
            this.y += Math.random() * this.maxvy;
        } else {
            this.y -= Math.random() * this.maxvy;
        }
    }
}
Ant.prototype.getPos = function () {
    return [this.x,this.y];
}
//Check if touching anything in list of foods
function collidefoodant(ant, foods) {
    for (var i = 0; i < foods.length; i++) {
        if (twoobjcollide(ant, foods[i])) {
            console.log("touched and go");
            ant.checkpoint = projectpoint(ant.checkpoint, ant.origin, 3);
            ant.origin = undefined;
            return true;
        }
    }
    return false;
}
// Project point given two points and a multiplier

function projectpoint(ori, ep, multiplier) {
    var dx = ep.x - ori.x;
    var dy = ep.y - ori.y;

    var originx = ori.x;
    var originy = ori.y;
    return [originx + (dx * multiplier), originy + (dy * multiplier)];
}

// Check if two objects are colliding
function twoobjcollide(obj1, obj2) {
    var dx = Math.abs(obj1.x - obj2.x);
    var dy = Math.abs(obj1.y - obj2.y);

    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist <= (obj1.radius + obj2.radius); 
}

//Check if object is within certain radius of point
function collideptant(ant, tgt, dist) {
    var tgtx = tgt[0];
    var tgty = tgt[1];
    
    var dx = Math.abs(ant.x - tgtx);
    var dy = Math.abs(ant.y - tgty);
    
    var pyth = Math.sqrt(dx*dx + dy*dy);

    return pyth < dist;
}

