//Firebase
  
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYuGVMxvg0yfh_QlEp4by3sOKaUymg5dU",
  authDomain: "bored-on-friday.firebaseapp.com",
  databaseURL: "https://bored-on-friday.firebaseio.com",
  projectId: "bored-on-friday",
  storageBucket: "bored-on-friday.appspot.com",
  messagingSenderId: "8099200900"
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var zipcode = "";

var welcomeMessage = "Looking for something to do? Welcome to your Friday night.<br>Lets get started..."
var errorMessage = "Looks like there was a problem finding your results. Please try again."

function welcome(message) {
    console.log("WELCOME!");
    $("#welcomeModal").modal({"show": "true", "backdrop": "static"});

    setTimeout(function() {
      $("#welcomeMessage").empty();
      $("#welcomeMessage").html(message);
      console.log("messaging")
    },2500,message);
    setTimeout(function() {
      $("#welcomeModalBody").removeClass("invisible")
    },4000);
}
$(window).on("load", function() {
  welcome(welcomeMessage);
  
  $("#deck").on("click", ".contentCard", function() {
    var card = $(this);
    var pop = $("#popover-temp").find('.popover').eq(0);
    pop.attr('data-name', card.attr('data-name'));
    pop.attr('data-image', card.attr('data-image'));
    pop.attr('data-url', card.attr('data-url'));
    popYesBtn = pop.find('.yes').eq(0);
    popYesBtn.attr('href', card.attr('data-url'));

    var popTemp = $("#popover-temp").html();
    var popContent = $("<div>");
    var popContentDes = $("<p>");
    popContent.empty();
    popContent.append("<p>"+"Date: " + card.attr('data-date')+"</p>");
    popContent.append("Time: " + card.attr('date-time')+"<br>");
    popContentDes.append("<p>"+"Description: " + card.attr('data-description')+ "</p>");
    popContent.append(popContentDes);
    
    $(this).popover({
      html: true,
      template: popTemp,
      content: function() {
        return popContent.html();
      },
      footer:  popYesBtn.html(),
    });

    $(this).popover("toggle");
  })
});

//ticket master
$(".entertainmentBtn").on("click",function(event){
  
  event.preventDefault();
  var zipcode =$("#zipcode").val();
  galoreUrl = "https://api.zippopotam.us/us/";

  var queryUrl = galoreUrl + zipcode;
  console.log(queryUrl);

  $.ajax ({
    url: queryUrl,
    method: "GET"
  }).done(function(response){

    $("#resultsPanel").addClass('hidden');
    $("#welcomeModal").modal('hide');
    $("#deck").empty();

    var Url = "https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&";
    var apikey = "&apikey=JRiceOsMrH7LY3ePHpJNLPjE1ZgeFGAD"
    var zipcodeUrlPath = "&postalCode="; 
    zipcode = $("#zipcode").val().trim();
    name = $("#name").val().trim();
    var size = "size=" + 12;
    var date = "&onsalesEndDateTime=" + moment().format("YYYY-MM-DD");
    var queryUrl = Url + size + date + zipcodeUrlPath +zipcode + apikey;
    
    // Ajax call
    $.ajax({
      url: queryUrl,
      method: "GET",

    }).done(function(response) {

      var results = response._embedded.events;     

      for(var i = 0;i < results.length; i++){

        var cardDiv = $("<div>");
        cardDiv.addClass("col-xs-4");
        cardDiv.addClass("contentCard");
        cardDiv.attr("data-name", results[i].name);
        cardDiv.attr("data-title",results[i].name);
        cardDiv.attr("data-description",results[i].info);
        cardDiv.attr("data-date", results[i].dates.start.localDate);
        var localTime = results[i].dates.start.localTime;
        cardDiv.attr("data-time", moment(localTime, 'HH:mm').format('hh:mm a'));
        cardDiv.attr("data-url",results[i].url);
        cardDiv.attr("data-placement","auto right");
        cardDiv.attr("data-toggle","popover");
        // added by JWong
        cardDiv.attr("data-trigger", "manual");

        // console.log(localTime);
        // console.log(moment(localTime, 'HH:mm').format('hh:mm a'));

        var eventName = $("<p>");
        eventName.html(results[i].name);
        
        var eventPoster = $("<img>");
        //eventPoster.html(results[i].images[1].url);
        eventPoster.attr("src",results[i].images[1].url);
        eventPoster.attr("class","img-responsive");
        cardDiv.attr("data-image",results[i].images[1].url);
        
        cardDiv.append(eventName);
        cardDiv.prepend(eventPoster);

        $("#deck").append(cardDiv);              
      }
      $("#slider").removeClass('hidden');
      $("#resultsPanel").removeClass('hidden');
    }).fail(function() {
      welcome(errorMessage);
    });
  }).fail(function(response) {
    $("#zipcode").addClass('animated shake')
    .one('webkitAnimationEnd oanimationend animationend', function() {
    $("#zipcode").removeClass('animated shake');
  });
  $("#welcomeModalBody").find('.interest-btn').prop("disabled", true);
  })
}); //End Ticket Master Button Listener


//EventBrite
$(".eventsBtn").on("click",function(){
  event.preventDefault();

  var zipcode =$("#zipcode").val();
  galoreUrl = "https://api.zippopotam.us/us/";

  var queryUrl = galoreUrl + zipcode;

  $.ajax ({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
    $("#welcomeModalBody").find('.interest-btn').prop("disabled", false);
    
    // Hides modal after clicking
    $("#resultsPanel").addClass('hidden');
    $("#welcomeModal").modal('hide');
    $("#deck").empty();
    
    name = $("#name").val().trim();
    var url= "http://www.eventbriteapi.com/v3/events/search/?date_modified.keyword=today&";
    var zipcodeUrlPath = "location.address=";
    zipcode = $("#zipcode").val().trim();
    var token = "&token=VHOSAZQCRGKLWAAH7UX2" 
    var queryUrl = url + zipcodeUrlPath+ zipcode + token;

    // Ajax call
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).done(function(response) {
        
      var results = response.events;    

    //iterate all events 

      for(var i = 0;i < 12; i++){

        var cardDiv = $("<div>");
        cardDiv.addClass("col-xs-4");        
        cardDiv.addClass("contentCard");
        cardDiv.attr("data-url",results[i].url);
        cardDiv.attr("data-name",results[i].name.text);
        cardDiv.attr("data-description", results[i].description.text);
        cardDiv.attr("data-placement","auto right");
        cardDiv.attr("data-title",results[i].name.text);
        cardDiv.attr("data-toggle","popover");
        // added by JWong
        cardDiv.attr("data-trigger", "manual");
        
        var localTime = results[i].start.local;
        var dateSplit = localTime.split("T");
        var dateArray = dateSplit[0];
        // localTime.split("T")
        cardDiv.attr("data-date",dateArray);
        //attribute for data-time
        var timeArray = dateSplit[1];
        cardDiv.attr("date-time", timeArray);

        var eventName = $("<p>");
        eventName.html(results[i].name.text);
        
        var eventPoster = $("<img>");
        cardDiv.attr("data-image", results[i].logo.url);
        // eventPoster.html(results[i].images[1].url);
        eventPoster.attr("src",results[i].logo.url);
        eventPoster.attr("class","img-responsive");
        
        cardDiv.append(eventName);
        cardDiv.prepend(eventPoster);

        $("#deck").append(cardDiv);         
      }
      $("#slider").removeClass('hidden');
      $("#resultsPanel").removeClass('hidden');
    }).fail(function() {
      welcome(errorMessage);
    });
  }).fail(function(response) {
    $("#zipcode").addClass('animated shake')
    .one('webkitAnimationEnd oanimationend animationend', function() {
      $("#zipcode").removeClass('animated shake');
    });
    $("#welcomeModalBody").find('.interest-btn').prop("disabled", true);
  })   
}) //end eventBrite Button Listener

// JWong version
$("#deck").on("click", ".popover-footer .yes", function() {
  $(this).parents(".popover").popover('destroy');
  var thisDiv = $(this);
  var thisPop = thisDiv.parents('.popover').eq(0);
  var eventName = thisPop.data("name");
  var eventPoster = thisPop.data("image");
  var eventUrl = thisPop.data("url");
  var newEvent = database.ref().push();

  newEvent.set({
    nameFB: name,
    zipcodeFB: zipcode,
    eventNameFB: eventName,
    eventPosterFB: eventPoster,
    eventURLFB: eventUrl,
  });
}); //end yes button listeners

$("#deck").on("click", ".popover-footer .no", function() {
  $(this).parents(".popover").popover('destroy');
});
database.ref().on("child_added", function(childSnapShot) {


  var bannerName = childSnapShot.val().nameFB;
  var bannerEventName = childSnapShot.val().eventNameFB;
  var bannerEventPoster = childSnapShot.val().eventPosterFB;
  var bannerUrl = childSnapShot.val().eventURLFB


  var bannerContainer = $("<div>");
  var bannerInnerDiv = $("<div>");
  // For the banner-josh
  var bannerInnerLink = $("<a>");
  bannerInnerLink.attr("href", bannerUrl);
  bannerInnerLink.attr("target","_blank")
  bannerInnerDiv.addClass("bannerCardContent text-center");
  bannerInnerDiv.attr("src", bannerEventPoster);
  // bannerInnerImg.css("style", "100%" )
  var bannerInnerP = $("<p>");
  bannerInnerP.html(bannerName);
  var bannerInnerImg = $("<img>");
  bannerInnerImg.attr("src",bannerEventPoster);
  // Josh addition
  bannerInnerImg.attr("width", "300px");

  bannerInnerDiv.prepend(bannerInnerP);
  bannerInnerLink.append(bannerInnerImg);
  bannerInnerDiv.append(bannerInnerLink);
  bannerContainer.append(bannerInnerDiv);

  // $(".slick-track").append(bannerContainer);
$('#banner').slick('slickAdd',bannerContainer);

 
});


// $("#zipcode").focusout(checkZip);

$("#zipcode").focusout(function(){
  var zipcode =$(this).val();
  galoreUrl = "https://api.zippopotam.us/us/";

  var queryUrl = galoreUrl + zipcode;

  $.ajax ({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
    $("#welcomeModalBody").find('.interest-btn').prop("disabled", false);
  }).fail(function(response) {
    $("#zipcode").addClass('animated shake')
    .one('webkitAnimationEnd oanimationend animationend', function() {
      $("#zipcode").removeClass('animated shake');
    });
    $("#welcomeModalBody").find('.interest-btn').prop("disabled", true);
  })
});

  $("#banner").slick({
    // setting-name: setting-value
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  });

    
  





