let events = [];
let currRowNum = 0;
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
  }
}

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
  return events.filter(function(event) {
    if (event.id == id) {
      return event;
    }
  });
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
  let maker = "TODO REPLACE WITH GET CURRENT USER";

  if (nEvent.length == 0) // Check event name
  {
    alert("Error: Please enter an event name!");
    return false;
  }
  if (getEvent(nEvent, eDate) != undefined) // Check for duplicates
  {
    alert("Error: Event already exists!")
    return (false);
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
  return (checkDate(eDate)); // Checks the date
}

function checkMultiData() {
  let evDate1 = $('#evDate').val();
  let evDate2 = $('#evDate2').val();

  let nEvent = $('#evName').val();

  if (!checkDate(evDate1) || !checkDate(evDate2)) {
    alert("Please choose valid dates.");
    return false;
  }

  let start = Date.parse(evDate1);
  let end = Date.parse(evDate2);

  if (start > end) {
    alert("Invalid start date.");
    return false;
  }

  if (nEvent.length == 0) // Check event name
  {
    alert("Error: Please enter an event name!");
    return false;
  }
  if (getEventTimes().length == 0) {
    alert("Error: Please select time(s) for event!");
    return false;
  }

  return true;
}

// Checks the date
function checkDate(date) {
  if (date.length == 0) // If user enters in an invalid date, the date variable will be empty
  {
    alert("Error: Please choose a valid date.");
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

  if ($('#multidayEvent').is(':checked')) {
    if (checkMultiData()) {
      let start = parseDate($('#evDate').val());
      let end = parseDate($('#evDate2').val());

      let eventId = new Date().getTime();
      while (start <= end) {
        addSingleEvent(startDate, eventId);

        start.setDate(start.getDate() + 1);
        let month = (parseInt(start.getUTCMonth()) + 1);
        if (month < 10) {
          month = '0' + month.toString();
        }

        startDate = start.getUTCFullYear() + "-" + month + "-" + start.getDate();
      }
      valid = true;
    } else {
      valid = false;
    }
  } else {
    if (checkEventData()) // Check user input
    {
      addSingleEvent(startDate); // Add the event
      alert('The Event was created!');
      valid = true;
    } else {
      valid = false;
    }
  }
}

function addSingleEvent(eventDate, eventId = new Date().getTime()) {
  maker = "TODO: replace with getCurrUser().username";
  eventName = $('#evName').val();

  //TODO: test this with new data loading
  if (getEvent(eventName, eventDate) != undefined) // Check for duplicates
  {
    alert("Error: event with same name exists on " + eventDate);
    return false;
  }

  let eventInfo = {
    creator: maker,
    name: eventName,
    date: eventDate,
    timeSlots: getEventTimes(),
    attendees: [],
    numOfattendees: 0,
    id: eventId
  };
  let personInfo = {
    personsName: eventInfo.creator,
    personsAvailability: getEventTimes()
  };
  eventInfo.attendees.push(personInfo);
  eventInfo.numOfattendees++;

  postEvent(eventInfo);
}

function sendAvail(person, evName, array) {
  var eventIndex = searchingForEvents(evName);
  var personInfo = {
    personsName: person,
    personsAvailability: array
  };
  // events.arrayOfEvents[eventIndex].attendees.push(personInfo);
  // events.arrayOfEvents[eventIndex].numOfattendees++;
  alert('Person added to ' + evName + ' event.');
}
