let events = [];
let currRowNum = 0;
let twentyFourMode;

//Check if we have a setting stroed for twenty four hour mode
if(localStorage.getItem("twentyFourModeLS") != undefined)
  twentyFourMode = (localStorage.getItem("twentyFourModeLS") == "true");
else
  twentyFourMode = true;

//TODO: do we need valid?
var valid = true;

//Check if we have existing events stored in local storage, else load events
if (localStorage.getItem("events") == null) {
  loadEvents();
} else {
  events = JSON.parse(localStorage.getItem("events"));
}

/**
 * Querrys the google sheet for events via google charts api
 * @return none
 */
function loadEvents() {
  events = [];
  google.charts.load('current', {
    packages: ['corechart', 'table', 'sankey']
  });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    let query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1f7v5k0XmaXdCAGkO9DGnv6uTzkAl_FjHHpg4jV9lTgI/edit#gid=0");
    query.send(handleQueryResponse);
  }

  function handleQueryResponse(response) {
    //row number in spreadsheet = i + row_offset (due to header and current id num)
    let row_offset = 2;
    let data = response.getDataTable();
    let rows = data.getNumberOfRows();

    for (let i = 0; i < rows; i++) {
      currRowNum = i + row_offset;
      let event = JSON.parse(data.getValue(i, 2));
      event.rowId = currRowNum;
      events.push(event);
    }

    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("twentyFourModeLS", document.getElementById("twentyfour").checked);
  }
}

/**
 * Toggles twenty four hour mode
 * @return none
 */
function twentyfourSwitch()
{
  twentyFourMode = document.getElementById("twentyfour").checked;
  localStorage.setItem("twentyFourModeLS", twentyFourMode);
  window.location.reload();
}

/**
 * Takes an array of 24-hour times and converts to 12 hour if twentyFourMode is false
 * @param  {Array} arrTimes array of times to be converted
 * @return {Array}          returns converted times
 */
function showTimes(arrTimes)
{
  if(!twentyFourMode)
  {
    let resultTimes = [];
    arrTimes.forEach((time) => {
      let timeResult;
      let hr = parseInt(time.substring(0, time.indexOf(":")));
      let min = time.substring(time.indexOf(":")+1);
      if(hr < 12)
        timeResult = hr + ":" + min + " AM";
      else
        timeResult = (hr-12) + ":" + min + " PM";
      resultTimes.push(timeResult);
    });
    return resultTimes;
  }
  return arrTimes;
}

/**
 * Filters events by a date key
 * @param  {String} eventDate date to filter events by
 * @return {Array}           array of events on eventDate
 */
function getEventsByDate(eventDate) {
  return events.filter(function(event) {
    if (event.date == eventDate) {
      return event;
    }
  });
}

/**
 * Returns specific event based on name and date
 * @param  {String} eventName name of event
 * @param  {String} eventDate date of event
 * @return {Event}           returns the event with eventName on eventDate
 */
function getEvent(eventName, eventDate) {
  return events.filter(function(event) {
    if (event.date == eventDate && event.name == eventName) {
      return event;
    }
  })[0];
}

function findEventsByIdAndDate(eventId, date) {
    let arr = findEventsById(eventId);
    return events.filter(function (event) {
        if (event.date == date) {
            return event;
        }
    })[0];
}

/**
 * Returns array of events with same id
 * @param  {Number} eventId id of event
 * @return {Array}         array of events with id
 */
function findEventsById(eventId) {
    let arr = events.filter(function (event) {
        if (event.id == eventId) {
            return event;
        }
    });
    arr.sort(function(a, b) {
      return Date.parse(a.date) - Date.parse(b.date);
    });
    return arr;
}

/**
 * Checks if user is attending specific event
 * @param  {User}  user    user to check
 * @param  {Number}  eventId event id to lookup event
 * @return {Boolean}         true if user is attending
 */
function isUserAttending(user, eventId) {
    let eventsAttending = getAttendingEventsByUser(user);
    let eventChosen = findEventsById(eventId)[0];
    return(eventsAttending.includes(eventChosen));
}

/**
 * Adds multidayEvent box
 */
function addMultiEventBox() {
  if ($('#multidayEvent').is(':checked')) {
    let multiBreak = $('<br id="multiBreak"/>');
    let multiLabel = $('<label id="multiLabel" for"evDate2">End Date</label>');
    let multiEvent = $('<input type="date" name="date" maxlength="10" required=true type=string id="evDate2">');
    $('#dates').append(multiBreak, multiLabel, multiEvent);
  } else {
    $('#evDate2').remove();
    $('#multiLabel').remove();
    $('#multiBreak').remove();
  }
}

// https://stackoverflow.com/questions/23641525/javascript-date-object-from-input-type-date
/**
 * Adapted from stack overflow to turn date string to date object
 * @param  {String} s date
 * @return {Date}   date object of string
 */
function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2]);
}

/**
 * Returns array of events created by specific user
 * @param  {User} user user to check
 * @return {Array}      array of events by user
 */
function getCreatedEventsByUser(user) {
  return events.filter(function(event) {
    if (event.creator == user.username) {
      return event;
    }
  });
}

/**
 * Returns array of events attended by user
 * @param  {User} user user to check
 * @return {Array}      array of events attended by user
 */
function getAttendingEventsByUser(user) {
  return events.filter(function(event) {
    let attendees = event.attendees;
    if (attendees.filter(function(attendee) {
        if (attendee.personsName == user.username) {
          return event;
        }
      }).length != 0)
      return event;
  });
}

/**
 * Validates user input for creating event
 * @return {Boolean} true if all user input is valid
 */
function checkEventData() {
  let nEvent = $('#evName').val();
  let eDate = $('#evDate').val();
  let maker = getCurrUser().username;

  if (nEvent.length == 0) // Check event name
  {
    alert("Error: Please enter an event name!");
    return false;
  }
  if (maker.length == 0) // Check for creator name
  {
    alert("Error: Please enter a creator name!");
    return false;
  }
  if (getEventTimes().length == 0) {
    alert("Error: Please select time(s) for event!");
    return false;
  }
  // return (checkDate(eDate)); // Checks the date
  return true;
}

/**
 * Validates date of event
 * @param  {String} date date to check
 * @return {Boolean}      true if valid date
 */
function checkDate(date) {
  let nEvent = $('#evName').val();

  if (date.length == 0) // If user enters in an invalid date, the date variable will be empty
  {
    alert("Error: Please choose a valid date.");
    return (false);
  }
  if (getEvent(nEvent, date) != undefined) // Check for duplicates
  {
    alert("Error: Event already exists!")
    return (false);
  }
  if (date.slice(5, 7) == "01" && date.slice(8, 10) == "01") {
    //New Year's Day.
    alert("Error: No meetings permitted to be scheduled on New Year's Day.");
    return (false);
  } else if (date.slice(5, 7) == "07" && date.slice(8, 10) == "04") {
    //Independence Day
    alert("Error: No meetings permitted to be scheduled on Independence Day.");
    return (false);
  } else if (date.slice(5, 7) == "12" && date.slice(8, 10) == "25") {
    //Christmas Day
    alert("Error: No meetings permitted to be scheduled on Christmas Day.");
    return (false);
  }
  return (true);
}

// Enters the event into the event array
/**
 * Starts event creation
 * @return none
 */
function enteringEvent() {
  let startDate = $('#evDate').val();

  if (checkEventData()) // Check user input
  {
    if ($('#multidayEvent').is(':checked')) {
        addMultiEvent();
        replaceWindow();
    } else {
      if (checkDate(startDate)) {
        addSingleEvent(startDate); // Add the event
        replaceWindow();
        valid = true;
      } else {
        valid = false;
      }
    }
  } else {
    valid = false;
  }
}

/**
 * Replaces window with event creation screen
 * @return none
 */
function replaceWindow()
{
  let doc = document.getElementById("bodyHTML");
  doc.innerHTML = "<h1 style='color: #3498DB'>Event created!</h1><p style='text-align: center'><a href='home.html'>Click here</a> to return to the home page.</p>";
}

/**
 * Adds a new event
 * @param {String} eventDate    date of event
 * @param {Number}   eventId       id of event which can be overriden
 */
function addSingleEvent(eventDate, eventId = new Date().getTime()) {
  maker = getCurrUser().username;
  eventName = $('#evName').val();

  let eventInfo = {
    creator: maker,
    name: eventName,
    date: eventDate,
    timeSlots: getEventTimes(),
    attendees: [],
    numOfattendees: 0,
    id: eventId,
    tasks: getTasks()
  };
  //TODO: do we need person Info
  let personInfo = {
    personsName: eventInfo.creator,
    personsAvailability: getEventTimes()
  };
  eventInfo.attendees.push(personInfo);
  eventInfo.numOfattendees++;

  postEvent(eventInfo);
}
