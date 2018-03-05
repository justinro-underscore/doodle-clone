# References
>Stuff we found on the internet because it works wayyyy better than what we did.



#### This CSS code was used to create the background color used in all html files in web application.
```css
body {
    /*Background gradients created by https://uigradients.com/# */
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #232526, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #232526, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+     */

    height: 1080px;
  }
```
Citation:
- Author(s) name: uiGradients (open source)
- Date Accessed: 2/1/2018
- Title of program/source code: uiGradients provides a UI for choosing gradient colors and copying the CSS color numbers for those gradients.
- Type: CSS Code
- Web address: https://uigradients.com/#
- GitHub link: https://github.com/Ghosh/uiGradients


#### HTML to make anchor tags

```html
<a href="#" onclick="return false;"></a>
```

Citation: 
- Author(s) name: curt
- Date Accessed: 2/25/2018
- Type: HTML code
- Web address: https://stackoverflow.com/questions/8260546/make-a-html-link-that-does-nothing-literally-nothing/8260561

#### HTML for login and create user page

```html
<form action="/action_page.php">
  First name: <input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br>
  <input type="submit" value="Submit">
</form>
```

Citation: 
- Author(s) name: w3schools
- Date Accessed: 2/25/2018
- Type: HTML code
- Web address: https://www.w3schools.com/tags/tag_input.asp

#### HTML/CSS to make vertical buttons

```html 
<div class="vertical-menu">
  <a href="#" class="active">Home</a>
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
  <a href="#">Link 4</a>
</div>
```

```css
.vertical-menu {
    width: 200px; /* Set a width if you like */
}

.vertical-menu a {
    background-color: #eee; /* Grey background color */
    color: black; /* Black text color */
    display: block; /* Make the links appear below each other */
    padding: 12px; /* Add some padding */
    text-decoration: none; /* Remove underline from links */
}

.vertical-menu a:hover {
    background-color: #ccc; /* Dark grey background on mouse-over */
}

.vertical-menu a.active {
    background-color: #4CAF50; /* Add a green color to the "active/current" link */
    color: white;
}
```

Citation: 
- Author(s) name: w3schools
- Date Accessed: 2/25/2018
- Type: HTML code
- Web address: https://www.w3schools.com/howto/howto_css_vertical_menu.asp

#### Google apps Script

Citation
- Date Accessed: 2/26/2018
- Type: HTML and Javascript
- Web address: https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/

#### Ajax Request

```html 
<form id="foo">
    <label for="bar">A bar</label>
    <input id="bar" name="bar" type="text" value="" />

    <input type="submit" value="Send" />
</form>
```

```javascript
// Variable to hold request
var request;

// Bind to the submit event of our form
$("#foo").submit(function(event){

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "/form.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

});
```

Citation: 
- Author: Stack overflow community
- Date Accessed: 2/26/2018
- Type: HTML and Javascript
- Web Address: https://stackoverflow.com/questions/5004233/jquery-ajax-post-example-with-php/5004276#5004276


#### Querying Google Sheets

Citation: 
- Author: Google
- Date Accessed: 2/26/2018
- Type: HTML and Javascript
- Web Address: https://developers.google.com/chart/interactive/docs/spreadsheets

#### Documentation.js

Citation: 
- Author: https://github.com/documentationjs/documentation/graphs/contributors
- Date Accessed: 3/4/2018
- Type: Javascript
- Github: https://github.com/documentationjs/documentation

#### Javascript Date Object

```javascript
// s is format y-m-d
// Returns a date object for 00:00:00 local time
// on the specified date
function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2]);
}
```

Citation: 
- Author: RobG
- Date Accessed: 3/4/2018
- Type: Javascript
- Web address: https://stackoverflow.com/questions/23641525/javascript-date-object-from-input-type-date 
