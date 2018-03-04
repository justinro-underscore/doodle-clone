function listOfEvents(date) {
    let eventsList = document.getElementById('EventListDisplay');
    eventsList.innerHTML = ""; // Clear the events
    let eventsByDate = getEventsByDate(date);

    for (let i in eventsByDate) {
        let eventTitle = document.createElement("a");
        eventTitle.setAttribute("href", "javascript:void(0);");
        eventTitle.setAttribute("onclick", "populateDiv('" + eventsByDate[i]["nameOfEvent"] + "')"); // TODO Might want to change nameofevent to id later
        eventTitle.setAttribute("id", eventsByDate[i]["nameOfEvent"]);
        eventTitle.innerHTML = eventsByDate[i]["dateOfEvent"] + " : " + eventsByDate[i]["nameOfEvent"];
        eventsList.append(eventTitle);
        eventsList.innerHTML += "<br><br>";
        let divElem = document.createElement("div");
        divElem.setAttribute("id", eventsByDate[i]["nameOfEvent"] + "div"); // TODO Might want to change nameofevent to id later
        eventsList.append(divElem);
    }

    // for (let i in eventsByDate) {
    //     let divElement = document.createElement("div");
    //     divElement.setAttribute("class", "dropdown");
    //     let theEvents = document.createElement("button");
    //     theEvents.setAttribute("class", "btn btn-primary dropdown-toggle");
    //     theEvents.setAttribute("type", "button");
    //     theEvents.setAttribute("data-toggle", "dropdown");
    //     theEvents.setAttribute("id", eventsByDate[i]["nameOfEvent"]);
    //     theEvents.innerHTML = eventsByDate[i]["dateOfEvent"] + " : " + eventsByDate[i]["nameOfEvent"] + "<span class='caret'></span>";
    //     divElement.append(theEvents);
    //     let innerList = document.createElement("ul");
    //     innerList.setAttribute("class", "dropdown-menu");
    //     innerList.innerHTML = "<li><a>" + eventsByDate[i]["nameOfEvent"] + "</a></li>";
    //     divElement.append(innerList);
    //     eventsList.append(divElement);
    //     eventsList.innerHTML += "<br><br>";
    // }
}

function populateDiv(id)
{
  let divElem = document.getElementById(id + "div");
  if(divElem.innerHTML == "")
  {
    let eventSelected = getEventByName(id);
    let information = document.createElement("p");
    information.innerHTML += "<b><u> Event Name</u></b>: " + eventSelected.nameOfEvent + "<br>";
    information.innerHTML += "<b><u> Event Creator</u></b>: " + eventSelected.creator + "<br>";
    information.innerHTML += "<b><u> Event Date</u></b>: " + eventSelected.dateOfEvent + "<br>";
    information.innerHTML += "<b><u> Event Time Slots</u></b>: " + eventSelected.timeSlots + "<br>";
    information.innerHTML += "<b><u> Event Attendees</u></b>: " + eventSelected.peopleAttending + " Total Attendees: " + eventSelected.numOfPeopleAttending + "<br>";

    divElem.append(information);
    divElem.innerHTML += "<br>";
  }
  else
  {
    divElem.innerHTML = "";
  }
}
