function welcome() {
  $("#welcomeModal").modal({"show": "true", "backdrop": "static"});
}
console.log($("#welcomeModal"));

$(window).on("load", function() {

  setTimeout(welcome, 500);
  setTimeout(function() {
    $("#welcomeMessage").append("<br>Lets get started...")
  },2500);
  setTimeout(function() {
    $("#welcomeModalBody").removeClass("invisible")
  },4000);



});