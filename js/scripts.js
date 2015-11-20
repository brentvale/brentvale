$(function(){
  var CONSTANTS = {
    JOB_TITLE: "",
    LETTERING_INTERVAL: "",
    TITLE_INDEX: 0,
    BLINK_INTERVAL: "",
    JOB_TITLE_CURRENT: "", //building the job title string, keeps track of position
    JOB_TITLE_SPAN: "<span class='active'></span>"
  };
  
  var addNextCharacter = function(){
    var $jobTitle = $("#jobTitle");
    var jobTitleText = $jobTitle.html();
   
    if(CONSTANTS.TITLE_INDEX < CONSTANTS.JOB_TITLE.length){
      CONSTANTS.JOB_TITLE_CURRENT += CONSTANTS.JOB_TITLE[CONSTANTS.TITLE_INDEX];
      $jobTitle.html(CONSTANTS.JOB_TITLE_CURRENT + CONSTANTS.JOB_TITLE_SPAN);
      CONSTANTS.TITLE_INDEX += 1;
    } else {
      clearInterval(CONSTANTS.LETTERING_INTERVAL);
      blinkCursor();
      
      //$("body").css({overflow: "scroll"});
    }
  };
  
  var playIntroSequence = function(){
    clearInterval(CONSTANTS.BLINK_INTERVAL);    
    CONSTANTS.LETTERING_INTERVAL = setInterval(function(){
      addNextCharacter();
    }, 60);
  };
  
  var blinkCursor = function(){
    CONSTANTS.BLINK_INTERVAL = setInterval(function(){
      var $jobTitleSpan = $("#jobTitle span");
      if($jobTitleSpan.hasClass("active")){
        $jobTitleSpan.removeClass("active");
        $jobTitleSpan.addClass("inactive");
      } else {
        $jobTitleSpan.removeClass("inactive");
        $jobTitleSpan.addClass("active");
      }
    }, 400);
  };
  
  var addCursor = function(callback){
    $("#jobTitle").append(CONSTANTS.JOB_TITLE_SPAN);
    callback();
  };
  
  $(document).ready(function(){
    var $jobTitle = $("#jobTitle");
    CONSTANTS.JOB_TITLE = $jobTitle.html();
    var windowHeight = $(window).height();
    $("#introDiv").css({height: windowHeight});
    $jobTitle.css({paddingTop: (windowHeight/2)});
    $jobTitle.html("");
    addCursor(blinkCursor);
    
    playIntroSequence();
    //until ready for production, no timeout
    //$("body").css({overflow: "hidden"});
    // setTimeout(playIntroSequence, 2000);
  });
  
  //smooth scroll to anchor
  $("#navLinks li a").click(function(e){
    e.preventDefault();
    var scrollToId = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(scrollToId).offset().top - 80
    }, 1000);
  });
  
});
