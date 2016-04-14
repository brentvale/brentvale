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
     $background.attr("src", "images/brent_colored_pool_lg.jpg");
   }, function(event){
     $background.attr("src", "images/brent_bandw_pool_lg.jpg");
   });
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
  //MOBILE
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {    
    $background.attr("src", "images/brent_colored_pool_lg_mobile_resize.jpg");
    $background.addClass("fullscreen-mobile");
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
});