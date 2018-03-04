function listOfEvents(date) {
  let eventsList = document.getElementById('EventListDisplay');
  eventsList.innerHTML = ""; // Clear the events
  let eventsByDate = getEventsByDate(date);
  console.log(eventsByDate);

  for (let i in eventsByDate) {

    let eventTitle = document.createElement("a");
    eventTitle.setAttribute("href", "javascript:void(0);");
    eventTitle.setAttribute("onclick", "populateDiv('" + eventsByDate[i]["id"] + "')");
    // TODO Might want to change name to id later
    eventTitle.setAttribute("id", eventsByDate[i]["id"]);
    eventTitle.innerHTML = "<font size= 6><b>" + eventsByDate[i]["name"] + "</b>";
    eventsList.append(eventTitle);
    eventsList.innerHTML += "<br><br>";
    let divElem = document.createElement("div");
    divElem.setAttribute("id", eventsByDate[i]["id"] + "div"); // TODO Might want to change name to id later
    eventsList.append(divElem);

  }
  // for (let i in eventsByDate) {
  //     let divElement = document.createElement("div");
  //     divElement.setAttribute("class", "dropdown");
  //     let theEvents = document.createElement("button");
  //     theEvents.setAttribute("class", "btn btn-primary dropdown-toggle");
  //     theEvents.setAttribute("type", "button");
  //     theEvents.setAttribute("data-toggle", "dropdown");
  //     theEvents.setAttribute("id", eventsByDate[i]["name"]);
  //     theEvents.innerHTML = eventsByDate[i]["date"] + " : " + eventsByDate[i]["name"] + "<span class='caret'></span>";
  //     divElement.append(theEvents);
  //     let innerList = document.createElement("ul");
  //     innerList.setAttribute("class", "dropdown-menu");
  //     innerList.innerHTML = "<li><a>" + eventsByDate[i]["name"] + "</a></li>";
  //     divElement.append(innerList);
  //     eventsList.append(divElement);
  //     eventsList.innerHTML += "<br><br>";
  // }
}

function populateDiv(id) {
  let divElem = document.getElementById(id + "div");

  console.log(id);

  if (divElem.innerHTML == "") {
    let eventSelected = findEventsById(id)[0];
    let information = document.createElement("p");
    information.setAttribute("class", "infoEvent");
    information.setAttribute("id", id + "para");
    console.log(eventSelected)
    information.innerHTML += "<b><u> Event Name</u></b>: " + eventSelected.name + "<br>";
    information.innerHTML += "<br><b><u> Event Creator</u></b>: " + eventSelected.creator + "<br>";
    information.innerHTML += "<br><b><u> Event Date</u></b>: " + eventSelected.date + "<br>";
    information.innerHTML += "<br><b><u> Event Time Slots</u></b>: " + eventSelected.timeSlots + "<br>";
    information.innerHTML += "<br><b><u> Event Attendees</u></b>: " + printNames(eventSelected.attendees) + " Total Attendees: " + eventSelected.numOfattendees + "<br>";
    divElem.append(information);
    let value = eventSelected.timeSlots + '';
    let str_array = value.split(',');
    for (var i = 0; i < str_array.length; i++) {
      // Trim the excess whitespace.
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      // Add additional code here, such as:

    }
    theAvailableTimes = str_array;


    let informationAccept = document.createElement("button");
    informationAccept.setAttribute("id", eventSelected.id + "test");
    informationAccept.setAttribute("onclick", "PopulateAccept('" + eventSelected.id + "')"); // );
    informationAccept.innerHTML += "Accept: " + eventSelected.name + "<br>";
    divElem.append(informationAccept);
  } else {
    divElem.innerHTML = "";

  }
}

function printNames(attendees) {
  let result = "<ul>";
  for (let i in attendees) {
    result += "<li>" + attendees[i].personsName + "</li>";
  }
  result += "</ul>"
  console.log(result);
  return result;
}

function PopulateAccept(id) {
  console.log(id);
  let test = document.getElementById(id + "test");
  let pElem = document.getElementById(id + "para");
  let eventSelected = findEventsById(id)[0];



  if (pElem.innerHTML == "") {
    test.style.display = "none";
  } else {
    test.style.display = "none";
  }

  let timeDivElem = document.createElement("div");
  for (let i = 0; i < theAvailableTimes.length; i++) {
    let newTime = document.createElement("a");
    newTime.setAttribute("href", "javascript:void(0);"); // https://stackoverflow.com/questions/8260546/make-a-html-link-that-does-nothing-literally-nothing/8260561
    newTime.setAttribute("onclick", "addTime()");
    newTime.setAttribute("id", id);
    newTime.setAttribute("name", theAvailableTimes[i]); // This is a sort of hidden attribute for the 24-hour mode, even if we are in 12-hour mode
    newTime.innerHTML = theAvailableTimes[i] + "<br>";
    timeDivElem.appendChild(newTime);

  }
  pElem.append(timeDivElem);


}
