function Ant (x, y) {
    this.x = x;
    this.y = y;
    this.maxvx = 5;
    this.maxvy = 5;
    this.pheromonerate = 0.1
}

Ant.prototype.reducePheromone = function () {
    this.pheromone -= this.pheromonerate;
}

Ant.prototype.decideMove = function (allAnts) {
    //Calculate in radius
    
    //temp
    this.x += Math.random() * 1 - 0.5;
    this.y += Math.random() * 1 - 0.5;
}
Ant.prototype.getPos = function () {
    return [this.x,this.y];
}
