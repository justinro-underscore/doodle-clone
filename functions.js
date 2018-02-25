var buttons = document.querySelectorAll(".time"); //array of time time slots
var eventList = document.querySelector(".Event_list"); //DOM object for the event list
var eventItems = document.querySelectorAll("h4"); //event list's items
var availList = document.querySelector("#avail_List") //event's list of availabilities
var timeSlots = [];
let slotList = [];
var selectedList = [];
var twelveHourMode = false; //boolean for what time mode user wants
var personName = ""; //global variables to be passed out
var highlightedEvent = "";//this too.

function dropdownMenu() {
    document.getElementById("dropdown").classList.toggle("show"); //Shows or does not show the menu onclick
}

window.onclick = function(event) {
  if(!event.target.matches('.dropmenu')) {
    var dropwdowns = document.getElementsByClassName("dd-items"); //the two other .html files
    for (var i = 0; i<dropwdowns.length; i++) {
      var openDD = dropwdowns[i]; //we misspelled dropdowns but now we're rolling with it
      if (openDD.classList.contains('show')) {
        openDD.classList.remove('show');
      }
    }
  }
}

function init() { //function called on page load. sets up page:
  populateEventList(); //adds events in local storage to list of events
  addListEvents(); //adds a bunch of onclick-events to the list items. (see immediately below)
}

//Here's the doozy, lads!
function addListEvents() {
  eventItems = document.querySelectorAll("h4"); //Load h4s into eventItems Array.
  for(var i = 0; i < eventItems.length; i++) { //For each event item <h4>...
    eventItems[i].addEventListener("click", function() { //Add event on click that...

      removeHilighted(); //remove all other list item highlighted
      this.classList.add("highlighted"); //Add Highlighted to the clicked event <h4>

      removeChosen(); //Takes off chosen class from each time slot button;

      var currentEInfo = this.innerHTML;
      var h4event = currentEInfo.substr(0, currentEInfo.indexOf('-')).slice(0, -1);
      var thisTimeSlots = events.arrayOfEvents[searchingForEvents(h4event)].timeSlots; //get the time slots the creator marked availability
      for(let j = 0; j < thisTimeSlots.length; j++) {
        buttons.forEach(function(element) {
          if(element.innerHTML === thisTimeSlots[j]) element.classList.add("chosen"); //outline which times the creator chose
        })
      }

      showAvailability(events.arrayOfEvents[searchingForEvents(h4event)]);
    });
  }
}

function removeHilighted() {
  for(let j = 0; j < eventItems.length; j++) {
     eventItems[j].classList.remove("highlighted"); //First remove's all other <h4>'s highlighted class
  }
}

function removeChosen() {
  buttons.forEach(function(element) { //For each time slot button
    element.classList.remove("chosen"); //remove chosen class that indicates creator made is available at this time
  });
}

function submitAvail() { //sets global eveals
  personName = document.forms["Availability"]["attendee"].value; //gets the name of the attendee.

  var shortening = document.querySelector(".highlighted").innerHTML;//just shortens, or else this would be a massive line of code
  highlightedEvent = shortening.substr(0, shortening.indexOf('-')).slice(0, -1); //sets the event name that is marked for availability
}

function showAvailability(event) {
  availList.innerHTML = "";
  slotList = [];

  let availAtts = {
    time: "",
    attendees: []
  }

  buttons.forEach(function(timeID) {
    availAtts.attendees = [];
    availAtts.time = timeID.id;

    for(var i = 0; i < event.numOfPeopleAttending; i++) {
      if(event.peopleAttending[i].personsAvailability.includes(availAtts.time)) {
        availAtts.attendees.push(event.peopleAttending[i].personsName)
      }
    }

    slotlist.push(availAtts)
  });

  for(var k = 0; k < slotList.length; k++) {
    if(slotList[k].attendees.length > 0) {
      availList.innerHTML += "<li>" + slotList[k].time + " - " + attendees.join(', ') + "</li>";
    }
  }
}

function populateButtonHTML() {
  for(var i = 0; i < buttons.length; i++) {
    if(twelveHourMode) { //case for 12 hour mode
      if(Number(buttons[i].id.substring(0,2)) - 12 >= 0) { //if the time is after noon...
        buttons[i].innerHTML = String(Number(buttons[i].id.substring(0,2)) - 12) + buttons[i].id.substring(2,6) + " PM"; //adjusts times to 12-hour mode.
      }
      else {
        buttons[i].innerHTML += " AM";
      }
    } //case for 24 hour mode
    else {
      buttons[i].innerHTML = buttons[i].id;
    }
  }
}

function toggleMode() { //when the change time mode button is pressed
  twelveHourMode = !twelveHourMode; //change global time mode boolean
  populateButtonHTML(); //change the time slot buttons' html
}

function appendEvent(isValid, eventName, eventDate) { //adds new event item to event list
  if(isValid) eventList.innerHTML += "<h4>" + eventName + " - " + eventDate + "</h4>";
  addListEvents(); //adds new event to this event list item
}

function populateEventList() { //gets local storage events and populates event list
  if (events.numOfEvents > 0) {
    for(var i = 0; i < events.numOfEvents; i++) { //for each event in local storage ...

      // eventList.innerHTML += "<h4>" + events.arrayOfEvents[i].nameOfEvent + " - " + events.arrayOfEvents[i].dateOfEvent + "</h4>" //add an h4 with the event's name and date
    }
  }
}
