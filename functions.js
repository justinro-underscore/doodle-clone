var buttons = document.querySelectorAll(".time"); //array of time time slots
var eventList = document.querySelector(".Event_list"); //DOM object for the event list
var eventItems = document.querySelectorAll("h4"); //event list's items
var availList = document.querySelector("#avail_List"); //event's list of availabilities
var timeSlots = [];
let slotList = [];
var selectedList = [];
var twelveHourMode = false; //boolean for what time mode user wants
var personName = ""; //global variables to be passed out
var highlightedEvent = "";//this too.

function init() { //function called on page load. sets up page
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
        });
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
  personName = document.forms.Availability.attendee.value; //gets the name of the attendee.

  var shortening = document.querySelector(".highlighted").innerHTML;//just shortens, or else this would be a massive line of code
  highlightedEvent = shortening.substr(0, shortening.indexOf('-')).slice(0, -1); //sets the event name that is marked for availability
}

function showAvailability(event) {
  availList.innerHTML = "";
  slotList = [];

  let availAtts = {
    time: "",
    attendees: []
  };

  buttons.forEach(function(timeID) {
    availAtts.attendees = [];
    availAtts.time = timeID.id;

    for(var i = 0; i < event.numOfattendees; i++) {
      if(event.attendees[i].personsAvailability.includes(availAtts.time)) {
        availAtts.attendees.push(event.attendees[i].personsName);
      }
    }

    slotlist.push(availAtts);
  });

  for(var k = 0; k < slotList.length; k++) {
    if(slotList[k].attendees.length > 0) {
      availList.innerHTML += "<li>" + slotList[k].time + " - " + attendees.join(', ') + "</li>";
    }
  }
}
