function HorseRide(options){
  this.$horseSprite = $("#horseSprite");
  this.windowWidth = options.windowWidth;
  this.left = 0;
  this.speed = 3; //adjust speed as needed
  // this.setHorseBottom();
  this.gallop();
};

HorseRide.prototype = {
  horseSpriteFrameLoop: function(){
    var pos = this.$horseSprite.css("backgroundPosition");
    
    var integerPos = parseInt(pos.slice(3));
    //when background position is greater than 396 loop back to 0
    var newPos = (integerPos > 396) ? 0 : (integerPos + 36);
    
    this.left = (this.left < (this.windowWidth - 50)) ? (this.left + this.speed) : 0;
    this.$horseSprite.css({backgroundPosition: "0px " + newPos + "px", left: this.left + "px"});
  },
  gallop: function(){
    var that = this;
    setInterval(function(){
      that.horseSpriteFrameLoop();
    }, 30);
  },
  // setHorseBottom: function(){
  //   $("#contact").css("height");
  // }
}