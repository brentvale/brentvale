var TOTAL_STARS = 100;
var COLORS = ["blue", "white"]


function Stars(options){
  this.ctx = options.context;
  this.height = options.height;
  this.width = options.width;
  this.stars = [];
  this.createStars();
  this.vanishingPoint = createVanishingPoint();
};

Stars.prototype = {
  tick: function(){
    
  },
  createStars: function(){
    for(var i = 0; i < TOTAL_STARS; i ++){
      //size between one and two
      var randomSize = Math.floor(Math.random()*2 + 1);
      var randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.stars.push(new Star({}));
    }
  },
  createVanishingPoint: function(){
    return [this.width/2, this.height/2];
  },
  
};