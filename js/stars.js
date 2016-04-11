var TOTAL_STARS = 100;
var COLORS = ["blue", "white"]


function Stars(options){
  this.ctx = options.context;
  this.height = options.height;
  this.width = options.width;
  this.stars = [];
  this.clearScreen();
  this.possibleVelocities = this.generateVelocities();
  this.createStars();
  this.vanishingPoint = this.createVanishingPoint();
  this.tick();
};

function Velocity(options){
  this.x = options.x;
  this.y = options.y;
};

Stars.prototype = {
  clearScreen: function(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
  },
  tick: function(){
    var that = this;
    
    setInterval(function(){
      that.drawStars();
      that.moveStars();
    }, 1000);
  },
  moveStars: function(){
    for(var i = 0; i < this.stars.length; i ++){
      debugger
      this.stars[i]
    }
  },
  drawStars: function(){
    for(var i = 0; i < this.stars.length; i ++){
      this.ctx.beginPath();
      this.ctx.arc((this.stars[i].x), (this.stars[i].y),  this.stars[i].radius, 0, Math.PI*2);
      // this.ctx.arc(520, 204,  this.stars[i].radius, 0, Math.PI*2);
      this.ctx.closePath();
      this.ctx.fillStyle = "white";
      this.ctx.fill();
    }
  },
  createStars: function(){
    for(var i = 0; i < this.possibleVelocities.length; i ++){
      //size between one and two
      var randomSize = Math.floor(Math.random()*2 + 1);
      var randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      //velocities can be outward from
      var randomVelocity = this.possibleVelocities[i];
      var tempX = this.possibleVelocities[i].x + 100;
      var tempY = this.possibleVelocities[i].y + 100;
      var radius = 2;
      this.stars.push(new Star({size: randomSize, color: randomColor, velocity:randomVelocity, x: tempX, y:tempY, radius: radius}));
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
      velocities.push(new Velocity({x: -1*i,y:i-100}));
      velocities.push(new Velocity({x: i,y:i-100}));
    }
    return velocities;
  }
  
};
