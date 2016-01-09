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

Ant.prototype.reducePheromone = function () {
    this.pheromone -= this.pheromonerate;
}

Ant.prototype.decideMove = function (allAnts) {
    

    // In exploration mode, ant will set a checkpoint within a certain radius 
    // And make its way there in the general direction
    
    if (this.checkpoint === undefined) {
        //generate new checkpoint
        
        var rad = (Math.random() * 2 * Math.PI)
        var cpdist = 120 + (Math.random() * 70 - 35);

        var newx = this.x + cpdist * Math.cos(rad);
        var newy = this.y + cpdist * Math.sin(rad);
        this.checkpoint = [newx, newy];

    } else if (collideptant(this, this.checkpoint, 5)){
        this.checkpoint = undefined; 
    }else {
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
//Check if object is within certain radius of point
function collideptant(ant, tgt, dist) {
    var tgtx = tgt[0];
    var tgty = tgt[1];
    
    var dx = Math.abs(ant.x - tgtx);
    var dy = Math.abs(ant.y - tgty);
    
    var pyth = Math.sqrt(dx*dx + dy*dy);

    return pyth < dist;
}
