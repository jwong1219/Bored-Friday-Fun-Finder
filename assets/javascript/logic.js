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
  // setTimeout(welcome, 500);
  // setTimeout(function() {
  //   $("#welcomeMessage").append("<br>Lets get started...")
  // },2500);
  // setTimeout(function() {
  //   $("#welcomeModalBody").removeClass("invisible")
  // },4000);


$("#launchModal").on("click", function() {
    welcome(welcomeModal);  
  });

  $("#deck").on("click", ".contentCard", function() {
    var card = $(this);
    console.log(card);
    var pop = $("#popover-temp").find('.popover').eq(0);
    pop.attr('data-name', card.attr('data-name'));
    pop.attr('data-image', card.attr('data-image'));
    pop.attr('data-url', card.attr('data-url'));
    console.log(pop);
    popYesBtn = pop.find('.yes').eq(0);
    popYesBtn.attr('href', card.attr('data-url'));

    var popTemp = $("#popover-temp").html();
    console.log(popTemp);
    var popContent = $("<div>");
    popContent.empty();
    popContent.append("Date: " + card.attr('data-date')+"<br>");
    popContent.append("Time: " + card.attr('date-time')+"<br>");
    popContent.append("Description: " + card.attr('data-description')+"<br>");
    
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
    // console.log(card);
    
  })
});

//ticket master
$(".entertainmentBtn").on("click",function(event){
  
  event.preventDefault();
  // Hides modal after clicking
  $("#welcomeModal").modal('hide');
  $("#deck").empty();

  //console.log($("#name").val().trim());
  //console.log($("#zipcode").val().trim());

  var Url = "https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&";
  var apikey = "&apikey=JRiceOsMrH7LY3ePHpJNLPjE1ZgeFGAD"
  var zipcodeUrlPath = "&postalCode="; 
  zipcode = $("#zipcode").val().trim();
  name = $("#name").val().trim();
  var size = "size=" + 12;
  var date = "&onsalesEndDateTime=" + moment().format("YYYY-MM-DD");
  var queryUrl = Url + size + date + zipcodeUrlPath +zipcode + apikey;
  // console.log(date);
  // console.log(queryUrl);

// Ajax call
  $.ajax({
      url: queryUrl,
      method: "GET"
  }).done(function(response) {
      
    // console.log(response);
    var results = response._embedded.events;
    // console.log(results);      

//iterate all events 

    for(var i = 0;i < results.length; i++){

      var cardDiv = $("<div>");
      cardDiv.addClass("col-xs-4");
      cardDiv.addClass("contentCard");
      cardDiv.attr("data-name", results[i].name);
      cardDiv.attr("data-title",results[i].name.text);
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
    userSelectsCard();
  })
}); //End Ticket Master Button Listener


//EventBrite
$(".eventsBtn").on("click",function(){

    event.preventDefault();
      // Hides modal after clicking
    $("#welcomeModal").modal('hide');
    $("#deck").empty();
    
    console.log($("#name").val().trim());
    console.log($("#zipcode").val().trim());
    name = $("#name").val().trim();
    var url= "https://www.eventbriteapi.com/v3/events/search/?date_modified.keyword=today&";
    var zipcodeUrlPath = "location.address=";
    zipcode = $("#zipcode").val().trim();
    var token = "&token=VHOSAZQCRGKLWAAH7UX2" 
    var queryUrl = url + zipcodeUrlPath+ zipcode + token;
    console.log(queryUrl);

  // Ajax call
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response) {
        
    console.log(response);

    var results = response.events;
    console.log(results);      

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
      

      //attribute for data-date
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
    //added by JWong for experimenting... don't mind me....
    // $("[data-toggle=popover]").popover({
    //   html: true,
    //   content: function() {
    //     console.log("hello I am popover");
    //     return $("#popover-content").html();
    //   } 
    // });
    //end of JWong's scheming

    //calls content card listener
    userSelectsCard();
    })
    
}) //end eventBrite Button Listener

//content
function userSelectsCard() {

  $(".contentCard").on("click", function(){

  // FE to add modal styling & html
  console.log("content card clicked");
  //FE to grab URL of content card click & add to yes button


    //var eventPoster = $(".eventPoster").data();
    // console.log("eventPoster " + eventPoster);
    // database.ref().push({
    //    eventNameFB: eventName,
    //    eventPosterFB: eventPoster
    //   }); 

  }); //end  content card listeners

}
$("#deck").on("click", ".yes", function() {
  var thisDiv = $(this);
  var thisPop = thisDiv.parents('.popover').eq(0);
  console.log({thisDiv});
  console.log({thisPop});
  var eventName = thisPop.data("name");
  var eventPoster = thisPop.data("image");
  var eventUrl = thisPop.data("url");
  var newEvent = database.ref().push();

  console.log({name});
  console.log({zipcode});
  console.log("event name" + eventName);
  console.log("event poster" + eventPoster);
  console.log("new Event" + newEvent);

  newEvent.set({
    nameFB: name,
    zipcodeFB: zipcode,
    eventNameFB: eventName,
    eventPosterFB: eventPoster,
    eventURLFB: eventUrl,
  });

}); //end yes button listeners

database.ref().on("child_added", function(childSnapShot) {

  console.log(childSnapShot.val());

  var bannerName = childSnapShot.val().nameFB;
  var bannerEventName = childSnapShot.val().eventNameFB;
  var bannerEventPoster = childSnapShot.val().eventPosterFB;
  var bannerUrl = childSnapShot.val().eventURLFB

  console.log(bannerName);
  console.log(bannerEventPoster);
  console.log(bannerEventName);

  var bannerInnerDiv = $("<span>");
  // For the banner-josh
  var bannerInnerLink = $("<a>");
  bannerInnerLink.attr("href", bannerUrl);
  bannerInnerLink.attr("target","_blank")
  bannerInnerDiv.addClass("bannerCardContent");
  bannerInnerDiv.attr("src", bannerEventPoster);
  var bannerInnerP = $("<p>");
  bannerInnerP.html(bannerName);
  var bannerInnerImg = $("<img>");
  bannerInnerImg.attr("src",bannerEventPoster);
  // Josh addition
  bannerInnerImg.attr("width", "300px");

  bannerInnerDiv.append(bannerInnerP);
  bannerInnerLink.append(bannerInnerImg);
  bannerInnerDiv.append(bannerInnerLink);


  $("#banner").append(bannerInnerDiv);

  addClassForBanner();

});

function addClassForBanner(){
$( "span:nth-of-type(1)" ).addClass("firstImage");
}

$("#zipcode").focusout(function(){
  var zipcode =$(this).val();
  galoreUrl = "http://api.zippopotam.us/us/";

  var queryUrl = galoreUrl + zipcode;
  console.log(queryUrl);

  $.ajax ({
    url: queryUrl,
    method: "GET"
  }).done(function(response){

    console.log(response);
    $("#welcomeModalBody").children('button').removeClass("disabled");
    // if (Object.keys(response).length === 0){
    //   console.log("not a good zipcode")
    // }
    // else {
    //   console.log(response + "this is good");
    // }
    console.log("good zip code");

  }).fail(function(response) {

    console.log("bad zip");
    $("#zipcode").addClass('animated shake')
    .one('webkitAnimationEnd oanimationend animationend', function() {
      $("#zipcode").removeClass('animated shake');
    });
    $("#welcomeModalBody").children('.interest-btn').addClass("disabled");
    console.log($("#welcomeModalBody").children('button'));
  })

});







