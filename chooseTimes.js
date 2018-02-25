let twentyFourMode = true; // TODO Add this functionality
let availableTimes = [];
let chosenTimes = [];

// Initializes the times lists
function initTimes()
{
  let availableTimesList = document.getElementById("availableTimesList"); // Only have to fill this list
  for(let hr = 5; hr < 24; hr++)
  {
    if(hr != 12) // Don't use hour 12
    {
      for(let min = 0; min < 6; min += 2)
      {
        let id; // This will be what the user sees
        let time = hr + ":" + min + "0"; // This will be the time stamp
        if(twentyFourMode)
        {
          if(hr < 12)
            id = hr + ":" + min + "0 AM";
          else
            id = (hr-12) + ":" + min + "0 PM";
        }
        else
          id = time;
        // Adds the time to the array and the HTML list
        availableTimes.push(time);
        let newTime = document.createElement("a");
        newTime.setAttribute("href", "javascript:void(0);"); // https://stackoverflow.com/questions/8260546/make-a-html-link-that-does-nothing-literally-nothing/8260561
        newTime.setAttribute("onclick", "addTime()");
        newTime.setAttribute("id", id);
        newTime.setAttribute("name", time); // This is a sort of hidden attribute for the 24-hour mode, even if we are in 12-hour mode
        newTime.innerHTML = id;
        availableTimesList.appendChild(newTime);
      }
    }
  }
}

// Removes the time from the available time list and puts it in the chosen time list
function addTime()
{
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from available times list

  availableTimes.splice(availableTimes.indexOf(time), 1); // Take chosen time out of availble times
  chosenTimes.push(time); // Add the chosen time to the end of chosenTimes
  chosenTimes.sort(function(a, b) {return(sortTimes(a, b))}); // Sort the array

  let chosenTimesList = document.getElementById("chosenTimesList");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "removeTime()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the chosen times list (sorted)
  let nextNodeIndex = chosenTimes.indexOf(time) + 1;
  if(nextNodeIndex == chosenTimes.length) // If it should be added to the end
  {
    chosenTimesList.appendChild(newTime);
  }
  else
  {
    let nextNode = document.getElementsByName(chosenTimes[nextNodeIndex])[0]; // getElementsByName returns an array, which is why we get at index 0
    chosenTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "green"; // Green for added
  lastChosen.innerHTML = "--- " + id + " -->";
}

// Removes the time from the chosen time list and puts it in the available time list
function removeTime()
{
  let chosenTime = document.activeElement;
  let time = chosenTime.name;
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from chosen times list

  chosenTimes.splice(chosenTimes.indexOf(time), 1); // Take chosen time out of chosen times
  availableTimes.push(time); // Add the chosen time to the end of availableTimes
  availableTimes.sort(function(a, b) {return(sortTimes(a, b))}); // Sort the array

  let chosenTimesList = document.getElementById("availableTimesList");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "addTime()");
  newTime.setAttribute("id", id);
  newTime.setAttribute("name", time);
  newTime.innerHTML = id;

  // Add it into the available times list (sorted)
  let nextNodeIndex = availableTimes.indexOf(time) + 1;
  if(nextNodeIndex == availableTimes.length) // If it should be added to the end
  {
    availableTimesList.appendChild(newTime);
  }
  else
  {
    let nextNode = document.getElementsByName(availableTimes[nextNodeIndex])[0];
    availableTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "red"; // Red for deleted
  lastChosen.innerHTML = "<-- " + id + " ---";
}

// To be used to sort the times
function sortTimes(a, b)
{
  // Next check hour
  let aHr = parseInt(a.substring(0, a.indexOf(":")));
  let bHr = parseInt(b.substring(0, b.indexOf(":")));
  if((aHr - bHr) == 0) // If they are the same hour, check the minutes
  {
    let aMin = parseInt(a.substring(a.indexOf(":") + 1));
    let bMin = parseInt(b.substring(b.indexOf(":") + 1));
    return(aMin - bMin);
  }
  else
    return(aHr - bHr);
}

function getEventTimes()
{
  return chosenTimes;
}
