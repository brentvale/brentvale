function Star(options){
  this.color = options.color;
  this.size = options.size;
  this.opacity = options.opacity;
  this.velocity = options.velocity;
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
  
  this.deltaX = (this.velocity.x / 50);
  this.deltaY = (this.velocity.y / 50);
  this.randomAdjust();
};

Star.prototype = {
  //adjust stars on initialize to be spread across the screen
  randomAdjust: function(){
    //if random number is greater than half the window height, stars are created with too many
    //off the screen in the y-direction
    var randomizer = Math.floor(Math.random() * WINDOW_WIDTH/2);
    //if number is 100 units away (increments at 0.01)
    var opacity = (randomizer > 100) ? 1.0 : randomizer * 0.01;
    
    this.opacity = opacity;

    this.x = this.x + (this.deltaX * randomizer);
    this.y = this.y + (this.deltaY * randomizer);
    
    if(this.y < 0){
      this.y = this.y * -1 * (1/Math.floor(Math.random() * 5));
    }
    if(this.y > WINDOW_HEIGHT/2){
      this.y = this.y * (1/Math.floor(Math.random() * 10));
    }
  }
};