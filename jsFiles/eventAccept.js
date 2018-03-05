let availableTimesListEvent = [];
let chosenTimesListEvent = [];

function listOfEvents(date) {
  let eventsListing = document.getElementById('EventsListing');
  let eventsList;
  let eventsByDate = getEventsByDate(date);

  if (eventsByDate.length != 0) {
    eventsListing.innerHTML = "<h3>Choose An Event:</h3><div class='Event_list' id='EventListDisplay'></div>";
    eventsList = document.getElementById('EventListDisplay');
  } else
    eventsListing.innerHTML = "<h3>No events are scheduled on this date!</h3>";

  for (let i in eventsByDate) {
    let divElem2 = document.createElement("div");
    divElem2.innerHTML += "<hr>";
    eventsList.append(divElem2);

    let eventTitle = document.createElement("a");

    eventTitle.setAttribute("href", "javascript:void(0);");
    eventTitle.setAttribute("onclick", "populateDiv('" + eventsByDate[i].name + "," + eventsByDate[i].date + "," + eventsByDate[i].id + "')");
    // TODO Might want to change name to id later
    eventTitle.setAttribute("id", eventsByDate[i].date + "/" + eventsByDate[i].name);
    eventTitle.innerHTML = "<font size= 6><b>" + eventsByDate[i]["name"] + "</b>";
    eventsList.append(eventTitle);
    eventsList.innerHTML += "<br><br>";
    let divElem = document.createElement("div");
    divElem.setAttribute("id", eventsByDate[i].date + "/" + eventsByDate[i].name + "div"); // TODO Might want to change name to id later
    eventsList.append(divElem);

    eventsList.append(divElem2);
  }
}

function populateDiv(eventNameDateId) {
  let eventData = eventNameDateId.split(',');
  let eventDate = eventData[1];
  let eventName = eventData[0];
  let id = eventData[2];

  let divElem = document.getElementById(eventDate + "/" + eventName + "div");

  if (divElem.innerHTML == "") {
    let eventSelected = getEvent(eventName, eventDate);
    let divTag = document.createElement("div");
    divTag.setAttribute("id", "thedivTag");

    let information = document.createElement("p");
    information.setAttribute("class", "infoEvent");
    information.setAttribute("align", "left");

    information.setAttribute("id", id + "para");
    information.innerHTML += "<b><u> Event Name</u></b>: " + eventSelected.name + "<br>";
    information.innerHTML += "<br><b><u> Event Creator</u></b>: " + eventSelected.creator + "<br>";
    information.innerHTML += "<br><b><u> Event Date</u></b>: " + eventSelected.date + "<br>";
    information.innerHTML += "<br><b><u> Event Time Slots</u></b>: " + showTimes(eventSelected.timeSlots) + "<br>";
    information.innerHTML += "<br><b><u> Event Attendees</u></b>: " + printNames(eventSelected.attendees) + " Total Attendees: " + eventSelected.numOfattendees + "<br>";
    divTag.append(information);
    divElem.append(divTag);

    if (!isUserAttending(getCurrUser(), id)) {
      let informationAccept = document.createElement("button");
      informationAccept.setAttribute("id", eventSelected.id + "button");
      informationAccept.setAttribute("class", "btn btn-success");
      informationAccept.setAttribute("onclick", "populateAccept('" + eventSelected.id + "')");
      informationAccept.setAttribute("style", "display: block; margin-left: auto; margin-right: auto;");
      informationAccept.innerHTML += "Accept Event";
      information.append(informationAccept);
    } else {
      let informationMessage = document.createElement("p");
      informationMessage.setAttribute("style", "text-align: center; border-style: none; font-size: 20px");
      informationMessage.innerHTML += "<b>Already accepted event!</b>";
      information.append(informationMessage);
    }
  } else {
    divElem.innerHTML = "";
  }
}

function printNames(attendees) {
  let result = "<ul>";
  for (let i in attendees) {
    result += "<li>" + attendees[i].personsName + " - " + showTimes(attendees[i].personsAvailability) + "</li>";
  }
  result += "</ul>";
  return result;
}

function populateAccept(idEvent) {
  availableTimesListEvent = [];
  chosenTimesListEvent = [];

  if (idEvent.indexOf("para") != -1)
    idEvent = parseInt("" + idEvent.substring(0, idEvent.indexOf("para")));

  let button = document.getElementById(idEvent + "button");
  button.parentNode.removeChild(button);

  removeLists();

  let eventChosen = findEventsById(idEvent)[0]; // TODO change for mult days

  let information = document.getElementById(idEvent + "para");
  let newDivElem = document.createElement("div");
  newDivElem.setAttribute("class", "times");
  newDivElem.innerHTML += "<br><div class='timesList' name='lists'><h3>Available Times:</h3><div class='availableTimesListHTML' id='availableTimesList'></div></div>";
  newDivElem.innerHTML += "<div class='timesList' name='lists'><h3 class='lastChosen'>Last time chosen:<br><span id='chosen'><br></span></h3></div>";
  newDivElem.innerHTML += "<div class='timesList' name='lists'><h3>Chosen Times:</h3><div class='chosenTimesListHTML' id='chosenTimesList'></div></div>";
  newDivElem.innerHTML += "<div name='lists'><button type='button' class= 'btn btn-info' onclick='submitAvailability(" + idEvent + ")'>Submit Availability</button></div>"
  information.append(newDivElem);

  let availableTimesList = document.getElementById("availableTimesList"); // Only have to fill this list
  let times = eventChosen.timeSlots
  for (let i in times) {
    let hr = parseInt(times[i].substring(0, times[i].indexOf(":")));
    let min = times[i].substring(times[i].indexOf(":") + 1);
    let id; // This will be what the user sees
    let time = hr + ":" + min; // This will be the time stamp
    if (!twentyFourMode) {
      if (hr < 12)
        id = hr + ":" + min + " AM";
      else
        id = (hr - 12) + ":" + min + " PM";
    } else
      id = time;
    // Adds the time to the array and the HTML list
    availableTimesListEvent.push(time);
    let newTime = document.createElement("a");
    newTime.setAttribute("href", "javascript:void(0);");
    newTime.setAttribute("onclick", "addTimeEvent()");
    newTime.setAttribute("id", id);
    newTime.setAttribute("name", time); // This is a sort of hidden attribute for the 24-hour mode, even if we are in 12-hour mode
    newTime.innerHTML = id;
    availableTimesList.appendChild(newTime);
  }
}

function removeLists() {
  let lists = document.getElementsByName("lists");
  if (lists.length != 0) {
    let parent = lists[0].parentNode;
    let parentId = parent.id;
    if (parentId.indexOf("para") != -1)
      parentId = parseInt("" + parentId.substring(0, parentId.indexOf("para")));
    if (!isUserAttending(getCurrUser(), parentId)) {
      let informationAccept = document.createElement("button");
      informationAccept.setAttribute("id", parentId + "button");
      informationAccept.setAttribute("onclick", "populateAccept('" + parentId + "')");
      informationAccept.setAttribute("style", "display: block; margin-left: auto; margin-right: auto;");
      informationAccept.innerHTML += "Accept Event";
      parent.append(informationAccept);
    } else {
      let informationMessage = document.createElement("p");
      informationMessage.setAttribute("style", "text-align: center; border-style: none; font-size: 20px");
      informationMessage.innerHTML += "<b>Already accepted event!</b>";
      parent.append(informationMessage);
    }
  }
  while (lists.length != 0) {
    lists[0].parentNode.removeChild(lists[0]);
  }
}

// Yes, I know I'm basically just copying this from chooseTimes.js but it's late and I'm tired
function addTimeEvent() {
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from available times list

  availableTimesListEvent.splice(availableTimesListEvent.indexOf(time), 1); // Take chosen time out of availble times
  chosenTimesListEvent.push(time); // Add the chosen time to the end of chosenTimes
  chosenTimesListEvent.sort(function(a, b) {
    return (sortTimes(a, b))
  }); // Sort the array

  let chosenTimesList = document.getElementById("chosenTimesList");


  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "removeTimeEvent()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the chosen times list (sorted)
  let nextNodeIndex = chosenTimesListEvent.indexOf(time) + 1;
  if (nextNodeIndex == chosenTimesListEvent.length) // If it should be added to the end
  {
    chosenTimesList.appendChild(newTime);
  } else {
    let nextNode = document.getElementsByName(chosenTimesListEvent[nextNodeIndex])[0]; // getElementsByName returns an array, which is why we get at index 0
    chosenTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "green"; // Green for added
  lastChosen.innerHTML = "--- " + id + " -->    ";
}

function removeTimeEvent() {
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from chosen times list

  chosenTimesListEvent.splice(chosenTimesListEvent.indexOf(time), 1); // Take chosen time out of chosen times
  availableTimes.push(time); // Add the chosen time to the end of availableTimes
  availableTimes.sort(function(a, b) {
    return (sortTimes(a, b))
  }); // Sort the array

  let chosenTimesList = document.getElementById("availableTimesList");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "addTimeEvent()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the available times list (sorted)
  let nextNodeIndex = availableTimesListEvent.indexOf(time) + 1;
  if (nextNodeIndex == availableTimesListEvent.length) // If it should be added to the end
  {
    availableTimesList.appendChild(newTime);
  } else {
    let nextNode = document.getElementsByName(availableTimesListEvent[nextNodeIndex])[0];
    availableTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "red"; // Red for deleted
  lastChosen.innerHTML = "<-- " + id + " ---";
}

function submitAvailability(id) {
  let eventChosen = findEventsById(id)[0]; // TODO fix for mult days
  let newAttendee = {
    personsName: getCurrUser().username,
    personsAvailability: chosenTimesListEvent
  }
  eventChosen.attendees.push(newAttendee);
  eventChosen.numOfattendees++;
  updateEvent(eventChosen.rowId, eventChosen);

  let eventsListing = document.getElementById('EventsListing');
  eventsListing.innerHTML = "<h3>Event \"" + eventChosen.name + "\" successfully accepted!<br></h3>";
  eventsListing.innerHTML += "<h3>You chose the following times: " + chosenTimesListEvent + " on " + eventChosen.date + "<br></h3>";
  eventsListing.innerHTML += "<h3>Click on a date to get back to viewing the events!</h3>";
}
