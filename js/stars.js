var TOTAL_STARS = 100;
var COLORS = ["blue", "white"];
var WINDOW_HEIGHT = 0;
var WINDOW_WIDTH = 0;


function Stars(options){
  this.ctx = options.context;
  this.height = options.height;
  this.width = options.width;
  this.setWindowHeight();
  this.stars = [];
  this.possibleVelocities = this.generateVelocities();
  this.createStars();
  this.vanishingPoint = this.createVanishingPoint();
  this.createAndLoadImage();
  this.tick();
};

function Velocity(options){
  this.x = options.x;
  this.y = options.y;
};

Stars.prototype = {
  setWindowHeight: function(){
    WINDOW_HEIGHT = this.height;
    WINDOW_WIDTH = this.width;
  },
  createAndLoadImage: function(){
    var img = new Image();
    img.src = "images/main_background.jpg";
    STARS_BACKGROUND = img;
  },
  clearScreen: function(){
    this.ctx.drawImage(STARS_BACKGROUND, 0, 0, this.width, this.height);
    
    // this.ctx.beginPath();
//     this.ctx.rect(0, 0, this.width, this.height);
//     this.ctx.fillStyle = "black";
//     this.ctx.fill();
  },
  tick: function(){
    var that = this;
    
    setInterval(function(){
      that.clearScreen();
      that.moveStars();
      that.drawStars();
    }, 100);
  },
  moveStars: function(){
    for(var i = 0; i < this.stars.length; i ++){
      this.stars[i].x = this.stars[i].x + this.stars[i].deltaX;
      this.stars[i].y = this.stars[i].y + this.stars[i].deltaY;
      this.stars[i].opacity = (this.stars[i].opacity < 1.0) ? this.stars[i].opacity + 0.01 : this.stars[i].opacity;
      //reset stars to center position once they go off the screen
      if(this.stars[i].x < 0 || this.stars[i].x > this.width || this.stars[i].y < 0 ){
        this.stars[i].x = this.stars[i].velocity.x + this.width/2;
        
        this.stars[i].y = (this.stars[i].velocity.y/10) + this.height/2;
        this.stars[i].opacity = 0;
        
        
      }
    }
  },
  drawStars: function(){
    for(var i = 0; i < this.stars.length; i ++){
      this.ctx.beginPath();
      this.ctx.arc((this.stars[i].x), (this.stars[i].y),  this.stars[i].radius, 0, Math.PI*2);
      // this.ctx.arc(520, 204,  this.stars[i].radius, 0, Math.PI*2);
      this.ctx.closePath();
      this.ctx.fillStyle = "rgba(255, 255, 255," + this.stars[i].opacity +")";
      this.ctx.fill();
    }
  },
  createStars: function(){
    for(var i = 0; i < this.possibleVelocities.length; i ++){
      //size between one and two
      var randomSize = Math.floor(Math.random()*2 + 1);
      var randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      //velocities can be outward from origin point
      var selectedVelocity = this.possibleVelocities[i];
      var tempX = this.possibleVelocities[i].x + this.width/2;
      var tempY = (this.possibleVelocities[i].y)/10 + this.height/2;
      
      var radius = 1;
      this.stars.push(new Star({size: randomSize, color: randomColor, velocity:selectedVelocity, x: tempX, y:tempY, radius: radius}));
    }
  },
  createVanishingPoint: function(){
    return [this.width/2, this.height/2];
  },
  pickVelocity: function(){
    return this.possibleVelocities[Math.floor(Math.random() * this.possibleVelocities.length)];
  },
  generateVelocities: function(){
    var velocities = [];
    for(var i = 0; i < 100; i ++){
      //adjust left side of stars off horizon
      if(i < 70){
        velocities.push(new Velocity({x: -1*i,y:i-100}));
      }
      //adjust right side of stars off horizon
      if(i < 88){
        velocities.push(new Velocity({x: i,y:i-100}));
      }
      
    }
    return velocities;
  }
  
};
