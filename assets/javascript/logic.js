$(".entertainmentBtn").on("click",function(event){

event.preventDefault();

console.log($("#name").val().trim());
console.log($("#zipcode").val().trim());

  var Url = "https://app.ticketmaster.com/discovery/v2/events.json?" ;

  var apikey = "&apikey=JRiceOsMrH7LY3ePHpJNLPjE1ZgeFGAD"
  var zipcode = "&postalCode=" + $("#zipcode").val().trim();
  var name = $("#name").val().trim();
  var size = "size=" + 12;
  var queryUrl = Url + size + zipcode + apikey;
  console.log(queryUrl);
  // $.ajax({
  //   type:"GET",
  //   url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=JRiceOsMrH7LY3ePHpJNLPjE1ZgeFGAD",
  //   async:true,
  //   dataType: "json",
  //   success: function(json) {
  //               console.log(json);
  //               // Parse the response.
  //               // Do other things.
  //            },
  //   error: function(xhr, status, err) {
  //               // This time, we do not end up here!
  //            }
  // });

})

$(".eventsBtn").on("click",function(){


  var url= "https://www.eventbriteapi.com/v3/events/search/?date_modified.keyword=today&";
  var zipcode = "location.address=" + $("#zipcode").val().trim();
  var token = "&token=VHOSAZQCRGKLWAAH7UX2" 
  var queryUrl = url + zipcode + token;
  console.log(queryUrl);
})

