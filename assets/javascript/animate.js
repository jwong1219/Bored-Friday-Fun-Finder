function welcome(showing) {
  if(showing === false) {
    $("#welcomeModal").modal({"show": "true", /*"backdrop": "static"*/});
    setTimeout(function() {
      $("#welcomeMessage").append("<br>Lets get started...")
    },0);
    setTimeout(function() {
      $("#welcomeModalBody").removeClass("invisible")
    },0);
    welcomeModal = true;

  }
  else {
    $("#welcomeModal").modal("show", "false");
    welcomeModal = false;
  }


}
// console.log($("#welcomeModal"));
var welcomeModal = false;
$(window).on("load", function() {
  console.log("animate.js says hello");
//   setTimeout(welcome, 500);
//   setTimeout(function() {
//     $("#welcomeMessage").append("<br>Lets get started...")
//   },2500);
//   setTimeout(function() {
//     $("#welcomeModalBody").removeClass("invisible")
//   },4000);
// });

  $("#launchModal").on("click", function() {
    welcome(welcomeModal);  
  });

  $("#deck").on("click", ".contentCard", function() {
    var card = $(this);
    console.log(card);
    var popData = $("#popover-content").children('div').eq(0);
    console.log(popData);
    var yesBtn = $("#popover-content").find('button').eq(0);
    console.log(yesBtn);
    popData.empty();
    popData.append("Date: " + card.attr('data-date')+"<br>");
    popData.append("Time: " + card.attr('date-time')+"<br>");
    popData.append("Description: " + card.attr('data-description')+"<br>");
    yesBtn.empty();
    var aTag = $("<a>");
    aTag.attr({'href': card.attr('data-url'), 'target': '_blank'});
    yesBtn.append("Show me more!", aTag);
    //add code for pulling in needed firebase data below
    //use the card variable that is linked by "this" to the card that was clicked


    $(this).popover({
      html: true,
      content: function() {
        console.log("hello I am popover");
        return $("#popover-content").html();
      }
    });

    $(this).popover("toggle");
    console.log(card);
  })

  // $("[data-toggle=popover]").popover({
  //   html: true,
  //   content: function() {
  //     console.log("hello I am popover");
  //     return $("#popover-content").html();
  //   }

  // });



});

