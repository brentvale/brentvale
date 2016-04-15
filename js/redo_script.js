//change background image on mobile to be colored version
$(function(){
  var $window = $(window);
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  var canvas = document.getElementById('homeCanvas'); 
  canvas.height = windowHeight;
  canvas.width = windowWidth;
  
  var $background = $("#mainBackground");
   $(".intro__hoverable").hover(function(event){
     $background.attr("src", "images/background_pool_brent_sky_bella_color.jpg");
   }, function(event){
     $background.attr("src", "images/background_pool_brent_sky_bella.jpg");
   });
   
  //MOBILE
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {    
    $background.attr("src", "images/background_pool_brent_sky_bella_color.jpg");
    $background.addClass("fullscreen-mobile");
  } else {
    var $experiment = $('#experiment');
    $experiment.css({top: windowHeight});
   
    $('div[data-type="parallax-image"]').each(function(){
      var $parallaxImage = $(this); // assigning the object
      $(window).scroll(function() {
        windowTop = $window.scrollTop();
        var movement = windowTop / $parallaxImage.data('speed');
     
        var experimentTop = parseInt($experiment.css("top"));
        if(experimentTop >= 40){
          $experiment.css({top: (experimentTop - (windowTop/20))});
        } else {
          $experiment.css({top: '10px'});
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
      var yPos = -($window.scrollTop() / $bgobj.data('speed'));
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
  
  var c = canvas.getContext('2d');
  var starClusters = new Stars({context: c, height: windowHeight, width: windowWidth});
  
  //lightning bolt is 200x1600px, 8 fit on sprite
  //1  2      3      4      5      6      7
  //0, 14.28, 28.57, 42.85, 57.14, 71.43, 85.71
  
  $lightning = $('.intro__lightning');
  // fraction to place lighting at correct point in image = 45/72
  var lightTargetHeight = parseInt($('#mainBackground').css("height"))/72*45;
  $lightning.css({width: windowWidth, height: windowWidth/8, top: (lightTargetHeight + "px")});
  
  
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
  
  
  //NEED TO HANDLE WINDOW RESIZING WITH LIGHTNING
});