let events = [];
let currRowNum = 0;
let twentyFourMode;
if(localStorage.getItem("twentyFourModeLS") != undefined)
  twentyFourMode = (localStorage.getItem("twentyFourModeLS") == "true");
else
  twentyFourMode = true;
//TODO: do we need valid?
var valid = true;

if (localStorage.getItem("events") == null) {
  loadEvents();
} else {
  events = JSON.parse(localStorage.getItem("events"));
}

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

function twentyfourSwitch()
{
  twentyFourMode = document.getElementById("twentyfour").checked;
  localStorage.setItem("twentyFourModeLS", twentyFourMode);
  window.location.reload();
}

// Takes an array of 24-hour times
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

//TODO: do we need this if we just call loadEvents after posting? (then we can just make currRowNum local to loadEvents rather than global)
function addEventToEvents(eventObj) {
  currRowNum++;
  eventObj.rowId = currRowNum;
  events.push(eventObj);
}

function getEventsByDate(eventDate) {
  return events.filter(function(event) {
    if (event.date == eventDate) {
      return event;
    }
  });
}

function getEvent(eventName, eventDate) {
  return events.filter(function(event) {
    if (event.date == eventDate && event.name == eventName) {
      return event;
    }
  })[0];
}

function findEventsById(eventId) {
    return events.filter(function (event) {
        if (event.id == eventId) {
            return event;
        }
    });
}

function isUserAttending(user, eventId) {
    let eventsAttending = getAttendingEventsByUser(user);
    let eventChosen = findEventsById(eventId)[0];
    return(eventsAttending.includes(eventChosen));
}

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
function parseDate(s) {
  var b = s.split(/\D/);
  return new Date(b[0], --b[1], b[2]);
}

function getCreatedEventsByUser(user) {
  return events.filter(function(event) {
    if (event.creator == user.username) {
      return event;
    }
  });
}

function getAttendingEventsByUser(user) {
  return events.filter(function(event) {
    let attendees = event.attendees;
    if (attendees.filter(function(attendee) {
        if (attendee.personsName == user.username && event.creator != user.username) {
          return event;
        }
      }).length != 0)
      return event;
  });
}

// Checks all user input
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

// Checks the date
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

function replaceWindow()
{
  let doc = document.getElementById("bodyHTML");
  doc.innerHTML = "<h1 style='color: #3498DB'>Event created!</h1><p style='text-align: center'><a href='home.html'>Click here</a> to return to the home page.</p>";
}

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
