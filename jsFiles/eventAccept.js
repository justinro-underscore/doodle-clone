let availableTimesListEvent = [];
let chosenTimesListEvent = [];
let taskListEvent = [];
let dateChosen;

/**
 * Prints the list of events on a certain date
 * @param  {string} date The current date
 */
function listOfEvents(date) {
  dateChosen = date;
  let eventsListing = document.getElementById('EventsListing');
  let eventsList;
  let eventsByDate = getEventsByDate(date);
  if (eventsByDate.length != 0) {
    eventsListing.innerHTML = "<h3>Choose An Event:</h3><div class='Event_list' id='EventListDisplay'></div>";
    eventsList = document.getElementById('EventListDisplay');
  } else
    eventsListing.innerHTML = "<h3>No events are scheduled on this date!</h3>";

  for (let i in eventsByDate) {
    if(document.getElementById(eventsByDate[i].date + "/" + eventsByDate[i].name) == undefined)
    {
      let divElem2 = document.createElement("div");
      divElem2.innerHTML += "<hr>";
      eventsList.append(divElem2);

      let eventTitle = document.createElement("a");

      eventTitle.setAttribute("href", "javascript:void(0);");
      eventTitle.setAttribute("onclick", "populateDiv('" + eventsByDate[i].name + "," + eventsByDate[i].date + "," + eventsByDate[i].id + "')");
      // TODO Might want to change name to id later
      eventTitle.setAttribute("id", eventsByDate[i].date + "/" + eventsByDate[i].name);
      eventTitle.innerHTML = "<font size= 6><b>" + eventsByDate[i]["name"] + "</b>";
      eventsList.append(eventTitle);
      eventsList.innerHTML += "<br><br>";
      let divElem = document.createElement("div");
      divElem.setAttribute("id", eventsByDate[i].date + "/" + eventsByDate[i].name + "div"); // TODO Might want to change name to id later
      eventsList.append(divElem);

      eventsList.append(divElem2);
    }
  }
}
/**
 * Generates the spot for the event information to be presented
 * @param  {string} eventNameDateId the event name+date+id so we avoid making duplicate divs
 * @return {none}                 returns nothing
 */
function populateDiv(eventNameDateId) {
  let eventData = eventNameDateId.split(',');
  let eventDate = eventData[1];
  let eventName = eventData[0];
  let id = eventData[2];

  let divElem = document.getElementById(eventDate + "/" + eventName + "div");

  if (divElem.innerHTML == "") {
    let eventSelected = getEvent(eventName, eventDate);
    let remove = document.getElementById("thedivTag");
    if(remove != undefined)
      remove.parentNode.removeChild(remove);

    let divTag = document.createElement("div");
    divTag.setAttribute("id", "thedivTag");

    let information = document.createElement("p");
    information.setAttribute("class", "infoEvent");
    information.setAttribute("align", "left");

    information.setAttribute("id", id + "para");
    information.innerHTML += "<b><u> Event Name</u></b>: " + eventSelected.name + "<br>";
    information.innerHTML += "<br><b><u> Event Creator</u></b>: " + eventSelected.creator + "<br>";
    information.innerHTML += "<br><b><u> Event Date</u></b>: " + eventSelected.date + "<br>";
    let dates = findEventsById(id);
    if(dates.length != 1)
    {
      information.innerHTML += "<br><b><u> Other Dates</u></b>: "
      for(let i in dates)
      {
        information.innerHTML += dates[i].date;
        if(i != dates.length-1)
          information.innerHTML += ", ";
      }
      information.innerHTML += "<br>";
    }
    information.innerHTML += "<br><b><u> Event Time Slots</u></b>: " + showTimes(eventSelected.timeSlots) + "<br>";
    information.innerHTML += "<br><b><u> Event Attendees</u></b>: " + printNames(eventSelected.attendees) + " Total Attendees: " + eventSelected.numOfattendees + "<br>";
    information.innerHTML += "<br><b><u> Tasks</u></b>: ";
    if(eventSelected.tasks.length != 0)
    {
      information.innerHTML += "<br><div class='tasksListHTML' id='tasksListEvent' style='width: 100%'></div><br>";
      information.innerHTML += "<button type='button' onclick='submitTasks(" + id + ")'>Submit Task Change</button>"
      information.innerHTML += "<p id='errorMessageEvent' style='padding-right: 10px; float: right; color: red; text-decoration: underline'></p>"
      let removeTask = document.getElementById("tasksListEvent");
      if(removeTask != undefined)
        removeTask.innerHTML = "";
    }
    else
      information.innerHTML += "There are no tasks for this event!<br>"

    divTag.append(information);
    divElem.append(divTag);
    populateTasks(id);

    if (!isUserAttending(getCurrUser(), id, dateChosen)) {
      let informationAccept = document.createElement("button");
      informationAccept.setAttribute("id", eventSelected.id + "button");
      informationAccept.setAttribute("class", "btn btn-success");
      informationAccept.setAttribute("onclick", "populateAccept('" + eventSelected.id + "')");
      informationAccept.setAttribute("style", "display: block; margin-left: auto; margin-right: auto;");
      informationAccept.innerHTML += "Accept Event";
      information.append(informationAccept);
    } else {
      let informationMessage = document.createElement("p");
      informationMessage.setAttribute("style", "text-align: center; border-style: none; font-size: 20px");
      informationMessage.innerHTML += "<b>Already accepted event!</b>";
      information.append(informationMessage);
    }
  } else {
    divElem.innerHTML = "";
  }
}

/**
 * Populates the task list with the tasks of the event
 * @param  {Number} id The id of the event
 */
function populateTasks(id)
{
  let eventChosen = findEventsByIdAndDate(id, dateChosen);
  if(eventChosen != undefined)
  {
    let tasksListDisplay = document.getElementById("tasksListEvent");
    let tasks = eventChosen.tasks;
    for(let i in tasks)
    {
      if(tasks[i].assignedTo == undefined)
      {
        taskListEvent.push({task: tasks[i].task, assignedTo: undefined});

        let newTask = document.createElement("a");
        newTask.setAttribute("href", "javascript:void(0);");
        newTask.setAttribute("id", "task" + tasks[i].task);
        newTask.setAttribute("name", "unassigned"); // Hidden attribute to test if the task has been assigned
        newTask.innerHTML = tasks[i].task;

        let buttonChoose = document.createElement("button");
        buttonChoose.setAttribute("type", "button");
        buttonChoose.setAttribute("onclick", "chooseTaskEvent('" + tasks[i].task + "')");
        buttonChoose.setAttribute("id", tasks[i].task + "button");
        buttonChoose.innerHTML = "<b>Assign to Self</b>";
        newTask.append(buttonChoose);
        tasksListDisplay.appendChild(newTask);
      }
      else
      {
        let newTask = document.createElement("a");
        newTask.setAttribute("href", "javascript:void(0);");
        newTask.setAttribute("style", "background-color: lightgray");
        newTask.setAttribute("id", "task" + tasks[i].task);
        newTask.setAttribute("name", "assigned"); // Hidden attribute to test if the task has been assigned
        newTask.innerHTML = tasks[i].task;
        newTask.innerHTML += "<span style='color: darkgray;'><i><b> Assigned to " + tasks[i].assignedTo.username + "</b></i></span>";
        tasksListDisplay.appendChild(newTask);
      }
    }
  }
}

/**
 * Toggles whether the task is assigned or not
 * @param  {String} taskId The id of the task
 */
function chooseTaskEvent(taskId)
{
  let task = document.getElementById("task" + taskId);
  if(task.getAttribute("name") == "unassigned")
  {
    task.innerHTML += "<span style='color: darkgray;'><i><b> Assigned to " + getCurrUser().username + "</b></i></span>";
    task.setAttribute("style", "background-color: lightgray");
    task.setAttribute("name", "assigned");
    task.childNodes[1].innerHTML = "<b>Unassign Self</b>";
    taskListEvent.find((t) => {
      return taskId == t.task;
    }).assignedTo = getCurrUser();
  }
  else
  {
    task.innerHTML = task.innerHTML.substring(0, task.innerHTML.indexOf("<span"));
    task.setAttribute("style", "");
    task.setAttribute("name", "unassigned");
    task.childNodes[1].innerHTML = "<b>Assign to Self</b>"
    taskListEvent.find((t) => {
      return taskId == t.task;
    }).assignedTo = undefined;
  }
}

/**
 * Submits the tasks to the database
 * @param  {Number} id The id of the event
 */
function submitTasks(id)
{
  let errorMessage = document.getElementById("errorMessageEvent");
  let changedTasks = [];
  taskListEvent.forEach((task) => {
    if(task.assignedTo != undefined)
      changedTasks.push(task);
  });
  if(changedTasks.length == 0)
    errorMessage.innerHTML = "Error: No tasks changed!";
  else
  {
    errorMessage.setAttribute("style", "color: white")
    errorMessage.innerHTML = "Successfully assigned the following events to " + getCurrUser().username + ":";
    let resultStr = "<ul>";
    changedTasks.forEach((task) => {
      resultStr += "<li>" + task.task + "</li>";
      let button = document.getElementById(task.task + "button");
      button.parentNode.removeChild(button);
    });
    errorMessage.innerHTML += resultStr + "</ul>";
    let chosenEvents = findEventsById(id);
    chosenEvents.forEach((e) => {
      for(let t in e.tasks)
      {
        for(let changed in changedTasks)
        {
          if(e.tasks[t].task == changedTasks[changed].task)
            e.tasks[t].assignedTo = getCurrUser();
        }
      }
      updateEvent(e.rowId, e);
    });
  }
}

/**
 * Prints the names of the attendees along with the times
 * @param  {[users]} attendees The attendees for the given event
 * @return {String}           The formatted output of this array
 */
function printNames(attendees) {
  let result = "<ul>";
  for (let i in attendees) {
    result += "<li>" + attendees[i].personsName + " - " + showTimes(attendees[i].personsAvailability) + "</li>";
  }
  result += "</ul>";
  return result;
}

/**
 * Shows the times accepted by users
 * @param  {string} idEvent event id
 * @return {None}         returns nothing
 */
function populateAccept(idEvent) {
  let eventData = idEvent.split(',');
  let eventDate = eventData[2];
  let eventName = eventData[1];
  let eventId = eventData[0];
  availableTimesListEvent = [];
  chosenTimesListEvent = [];

  if (idEvent.indexOf("para") != -1)
    idEvent = parseInt("" + idEvent.substring(0, idEvent.indexOf("para")));

  let button = document.getElementById(idEvent + "button");
  button.parentNode.removeChild(button);

  removeLists();

  let eventChosen = findEventsByIdAndDate(idEvent, dateChosen);

  let information = document.getElementById(idEvent + "para");
  let newDivElem = document.createElement("div");
  newDivElem.setAttribute("class", "times");
  newDivElem.innerHTML += "<br><div class='timesList' name='lists'><h3>Available Times:</h3><div class='availableTimesListHTML' id='availableTimesList'></div></div>";
  newDivElem.innerHTML += "<div class='timesList' name='lists'><h3 class='lastChosen'>Last time chosen:<br><span id='chosen'><br></span></h3></div>";
  newDivElem.innerHTML += "<div class='timesList' name='lists'><h3>Chosen Times:</h3><div class='chosenTimesListHTML' id='chosenTimesList'></div></div>";
  newDivElem.innerHTML += "<div name='lists'><button type='button' class= 'btn btn-info' onclick='submitAvailability(" + idEvent + ")'>Submit Availability</button></div>"
  information.append(newDivElem);

  let availableTimesList = document.getElementById("availableTimesList"); // Only have to fill this list
  let times = eventChosen.timeSlots
  for (let i in times) {
    let hr = parseInt(times[i].substring(0, times[i].indexOf(":")));
    let min = times[i].substring(times[i].indexOf(":") + 1);
    let id; // This will be what the user sees
    let time = hr + ":" + min; // This will be the time stamp
    if (!twentyFourMode) {
      if (hr < 12)
        id = hr + ":" + min + " AM";
      else
        id = (hr - 12) + ":" + min + " PM";
    } else
      id = time;
    // Adds the time to the array and the HTML list
    availableTimesListEvent.push(time);
    let newTime = document.createElement("a");
    newTime.setAttribute("href", "javascript:void(0);");
    newTime.setAttribute("onclick", "addTimeEvent()");
    newTime.setAttribute("id", id);
    newTime.setAttribute("name", time); // This is a sort of hidden attribute for the 24-hour mode, even if we are in 12-hour mode
    newTime.innerHTML = id;
    availableTimesList.appendChild(newTime);
  }
}
/**
 * Removes lists from the event page
 * @return {None} returns nothing
 */
function removeLists() {
  let lists = document.getElementsByName("lists");
  if (lists.length != 0) {
    let parent = lists[0].parentNode;
    let parentId = parent.id;
    if (parentId.indexOf("para") != -1)
      parentId = parseInt("" + parentId.substring(0, parentId.indexOf("para")));
    if (!isUserAttending(getCurrUser(), parentId)) {
      let informationAccept = document.createElement("button");
      informationAccept.setAttribute("id", parentId + "button");
      informationAccept.setAttribute("onclick", "populateAccept('" + parentId + "')");
      informationAccept.setAttribute("style", "display: block; margin-left: auto; margin-right: auto;");
      informationAccept.innerHTML += "Accept Event";
      parent.append(informationAccept);
    } else {
      let informationMessage = document.createElement("p");
      informationMessage.setAttribute("style", "text-align: center; border-style: none; font-size: 20px");
      informationMessage.innerHTML += "<b>Already accepted event!</b>";
      parent.append(informationMessage);
    }
  }
  while (lists.length != 0) {
    lists[0].parentNode.removeChild(lists[0]);
  }
}

// Yes, I know I'm basically just copying this from chooseTimes.js but it's late and I'm tired
/**
 * Adds the time from the available time list and puts it in the chosen time list
 */
function addTimeEvent() {
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from available times list

  availableTimesListEvent.splice(availableTimesListEvent.indexOf(time), 1); // Take chosen time out of availble times
  chosenTimesListEvent.push(time); // Add the chosen time to the end of chosenTimes
  chosenTimesListEvent.sort(function(a, b) {
    return (sortTimes(a, b))
  }); // Sort the array

  let chosenTimesList = document.getElementById("chosenTimesList");


  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "removeTimeEvent()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the chosen times list (sorted)
  let nextNodeIndex = chosenTimesListEvent.indexOf(time) + 1;
  if (nextNodeIndex == chosenTimesListEvent.length) // If it should be added to the end
  {
    chosenTimesList.appendChild(newTime);
  } else {
    let nextNode = document.getElementsByName(chosenTimesListEvent[nextNodeIndex])[0]; // getElementsByName returns an array, which is why we get at index 0
    chosenTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "green"; // Green for added
  lastChosen.innerHTML = "--- " + id + " -->    ";
}
/**
 * Removes the time from the voting list of times
 * @return {string} the sorted times
 */
function removeTimeEvent() {
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from chosen times list

  chosenTimesListEvent.splice(chosenTimesListEvent.indexOf(time), 1); // Take chosen time out of chosen times
  availableTimes.push(time); // Add the chosen time to the end of availableTimes
  availableTimes.sort(function(a, b) {
    return (sortTimes(a, b))
  }); // Sort the array

  let chosenTimesList = document.getElementById("availableTimesList");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "addTimeEvent()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the available times list (sorted)
  let nextNodeIndex = availableTimesListEvent.indexOf(time) + 1;
  if (nextNodeIndex == availableTimesListEvent.length) // If it should be added to the end
  {
    availableTimesList.appendChild(newTime);
  } else {
    let nextNode = document.getElementsByName(availableTimesListEvent[nextNodeIndex])[0];
    availableTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "red"; // Red for deleted
  lastChosen.innerHTML = "<-- " + id + " ---";
}

/**
 * Adds the chosen times to the list of available times
 * @param  {string} id the events id
 * @return {none}    returns nothing
 */
function submitAvailability(id) {
  let eventChosen = findEventsByIdAndDate(id, dateChosen); // TODO fix for mult days
  let newAttendee = {
    personsName: getCurrUser().username,
    personsAvailability: chosenTimesListEvent
  }
  eventChosen.attendees.push(newAttendee);
  eventChosen.numOfattendees++;
  updateEvent(eventChosen.rowId, eventChosen);

  let eventsListing = document.getElementById('EventsListing');
  eventsListing.innerHTML = "<h3>Event \"" + eventChosen.name + "\" successfully accepted!<br></h3>";
  eventsListing.innerHTML += "<h3>You chose the following times: " + chosenTimesListEvent + " on " + eventChosen.date + "<br></h3>";
  eventsListing.innerHTML += "<h3>Click on a date to get back to viewing the events!</h3>";
}
