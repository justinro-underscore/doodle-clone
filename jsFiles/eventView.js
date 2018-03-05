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

function populateDiv(id)
{
  let divElem = document.getElementById(id + "div");

console.log(divElem.innerHTML);

  if(divElem.innerHTML == "")
  {
    let eventSelected = findEventsById(id)[0];
    let information = document.createElement("p");
    information.setAttribute("class", "infoEvent");
    console.log(eventSelected)
    information.innerHTML += "<b><u> Event Name</u></b>: " + eventSelected.name + "<br>";
   information.innerHTML += "<br><b><u> Event Creator</u></b>: " + eventSelected.creator + "<br>";
   information.innerHTML += "<br><b><u> Event Date</u></b>: " + eventSelected.date + "<br>";
   information.innerHTML += "<br><b><u> Event Time Slots</u></b>: " + eventSelected.timeSlots + "<br>";
   information.innerHTML += "<br><b><u> Event Attendees</u></b>: " + eventSelected.attendees + " Total Attendees: " + eventSelected.numOfattendees + "<br>";
   divElem.append(information);
   console.log(eventSelected.name);
    console.log(eventSelected.creator);
     console.log(eventSelected.date);
      console.log(eventSelected.timeSlots);
       console.log(eventSelected.attendees);
       console.log(eventSelected.numOfattendees);
   divElem.innerHTML += "<br>";


 }
 else
 {
   divElem.innerHTML = "";
 }

}
