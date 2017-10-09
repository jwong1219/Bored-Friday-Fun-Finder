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
    var pop = $("#popover-temp").find('.popover').eq(0);
    pop.attr('data-name', card.attr('data-name'));
    console.log(pop);
    var popTemp = $("#popover-temp").html();
    console.log(popTemp);
    // var header = pop.find(".popover-heading").eq(0);
    // var popContent = pop.find(".popover-content").eq(0);
    var popContent = $("<div>");
    // var footer = pop.find(".popover-footer").eq(0);
    // var yesBtn = footer.find('.yes').eq(0);
    
    // header.empty();
    // header.append(card.attr("data-name"));
    popContent.empty();
    popContent.append("Date: " + card.attr('data-date')+"<br>");
    popContent.append("Time: " + card.attr('date-time')+"<br>");
    popContent.append("Description: " + card.attr('data-description')+"<br>");
    // yesBtn.empty();
    // var aTag = $("<a>");
    // aTag.attr({'href': card.attr('data-url'), 'target': '_blank'});
    // aTag.text("Show me more!")
    // yesBtn.append(aTag);
    //add code for pulling in needed firebase data below
    //use the card variable that is linked by "this" to the card that was clicked

    console.log({popContent});
    $(this).popover({
      html: true,
      // template: ($("#popover-temp").find('.popover')[0]),
      template: popTemp,
      content: function() {
        console.log("hello I am popover");
        return popContent.html();
      },
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

