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

//ticket master
$(".entertainmentBtn").on("click",function(event){
  event.preventDefault();
  $("#deck").empty();

  console.log($("#name").val().trim());
  console.log($("#zipcode").val().trim());

  var Url = "https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&";
  var apikey = "&apikey=JRiceOsMrH7LY3ePHpJNLPjE1ZgeFGAD"
  zipcode = $("#zipcode").val().trim();
  var zipcodeUrlPath = "&postalCode="; 
  name = $("#name").val().trim();
  var size = "size=" + 12;
  var date = "&onsalesEndDateTime=" + moment().format("YYYY-MM-DD");
  var queryUrl = Url + size + date + zipcodeUrlPath +zipcode + apikey;
  console.log(date);
  console.log(queryUrl);

// Ajax call
  $.ajax({
      url: queryUrl,
      method: "GET"
    }).done(function(response) {
        
        console.log(response);

        var results = response._embedded.events;
        console.log(results);      

//iterate all events 

        for(var i = 0;i < results.length; i++){

        var cardDiv = $("<div>");
        cardDiv.addClass("col-xs-4");
        cardDiv.addClass("contentCard");
        cardDiv.attr("data-url",results[i].url);
        var eventName = $("<p>");
        eventName.html(results[i].name);
        
        var eventPoster = $("<img>");
        //eventPoster.html(results[i].images[1].url);
        eventPoster.attr("src",results[i].images[1].url);
        eventPoster.attr("class","img-responsive");
        
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
      cardDiv.attr("data-placement","bottom");
      cardDiv.attr("data-title",results[i].name.text);
      cardDiv.attr("data-toggle","popover");
      

      //attribute for data-date
      var localTime = results[i].start.local;
      console.log(localTime.split("T"));
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
      // eventPoster.html(results[i].images[1].url);
      eventPoster.attr("src",results[i].logo.url);
      eventPoster.attr("class","img-responsive");
      
      cardDiv.append(eventName);
      cardDiv.prepend(eventPoster);

      $("#deck").append(cardDiv);
              
    }
    //added by JWong for experimenting... don't mind me....
    $("[data-toggle=popover]").popover({
      html: true,
      content: function() {
        console.log("hello I am popover");
        return $("#popover-content").html();
      } 
    });
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


    $("#yes").on("click", function() {

        var eventName = $(".contentCard").data("name");
        var eventPoster = $(".contentCard").data("url");
        var newEvent = database.ref().push();

      newEvent.set({
        nameFB: name,
        zipcodeFB: zipcode,
        eventNameFB: eventName,
        eventPosterFB: eventPoster
      });


    }); //end yes button listeners
}







