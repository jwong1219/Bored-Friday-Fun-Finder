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
  })





});

