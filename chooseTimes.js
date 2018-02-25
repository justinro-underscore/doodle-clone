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
        let id; // This will be the time stamp
        if(twentyFourMode)
        {
          if(hr < 12)
            id = hr + ":" + min + "0 AM";
          else
            id = (hr-12) + ":" + min + "0 PM";
        }
        else
          id = hr + ":" + min + "0";
        // Adds the time to the array and the HTML list
        availableTimes.push(id);
        let newTime = document.createElement("a");
        newTime.setAttribute("href", "javascript:void(0);"); // https://stackoverflow.com/questions/8260546/make-a-html-link-that-does-nothing-literally-nothing/8260561
        newTime.setAttribute("onclick", "addTime()");
        newTime.setAttribute("id", id);
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
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from available times list

  availableTimes.splice(availableTimes.indexOf(id), 1); // Take chosen time out of availble times
  chosenTimes.push(id); // Add the chosen time to the end of chosenTimes
  chosenTimes.sort(function(a, b) {return(sortTimes(a, b))}); // Sort the array

  let chosenTimesList = document.getElementById("chosenTimesList");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "removeTime()");
  newTime.setAttribute("id", id);
  newTime.innerHTML = id;

  // Add it into the chosen times list (sorted)
  let nextNodeIndex = chosenTimes.indexOf(id) + 1;
  if(nextNodeIndex == chosenTimes.length) // If it should be added to the end
  {
    chosenTimesList.appendChild(newTime);
  }
  else
  {
    let nextNode = document.getElementById(chosenTimes[nextNodeIndex]);
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
  let id = chosenTime.id;
  chosenTime.parentNode.removeChild(chosenTime); // Remove chosen time from chosen times list

  chosenTimes.splice(chosenTimes.indexOf(id), 1); // Take chosen time out of chosen times
  availableTimes.push(id); // Add the chosen time to the end of availableTimes
  availableTimes.sort(function(a, b) {return(sortTimes(a, b))}); // Sort the array

  let chosenTimesList = document.getElementById("availableTimesList");
  // Create the new time anchor
  let newTime = document.createElement("a");
  newTime.setAttribute("href", "javascript:void(0);");
  newTime.setAttribute("onclick", "addTime()");
  newTime.setAttribute("id", id);
  newTime.innerHTML = id;

  // Add it into the available times list (sorted)
  let nextNodeIndex = availableTimes.indexOf(id) + 1;
  if(nextNodeIndex == availableTimes.length) // If it should be added to the end
  {
    availableTimesList.appendChild(newTime);
  }
  else
  {
    let nextNode = document.getElementById(availableTimes[nextNodeIndex]);
    availableTimesList.insertBefore(newTime, nextNode);
  }

  let lastChosen = document.getElementById("chosen"); // Show the user what they selected
  lastChosen.style.color = "red"; // Red for deleted
  lastChosen.innerHTML = "<-- " + id + " ---";
}

// To be used to sort the times
function sortTimes(a, b)
{
  if(twentyFourMode) // First check AM/PM
  {
    let aMeridiem = a.substring(a.indexOf(" ") + 1);
    let bMeridiem = b.substring(b.indexOf(" ") + 1);
    if(aMeridiem != bMeridiem)
    {
      if(aMeridiem < bMeridiem)
        return(-1);
      else
        return(1);
    }
  }
  // Next check hour
  let aHr = parseInt(a.substring(0, a.indexOf(":")));
  let bHr = parseInt(b.substring(0, b.indexOf(":")));
  if((aHr - bHr) == 0) // If they are the same hour, check the minutes
  {
    let aMin;
    let bMin;
    if(twentyFourMode) // This is so that the meridian (AM/PM) is not put in the parseInt
    {
      aMin = parseInt(a.substring(a.indexOf(":") + 1, a.indexOf(" ")));
      bMin = parseInt(b.substring(b.indexOf(":") + 1, b.indexOf(" ")));
    }
    else
    {
      aMin = parseInt(a.substring(a.indexOf(":") + 1));
      bMin = parseInt(b.substring(b.indexOf(":") + 1));
    }
    return(aMin - bMin);
  }
  else
    return(aHr - bHr);
}

function getEventTimes()
{
  return chosenTimes;
}
