$(".entertainmentBtn").on("click",function(event){

event.preventDefault();

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
        
        var eventName = $("<p>");
        eventName.html(results[i].name);
        
        var eventPoster = $("<img>");

        cardDiv.append(eventName);
        $("#resultsPanel").append(cardDiv);
          
        }


      })
});

$(".eventsBtn").on("click",function(){


  var url= "https://www.eventbriteapi.com/v3/events/search/?date_modified.keyword=today&";
  var zipcode = "location.address=" + $("#zipcode").val().trim();
  var token = "&token=VHOSAZQCRGKLWAAH7UX2" 
  var queryUrl = url + zipcode + token;
  console.log(queryUrl);
})

