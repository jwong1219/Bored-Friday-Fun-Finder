$(".entertainmentBtn").on("click",function(event){


event.preventDefault();
$("#deck").empty();


console.log($("#name").val().trim());
console.log($("#zipcode").val().trim());



  var Url = "https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&";

  var apikey = "&apikey=JRiceOsMrH7LY3ePHpJNLPjE1ZgeFGAD"
  var zipcode = "&postalCode=" + $("#zipcode").val().trim();
  var name = $("#name").val().trim();
  var size = "size=" + 12;
  var date = "&onsalesEndDateTime=" + moment().format("YYYY-MM-DD");
  var queryUrl = Url + size + date + zipcode + apikey;
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


      })
});


//EventBrite
$(".eventsBtn").on("click",function(){

  event.preventDefault();
  $("#deck").empty();

  console.log($("#name").val().trim());
  console.log($("#zipcode").val().trim());

  var url= "https://www.eventbriteapi.com/v3/events/search/?date_modified.keyword=today&";
  var zipcode = "location.address=" + $("#zipcode").val().trim();
  var token = "&token=VHOSAZQCRGKLWAAH7UX2" 
  var queryUrl = url + zipcode + token;
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
          cardDiv.addClass("contentCard")
          cardDiv.attr("data-url",results[i].url);
          
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
    })
})

