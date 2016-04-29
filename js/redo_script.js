MAIN_IMAGE_RATIO = 658/2000; //main_background.jpg image_width/image_height
INTRO_IMAGE_RATIO = 1600/2160; //background_pool_brent_sky_bella.jpg 1600 × 2160

$(function(){
  var setWindowDimensions = function(){
    $WINDOW = $(window);
    WINDOW_WIDTH = $WINDOW.width();
    WINDOW_HEIGHT = $WINDOW.height();
  };
  
  var setCoverDimensions = function(){
    $("#intro").css({width: WINDOW_WIDTH, height: (WINDOW_WIDTH*2160/1600)});
  };
  
  setWindowDimensions();
  setCoverDimensions();
  
  var canvas = document.getElementById('homeCanvas'); 
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_WIDTH * MAIN_IMAGE_RATIO;

  
  $BACKGROUND = $("#intro");
   $(".intro__hoverable").hover(function(event){
     $BACKGROUND.attr("src", "images/background_pool_brent_sky_bella_color.jpg");
   }, function(event){
     $BACKGROUND.attr("src", "images/background_pool_brent_sky_bella.jpg");
   });
  
  //MOBILE
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {    
    $BACKGROUND.attr("src", "images/background_pool_brent_sky_bella_color.jpg");
    $BACKGROUND.addClass("fullscreen-mobile");
  } else {
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
  }
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
  
  $('.crate').hover(function(){
    $(this).removeClass('unspin').addClass('spin');
  },
  function(){
    $(this).removeClass('spin').addClass('unspin');
  });
  
  // var c = canvas.getContext('2d');
//   var starClusters = new Stars({context: c, height: (WINDOW_WIDTH * MAIN_IMAGE_RATIO), width: WINDOW_WIDTH});
  
  
  var placeLightning = function(){
    //lightning bolt is 200x1600px, 8 fit on sprite
    //1  2      3      4      5      6      7
    //0, 14.28, 28.57, 42.85, 57.14, 71.43, 85.71
    $lightning = $('.intro__lightning');
    // fraction to place lighting at correct point in image = 45/72
    var lightTargetHeight = parseInt($BACKGROUND.css("height"))/72*45;
    $lightning.css({width: WINDOW_WIDTH, height: WINDOW_WIDTH/8, top: (lightTargetHeight + "px")});
  };
  
  var placeSummaryText = function(){
    //manually place summary text a % of the way down the screen
     //NEED TO REPLACE IF WINDOW RESIZED
    var backgroundHeight = parseInt($BACKGROUND.css('height'));
    var summaryTextTopPercent = 0.70;
    $('.intro-summary').css({top: backgroundHeight*summaryTextTopPercent});
  };
  
  window.onload = function(){
    placeLightning();
    placeSummaryText();
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
    new HorseRide({windowWidth: WINDOW_WIDTH});
    //NEED TO HANDLE WINDOW RESIZING WITH LIGHTNING
    
  };
  $WINDOW.resize(function(){
    setWindowDimensions();
    setCoverDimensions();
    placeLightning();
    placeSummaryText();
  });
  
});