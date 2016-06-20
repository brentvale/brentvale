var MAIN_IMAGE_RATIO = 658/2000; //main_background.jpg image_width/image_height
var INTRO_IMAGE_RATIO = 1600/2160; //background_pool_brent_sky_bella.jpg 1600 × 2160
var MOBILE = null;

var IMAGE_URLS = [
  {high_res: "images/SHIP_thumbnail_high_res.jpg", low_res: "images/SHIP_thumbnail_low_res.jpg"},
  {high_res: "images/Battleship_Background_Game_Site.jpg", low_res: "images/Battleship_Background_Game_Site_low_res.jpg"},
  {high_res: "images/minesweeper_shadow_large.jpg", low_res: "images/minesweeper_shadow_large_low_res.jpg"},
  {high_res: "images/yellow_dragon_web.gif", low_res: "images/yellow_dragon_web_low_res.jpg"}
]
  
var DOCUMENT_IMAGES = [];


var isMobile = function(){
  var response = MOBILE || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  MOBILE = response;
  return response;
}

$(function(){
  
  var setWindowDimensions = function(){
    $WINDOW = $(window);
    WINDOW_WIDTH = $WINDOW.width();
    WINDOW_HEIGHT = $WINDOW.height();
  };
  
  var $intro = $("#intro");
  var $introAlt = $("#introAlt");
  
  var setCoverDimensions = function(){
    $intro.css({width: WINDOW_WIDTH, height: (WINDOW_WIDTH*2160/1600)});
  };
  
  setWindowDimensions();
  setCoverDimensions();
  
  var canvas = document.getElementById('homeCanvas'); 
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_WIDTH * MAIN_IMAGE_RATIO;

  //load high res images once the rest of the page has loaded
  //part 1 background image
  var backgroundImageUrl;
  if(isMobile()){
    backgroundImageUrl = "images/background_pool_brent_sky_bella_color.jpg";
  } else {
    backgroundImageUrl = "images/background_pool_brent_sky_bella.jpg";
  }
  var downloadingImageBackground = new Image();
  downloadingImageBackground.onload = function(){
    $intro.css({backgroundImage: "url('" + backgroundImageUrl + "')"})
  };
  downloadingImageBackground.src = backgroundImageUrl;
  
  //part 2 corn_field image
  var cornImageUrl = "images/corn_field_black_sky.jpg";
  var downloadingImageCorn = new Image();
  downloadingImageCorn.onload = function(){
    $("#contact").css({backgroundImage: "url('" + cornImageUrl + "')"})
  };
  downloadingImageCorn.src = cornImageUrl;
  
  //IMAGE_URLS
  //part 3 the rest
  var documentImages = document.images;
  for(var d = 0; d < documentImages.length; d ++){
    DOCUMENT_IMAGES.push({src:$(documentImages[d]).attr("src"), img: documentImages[d]});
  }
  
  for(var i = 0; i < IMAGE_URLS.length; i++){
    var downloadingImage = new Image();
    
    downloadingImage.onload = function(){
      //find element on page with this.src + low_res
      var temp = $(this).attr("src");
      
      //go through each DOCUMENT_IMAGES, 
      //N^2 time complexity
      for(var j = 0; j < DOCUMENT_IMAGES.length; j ++){
        //requires image srcs match to 20 characters
        if(DOCUMENT_IMAGES[j].src.slice(0,20) == temp.toString().slice(0,20)){
          DOCUMENT_IMAGES[j].img.src = temp.toString();
        }
      }
    }
    downloadingImage.src = IMAGE_URLS[i].high_res;
  }
  
  //hovering over .intro__hoverable replaces background with color image
  $('.intro__hoverable').hover(function(){
    $intro.css({backgroundImage: "url('images/background_pool_brent_sky_bella_color.jpg')"});
  }, function(){
    $intro.css({backgroundImage: "url('images/background_pool_brent_sky_bella.jpg')"});
  });
  
  //MOBILE
  if(isMobile()) {
    // $intro.css({backgroundImage: "url('images/background_pool_brent_sky_bella_color.jpg')"});
    $intro.addClass("fullscreen-mobile");
    $("#work").css({paddingTop: "550px"});
  }
  
  var $experiment = $('#experiment');
  $experiment.css({top: WINDOW_HEIGHT});
  
  $('div[data-type="parallax-image"]').each(function(){
    var $parallaxImage = $(this); // assigning the object
    $(window).scroll(function() {
      windowTop = $WINDOW.scrollTop();
      var movement = windowTop / $parallaxImage.data('speed');
   
      var experimentTop = parseInt($experiment.css("top"));
      if(experimentTop >= 80){
        $experiment.css({top: (experimentTop - (windowTop/20))});
      } else {
        $experiment.css({top: '70px'});
      }
   
      var topDist = parseInt($parallaxImage.css("top"));
      var newPaddingTop = -movement;
      var parsedTop = newPaddingTop + "px";

      // change the padding top
      $parallaxImage.css({ top: parsedTop });
    });
  });
  //sections with background
  $('section[data-type="background"]').each(function(){
    var $bgobj = $(this); // assigning the object
    $(window).scroll(function() {
      var yPos = -($WINDOW.scrollTop() / $bgobj.data('speed'));
      // Put together final background position
      var coords = '50% '+ yPos + 'px';
      // Move the background
      $bgobj.css({ backgroundPosition: coords });
    });
  });
  
  //hovering over web presence icons 
  $('.crate').hover(function(){
    $(this).removeClass('unspin').addClass('spin');
  },
  function(){
    $(this).removeClass('spin').addClass('unspin');
  });
  
  var placeLightning = function(){
    //lightning bolt is 200x1600px, 8 fit on sprite
    //1  2      3      4      5      6      7
    //0, 14.28, 28.57, 42.85, 57.14, 71.43, 85.71
    $lightning = $('.intro__lightning');
    // fraction to place lighting at correct point in image = 45/72
    var lightTargetHeight = parseInt($intro.css("height"))/72*45;
    $lightning.css({width: WINDOW_WIDTH, height: WINDOW_WIDTH/8, top: (lightTargetHeight + "px")});
  };
  
  var placeSummaryText = function(){
    //manually place summary text a % of the way down the screen
     //NEED TO REPLACE IF WINDOW RESIZED
    var backgroundHeight = parseInt($intro.css('height'));
    var summaryTextTopPercent = 0.70;
    $('.intro-summary').css({top: backgroundHeight*summaryTextTopPercent});
  };
  
  var newHorseRide = function(){
    HORSE_RIDE = new HorseRide({windowWidth: WINDOW_WIDTH});
  };
  
  window.onload = function(){
    placeLightning();
    placeSummaryText();
    newHorseRide();
    
    var lightningStrike = function(){
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 14.28%"})}, 50);
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 28.57%"})}, 100);
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 42.85%"})}, 150);
    
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 28.57%"})}, 200);
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 42.85%"})}, 250);
    
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 28.57%"})}, 300);
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 42.85%"})}, 350);
      //reset lightning to blank position on sprite
      setTimeout(function(){$lightning.css({backgroundPosition: " 0 42.85%"})}, 600);
    };
    setInterval(lightningStrike, 5000);
  };
  $WINDOW.resize(function(){
    setWindowDimensions();
    setCoverDimensions();
    placeLightning();
    placeSummaryText();
    HORSE_RIDE.updateWindowWidth(WINDOW_WIDTH);
  });
  
});