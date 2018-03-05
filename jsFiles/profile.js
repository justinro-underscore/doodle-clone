function init()
{
  let user = getCurrUser();
  let welcome = document.getElementById("welcome");
  welcome.innerHTML = "Welcome, " + user.username + "!";


  let usersName = document.getElementById("theKing");
  usersName.innerHTML= user.username;
  let theAdmin = document.getElementById('adminPossibly');
  if(user.isAdmin)
  {
    theAdmin.innerHTML = "Administrator";
  }
  else {
      theAdmin.innerHTML = "User";
  }

  populateCreatedEvents(user);
  populateAttendingEvents(user);
}

function populateCreatedEvents(user)
{
  let divElem = document.getElementById("createdEvents");
  let createdEventsList = getCreatedEventsByUser(user);
  console.log(getCreatedEventsByUser(user));
  if(createdEventsList.length != 0)
  {
    divElem.innerHTML += "<h3>Created Events</h3>";
    for(let i in createdEventsList)
    {
      let eventCreate = createdEventsList[i];
      let eventCreateTag = document.createElement("a");
      eventCreateTag.setAttribute("href", "javascript:void(0);");
      eventCreateTag.setAttribute("onclick", "openCreateInfo(" + eventCreate.id + ")");
      eventCreateTag.innerHTML = "<h4>" + eventCreate.name + "</h4>";
      divElem.append(eventCreateTag);
      let eventCreateDiv = document.createElement("div");
      eventCreateDiv.setAttribute("id", eventCreate.id + "div");
      divElem.append(eventCreateDiv);
    }
  }
}

function openCreateInfo(id)
{
  let divElem = document.getElementById(id + "div");
  if(divElem.innerHTML == "")
  {
    let eventSelected = findEventsById(id)[0]; // TODO make it so that it gets the current day selected
    let eventInfo = document.createElement("p");
    eventInfo.innerHTML += "<b>Name: </b>" + eventSelected.name + "<br>";
    eventInfo.innerHTML += "<b>Date(s):</b> " + eventSelected.date + "<br>";
    let attendees = eventSelected.attendees;
    eventInfo.innerHTML += "<b>Attendees:</b><br>";
    let table = document.createElement("table");
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
  else
  {
    divElem.innerHTML = "";
  }
}

function populateAttendingEvents(user)
{
  let divElem = document.getElementById("attendingEvents");
  let attendingEventsList = getAttendingEventsByUser(user);
  console.log(attendingEventsList)
  if(attendingEventsList.length != 0)
  {
    divElem.innerHTML += "<h3>Attending Events</h3>";
    for(let i in attendingEventsList)
    {
      let eventAttend = attendingEventsList[i];
      let eventAttendTag = document.createElement("a");
      eventAttendTag.setAttribute("href", "javascript:void(0);");
      eventAttendTag.setAttribute("onclick", "openAttendInfo(" + eventAttend.id + ")");
      eventAttendTag.innerHTML = eventAttend.name;
      divElem.append(eventAttendTag);
      let eventAttendDiv = document.createElement("div");
      eventAttendDiv.setAttribute("id", eventAttend.id + "div");
      divElem.append(eventAttendDiv);
    }
  }
}

function openAttendInfo(id)
{
  let divElem = document.getElementById(id + "div");
  if(divElem.innerHTML == "")
  {
    let eventSelected = findEventsById(id)[0]; // TODO make it so that it gets the current day selected
    let eventInfo = document.createElement("p");
    eventInfo.innerHTML += "<b>Name: </b>" + eventSelected.name + "<br>";
    eventInfo.innerHTML += "<b>Date(s): </b>" + eventSelected.date + "<br>";
    let attendees = eventSelected.attendees;
    eventInfo.innerHTML += "<b>Attendees:</b><br>";

    let table = document.createElement("table");
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
  else
  {
    divElem.innerHTML = "";
  }
}
