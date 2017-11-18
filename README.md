# Friday Fun Finder

We created a webapp designed to source local events, concerts, restaurants, and other activities for users who are looking for something to do. We did this with a dynamic UI using modals, forms, banners, popovers, and an image slider. Under the hood we used Javascript and APIs to obtain the content 


## Getting Started

To access site you will need to access the link hosted on Github
[Friday Fun Finder site](https://jwong1219.github.io/Bored-Friday-Fun-Finder/)

For example, a user comes to the site and is prompted with a modal. The user inputs their name and zip code, and chooses from two options that trigger either the Ticketmaster or Eventbrite API.
The page will then display up to 12 results in the user's area, and from there, the user can either click a button to trigger the other API and see the other results, or they can click on a result card that looks interesting to them.
Clicks on result cards generate a popover with some more detailed information, and the user can either click on a button that will take them directly to the host site, or close the popover.
Choosing to go to the host site will push some information to firebase about that user and event, and a new card will appear in the slider at the top, showing the event and the user's name. Any other user on the site can see these, and click on these to visit the host site.

## Running the tests

You will need to ensure you are using a valid zipcode, which the system should check for.
Additionally no results will render if there are no events near the zipcode input by the user.

### Break down into end to end tests

Zipcode Validation- compares user type zipcode  to Zippopotam zipcode dataset to determine whelther zipcode is valid.

Code block for validation of Zipcode.
```
.fail(function(response) {
    $("#zipcode").addClass('animated shake')
    .one('webkitAnimationEnd oanimationend animationend', function() {
      $("#zipcode").removeClass('animated shake');
    });
    $("#welcomeModalBody").find('.interest-btn').prop("disabled", true);
  })
```

Events/Entertainment exists- if API call does not response with a result, screen would fade out. And welcome modal would display again.

```.fail(function(response) {
    $("#zipcode").addClass('animated shake')
    .one('webkitAnimationEnd oanimationend animationend', function() {
      $("#zipcode").removeClass('animated shake');
    });
    $("#welcomeModalBody").find('.interest-btn').prop("disabled", true);
  })
```
## Deployment
No build steps required. Open index.html in browser of choice.

## Built With
using HTML5, CSS3, Twitter Bootstrap, JS, Animate.css, and Slick.css.
* HTML5
* CSS3
* Bootstrap
* Javascript
* Animate.css
* Slick.css
* Google Firebase
* Ticketmaster API
* Eventbrite API
* Zippopotam API

## Versioning

Currently version 1 is deployed on [Github](https://github.com/jwong1219/Bored-Friday-Fun-Finder)
## Authors

* **Justin Wong**
* **Justin DeGuzman**
* **Joseph Cantos**
* **Josh Siverson**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

*This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Shout out to Amber Burroughs for the tip on Slick.css!
