var events = { // WHY IS THIS HERE
  arrayOfEvents: [],
  numOfEvents: 0
};

let data;
let maker = "";
let nEvent = "";
let eDate = "";
var valid = true;

function getData(){
  data = document.forms["eventMaker"];
  maker = data["admin"].value;
  nEvent = data["eventName"].value;
  eDate = data["date"].value;
}

// Checks all user input
function checkData()
{
  // TODO Check user
  if(nEvent.length == 0) // Check event name
  {
    alert("Error: Please enter an event name!");
    return false;
  }
  if(!dupMeet()) // Check for duplicates
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
  let eventInfo = {
    creator: maker,
    nameOfEvent: nEvent,
    dateOfEvent: eDate,
    timeSlots: getEventTimes(),
    numOfTimeSlots: getEventTimes().length,
    peopleAttending: [],
    numOfPeopleAttending: 0
  };
  let personInfo = {
    personsName: eventInfo.creator,
    personsAvailability: getEventTimes()
  };
  eventInfo.peopleAttending.push(personInfo);
  eventInfo.numOfPeopleAttending++;
  events.arrayOfEvents.push(eventInfo);
  events.numOfEvents++;

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

function dupMeet(){
  //checks if any duplicate events have been created.
  //This is done by checking if there is an event with the same name already created.
  for(let i = 0; i < events.numOfEvents; i++){
    if(events.arrayOfEvents[i].nameOfEvent == nEvent){
        return(false);
    }
  }
  return(true);
}

function searchingForEvents(name){
  for(let i = 0; i < events.numOfEvents; i++){
    if(name == events.arrayOfEvents[i].nameOfEvent){
      return(i);
    }
  }
  return(-1);
}

// Enters the event into the event array
function enteringEvent(){
  getData(); // Fill the data
  if(checkData()) // Check user input
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
  events.arrayOfEvents[eventIndex].peopleAttending.push(personInfo);
  events.arrayOfEvents[eventIndex].numOfPeopleAttending++;
  alert('Person added to '+evName+' event.')
}
