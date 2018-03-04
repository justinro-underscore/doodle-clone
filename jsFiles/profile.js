function init()
{
  let user = getCurrUser();
  let welcome = document.getElementById("welcome");
  welcome.innerHTML = "Welcome, " + user.username + "!";

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
      eventCreateTag.innerHTML = eventCreate.date + ":" + eventCreate.name;
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
    eventInfo.setAttribute("style", "color: white")
    eventInfo.innerHTML += "Name: " + eventSelected.name + "<br>";
    eventInfo.innerHTML += "Date(s): " + eventSelected.date + "<br>";
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
      eventAttendTag.innerHTML = eventAttend.date + ":" + eventAttend.name;
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
    eventInfo.setAttribute("style", "color: white")
    eventInfo.innerHTML += "Name: " + eventSelected.name + "<br>";
    eventInfo.innerHTML += "Date(s): " + eventSelected.date + "<br>";
    divElem.append(eventInfo);
  }
  else
  {
    divElem.innerHTML = "";
  }
}
