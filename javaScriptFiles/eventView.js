//TODO: probably dont want this to be global
let eventsByDate = {};

function listOfEvents(date) {
    let eventsList = document.getElementById('Event_list');
    clearEventList();
    eventsByDate = getEventsByDate(date);

    for (let i in eventsByDate) {
        let theEvents = document.createElement("a");

        theEvents.setAttribute("href", "#");
        theEvents.setAttribute("onclick", "");
        theEvents.setAttribute("id", eventsByDate[i]["nameOfEvent"]);
        theEvents.innerHTML = eventsByDate[i]["dateOfEvent"] + " : " + eventsByDate[i]["nameOfEvent"];
        eventsList.append(theEvents);
    }
}

//alt: store event as global and call clearEvent list on switch first
function clearEventList() {
    //Adapted from https://stackoverflow.com/questions/5933157/how-to-remove-an-html-element-using-javascript
    // by T.J. Crowder
    for (let i in eventsByDate) {
        let toRemove = document.getElementById(eventsByDate[i]["nameOfEvent"]);
        toRemove.parentNode.removeChild(toRemove);
    }
}