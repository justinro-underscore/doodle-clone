let availableTimes = [];
let chosenTimes = [];
let taskList = [];

/**
 * Initializes the times list
 * @return {Null} Return nothing
 */
function initTimes()
{
  if(!checkAdminStatus())
  {
    let doc = document.getElementById("bodyHTML");
    doc.innerHTML = "<h1 style='color: red'>Error: You are not an administrator</h1>"
    doc.innerHTML += "<p style='text-align: center'>You need administrator status to create an event. <a href='home.html'>Click here</a> to return to the home page.</p>";
    return;
  }
  let availableTimesList = document.getElementById("availableTimesList"); // Only have to fill this list
  for(let hr = 5; hr < 24; hr++)
  {
    if(hr != 12) // Don't use hour 12
    {
      for(let min = 0; min < 6; min += 2)
      {
        let id; // This will be what the user sees
        let time = hr + ":" + min + "0"; // This will be the time stamp
        if(!twentyFourMode)
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
        // Adapted from - stackoverflow.com/questions/8260546/make-a-html-link-that-does-nothing-literally-nothing/8260561
        newTime.setAttribute("href", "javascript:void(0);");
        newTime.setAttribute("onclick", "addTime()");
        newTime.setAttribute("id", id);
        newTime.setAttribute("name", time); // This is a sort of hidden attribute for the 24-hour mode, even if we are in 12-hour mode
        newTime.innerHTML = id;
        availableTimesList.appendChild(newTime);
      }
    }
  }
}

/**
 * Removes the time from the available time list and puts it in the chosen time list
 */
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

/**
 * Removes the time from the chosen time list and puts it in the available time list
 * @return {None} Returns nothing
 */
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

/**
 * Sorts two times
 * @param  {string} a a time
 * @param  {string} b a time
 * @return {string}   a time
 */
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
/**
 * Gets the chosen times
 * @return {time} Returns the list of chosenTimes
 */
function getEventTimes()
{
  return chosenTimes;
}

/**
 * Allows users to add tasks to events
 */
function addTask()
{
  let taskObj = {
    task : document.forms["eventMaker"]["task"].value,
    assignedTo : undefined
  }
  let tasksListDisplay = document.getElementById("tasksList");
  let errorMessageTask = document.getElementById("errorMessageTask");
  if(taskObj.task != "")
  {
    if(!taskList.includes(taskObj.task))
    {
      errorMessageTask.innerHTML = "";

      taskList.push(taskObj);

      let newTask = document.createElement("a");
      newTask.setAttribute("href", "javascript:void(0);");
      newTask.setAttribute("id", "task" + taskObj.task);
      newTask.setAttribute("name", "unassigned"); // Hidden attribute to test if the task has been assigned
      newTask.innerHTML = taskObj.task;

      let buttonDelete = document.createElement("button");
      buttonDelete.setAttribute("type", "button");
      buttonDelete.setAttribute("onclick", "removeTask('" + taskObj.task + "')");
      buttonDelete.innerHTML = "<b>-</b>";
      newTask.append(buttonDelete);

      let buttonChoose = document.createElement("button");
      buttonChoose.setAttribute("type", "button");
      buttonChoose.setAttribute("onclick", "chooseTask('" + taskObj.task + "')");
      buttonChoose.setAttribute("id", taskObj.task + "button");
      buttonChoose.innerHTML = "<b>Assign to Self</b>";
      newTask.append(buttonChoose);
      tasksListDisplay.appendChild(newTask);
    }
    else
    {
      errorMessageTask.innerHTML = "Error: Task already exists!";
    }
  }
  else
  {
    errorMessageTask.innerHTML = "Error: Please enter a task.";
  }
}

/**
 * Lets the user click on the task on the create screen
 * @param  {string} taskId the id of the task
 * @return {string}        a id value
 */
function chooseTask(taskId)
{
  let task = document.getElementById("task" + taskId);
  if(task.getAttribute("name") == "unassigned")
  {
    task.innerHTML += "<span style='color: darkgray;'><i><b> Assigned to Creator</b></i></span>";
    task.setAttribute("style", "background-color: lightgray");
    task.setAttribute("name", "assigned");
    task.childNodes[2].innerHTML = "<b>Unassign Self</b>";
    taskList.find((t) => {
      return taskId == t.task;
    }).assignedTo = getCurrUser();
  }
  else
  {
    task.innerHTML = task.innerHTML.substring(0, task.innerHTML.indexOf("<span"));
    task.setAttribute("style", "");
    task.setAttribute("name", "unassigned");
    task.childNodes[2].innerHTML = "<b>Assign to Self</b>"
    taskList.find((t) => {
      return taskId == t.task;
    }).assignedTo = undefined;
  }
}

/**
 * Lets the user remove the task on the create screen
 * @param  {task object} task the task we want to delete
 * @return {None} return nothing
 */
function removeTask(task)
{
  //(task);
  let taskEntry = document.getElementById("task" + task);
  taskEntry.setAttribute("style", "background-color: darkgray");
  taskList.splice(taskList.indexOf(task), 1);
  taskEntry.parentNode.removeChild(taskEntry);
  document.getElementById("errorMessageTask").innerHTML = "";
}

/**
 * Gets the list of tasks
 * @return {task list} the list of tasks
 */
function getTasks()
{
  return taskList;
}
