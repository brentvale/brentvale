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
    }
  };
  
  var playIntroSequence = function(){   
    CONSTANTS.LETTERING_INTERVAL = setInterval(function(){
      addNextCharacter();
    }, 60);
  };

  //smooth scroll to anchor
  $("#navLinks li a").click(function(e){
    e.preventDefault();
    var scrollToId = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(scrollToId).offset().top - 80
    }, 1000);
  });

  var $jobTitle = $("#jobTitle");
  var $introDiv = $("#introDiv");
  CONSTANTS.JOB_TITLE = $jobTitle.html();
  
  var windowHeight = $(window).height();
  $introDiv.css({height: windowHeight});
  $jobTitle.css({paddingTop: (windowHeight/2), marginTop: 0});
  $jobTitle.html("");
  $jobTitle.append(CONSTANTS.JOB_TITLE_SPAN);

  playIntroSequence();
  
  //until ready for production, no timeout
  //$("body").css({overflow: "hidden"});
  // setTimeout(playIntroSequence, 2000);
  
});
