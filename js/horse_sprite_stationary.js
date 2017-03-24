function HorseSpriteStationary(options){
  this.$horseSprite = $("#horseSpriteStationary");
  this.speed = 3; //adjust speed as needed
  this.gallop();
};

HorseSpriteStationary.prototype = {
  horseSpriteFrameLoop: function(){
    var pos = this.$horseSprite.css("backgroundPosition");
    var integerPos = parseInt(pos.slice(3));
    //when background position is greater than 396 loop back to 0
    var newPos = (integerPos > 396) ? 0 : (integerPos + 36);
    this.$horseSprite.css({backgroundPosition: "0px " + newPos + "px"});
  },
  gallop: function(){
    var that = this;
    setInterval(function(){
      that.horseSpriteFrameLoop();
    }, 30);
  },
}