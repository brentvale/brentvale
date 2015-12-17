$(function(){
  var CONSTANTS = {
    JOB_TITLE: "",
    LETTERING_INTERVAL: "",
    TITLE_INDEX: 0,
    BLINK_INTERVAL: "",
    JOB_TITLE_CURRENT: "", //building the job title string, keeps track of position
    JOB_TITLE_SPAN: "<span class='blinking'></span>"
  }, $jobTitle = $("#jobTitle"),
    $introDiv = $("#introDiv");
  
  var addNextCharacter = function(){
    var $jobTitle = $("#jobTitle");
    if(CONSTANTS.TITLE_INDEX < CONSTANTS.JOB_TITLE.length){
      CONSTANTS.JOB_TITLE_CURRENT += CONSTANTS.JOB_TITLE[CONSTANTS.TITLE_INDEX];
      $jobTitle.html(CONSTANTS.JOB_TITLE_CURRENT + CONSTANTS.JOB_TITLE_SPAN);
      CONSTANTS.TITLE_INDEX += 1;
    } else {
      clearInterval(CONSTANTS.LETTERING_INTERVAL);
      setTimeout(removeBlinker, 5000);
      loadYouTubeVideos();
    }
  };
  
  var removeBlinker = function(){
    $(".blinking").remove();
  };
  
  var playIntroSequence = function(){   
    CONSTANTS.LETTERING_INTERVAL = setInterval(function(){
      addNextCharacter();
    }, 60);
  };
  
  var loadYouTubeVideos = function(){
    $("#gardeningYouTube").attr("src", "https://www.youtube.com/embed/mpHgUCmmfpc");
    $("#boomerangYouTube").attr("src", "https://www.youtube.com/embed/gzs0-N5qRtY");
    $("#timelapseYouTube").attr("src", "https://www.youtube.com/embed/PytYNkP4hpE");
    $("#beerbrewYouTube").attr("src", "https://www.youtube.com/embed/ff6grgUZ6C4");
  };
  
  var setWindow = function(){
    var windowHeight = $(window).height();
    $introDiv.css({height: windowHeight});
    $jobTitle.css({paddingTop: (windowHeight/2 + 100), marginTop: 0});
  }

  //smooth scroll to anchor
  $("#navLinks li a").click(function(e){
    e.preventDefault();
    var scrollToId = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(scrollToId).offset().top - 80
    }, 1000);
  });
  
  $(window).resize(function(){
    setWindow();
  });
  
  CONSTANTS.JOB_TITLE = $jobTitle.html();
  setTimeout(function() {
      setWindow();
      $jobTitle.html(CONSTANTS.JOB_TITLE_SPAN);
      playIntroSequence();
  }, 100);

});
