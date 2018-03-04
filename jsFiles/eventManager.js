let events = [];
let currRowNum = 0;

//TODO: change this
let data;
let maker = "";
let nEvent = "";
let eDate = "";
var valid = true;

let loadEvents = () => {
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
    }
};

function addEventToEvents(eventObj) {
    currRowNum++;
    eventObj.rowId = currRowNum;
    events.push(eventObj);
}

function getEventsByDate(eventDate) {
    return events.filter(function (event) {
        if (event.dateOfEvent == eventDate) {
            return event;
        }
    });
}

function getEvent(eventName, eventDate) {
    return events.filter(function (event) {
        if (event.dateOfEvent == eventDate && event.nameOfEvent == eventName) {
            return event;
        }
    })[0];
}

function findEventsById(eventId) {
    return events.filter(function (event) {
        if (event.id == id) {
            return event;
        }
    });
}

// Checks all user input
function checkEventData()
{
  if(nEvent.length == 0) // Check event name
  {
    alert("Error: Please enter an event name!");
    return false;
  }
  if(getEvent(nEvent, eDate) != undefined) // Check for duplicates
  {
    alert("Error: Event already exists!")
    return(false);
  }
  if(maker.length == 0) // Check for creator name
  {
    alert("Error: Please enter a creator name!");
    return false;
  }
  if(getEventTimes().length == 0)
  {
    alert("Error: Please select time(s) for event!");
    return false;
  }
  return(checkDate()); // Checks the date
}

// Adds the event to the array of events
function addEvent(){
  let eventId = new Date().getTime();

  let eventInfo = {
    creator: maker,
    name: nEvent,
    date: eDate,
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
  // events.arrayOfEvents.push(eventInfo);
  // events.numOfEvents++;

  postEvent(eventInfo);
}

// Checks the date
function checkDate()
{
  if(eDate.length == 0) // If user enters in an invalid date, the eDate variable will be empty
  {
    alert("Error: Please choose a valid date.");
    return (false);
  }
  if(eDate.slice(5,7) == "01" && eDate.slice(8,10) == "01"){
    //New Year's Day.
    alert("Error: No meetings permitted to be scheduled on New Year's Day.");
    return (false);
  }
  else if(eDate.slice(5,7) == "07" && eDate.slice(8,10) == "04"){
    //Independence Day
    alert("Error: No meetings permitted to be scheduled on Independence Day.");
    return (false);
  }
  else if(eDate.slice(5,7) == "12" && eDate.slice(8,10) == "25"){
    //Christmas Day
    alert("Error: No meetings permitted to be scheduled on Christmas Day.");
    return (false);
  }
  return(true);
}

// Enters the event into the event array
function enteringEvent(){
  getData(); // Fill the data
  if(checkEventData()) // Check user input
  {
    addEvent(); // Add the event
    alert('The Event "' + nEvent + '" was created!');
    valid = true;
  }
  else
  {
    valid = false;
  }
}

function sendAvail(person, evName, array){
  var eventIndex = searchingForEvents(evName);
  var personInfo = {
    personsName: person,
    personsAvailability: array
  };
  // events.arrayOfEvents[eventIndex].attendees.push(personInfo);
  // events.arrayOfEvents[eventIndex].numOfattendees++;
  alert('Person added to '+evName+' event.')
}

function getData(){
  data = document.forms["eventMaker"];
  maker = data["admin"].value;
  nEvent = data["eventName"].value;
  eDate = data["date"].value;
}
