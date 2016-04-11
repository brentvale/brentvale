function Star(options){
  this.color = options.color;
  this.size = options.size;
  this.opacity = options.opacity;
  this.velocity = options.velocity;
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
  this.deltaX = this.createDeltaX();
  this.deltaY = this.createDeltaY();
};

Star.prototype = {
  createDeltaX: function(){
    debugger
  },
  createDeltaY: function(){
    
  }
};