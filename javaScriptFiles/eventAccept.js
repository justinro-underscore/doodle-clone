let theAvailableTimes = [];
let theChosenTimes = [];

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

        // let informationAccept = document.createElement("button");
        // informationAccept.setAttribute("id", eventsByDate[i]["nameOfEvent"] + "test");
        // informationAccept.setAttribute("onclick", "PopulateAccept('" + eventsByDate[i]["nameOfEvent"] + "')");// );
        // informationAccept.innerHTML += "Accept: " + eventsByDate[i]["nameOfEvent"] ;
        // eventsList.append(informationAccept);
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
    information.setAttribute("id", id + "para");
    information.innerHTML += "<b><u> Event Name</u></b>: " + eventSelected.nameOfEvent + "<br>";
    information.innerHTML += "<b><u> Event Creator</u></b>: " + eventSelected.creator + "<br>";
    information.innerHTML += "<b><u> Event Date</u></b>: " + eventSelected.dateOfEvent + "<br>";
    information.innerHTML += "<b><u> Event Time Slots</u></b>: " + eventSelected.timeSlots + "<br>";
    information.innerHTML += "<b><u> Event Attendees</u></b>: " + eventSelected.peopleAttending + " Total Attendees: " + eventSelected.numOfPeopleAttending + "<br><br>";
    divElem.append(information);
    let value= eventSelected.timeSlots + '';
    let str_array = value.split(',');
    for(var i = 0; i < str_array.length; i++) {
   // Trim the excess whitespace.
    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
   // Add additional code here, such as:

      }
      theAvailableTimes = str_array;


    let informationAccept = document.createElement("button");
    informationAccept.setAttribute("id", eventSelected.nameOfEvent + "test");
    informationAccept.setAttribute("onclick", "PopulateAccept('" + eventSelected.nameOfEvent + "')");// );
    informationAccept.innerHTML += "Accept: " + eventSelected.nameOfEvent ;
    divElem.append(informationAccept);
  }
  else
  {
    divElem.innerHTML = "";

  }

}
function PopulateAccept(id)
{
  let test = document.getElementById(id + "test");
  let pElem = document.getElementById(id + "para");
  let eventSelected = getEventByName(id);



  if(pElem.innerHTML == "")
  {
    test.style.display = "none";
  }
  else {
      test.style.display = "none";
  }

  let timeDivElem = document.createElement("div");
  for(let i=0; i<theAvailableTimes.length ; i++)
  {
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
function addTime()
{
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from available times list

  availableTimes.splice(availableTimes.indexOf(time), 1); // Take chosen time out of availble times
  theChosenTimes.push(time); // Add the chosen time to the end of chosenTimes  theChosenTimes.sort(function(a, b) {return(sortTimes(a, b))}); // Sort the array
  let chosenTimesList = document.createElement("div");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "removeTime()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the chosen times list (sorted)
  let nextNodeIndex = theChosenTimes.indexOf(time) + 1;
  if(nextNodeIndex == theChosenTimes.length) // If it should be added to the end
  {
    chosenTimesList.appendChild(newTime);
  }
  else
  {
    let nextNode = document.getElementsByName(theChosenTimes[nextNodeIndex])[0]; // getElementsByName returns an array, which is why we get at index 0
    chosenTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.createElement("h3"); // Show the user what they selected
  lastChosen.innerHTML = "--- " + id + " -->";
  
  chosenTimesList.append(newTime);
}
