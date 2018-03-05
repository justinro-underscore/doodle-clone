/**
 * initializes the user profile page with user
 * @return none
 */
function init() {
  let user = getCurrUser();
  let welcome = document.getElementById("welcome");
  welcome.innerHTML = "Welcome, " + user.username + "!";


  let usersName = document.getElementById("theKing");
  usersName.innerHTML = user.username;
  let theAdmin = document.getElementById('adminPossibly');
  if (user.isAdmin) {
    theAdmin.innerHTML = "Administrator";
  } else {
    theAdmin.innerHTML = "User";
  }

  populateCreatedEvents(user);
  populateAttendingEvents(user);
}

/**
 * Add user events to profile page
 * @param  {Users} user current user
 * @return none
 */
function populateCreatedEvents(user) {
  let divElem = document.getElementById("createdEvents");
  let createdEventsList = getCreatedEventsByUser(user);
  //(getCreatedEventsByUser(user));
  if (createdEventsList.length != 0) {
    divElem.innerHTML += "<h3>Created Events</h3>";
    for (let i in createdEventsList) {
      let eventCreate = createdEventsList[i];


      let eventCreateTag = document.createElement("a");
      eventCreateTag.setAttribute("href", "javascript:void(0);");
      eventCreateTag.setAttribute("onclick", "openCreateInfo('" + eventCreate.id + "," + eventCreate.date+ "," + eventCreate.name+"')");
      //(divElem.innerHTML);
      if(!divElem.innerHTML.includes(eventCreate.name))
      {
      eventCreateTag.innerHTML = "<h4>" + eventCreate.name + "</h4>";
      divElem.append(eventCreateTag);
      let eventCreateDiv = document.createElement("div");
      eventCreateDiv.setAttribute("id", eventCreate.id + "div" +eventCreate.date);
      divElem.append(eventCreateDiv);
    }
    }
  }

}

/**
 * Adds event info for each cerated event on click
 * @param  {String} theID event Data (id, date, and name)
 * @return none
 */
function openCreateInfo(theID)
{
  let eventData = theID.split(',');
  //(eventData);
  let eventNAME =eventData[2];
  let eventDATE = eventData[1];
  let eventID = eventData[0];
  let divElem = document.getElementById(eventID + "div" +eventDATE );
  if(divElem.innerHTML == "")
  {
    let eventSelected = findEventsById(eventID); // TODO make it so that it gets the current day selected
    let eventInfo = document.createElement("p");
    eventInfo.innerHTML += "<b>Name: </b>" + eventNAME + "<br>";

    for(let i in eventSelected)
    {
      eventInfo.innerHTML += "<b>Date: </b>" + eventSelected[i].date + "<br>";
      let attendees = eventSelected[i].attendees;
      eventInfo.innerHTML += "<b>Attendees:</b><br>";

      let table = document.createElement("table");
      table.setAttribute("class","table table-bordered");
      table.setAttribute("class" , "table table-striped");

      table.setAttribute("style", "width: 90%");
      table.setAttribute("align", "center");
      table.innerHTML += "<tr><th>Name</th><th>Availability</th></tr>";
      for(let i in attendees)
      {
        table.innerHTML += "<tr><td>" + attendees[i].personsName + "</td><td> " + showTimes(attendees[i].personsAvailability) + "</td></tr>";
      }
      eventInfo.append(table);
      divElem.append(eventInfo);
    }
  }
    else {
      {
        divElem.innerHTML = "";
      }
    }
  }


/**
 * Add events being attended by user
 * @param  {User} user current user object
 * @return none
 */
function populateAttendingEvents(user) {
  let divElem = document.getElementById("attendingEvents");
  let attendingEventsList = getAttendingEventsByUserWithoutCreator(user);
  //(attendingEventsList)
  if (attendingEventsList.length != 0) {
    divElem.innerHTML += "<h3>Attending Events</h3>";
    for (let i in attendingEventsList) {
      let eventAttend = attendingEventsList[i];
      let eventAttendTag = document.createElement("a");
      eventAttendTag.setAttribute("href", "javascript:void(0);");
      eventAttendTag.setAttribute("onclick", "openAttendInfo('" + eventAttend.id+ "," + eventAttend.date+ "," +eventAttend.name+ "')");
      if(!divElem.innerHTML.includes(eventAttend.name))
      {
      eventAttendTag.innerHTML = "<h4>" + eventAttend.name + "</h4>";
      divElem.append(eventAttendTag);
      let eventAttendDiv = document.createElement("div");
      eventAttendDiv.setAttribute("id", eventAttend.id + "div");
      divElem.append(eventAttendDiv);
    }
    }
  }
}

function openAttendInfo(theID)
{
  let eventData = theID.split(',');
  //(eventData);
  let eventNAME =eventData[2];
  let eventDATE = eventData[1];
  let eventID = eventData[0];
  let divElem = document.getElementById(eventID + "div");
  if(divElem.innerHTML == "")
  {
    let eventSelected = findEventsById(eventID); // TODO make it so that it gets the current day selected
    let eventInfo = document.createElement("p");
    eventInfo.innerHTML += "<b>Name: </b>" + eventNAME + "<br>";

    for(let i in eventSelected)
    {
          eventInfo.innerHTML += "<b>Date: </b>" + eventSelected[i].date + "<br>";
      let attendees = eventSelected[i].attendees;
      eventInfo.innerHTML += "<b>Attendees:</b><br>";

      let table = document.createElement("table");
      table.setAttribute("class","table table-bordered");
      table.setAttribute("class" , "table table-striped");

      table.setAttribute("style", "width: 90%");
      table.setAttribute("align", "center");
      table.innerHTML += "<tr><th>Name</th><th>Availability</th></tr>";
      for(let i in attendees)
      {
        table.innerHTML += "<tr><td>" + attendees[i].personsName + "</td><td> " + showTimes(attendees[i].personsAvailability) + "</td></tr>";
      }
      eventInfo.append(table);
      divElem.append(eventInfo);
    }

  }
  else
  {

    divElem.innerHTML = "";
  }
}
